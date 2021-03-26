import { Service } from "@/api/service";
import { IQueue } from "@/types/queue";
import { ActionTree } from "vuex";
import { ERootAction, ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";

export const actions: ActionTree<IRootState, any> = {
  [ERootAction.SetEmail]({ commit }, email) {
    commit(ERootMutation.SetEmail, email);
  },
  async [ERootAction.LoadQueues]({ commit }) {
    commit(ERootMutation.SetLoaded, false);
    commit(ERootMutation.SetLoading, true);
    try {
      const queues: IQueue[] = await Service.fetchQueues();
      commit(ERootMutation.SetQueues, queues);
      commit(ERootMutation.SetLoaded, true);
      commit(ERootMutation.SetLoading, false);
    } catch (e) {
      console.error(e);
      commit(ERootMutation.SetLoaded, false);
      commit(ERootMutation.SetLoading, false);
    }
  },
};
