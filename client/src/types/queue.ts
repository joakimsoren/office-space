import { EWeekday } from "./weekday";

export interface IQueue {
  weekday: EWeekday;
  attendees: string[];
  limit: number;
}
