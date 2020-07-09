<template>
  <div id="results">
    <h1>Résultats</h1>
    <results-solo v-if="!game.multi" :game="game" />
    <results-multi v-else :game="game" />
  </div>
</template>

<script>
import api from "@/api";
import ResultsSolo from "@/components/ResultsSolo";
import ResultsMulti from "@/components/ResultsMulti";

export default {
  data() {
    return {
      game: {}
    };
  },
  components: {
    ResultsSolo,
    ResultsMulti
  },
  async created() {
    let result = await api.getGame(this.$route.params.link);
    this.game = result.data.game;
  },
  async mounted() {
    setTimeout(() => {this.dropConfetti()}, 300);
  },
  methods: {
    dropConfetti() {
      this.$confetti.start();
      setTimeout(() => {
        this.$confetti.stop();
      }, 1300);
    }
  }
};
</script>