const QueueController = require("./controllers/queue.controller");
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());

// parse various different custom JSON types as JSON
app.use(
  bodyParser.json({
    type: "application/json",
  })
);

const port = 3000;

app.use("/queues", QueueController);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
