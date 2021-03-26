import { Service } from "@/api/service";
import { EWeekday } from "@/types/weekday";
import { ActionTree } from "vuex";
import { ERootAction, ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";
import { io } from "socket.io-client";

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
      const socket = io("http://localhost:3000");
      socket.emit("UPDATE_QUEUE");
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
      const socket = io("http://localhost:3000");
      socket.emit("UPDATE_QUEUE");
    } catch (e) {
      console.error("Could not remove place", e);
    }
  },
  async [ERootAction.LoadQueues]({ commit, state }) {
    commit(ERootMutation.SetLoaded, false);
    commit(ERootMutation.SetLoading, true);
    try {
      const { queues, bookingsLeft } = await Service.fetchQueues(state.email);
      commit(ERootMutation.SetBookingsLeft, bookingsLeft);
      commit(ERootMutation.SetQueues, queues);
      commit(ERootMutation.SetLoaded, true);
      commit(ERootMutation.SetLoading, false);
    } catch (e) {
      console.error("Could not load queues", e);
      commit(ERootMutation.SetLoaded, false);
      commit(ERootMutation.SetLoading, false);
    }
  },
  async [ERootAction.UpdateQueues]({ commit, state }) {
    try {
      const { queues, bookingsLeft } = await Service.fetchQueues(state.email);
      commit(ERootMutation.SetBookingsLeft, bookingsLeft);
      commit(ERootMutation.SetQueues, queues);
    } catch (e) {
      console.error("Could not update queues", e);
    }
  },
};
