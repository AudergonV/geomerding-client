<template>
  <div id="roundresult">
    <h5>Challenge {{index+1}}</h5>
    <p>
      🗺️&nbsp;
      <b>{{round.map}}</b>&nbsp;/&nbsp;⏱️&nbsp;
      <b>{{moment(round.time).format('mm:ss')}}</b>
    </p>
    <p>😈 Malus: {{malus[round.malus]}}</p>
    <round-leaderboard
      :index="index"
      :users="users"
      :round="round"
      :onSetScore="alert"
      :finished="true"
    />
    <round-team-leaderboard v-if="multi" :index="index" :teams="teams" />
    <hr />
  </div>
</template>
<script>
import RoundLeaderboard from "@/components/RoundLeaderboard";
import RoundTeamLeaderboard from "@/components/RoundTeamLeaderboard";
import moment from "moment";

export default {
  props: {
    users: Array,
    index: Number,
    round: Object,
    multi: Boolean,
    teams: Array
  },
  data() {
    return {
      moment,
      malus: ["Pas de malus", "Don't move", "Partir un jour", "Speedrun"]
    };
  },
  components: {
    RoundLeaderboard,
    RoundTeamLeaderboard
  }
};
</script>