const QueueController = require("./controllers/queue.controller");

const express = require("express");
const app = express();
const port = 3000;

app.use("/queues", QueueController);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
