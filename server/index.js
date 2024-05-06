const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const socket = require("socket.io");
const root = express();
require("dotenv").config();

root.use(cors());
root.use(express.json());
root.use("/api/auth", userRoutes);
root.use("/api/message", messageRoutes);
mongoose
  .connect(process.env.Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch(() => {
    console.log("could not connect to mongoose");
  });
const server = root.listen(process.env.PORT, () => {
  console.log(`Server Started on ${process.env.PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recive", data.message);
    }
  });
});
