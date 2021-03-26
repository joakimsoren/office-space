import { IQueue } from "@/types/queue";

export class Service {
  static path = "http://localhost:3000/";

  static fetchQueues(): Promise<any> {
    return fetch(`${Service.path}queues`)
      .then((response) => response.json())
      .then((responseJSON) => responseJSON as IQueue[]);
  }
}
