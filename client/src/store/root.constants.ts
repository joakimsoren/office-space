import { IRootState } from "./root.types";

export const state: IRootState = {
  email: "",
  queues: [],
  loading: false,
  loaded: false,
};

export enum ERootAction {
  SetEmail = "setEmail",
  LoadQueues = "loadQueues",
}

export enum ERootMutation {
  SetEmail = "setEmail",
  SetQueues = "setQueues",
  SetLoading = "setLoading",
  SetLoaded = "setLoaded",
}
