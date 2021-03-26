import { Weekday } from "../enums/weekday.enum";

export interface PostQueuesBody {
  email: string;
  weekday: Weekday;
}
