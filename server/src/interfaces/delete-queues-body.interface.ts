import { Weekday } from "../enums/weekday.enum";

export interface DeleteQueuesBody {
  email: string;
  weekday: Weekday;
}
