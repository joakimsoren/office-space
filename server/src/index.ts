const QueueController = require("./controllers/queue.controller");
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

const http = require("http").Server(
  app
);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");

  socket.on(
    "UPDATE_QUEUE",
    (..._args: any[]) => {
      io.emit("QUEUE_UPDATE");
    }
  );
});

app.use(cors());

// parse various different custom JSON types as JSON
app.use(
  bodyParser.json({
    type: "application/json",
  })
);

const port = 3000;

app.use("/queues", QueueController);

http.listen(port, () => {
  console.log(
    `Server listening: http://localhost:${port}`
  );
});
