import axios from "axios";

const state = {
  upliftments: [{ id: 1, number: 123456 }, { id: 2, number: 123457 }],
  firstNameMatches: [],
  middleNameMatches: [],
  lastNameMatches: [],
  selectedClient: []
};

const getters = {
  allFirstNameMatches: state => state.firstNameMatches,
  allMiddleNameMatches: state => state.middleNameMatches,
  allLastNameMatches: state => state.lastNameMatches,
  selectedClient: state => state.selectedClient
};

const actions = {
  async saveClient({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/save-client",
      payload
    );
    debugger;
  },
  async getClientBy({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/get-client-by",
      payload
    );
    if (payload.field === "firstName") {
      commit("setFirstNameMatches", response.data);
    } else if (payload.field === "middleName") {
      commit("setMiddleNameMatches", response.data);
    } else if (payload.field === "lastName") {
      commit("setLastNameMatches", response.data);
    }
  },
  setSelectedClient({ commit }, payload) {
    commit("setSelectedClientToStore", payload);
  }
};
const mutations = {
  setFirstNameMatches: (state, firstNameMatches) =>
    (state.firstNameMatches = firstNameMatches),
  setMiddleNameMatches: (state, middleNameMatches) =>
    (state.middleNameMatches = middleNameMatches),
  setLastNameMatches: (state, lastNameMatches) =>
    (state.lastNameMatches = lastNameMatches),
  setSelectedClientToStore: (state, selectedClient) =>
    (state.selectedClient = selectedClient)
};

export default {
  state,
  getters,
  actions,
  mutations
};
