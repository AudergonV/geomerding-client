<template>
  <div>
    <b-table
      responsive="sm"
      :tbody-tr-class="rowClass"
      :items="scores"
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
        />
      </template>
      <template v-slot:cell(position)="data"><img class="position" :src="`/img/positions/${data.item.position}.webp`"/></template>
      <template v-slot:cell(username)="data">{{data.item.user.username}}</template>
      <template v-slot:cell(geoscore)="data">{{data.item.geoScore}}</template>
      <template v-slot:cell(score)="data">{{data.item.points}}</template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    scores: Array
  },
  data() {
    return {
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "position", label: "Pos.", sortable: true },
        { key: "username", label: "Pseudo", sortable: true },
        { key: "geoscore", label: "Score geo.", sortable: true },
        { key: "score", label: "Points", sortable: true }
      ]
    };
  },
  methods: {
    rowClass(score) {
      return score.color;
    }
  }
};
</script>