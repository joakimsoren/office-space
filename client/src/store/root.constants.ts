import { IRootState } from "./root.types";

export const state: IRootState = {
  email: "",
  queues: [],
};

export enum ERootAction {
  SetEmail = "setEmail",
}

export enum ERootMutation {
  SetEmail = "setEmail",
}
