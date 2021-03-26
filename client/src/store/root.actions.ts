import { ActionTree } from "vuex";
import { ERootAction, ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";

export const actions: ActionTree<IRootState, any> = {
  [ERootAction.SetEmail]({ commit }, email) {
    commit(ERootMutation.SetEmail, email);
  },
};
