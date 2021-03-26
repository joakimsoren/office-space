import { MutationTree } from "vuex";
import { ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";

export const mutations: MutationTree<IRootState> = {
  [ERootMutation.SetEmail](state: IRootState, email: string) {
    state.email = email;
  },
};
