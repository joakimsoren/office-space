import { IQueue } from "@/types/queue";
import { ITakePlace } from "@/types/take-place";

export class Service {
  static path = "http://localhost:3000/";

  static fetchQueues(): Promise<IQueue[]> {
    return fetch(`${Service.path}queues`)
      .then((response) => response.json())
      .then((responseJSON) => responseJSON as IQueue[]);
  }

  static takePlace(body: ITakePlace): Promise<IQueue[]> {
    return fetch(`${Service.path}queues/attendees`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJSON) => responseJSON as IQueue[]);
  }

  static removePlace(body: ITakePlace): Promise<IQueue[]> {
    return fetch(`${Service.path}queues/attendees`, {
      method: "DELETE",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJSON) => responseJSON as IQueue[]);
  }
}
