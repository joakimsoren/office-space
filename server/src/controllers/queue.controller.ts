import { queues as queuesMock } from "../mocks/queues";

const router = require("express").Router();

router.get(
  "/",
  (req: any, res: any) => {
    res.send(queuesMock);
  }
);

module.exports = router;
