import axios from "axios";

const state = {
  itemTypes: [],
  itemCatagories: [],
  itemBrands: []
};

const getters = {
  allItemTypes: state => state.itemTypes,
  allItemCatagories: state => state.itemCatagories,
  allItemBrands: state => state.itemBrands
};

const actions = {
  async fetchItemTypes({ commit }) {
    const response = await axios.post(
      "http://localhost:8081/api/get-item-types"
    );
    commit("setItemTypes", response.data);
  },

  async fetchItemCatagories({ commit }, userSelectedItemTypeId) {
    const response = await axios.post(
      "http://localhost:8081/api/get-item-catagories",
      userSelectedItemTypeId
    );
    commit("setItemCatagories", response.data);
  },

  async fetchItemBrands({ commit }, userSelectedItemCatagoryId) {
    const response = await axios.post(
      "http://localhost:8081/api/get-item-brands",
      userSelectedItemCatagoryId
    );
    commit("setItemBrands", response.data);
  },

  async saveItemType({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/save-item-type",
      payload
    );
    commit("pushNewItemType", response.data);
  },

  async saveItemCatagory({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/save-item-catagory",
      payload
    );
    commit("pushNewItemCatagory", response.data);
  },

  async saveItemBrand({ commit }, payload) {
    const response = await axios.post(
      "http://localhost:8081/api/save-item-brand",
      payload
    );
    commit("pushNewItemBrand", response.data);
  }
};
const mutations = {
  setItemTypes: (state, itemTypes) => (state.itemTypes = itemTypes),
  setItemCatagories: (state, itemCatagories) =>
    (state.itemCatagories = itemCatagories),
  setItemBrands: (state, itemBrands) => (state.itemBrands = itemBrands),
  pushNewItemType: (state, itemType) => state.itemTypes.push(itemType),
  pushNewItemCatagory: (state, itemCatagory) =>
    state.itemCatagories.push(itemCatagory),
  pushNewItemBrand: (state, itemBrand) => state.itemBrands.push(itemBrand)
};

export default {
  state,
  getters,
  actions,
  mutations
};
