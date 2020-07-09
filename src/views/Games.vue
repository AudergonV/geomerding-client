<template>
  <div id="mygames">
    <h3>Mes parties</h3>
    <router-link class="btn btn-success btn-sm" to="/games/create">Créer une partie</router-link>
    <hr />
    <h5>
      Parties en cours 🏁
      <button @click="loadPlayingGames" class="btn btn-sm float-right">
        <font-awesome-icon :icon="'sync'" />
      </button>
    </h5>
    <my-games
      v-if="playgingames.length > 0"
      :games="playgingames"
      :joinLabel="'Reprendre la partie'"
    />
    <p v-else>Tu n'as pas de partie en cours</p>
    <hr />
    <h5>
      Parties en attente ⏳
      <button @click="loadWaitingGames" class="btn btn-sm float-right">
        <font-awesome-icon :icon="'sync'" />
      </button>
    </h5>
    <my-games v-if="waitinggames.length > 0" :games="waitinggames" :joinLabel="'Voir la partie'" />
    <p v-else>Tu n'as pas de partie en attente</p>
  </div>
</template>

<script>
import api from "@/api";
import MyGames from "@/components/MyGames";
export default {
  data() {
    return {
      waitinggames: [],
      playgingames: []
    };
  },
  components: {
    MyGames
  },
  created() {
    this.loadWaitingGames();
    this.loadPlayingGames();
  },
  methods: {
    async loadWaitingGames() {
      this.waitinggames = (await api.getMyWaitingGames()).data.games;
    },
    async loadPlayingGames() {
      this.playgingames = (await api.getMyPlayingGames()).data.games;
    }
  }
};
</script>