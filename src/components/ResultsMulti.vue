<template>
  <div id="resultssolo">
    <h3>Podium individuel</h3>
    <center>
      <podium :scores="game.scores" />
    </center>
    <leaderboard :scores="game.scores" />
    <hr />
    <h3>Podium par équipe</h3>
    <center>
      <podium-team :teams="game.teams" />
    </center>
    <team-leaderboard :teams="game.teams" />
    <hr />
    <h3>Classement par challenge</h3>
    <result-round
      v-for="(round,index) in game.rounds"
      :users="game.users"
      :key="index"
      :round="round"
      :multi="game.multi"
      :teams="game.teams"
      :index="index"
    />
  </div>
</template>

<script>
import Podium from "@/components/Podium";
import PodiumTeam from "@/components/PodiumTeam";
import Leaderboard from "@/components/Leaderboard";
import TeamLeaderboard from "@/components/TeamLeaderboard";
import ResultRound from "@/components/ResultRound";

export default {
  props: {
    game: Object
  },
  components: {
    Podium,
    PodiumTeam,
    Leaderboard,
    TeamLeaderboard,
    ResultRound
  }
};
</script>