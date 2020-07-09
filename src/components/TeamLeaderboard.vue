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
      <template v-slot:cell(position)="data"><img class="position" :src="`/img/positions/${data.item.score.position}.webp`"/></template>
      <template v-slot:cell(teamname)="data">{{data.item.name}}</template>
      <template v-slot:cell(geoscore)="data">{{data.item.score.geoScore}}</template>
      <template v-slot:cell(score)="data">{{data.item.score.points}}</template>
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
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "position", label: "Pos.", sortable: true },
        { key: "teamname", label: "Equipe", sortable: true },
        { key: "geoscore", label: "Score geo.", sortable: true },
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