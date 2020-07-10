<template>
  <div id="app">
    <sidebar-menu :menu="menu" :hideToggle="false">
      <span slot="toggle-icon">
        <font-awesome-icon :icon="'eye'" />
      </span>
      <span slot="dropdown-icon">
        <font-awesome-icon :icon="'caret-down'" />
      </span>
    </sidebar-menu>
    <div class="container well content">
      <div v-bind:class="loading ? 'loader' : 'hidden-loader'">
        <h4>
          Connexion...</h4>
      </div>
      <div :class="(loading ? ' loading' : 'not-loading')">
        <transition name="component-fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <footer>
      <center>
        <p>
          Site créé par Gwyrin
          <img src="/img/gwyrin.png" />
        </p>
      </center>
    </footer>
  </div>
</template>
<script>
import { SidebarMenu } from "vue-sidebar-menu";
import api from "@/api";
import store from "@/store/index.js";
import MenuHeader from "@/components/MenuHeader";

export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      menu: [
        { component: MenuHeader, hiddenOnCollapse: true },
        {
          header: true,
          title: "Menu",
          hiddenOnCollapse: true
        },
        {
          href: "/profile",
          title: "Mon profil"
        },
        {
          href: "/",
          title: "Accueil",
          icon: {
            element: "img",
            attributes: { src: "img/home.png" }
          }
        },
        {
          href: "/browse",
          title: "Explorer",
          icon: {
            element: "img",
            attributes: { src: "img/compas.png" }
          }
        },
        {
          href: "/mygames",
          title: "Mes parties",
          icon: {
            element: "img",
            attributes: { src: "img/earth.png" }
          }
        },
        {
          href: "/history",
          title: "Historique de parties",
          icon: {
            element: "img",
            attributes: { src: "img/clock.png" }
          }
        },
        {
          href: "/changelog",
          title: "Changelog",
          icon: {
            element: "img",
            attributes: { src: "img/list.png" }
          }
        }
      ]
    };
  },
  async beforeCreate() {
    let user = (await api.getMe()).data;
    store.commit("setUser", user);
    if (store.state.user.avatar && store.state.user.avatar !== null) {
      this.menu[2].icon = {
        element: "img",
        attributes: {
          src: `https://cdn.discordapp.com/avatars/${this.$store.state.user.discordid}/${this.$store.state.user.avatar}`
        }
      };
    } else {
      this.menu[2].icon = {
        element: "img",
        attributes: {
          src: `img/avatar_default.png`
        }
      };
    }
    let redirect = window.localStorage.getItem("redirect");
    if (redirect) {
      window.localStorage.removeItem("redirect");
      this.$router.push(redirect);
    }
  },
  methods: {},
  computed: {
    loading() {
      return store.state.loading;
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === "Game") {
        this.$disconnect();
      }
    }
  }
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.1s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>