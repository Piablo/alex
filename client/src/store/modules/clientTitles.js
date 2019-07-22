import axios from "axios";

const state = {
  titles: []
};

const getters = { allTitles: state => state.titles };

const actions = {
  async fetchTitles({ commit }) {
    const response = await axios.post("http://localhost:8081/api/get-titles");
    commit("setTitles", response.data);
  }
};

const mutations = {
  setTitles: (state, titles) => (state.titles = titles)
};

export default {
  state,
  getters,
  actions,
  mutations
};
