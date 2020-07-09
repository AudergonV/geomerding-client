<template>
  <div id="mygames">
    <h3>Mes parties</h3>
    <router-link class="btn btn-success btn-sm" to="/games/create">Créer une partie</router-link>
    <b-pagination
      v-if="games.length > 0"
      class="mt-3"
      v-model="currentPage"
      :total-rows="games.length"
      :per-page="perPage"
      aria-controls="table-employes"
      align="fill"
      :limit="15"
      size="sm"
    >
      <template v-slot:page="{ page, active }">
        <span style="color:white;" v-if="active">{{ page }}</span>
        <span v-else>{{ page }}</span>
      </template>
    </b-pagination>
    <b-table
      v-if="games.length > 0"
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
        <col v-for="field in scope.fields" :key="field.key" />
      </template>
      <template v-slot:cell(name)="data">{{data.item.name}}</template>
      <template v-slot:cell(rounds.length)="data">{{data.item.rounds.length}}</template>
      <template v-slot:cell(multi)="data">
        <img :src="`img/${data.item.multi ? 'group.png' : 'user.png'}`" class="icon mr-1" />
        {{data.item.multi? 'Par équipe' : 'Solo'}}
      </template>
      <template v-slot:cell(slots)="data">{{data.item.users.length}}/{{data.item.slots}}</template>
      <template v-slot:cell(private)="data">
          <img :src="`img/${data.item.private ? 'lock.png' : 'earth.png'}`" class="icon mr-1" />
          {{data.item.private?'Partie privée' : 'Partie publique'}}
      </template>
      <template v-slot:cell(join)="data">
        <router-link class="btn btn-sm btn-primary" :to="`/games/play/${data.item.link}`">
          <font-awesome-icon :icon="'sign-in-alt'" />
        </router-link>
      </template>
    </b-table>
    <p v-else>Tu n'as pas encore de partie</p>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      games: [],
      perPage: 15,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "name", label: "Nom", sortable: true },
        { key: "rounds.length", label: "Nombre de rounds", sortable: true },
        { key: "multi", label: "Equipe/Solo", sortable: true },
        { key: "slots", label: "Slots", sortable: true },
        { key: "private", label: "Privé/Public", sortable: true },
        { key: "join", label: "Voir la partie", sortable: false }
      ]
    };
  },
  async created() {
    this.games = (await api.getMyGames()).data.games;
  }
};
</script>