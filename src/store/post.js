import { postService } from "../_services/post.service";

const state = () => ({
  data: [],
  post: {},
  isLoading: false,
});

const actions = {
  fetchPosts({ commit }) {
    commit("SET_LOADING", true);
    postService
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
    postService
      .getById(id)
      .then((res) => {
        commit("SET_POST", { ...res });
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
  SET_POST(state, value) {
    state.post = value;
  },
  SET_LOADING(state, value) {
    state.isLoading = value;
  },
};

const getters = {
  posts: ({ data }) => data,
  post: ({ post }) => post,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
