<template>
  <div id="gamesolo">
    <p>
      {{game.users.length}} joueurs sur {{game.slots}}
      <span v-if="game.users.length < 2">/ Il faut au moins deux joueurs pour commencer</span>
    </p>
    <div class="row">
      <div class="col-6">
        <h5>Liste des joueurs</h5>
        <table class="table table-sm table-hover mt-3">
          <thead>
            <tr :style="`color: white; background-color: #2a2a2a;`">
              <th scope="col" width="80px"></th>
              <th scope="col">Pseudo</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-secondary" v-for="user of game.users" :key="user._id">
              <th scope="row">
                <discord-avatar :avatar="user.avatar" :discordid="user.discordid" />
              </th>
              <td>{{user.username}}</td>
            </tr>
          </tbody>
        </table>
        <button
          class="btn btn-sm btn-success"
          @click="start"
          :disabled="game.users.length < 2"
          v-if="!game.started"
        >Commencer la partie</button>
      </div>
      <div class="col-6" v-if="game.started">
        <h5>Classement</h5>
        <leaderboard :scores="game.scores" />
      </div>
    </div>
    <hr />
    <div v-if="game.started">
      <div class="row">
        <div class="col-12" v-for="(round, index) in game.rounds" :key="round._id">
          <round
            :round="round"
            :multi="game.multi"
            :teams="game.teams"
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
import Round from "@/components/Round";
import DiscordAvatar from "@/components/DiscordAvatar";

export default {
  props: {
    game: Object,
    startRound: Function,
    setScore: Function,
    start: Function,
    finish: Function
  },
  components: {
    Leaderboard,
    Round,
    DiscordAvatar
  }
};
</script>