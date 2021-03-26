import { IQueue } from "@/types/queue";

export interface IRootState {
  email: string;
  queues: IQueue[];
}
