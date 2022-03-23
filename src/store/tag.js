import { tagService } from "../_services/tag.service";

const state = () => ({
  data: [],
  tag: {},
  isLoading: false,
});

const actions = {
  fetchTags({ commit }) {
    commit("SET_LOADING", true);
    tagService
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
  fetchPost({ commit }, id) {
    commit("SET_LOADING", true);
    tagService
      .getById(id)
      .then((res) => {
        commit("SET_TAG", { ...res });
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
  SET_TAG(state, value) {
    state.post = value;
  },
  SET_LOADING(state, value) {
    state.isLoading = value;
  },
};

const getters = {
  tags: ({ data }) => data,
  tag: ({ tag }) => tag,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
