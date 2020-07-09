import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import Games from '../views/Games.vue';
import CreateGame from '../views/CreateGame.vue';
import Profile from '../views/Profile.vue';
import Browse from '../views/Browse.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mygames',
    name: 'Games',
    component: Games
  },
  { path: '/browse', name: "Browse", component: Browse },
  {
    path: '/games/play/:link',
    name: 'Game',
    component: Game
  },
  {
    path: '/games/create',
    name: 'CreateGame',
    component: CreateGame
  },
  {
    path: '/profile',
    name: 'Profile', component: Profile
  }
]

const router = new VueRouter({
  routes
})

export default router
