import { Service } from "@/api/service";
import { IQueue } from "@/types/queue";
import { EWeekday } from "@/types/weekday";
import { ActionTree } from "vuex";
import { ERootAction, ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";

export const actions: ActionTree<IRootState, any> = {
  [ERootAction.SetEmail]({ commit }, email) {
    commit(ERootMutation.SetEmail, email);
  },
  async [ERootAction.TakePlace]({ commit, state }, weekday: EWeekday) {
    try {
      const { queues, bookingsLeft } = await Service.takePlace({
        email: state.email,
        weekday,
      });
      commit(ERootMutation.SetBookingsLeft, bookingsLeft);
      commit(ERootMutation.SetQueues, queues);
    } catch (e) {
      console.error("Could not take place", e);
    }
  },
  async [ERootAction.RemovePlace]({ commit, state }, weekday: EWeekday) {
    try {
      const { queues, bookingsLeft } = await Service.removePlace({
        email: state.email,
        weekday,
      });
      commit(ERootMutation.SetBookingsLeft, bookingsLeft);
      commit(ERootMutation.SetQueues, queues);
    } catch (e) {
      console.error("Could not remove place", e);
    }
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
      console.error("Could not load queues", e);
      commit(ERootMutation.SetLoaded, false);
      commit(ERootMutation.SetLoading, false);
    }
  },
};
