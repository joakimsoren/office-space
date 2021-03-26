import { IQueue } from "@/types/queue";
import { MutationTree } from "vuex";
import { ERootMutation } from "./root.constants";
import { IRootState } from "./root.types";

export const mutations: MutationTree<IRootState> = {
  [ERootMutation.SetEmail](state: IRootState, email: string) {
    state.email = email;
  },
  [ERootMutation.SetQueues](state: IRootState, queues: IQueue[]) {
    state.queues = queues;
  },
  [ERootMutation.SetLoading](state: IRootState, loading: boolean) {
    state.loading = loading;
  },
  [ERootMutation.SetLoaded](state: IRootState, loaded: boolean) {
    state.loaded = loaded;
  },
  [ERootMutation.SetBookingsLeft](state: IRootState, bookingsLeft: number) {
    state.bookingsLeft = bookingsLeft;
  },
};
