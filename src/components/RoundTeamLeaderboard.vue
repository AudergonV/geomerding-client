<template>
  <b-table
    responsive="sm"
    :tbody-tr-class="rowClass"
    :items="teams"
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
      <img class="position" :src="`/img/positions/${data.item.scores[index].position}.webp`" />
    </template>
    <template v-slot:cell(teamname)="data">{{data.item.name}}</template>
    <template v-slot:cell(round1)="data">{{data.item.scores[index].geoScores[0]}}</template>
    <template v-slot:cell(round2)="data">{{data.item.scores[index].geoScores[1]}}</template>
    <template v-slot:cell(round3)="data">{{data.item.scores[index].geoScores[2]}}</template>
    <template v-slot:cell(round4)="data">{{data.item.scores[index].geoScores[3]}}</template>
    <template v-slot:cell(round5)="data">{{data.item.scores[index].geoScores[4]}}</template>
    <template v-slot:cell(total)="data">{{data.item.scores[index].totalGeoScore}}</template>
    <template v-slot:cell(bonus)="data">{{data.item.scores[index].bonus}}</template>
    <template
      v-slot:cell(score)="data"
    >{{data.item.scores[index].points}}</template>
  </b-table>
</template>
<script>
export default {
  props: { teams: Array, index: Number },
  data() {
    return {
      sortBy: "score",
      sortDesc: true,
      fields: [
        { key: "position", label: "Pos.", sortable: true },
        { key: "teamname", label: "Equipe", sortable: true },
        { key: "round1", label: "Round 1", sortable: false },
        { key: "round2", label: "Round 2", sortable: false },
        { key: "round3", label: "Round 3", sortable: false },
        { key: "round4", label: "Round 4", sortable: false },
        { key: "round5", label: "Round 5", sortable: false },
        { key: "total", label: "Total", sortable: true },
        { key: "bonus", label: "Points bonus", sortable: true },
        { key: "score", label: "Points", sortable: true }
      ]
    };
  },
  methods: {
    rowClass(team) {
      return team.color;
    }
  }
};
</script>