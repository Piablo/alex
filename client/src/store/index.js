import Vuex from "vuex";
import Vue from "vue";
import upliftments from "./modules/upliftments";
import clientTitles from "./modules/clientTitles";
import clients from "./modules/clients";
import items from "./modules/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    upliftments,
    clientTitles,
    clients,
    items
  }
});
