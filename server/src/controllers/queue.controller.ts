import { DeleteQueuesBody } from "../interfaces/delete-queues-body.interface";
import { PostQueuesBody } from "../interfaces/post-queues-body.interface";
import { Queue } from "../interfaces/queue.interface";
// import { queues as queuesMock } from "../mocks/queues";
import { QueueService } from "../services/queue.service";

const router = require("express").Router();

const service: QueueService = new QueueService();

router.get(
  "/",
  async (req: any, res: any) => {
    const { email } = req.query;
    try {
      const queues: Queue[] = await service.getAllQueues();
      const bookingsLeft: number = await service.getBookingsLeft(
        email
      );
      res.send({
        queues,
        bookingsLeft,
      });
    } catch (error) {
      res.send({
        error: error.message,
      });
    }
  }
);

router.post(
  "/attendees",
  async (req: any, res: any) => {
    const {
      weekday,
      email,
    }: PostQueuesBody = req.body;
    try {
      const queues: Queue[] = await service.addToQueue(
        weekday,
        email
      );

      const bookingsLeft: number = await service.getBookingsLeft(
        email
      );

      res.send({
        queues,
        bookingsLeft,
      });
    } catch (error) {
      res.send({
        error: error.message,
      });
    }
  }
);

router.delete(
  "/attendees",
  async (req: any, res: any) => {
    const {
      weekday,
      email,
    }: DeleteQueuesBody = req.body;
    try {
      const queues: Queue[] = await service.removeFromQueue(
        weekday,
        email
      );

      const bookingsLeft: number = await service.getBookingsLeft(
        email
      );

      res.send({
        queues,
        bookingsLeft,
      });
    } catch (error) {
      res.send({
        error: error.message,
      });
    }
  }
);

module.exports = router;
