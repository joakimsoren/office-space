const QueueController = require("./controllers/queue.controller");
const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

app.use("/queues", QueueController);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
