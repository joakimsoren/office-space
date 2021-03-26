import { Weekday } from "../enums/weekday.enum";
import { Queue } from "../interfaces/queue.interface";
import { DynamoDBService } from "./dynamodb.service";

export class QueueService {
  private readonly dynamoService: DynamoDBService;

  constructor() {
    this.dynamoService = new DynamoDBService();
  }

  async getAllQueues(): Promise<
    Queue[]
  > {
    return this.dynamoService.getQueues();
  }

  async addToQueue(
    weekDay: Weekday,
    email: string
  ): Promise<Queue[]> {
    return this.dynamoService.addToQueue(
      weekDay,
      email
    );
  }

  async removeFromQueue(
    weekday: Weekday,
    email: string
  ): Promise<Queue[]> {
    return this.dynamoService.removeFromQueue(
      weekday,
      email
    );
  }
}
