import { categoryService } from "../_services/category.service";

const state = () => ({
  data: {},
  isLoading: false,
});

const actions = {
  fetchCategories({ commit }) {
    commit("SET_LOADING", true);
    categoryService
      .getAll()
      .then((res) => {
        commit("SET_DATA", res);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        console.log(err);
        commit("SET_LOADING", false);
      });
  },
};

const mutations = {
  SET_DATA(state, value) {
    state.data = value;
  },
  SET_LOADING(state, value) {
    state.isLoading = value;
  },
};

const getters = {
  categories: ({ data }) => data.items,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
