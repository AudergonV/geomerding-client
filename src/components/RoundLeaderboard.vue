<template>
  <b-table
    responsive="sm"
    :tbody-tr-class="rowClass"
    :items="round.scores"
    :fields="fields"
    class="mt-3"
    small
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    sort-icon-left
  >
    <template v-slot:table-colgroup="scope">
      <col v-for="field in scope.fields" :key="field.key" :style="''" />
    </template>
    <template v-slot:cell(position)="data">
      <img class="position" :src="`/img/positions/${data.item.position}.webp`" />
    </template>
    <template v-slot:cell(username)="data">{{data.item.user.username}}</template>
    <template v-slot:cell(geoScores[0])="data">
      {{data.item.geoScores[0]}}
      <button
        v-if="$store.state.user.discordid === data.item.user.discordid"
        @click="setScore(0)"
        class="btn float-right btn-sm"
      >
        <font-awesome-icon :icon="'pen'" />
      </button>
    </template>
    <template v-slot:cell(geoScores[1])="data">
      {{data.item.geoScores[1]}}
      <button
        v-if="$store.state.user.discordid === data.item.user.discordid"
        @click="setScore(1)"
        class="btn float-right btn-sm"
      >
        <font-awesome-icon :icon="'pen'" />
      </button>
    </template>
    <template v-slot:cell(geoScores[2])="data">
      {{data.item.geoScores[2]}}
      <button
        v-if="$store.state.user.discordid === data.item.user.discordid"
        @click="setScore(2)"
        class="btn float-right btn-sm"
      >
        <font-awesome-icon :icon="'pen'" />
      </button>
    </template>
    <template v-slot:cell(geoScores[3])="data">
      {{data.item.geoScores[3]}}
      <button
        v-if="$store.state.user.discordid === data.item.user.discordid"
        @click="setScore(3)"
        class="btn float-right btn-sm"
      >
        <font-awesome-icon :icon="'pen'" />
      </button>
    </template>
    <template v-slot:cell(geoScores[4])="data">
      {{data.item.geoScores[4]}}
      <button
        v-if="$store.state.user.discordid === data.item.user.discordid"
        @click="setScore(4)"
        class="btn float-right btn-sm"
      >
        <font-awesome-icon :icon="'pen'" />
      </button>
    </template>
    <template v-slot:cell(total)="data">{{data.item.totalGeoScore}}</template>
    <template v-slot:cell(bonus)="data">{{data.item.bonus}}</template>
    <template v-slot:cell(points)="data">{{data.item.points}}</template>
  </b-table>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: { round: Object, index: Number, users: Array, onSetScore: Function },
  data() {
    return {
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "position", label: "Pos.", sortable: true },
        { key: "username", label: "Pseudo", sortable: true },
        { key: "geoScores[0]", label: "Round 1", sortable: true },
        { key: "geoScores[1]", label: "Round 2", sortable: true },
        { key: "geoScores[2]", label: "Round 3", sortable: true },
        { key: "geoScores[3]", label: "Round 4", sortable: true },
        { key: "geoScores[4]", label: "Round 5", sortable: true },
        { key: "total", label: "Total", sortable: true },
        { key: "bonus", label: "Points bonus", sortable: true },
        { key: "points", label: "Points", sortable: true }
      ]
    };
  },
  methods: {
    rowClass(score) {
      console.log(score);
      return score.color;
    },
    setScore(scoreindex) {
      Swal.fire({
        title: `Score du round ${scoreindex + 1}`,
        input: "number",
        inputAttributes: {
          max: 5000,
          min: 0
        },
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.value) {
          this.onSetScore(this.index, scoreindex, result.value);
        }
      });
    }
  },
  computed: {
    scores: function() {
      let data = [];
      let index = 0;
      for (let user of this.users) {
        data[index] = {
          user: user,
          scores: [],
          bonus: 0,
          points: 0
        };
        for (let score of this.round.scores) {
          if (score.user.discordid === user.discordid) {
            data[index].scores[score.index] = score;
            data[index].bonus += score.bonus;
            data[index].points += score.points;
          }
        }
        index++;
      }
      return data;
    }
  }
};
</script>