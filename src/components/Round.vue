<template>
  <div>
    <div class="card border-secondary mb-3">
      <div class="card-header">Challenge {{index+1}}</div>
      <div class="card-body">
        <h4 class="card-title">{{round.map}}</h4>
        {{moment(round.time).format("mm:ss")}} /
        <img :src="`img/${round.coop ? 'group.png' : 'user.png'}`" class="icon" />
        {{round.coop ? 'Co-op' : 'Solo'}}
        <button
          v-if="!round.started"
          @click="startRound(round.malus, index)"
          class="btn btn-sm btn-primary float-right"
        >Commencer le challenge</button>
        <a
          :href="round.malus === 3 ? round.speedrunlink: round.link"
          class="btn btn-success btn-sm float-right"
          target="_blank"
          v-else
        >Ouvrir le challenge Geoguessr</a>
        <br />
        <select
          class="col-3 mt-1 custom-select"
          v-if="!round.started && round.coop"
          v-model="round.malus"
        >
          <option v-for="(malu, index) in malus" :key="index" :value="index">{{malu}}</option>
        </select>
        <select
          class="col-3 mt-1 custom-select"
          v-if="!round.started && !round.coop"
          v-model="round.malus"
        >
          <option :value="0">Pas de malus</option>
          <option :value="3">Speedrun</option>
        </select>
        <p v-else>Malus: {{malus[round.malus]}}</p>
        <button
          v-if="!round.started && round.coop"
          @click="randomMalus"
          class="btn btn-sm ml-2 btn-primary"
          title="Malus aléatoire"
        >
          <font-awesome-icon :icon="'dice'" />
        </button>
        <round-leaderboard
          v-if="round.started"
          :index="index"
          :users="users"
          :onSetScore="onSetScore"
          :round="round"
        />
        <round-team-leaderboard v-if="round.started" :index="index" :teams="teams" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import RoundLeaderboard from "@/components/RoundLeaderboard";
import RoundTeamLeaderboard from "@/components/RoundTeamLeaderboard";

export default {
  props: {
    round: Object,
    users: Array,
    teams: Array,
    index: Number,
    startRound: Function,
    onSetScore: Function
  },
  components: {
    RoundLeaderboard,
    RoundTeamLeaderboard
  },
  data() {
    return {
      moment,
      malus: ["Pas de malus", "Don't move", "Partir un jour", "Speedrun"],
    };
  },
  methods: {
    randomMalus() {
      this.round.malus = Math.floor(Math.random() * 3) + 1;
    }
  }
};
</script>