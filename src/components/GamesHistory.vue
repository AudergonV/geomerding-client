<template>
  <div id="mygames">
    <b-pagination
      class="mt-3"
      v-model="currentPage"
      :total-rows="games.length"
      :per-page="perPage"
      aria-controls="table-employes"
      align="fill"
      :limit="15"
      size="sm"
      v-if="games.length >= perPage"
    >
      <template v-slot:page="{ page, active }">
        <span style="color:white;" v-if="active">{{ page }}</span>
        <span v-else>{{ page }}</span>
      </template>
    </b-pagination>
    <b-table
      responsive="sm"
      :items="games"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      class="mt-3"
      id="table-employes"
      small
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
    >
      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :width="field.key === 'join'? '10%' : '18%'"
        />
      </template>
      <template v-slot:cell(name)="data">{{data.item.name}}</template>
      <template v-slot:cell(rounds.length)="data">
        {{data.item.rounds.length}}
        <div class="mytooltip">
          <font-awesome-icon :icon="'question'" />
          <span class="mytooltiptext">
            <span v-for="round of data.item.rounds" :key="round._id">
              {{round.map}} / {{moment(round.time).format('mm:ss')}} / {{round.coop? 'Co-op' : 'Solo'}}
              <br />
            </span>
          </span>
        </div>
      </template>
      <template v-slot:cell(multi)="data">{{data.item.multi? '🤼 Par équipe' : '🧍 Solo'}}
        <span v-if="data.item.multi">&nbsp;({{data.item.teams.length}} équipes)</span></template>
      <template v-slot:cell(slots)="data">{{data.item.users.length}}/{{data.item.slots}}</template>
      <template
        v-slot:cell(private)="data"
      >{{data.item.private?'🔒 Partie privée' : '🌍 Partie publique'}}</template>
      <template v-slot:cell(join)="data">
        <router-link
          class="btn btn-sm btn-primary"
          :to="`/games/r/${data.item.link}`"
        >Voir les résultats 🏅</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    games: Array
  },
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      moment,
      fields: [
        { key: "name", label: "Nom", sortable: true },
        { key: "rounds.length", label: "Nombre de rounds", sortable: true },
        { key: "multi", label: "Equipe/Solo", sortable: true },
        { key: "slots", label: "Slots", sortable: true },
        { key: "join", label: "Voir les résultats", sortable: false }
      ]
    };
  }
};
</script>