import axios from "axios";

const state = {
  upliftments: [{ id: 1, number: 123456 }, { id: 2, number: 123457 }]
};

const getters = {};

const actions = {
  async saveClient({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/save-client",
      payload
    );
    debugger;
  }
};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
