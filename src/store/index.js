import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: undefined,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    }, setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {
  }
})
