import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import { authService } from "@/_services/auth.service";
import router from "../router";

import category from "./category";
import post from "./post";

Vue.use(Vuex);

const data = VueCookies.get("data");

export default new Vuex.Store({
  state: {
    user: data ? data.user : {},
  },
  mutations: {
    SET_DATA(state, data) {
      state.user = data;
    },
  },
  actions: {
    login({ commit }, data) {
      authService
        .login(data)
        .then(({ token, user }) => {
          VueCookies.set("data", { token, user });
          commit("SET_DATA", user);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
    category,
    post,
  },
});
