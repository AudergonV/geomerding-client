<template>
  <div id="game">
    <h1>{{game.name}}</h1>
    <div v-if="joined">
      <p>{{game.users.length}} joueurs sur {{game.slots}}</p>
      <div class="row">
        <div class="col-6" v-for="team of game.teams" :key="team._id">
          <button
            class="btn btn-sm btn-primary"
            @click="changeTeam(team._id)"
            v-if="!game.started"
          >Rejoindre l'équipe</button>
          <table class="table table-sm table-hover">
            <thead>
              <tr :style="`color: white;`" :class="team.color">
                <th scope="col">{{team.name}}</th>
                <th scope="col">Pseudo</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-secondary" v-for="user of team.users" :key="user._id">
                <th scope="row">
                  <discord-avatar :avatar="user.avatar" :discordid="user.discordid" />
                </th>
                <td>{{user.username}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="btn btn-sm btn-success"
          @click="start"
          :disabled="!teamsComplete"
          v-if="!game.started"
        >Commencer la partie</button>
      </div>
      <div v-if="game.started">
        <hr />
        <div class="row">
          <div class="col-6">
            <h4>Classement individuel</h4>
            <leaderboard :scores="game.scores" />
          </div>
          <div class="col-6">
            <h4>Classement des équipes</h4>
            <team-leaderboard :teams="game.teams" />
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-12" v-for="(round, index) in game.rounds" :key="round._id">
            <round
              :round="round"
              :teams="game.teams"
              :startRound="startRound"
              :onSetScore="setScore"
              :users="game.users"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button class="btn btn-sm btn-success" @click="join">Rejoindre la partie</button>
      <p style="font-size: 12px">Si le bouton ne répond pas n'hésite pas à faire un p'tit F5...</p>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { WSMessage } from "../obj/WSMessage";
import store from "@/store/index";
import Leaderboard from "@/components/Leaderboard";
import TeamLeaderboard from "@/components/TeamLeaderboard";
import Round from "@/components/Round";
import DiscordAvatar from "@/components/DiscordAvatar";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      game: {}
    };
  },
  components: {
    Leaderboard,
    TeamLeaderboard,
    Round,
    DiscordAvatar
  },
  async created() {
    this.game = (await api.getGame(this.$route.params.link)).data.game;
    this.$options.sockets.onmessage = this.onMessageReceived;
    this.login();
  },
  computed: {
    teamsComplete() {
      let ok = true;
      if (this.game.multi) {
        for (let team of this.game.teams) {
          console.log(team);
          if (team.users.length < 2) {
            ok = false;
            break;
          }
        }
      }
      return ok;
    },
    joined() {
      for (let user of this.game.users) {
        if (user.discordid === store.state.user.discordid) return true;
      }
      return false;
    }
  },
  methods: {
    sendMessage(wsm) {
      this.$socket.send(JSON.stringify(wsm));
    },
    onMessageReceived(wsm) {
      try {
        wsm = JSON.parse(wsm.data);
        switch (wsm.action) {
          case "UPDATE_GAME":
            this.game = wsm.data.game;
            break;
          case "CONSOLE":
            console.log(wsm.data);
            break;
          case "ERROR":
            this.showError(wsm.data);
            break;
        }
      } catch (e) {
        console.log(`ERROR : ${e.toString()}`);
      }
    },
    async login() {
      let token = (await api.getAccessToken()).data.token;
      this.sendMessage(
        new WSMessage("LOGIN", { token, link: this.$route.params.link })
      );
    },
    changeTeam(teamid) {
      this.sendMessage(
        new WSMessage("CHANGE_TEAM", { gameid: this.game._id, teamid: teamid })
      );
    },
    setScore(roundindex, scoreindex, score) {
      this.sendMessage(
        new WSMessage("SET_SCORE", {
          gameid: this.game._id,
          roundindex: roundindex,
          scoreindex: scoreindex,
          score: score
        })
      );
    },
    startRound(malus, index) {
      this.sendMessage(
        new WSMessage("START_ROUND", {
          gameid: this.game._id,
          malus: malus,
          index: index
        })
      );
    },
    join() {
      this.sendMessage(new WSMessage("JOIN", { gameid: this.game._id }));
    },
    start() {
      this.sendMessage(new WSMessage("START_GAME", { gameid: this.game._id }));
    },
    finish() {
      this.sendMessage(new WSMessage("FINISH_GAME", { gameid: this.game._id }));
    },
    showError(error) {
      Swal.fire({
        icon: "error",
        text: error
      });
    }
  }
};
</script>