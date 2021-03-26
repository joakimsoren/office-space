import { Queue } from "../interfaces/queue.interface";
import { DynamoDB } from "aws-sdk";
import { Weekday } from "../enums/weekday.enum";

export class DynamoDBService {
  private readonly tableName: string =
    "queue";
  private readonly attendeesLimit: number = 5;
  private readonly attendeesMaxBookings: number = 2;

  private readonly client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient(
      {
        endpoint:
          process.env
            .LOCALSTACK_ENDPOINT,
      }
    );
  }

  async getQueues(): Promise<Queue[]> {
    const {
      Items,
    }: DynamoDB.DocumentClient.ScanOutput = await this.client
      .scan({
        TableName: this.tableName,
      })
      .promise();
    const queues: Queue[] = Items.map(
      ({
        weekday,
        attendees,
        limit,
      }: DynamoDB.DocumentClient.AttributeMap) => ({
        weekday: <Weekday>weekday,
        attendees: attendees
          ? <string[]>attendees
          : [],
        limit: limit
          ? <number>limit
          : this.attendeesLimit,
      })
    );

    return queues;
  }

  async addToQueue(
    weekday: Weekday,
    email: string
  ): Promise<Queue[]> {
    const {
      attendees,
    }: Queue = await this.getQueue(
      weekday
    );

    if (attendees.includes(email)) {
      throw new Error(
        "Email already exists in queue"
      );
    }

    const newAttendees = [
      ...attendees,
      email,
    ];

    await this.updateQueue(
      weekday,
      newAttendees
    );

    return this.getQueues();
  }

  async removeFromQueue(
    weekday: Weekday,
    email: string
  ): Promise<Queue[]> {
    const {
      attendees,
    }: Queue = await this.getQueue(
      weekday
    );

    const newAttendees = attendees.filter(
      (attendee: string) =>
        attendee !== email
    );

    await this.updateQueue(
      weekday,
      newAttendees
    );

    return this.getQueues();
  }

  private async updateQueue(
    weekday: Weekday,
    attendees: string[]
  ) {
    await this.client
      .update({
        TableName: this.tableName,
        Key: {
          weekday: weekday,
        },
        UpdateExpression:
          "set attendees = :attendees",
        ExpressionAttributeValues: {
          ":attendees": attendees,
        },
      })
      .promise();
  }

  private async getQueue(
    weekday: Weekday
  ): Promise<Queue> {
    const queues: Queue[] = await this.getQueues();

    return queues.find(
      (queue: Queue) =>
        queue.weekday === weekday
    );
  }

  async getBookingsLeft(
    email: string
  ): Promise<number> {
    const bookedQueueAttendees: string[][] = (
      await this.getQueues()
    ).map(({ attendees }: Queue) => {
      if (
        attendees.length <=
        this.attendeesLimit
      )
        return attendees;

      return attendees.slice(
        0,
        this.attendeesLimit
      );
    });

    let availableSlots: number = this
      .attendeesMaxBookings;

    bookedQueueAttendees.forEach(
      (attendees: string[]) => {
        if (attendees.includes(email))
          availableSlots--;
      }
    );
    return availableSlots;
  }
}
