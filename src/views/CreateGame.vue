<template>
  <div id="createGame">
    <h3>Créer une nouvelle partie</h3>
    <div class="form-group">
      <label class="col-form-label" for="name">Nom de la partie:</label>
      <input
        type="text"
        class="form-control"
        v-model="game.name"
        placeholder="Nom de la partie"
        id="name"
      />
      <div class="mt-3 custom-control custom-switch">
        <input
          type="checkbox"
          class="custom-control-input"
          id="privateswitch"
          v-model="game.private"
        />
        <label class="custom-control-label" for="privateswitch">
          <img :src="`img/${game.private ? 'lock.png' : 'earth.png'}`" class="icon mr-1" />
          {{game.private?'Partie privée' : 'Partie publique'}}
        </label>
      </div>
    </div>
    <hr />
    <h4>Joueurs</h4>
    <div class="form-group">
      <label for="slots">Nombre de joueurs : {{game.slots}}</label>
      <input
        type="range"
        step="1"
        :min="game.multi? 4: 2"
        max="10"
        v-model="game.slots"
        class="custom-range"
        id="slots"
      />
    </div>
    <div class="form-group">
      <div class="custom-control custom-switch">
        <input
          type="checkbox"
          class="custom-control-input"
          id="soloswitch"
          v-model="game.multi"
          @change="multiChange"
        />
        <label
          class="custom-control-label"
          for="soloswitch"
        >{{game.multi?'Partie en équipe' : 'Partie solo'}}</label>
      </div>
    </div>
    <div v-if="game.multi" class="form-group">
      <label
        for="slots"
      >Nombre d'équipes : {{game.teams}} ({{Math.floor(game.slots/game.teams) }} joueurs par équipe)</label>
      <input
        type="range"
        step="1"
        min="2"
        :max="Math.floor(game.slots/2)"
        v-model="game.teams"
        class="custom-range"
        id="teams"
      />
    </div>
    <hr />
    <h4>Challenges</h4>
    <div class="row">
      <div
        v-for="(round, index) in game.rounds"
        :key="index"
        class="card border-primary ml-3 mb-3 col-4"
      >
        <div class="card-header">
          Challenge {{index+1}}
          <button
            @click="deleteRound(index)"
            class="float-right btn btn-danger btn-sm"
          >
            <font-awesome-icon :icon="'trash'" />
          </button>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="mt-3 custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="`coopswitch${index}`"
                v-model="round.coop"
                :disabled="!game.multi"
              />
              <label class="custom-control-label" :for="`coopswitch${index}`">
                <img :src="`img/${round.coop ? 'group.png' : 'user.png'}`" class="icon mr-1" />
                {{round.coop?'Co-op' : 'Solo'}}
              </label>
            </div>
            <label class="col-form-label" for="map">Map:</label>
            <input type="text" class="form-control" v-model="round.map" placeholder="Map" id="map" />
            <label class="col-form-label" for="time">Temps:</label>
            <br />
            <date-picker type="time" v-model="round.time" format="mm:ss" />
            <label class="col-form-label" for="link">Lien vers le challenge Geoguessr:</label>
            <input
              type="text"
              class="form-control"
              v-model="round.link"
              placeholder="https://www.geoguessr.com/challenge/XXXXXXXX"
              id="link"
            />
            <label
              class="col-form-label"
              for="speedrunlink"
            >Lien vers le challenge Geoguessr (facultatif):</label>
            <input
              type="text"
              class="form-control"
              v-model="round.speedrunlink"
              placeholder="https://www.geoguessr.com/challenge/XXXXXXXX"
              id="speedrunlink"
            />
          </div>
        </div>
      </div>
      <div class="col-4">
        <button @click="addRound" class="btn btn-success">
          <font-awesome-icon :icon="'plus'" />
        </button>
      </div>
    </div>
    <button @click="create" class="mt-3 btn btn-success">Créer la partie!</button>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import api from "@/api";
import router from "@/router/index";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      game: {
        name: "",
        private: true,
        slots: 4,
        multi: true,
        teams: 2,
        coop: false,
        rounds: []
      }
    };
  },
  components: {
    DatePicker
  },
  async created() {
    this.game.name = `Ma partie`;
  },
  methods: {
    multiChange() {
      if (this.game.multi) {
        if (this.game.slots < 4) this.game.slots = 4;
      } else {
        this.game.multi = true;
        Swal.fire({
          icon: "warning",
          text: "Le mode solo n'est pas encore disponible, désolé!"
        })
        this.$forceUpdate();
        /*for (let round of this.game.rounds) {
          round.coop = false;
        }*/
      }
    },
    addRound() {
      if (this.game.rounds.length < 16) {
        this.game.rounds.push({ rules: undefined, map: "", time: undefined });
      } else {
        this.showError("Le nombre max de challenges a été atteint!");
      }
    },
    deleteRound(index) {
      this.game.rounds.splice(index, 1);
    },
    async create() {
      if (this.game.name.trim() === "") {
        this.showError("La partie n'a pas de nom");
        return;
      }
      if (this.game.rounds.length <= 0) {
        this.showError("Il faut au minimum 1 challenge dans une partie");
        return;
      }
      for (let round of this.game.rounds) {
        if (round.map.trim() === "") {
          this.showError("Un des noms de map est vide");
          return;
        }
        if (round.time === undefined) {
          this.showError("L'un des challenge ne possède pas de temps");
          return;
        }
      }
      let result = await api.createGame(this.game);
      if (result.code === 200) {
        router.push(`/games/play/${result.data.game.link}`);
      } else {
        this.showError(result.message);
      }
    },
    showError(message) {
      Swal.fire({
        icon: "warning",
        text: message
      });
    }
  }
};
</script>