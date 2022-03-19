import Vue from "vue"
import Vuex from "vuex"
import VueCookies from "vue-cookies"
import { authService } from "@/_services/auth.service"
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_DATA (state, data) {
      state.user = data
    }
  },
  actions: {
    login ({ commit }, data) {
      authService.login(data).then(({ token, user }) => {
        VueCookies.set("token", token)
        commit("SET_DATA", user)
        router.push("/")
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
