<template>
  <div>
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
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :width="(field.key === 'username') ? '50%' : '25%'"
          :style="''"
        />
      </template>
      <template v-slot:cell(score.position)="data">
        <img class="position" :src="`/img/positions/${data.item.score.position}.webp`" />
      </template>
      <template v-slot:cell(name)="data">{{data.item.name}}</template>
      <template v-slot:cell(score.geoscore)="data">{{data.item.score.geoScore}}</template>
      <template v-slot:cell(score.bonus)="data">{{data.item.score.bonus}}</template>
      <template v-slot:cell(score.points)="data">{{data.item.score.points}}</template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    teams: Array
  },
  data() {
    return {
      sortBy: "score.position",
      sortDesc: false,
      fields: [
        { key: "score.position", label: "Pos.", sortable: true },
        { key: "name", label: "Equipe", sortable: true },
        { key: "score.geoscore", label: "Score geo.", sortable: true },
        { key: "score.bonus", label: "Bonus"},
        { key: "score.points", label: "Points", sortable: true }
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