<template>
  <div if="gamemulti">
    <p>{{game.users.length}} joueurs sur {{game.slots}}<span v-if="!teamsComplete"> / Il faut au moins deux joueurs par équipe pour commencer</span></p>
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
              <th scope="col" width="80px">{{team.name}}</th>
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
            :multi="game.multi"
            :startRound="startRound"
            :onSetScore="setScore"
            :users="game.users"
            :index="index"
            :finished="game.finished"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Leaderboard from "@/components/Leaderboard";
import TeamLeaderboard from "@/components/TeamLeaderboard";
import Round from "@/components/Round";
import DiscordAvatar from "@/components/DiscordAvatar";

export default {
  props: {
    game: Object,
    changeTeam: Function,
    startRound: Function,
    setScore: Function,
    start: Function,
    finish: Function
  },
  components: {
    Leaderboard,
    TeamLeaderboard,
    Round,
    DiscordAvatar
  },
  computed: {
    teamsComplete() {
      let ok = true;
      if (this.game.multi) {
        for (let team of this.game.teams) {
          if (team.users.length < 2) {
            ok = false;
            break;
          }
        }
      }
      return ok;
    }
  }
};
</script>