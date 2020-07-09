<template>
  <div id="game">
    <h1>{{game.name}}</h1>
    <div v-if="joined">
      <game-multi
        v-if="game.multi"
        :game="game"
        :start="start"
        :finish="finish"
        :startRound="startRound"
        :setScore="setScore"
        :changeTeam="changeTeam"
      />
      <game-solo
        v-else
        :game="game"
        :start="start"
        :finish="finish"
        :startRound="startRound"
        :setScore="setScore"
      />
      <button
        v-if="game.started && !game.finished"
        @click="finish"
        class="btn btn-sm btn-success mt-3"
      >Terminer la partie</button>
      <button v-if="game.started"
      @click="$router.push(`/games/r/${game.link}`)"
        class="btn mt-3 btn-sm btn-primary float-right"
        :disabled="!game.finished"
      >Afficher les résultats 🏅</button>
      <p v-if="game.finished" class="mt-3">
        Une erreur dans les scores?
        <button
          @click="reOpen"
          class="btn btn-sm btn-warning"
        >Réouvrir la partie</button>
      </p>
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
import Swal from "sweetalert2";
import GameMulti from "@/components/GameMulti";
import GameSolo from "@/components/GameSolo";

export default {
  data() {
    return {
      game: { name: "" }
    };
  },
  components: {
    GameMulti,
    GameSolo
  },
  async beforeCreate() {
    this.game = (await api.getGame(this.$route.params.link)).data.game;
     this.$options.sockets.onmessage = this.onMessageReceived;
    this.login();
  },
  async created(){
   
  },
  computed: {
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
      console.log(this.game._id);
      this.sendMessage(new WSMessage("JOIN", { gameid: this.game._id }));
    },
    start() {
      this.sendMessage(new WSMessage("START_GAME", { gameid: this.game._id }));
    },
    finish() {
      this.sendMessage(new WSMessage("FINISH_GAME", { gameid: this.game._id }));
    },
    reOpen() {
      this.sendMessage(new WSMessage("REOPEN_GAME", { gameid: this.game._id }));
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