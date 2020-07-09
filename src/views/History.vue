<template>
  <div id="history">
    <h3>
      Mes parties terminées
      <button @click="loadHistory" class="btn btn-sm float-right">
        <font-awesome-icon :icon="'sync'" />
      </button>
    </h3>
    <games-history v-if="games.length > 0" :games="games" />
    <p v-else>Vous n'avez pas encore terminé de partie</p>
  </div>
</template>
<script>
import GamesHistory from "@/components/GamesHistory";
import api from "@/api";

export default {
  data() {
    return {
      games: []
    };
  },
  components: {
    GamesHistory
  },
  created() {
    this.loadHistory();
  },
  methods: {
    async loadHistory() {
      this.games = (await api.getMyFinishedGames()).data.games;
    }
  }
};
</script>