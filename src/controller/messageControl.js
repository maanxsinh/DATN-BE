const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const messageControl = () => {
  app.use(cors());

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.REACT_APP_PORT,
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
      console.log(`User ${socket.id} join room ${room}`);
    });

    socket.on("send_message", (message) => {
      console.log(message);
      io.to(message.room).emit("receive_message", message);
    });
  });
};

module.exports = {
  messageControl: messageControl,
};
