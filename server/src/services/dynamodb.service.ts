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

    return this.sortQueues(queues);
  }

  private sortQueues(
    queues: Queue[]
  ): Queue[] {
    return queues.sort(
      (queueA: Queue, queueB: Queue) =>
        this.compareQueues(
          queueA,
          queueB
        )
    );
  }

  private compareQueues(
    queueA: Queue,
    queueB: Queue
  ): number {
    if (
      this.getQueueValue(queueA) <
      this.getQueueValue(queueB)
    )
      return -1;
    if (
      this.getQueueValue(queueA) ===
      this.getQueueValue(queueB)
    )
      return 0;

    if (
      this.getQueueValue(queueA) >
      this.getQueueValue(queueB)
    )
      return 1;
  }

  private getQueueValue(
    queue: Queue
  ): number {
    switch (queue.weekday) {
      case Weekday.Monday:
        return 0;
      case Weekday.Tuesday:
        return 1;
      case Weekday.Wednesday:
        return 2;
      case Weekday.Thursday:
        return 3;
      case Weekday.Friday:
        return 4;
      case Weekday.Saturday:
        return 5;
      case Weekday.Sunday:
        return 6;
    }
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

  async removeGreedyAttendees() {
    const queues: Queue[] = await this.getQueues();
    const potentialGreedyAttendees: string[] = this.getPotentialGreedyAttendees(
      queues
    );

    await this.removePotentialGreedyAttendeesFromWaitningList(
      potentialGreedyAttendees,
      queues
    );
  }

  private getPotentialGreedyAttendees(
    queues: Queue[]
  ): string[] {
    const bookedAttendees: string[] = queues
      .map(({ attendees }: Queue) => {
        if (
          attendees.length <=
          this.attendeesLimit
        )
          return attendees;

        return attendees.slice(
          0,
          this.attendeesLimit
        );
      })
      .reduce(
        (
          acc: string[],
          curr: string[]
        ) => {
          return [...acc, ...curr];
        },
        []
      );

    return bookedAttendees.filter(
      (attendee: string) => {
        return (
          this.arrayContainsAmount(
            bookedAttendees,
            attendee
          ) >= 2
        );
      }
    );
  }

  private arrayContainsAmount(
    array: string[],
    value: string
  ): number {
    let count: number = 0;

    array.forEach((entry: string) => {
      if (entry === value) count++;
    });

    return count;
  }

  private async removePotentialGreedyAttendeesFromWaitningList(
    potentialGreedyAttendees: string[],
    queues: Queue[]
  ): Promise<void> {
    await Promise.all(
      queues.map(
        async (queue: Queue) => {
          let bookedAttendees: string[] = [];
          let waitningAttendees: string[] = [];

          if (
            queue.attendees.length <=
            this.attendeesLimit
          ) {
            bookedAttendees =
              queue.attendees;
          } else {
            bookedAttendees = queue.attendees.slice(
              0,
              this.attendeesLimit
            );
            waitningAttendees = queue.attendees.slice(
              this.attendeesLimit,
              queue.attendees.length
            );
          }

          waitningAttendees = waitningAttendees.filter(
            (attendee: string) =>
              !potentialGreedyAttendees.includes(
                attendee
              )
          );

          await this.updateQueue(
            queue.weekday,
            [
              ...bookedAttendees,
              ...waitningAttendees,
            ]
          );
        }
      )
    );
  }
}
