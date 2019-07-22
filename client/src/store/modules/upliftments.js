import axios from "axios";

const state = {
  upliftments: [{ id: 1, number: 123456 }, { id: 2, number: 123457 }]
};

const getters = { allUpliftments: state => state.upliftments };

const actions = {
  // async fetchUpliftments({ commit }) {
  //   const response = await axios.post("http://localhost:8081/api/get-titles");
  //   console.log("Yo");
  //   console.log(response.data);
  // }
};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
