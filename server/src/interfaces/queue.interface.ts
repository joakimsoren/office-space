import { Weekday } from "../enums/weekday.enum";

export interface Queue {
  weekday: Weekday;
  attendees: string[];
  limit: number;
}
