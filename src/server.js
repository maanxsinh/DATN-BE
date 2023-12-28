const viewEngine = require("./config/viewEngine.js");
const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./route/web.js");
const connectDb = require("./config/connectDb.js");
// const initAPIRouter = require("./route/api.js");
var cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

let app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: process.env.REACT_APP_PORT,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on("disconnect", () => {
    console.log("USER DISCONNECT:", socket.id);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    socket.conversationId = room;
    console.log(`User ${socket.id} join room ${socket.conversationId}`);
  });

  socket.on("leave_room", () => {
    socket.leave(socket.conversationId);
    console.log(`User ${socket.id} leave room ${socket.conversationId}`);
  });

  socket.on("send_message", (dataSend) => {
    console.log("send message", dataSend);
    io.to(dataSend.conversationId).emit("receive_message", dataSend);
    // socket.resetAndDestroy();
  });
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

// initAPIRouter();

connectDb();

let port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("SERVER RUNNING", process.env.PORT);
});

// app.listen(port, () => {
//   console.log("SERVER RUNNING", process.env.PORT);
// });
