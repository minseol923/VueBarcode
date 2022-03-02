import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editItem: null,
    doNotLoad: false,
  },
  mutations: {
    setEditItem(state, item) {
      state.editItem = item;
    },
    setDoNotLoad(state, item) {
      state.doNotLoad = item;
    },
  },
  actions: {},
  modules: {},
});
