<template>
  <div id="game">
    <h1>
      {{game.name}}
      <button
        class="btn btn-danger btn-sm float-right"
        @click="deleteGame"
        v-if="!game.started && admin"
      >Supprimer la partie</button>
    </h1>
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
      <button
        v-if="game.started"
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
      <button class="btn btn-success btn-block" @click="join">Rejoindre la partie!</button>
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
      game: { name: "" },
      timeout: false
    };
  },
  components: {
    GameMulti,
    GameSolo
  },
  mounted() {
    this.load();
  },
  computed: {
    joined() {
      if (this.game && store.state.user) {
        for (let user of this.game.users) {
          if (user.discordid === store.state.user.discordid) return true;
        }
      }
      return false;
    },
    admin() {
      if (this.game && this.$store.state.user) {
        console.log(this.game.creator);
        return this.game.creator.discordid === store.state.user.discordid;
      } else {
        return false;
      }
    }
  },
  watch: {
    "$route.params.link": function() {
      this.load();
    }
  },
  methods: {
    async load() {
      this.game = (await api.getGame(this.$route.params.link)).data.game;
      if (!this.game) {
        this.$router.push("/404");
      } else {
        //this.$disconnect();
        this.$connect();
        this.$store.commit("setLoading", true);
        this.timeout = true;
        setTimeout(() => {
          if (this.timeout) {
            this.showError("Impossible de se connecter au serveur.");
            this.$store.commit("setLoading", false);
            this.$router.push("/");
          }
        }, 3000);
        this.$options.sockets.onclose = () => console.log("CLOSED");
        this.$options.sockets.onmessage = this.onMessageReceived;
      }
    },
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
          case "CONNECTED":
            this.timeout = false;
            this.$store.commit("setLoading", false);
            this.login();
            break;
          case "GAME_DELETED":
            this.showError(wsm.data);
            this.$router.push("/mygames");
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
    deleteGame() {
      this.sendMessage(new WSMessage("DELETE_GAME", { gameid: this.game._id }));
      this.$router.push("/mygames");
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
      this.sendMessage(
        new WSMessage("JOIN", {
          gameid: this.game._id,
          link: this.$route.params.link
        })
      );
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