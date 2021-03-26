import { IQueue } from "@/types/queue";
import { ITakePlace } from "@/types/take-place";

export class Service {
  static path = "http://localhost:3000/";

  static fetchQueues(
    email: string
  ): Promise<{ queues: IQueue[]; bookingsLeft: number }> {
    return fetch(`${Service.path}queues?email${email}`)
      .then((response) => response.json())
      .then(
        (responseJSON) =>
          responseJSON as { queues: IQueue[]; bookingsLeft: number }
      );
  }

  static takePlace(
    body: ITakePlace
  ): Promise<{ queues: IQueue[]; bookingsLeft: number }> {
    return fetch(`${Service.path}queues/attendees`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (responseJSON) =>
          responseJSON as { queues: IQueue[]; bookingsLeft: number }
      );
  }

  static removePlace(
    body: ITakePlace
  ): Promise<{ queues: IQueue[]; bookingsLeft: number }> {
    return fetch(`${Service.path}queues/attendees`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (responseJSON) =>
          responseJSON as { queues: IQueue[]; bookingsLeft: number }
      );
  }
}
