import { PostQueuesBody } from "../interfaces/post-queues-body.interface";
import { Queue } from "../interfaces/queue.interface";
// import { queues as queuesMock } from "../mocks/queues";
import { QueueService } from "../services/queue.service";

const router = require("express").Router();

const service: QueueService = new QueueService();

router.get(
  "/",
  async (req: any, res: any) => {
    const queues: Queue[] = await service.getAllQueues();
    res.send(queues);
  }
);

router.post(
  "/",
  async (req: any, res: any) => {
    const {
      weekday,
      email,
    }: PostQueuesBody = req.body;
    try {
      await service.addToQueue(
        weekday,
        email
      );
    } catch (error) {
      res.send({
        error: error.message,
      });
    }

    res.send({
      status: "WIP (Work in progress)",
    });
  }
);

module.exports = router;
