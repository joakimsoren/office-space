import { Weekday } from "../enums/weekday.enum";
import { Queue } from "../interfaces/queue.interface";

export const queues: Queue[] = [
  {
    weekday: Weekday.Monday,
    attendees: [
      "9medkacht@silentsuite.com",
      "mmaya@laldo.com",
      "mweique135k@mobv.site",
      "qfazymasoo@alamergaex.tk",
      "osemuab@darwinav.com",
    ],
    limit: 5,
  },
  {
    weekday: Weekday.Tuesday,
    attendees: [],
    limit: 5,
  },
  {
    weekday: Weekday.Wednesday,
    attendees: [
      "mweique135k@mobv.site",
    ],
    limit: 5,
  },
  {
    weekday: Weekday.Thursday,
    attendees: [],
    limit: 5,
  },
  {
    weekday: Weekday.Friday,
    attendees: [
      "9medkacht@silentsuite.com",
      "mmaya@laldo.com",
      "mweique135k@mobv.site",
    ],
    limit: 5,
  },
];
