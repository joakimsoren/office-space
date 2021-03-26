import { IRootState } from "./root.types";

export const state: IRootState = {
  email: "",
  queues: [],
  loading: false,
  loaded: false,
  bookingsLeft: 2,
};

export enum ERootAction {
  SetEmail = "setEmail",
  LoadQueues = "loadQueues",
  TakePlace = "takePlace",
  RemovePlace = "removePlace",
  Logout = "logout",
  UpdateQueues = "updateQueues",
}

export enum ERootMutation {
  SetEmail = "setEmail",
  SetQueues = "setQueues",
  SetLoading = "setLoading",
  SetLoaded = "setLoaded",
  SetState = "setState",
  SetBookingsLeft = "setBookingsLeft",
}
