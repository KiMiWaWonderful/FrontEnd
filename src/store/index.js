import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    username: "",
    city: "",
  },
  getters: {
    username(state) {
      return state.username || window.sessionStorage.setItem("loginuser")
    },
    city(state) {
      return state.city
    }
  },
  mutations: {
    setUsername(state, val) {
      state.username = val
      window.sessionStorage.setItem("loginuser", val)
    },
    setCity(state, val) {
      state.city = val
    }
  }
})

export default store
