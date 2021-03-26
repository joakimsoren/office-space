import Vuex from "vuex";
import { state } from "@/store/root.constants";
import { mutations } from "@/store/root.mutations";
import { actions } from "@/store/root.actions";
import Vue from "vue";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
  key: "OFFICE_SPACE",
  storage: window.localStorage,
  reducer: (state: any) => ({
    email: state.email,
  }),
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexLocalStorage.plugin],
});
