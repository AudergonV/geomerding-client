import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: { username: '', avatar: null },
    version: '1.0'
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
