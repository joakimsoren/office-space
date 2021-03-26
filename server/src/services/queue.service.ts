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
  ): Promise<boolean> {
    await this.dynamoService.addToQueue(
      weekDay,
      email
    );
    return true;
  }
}
