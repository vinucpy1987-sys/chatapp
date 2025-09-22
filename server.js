const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serve frontend

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", (roomKey) => {
    socket.join(roomKey);
    console.log(`User joined room: ${roomKey}`);
  });

  socket.on("chat message", ({ roomKey, msg }) => {
    io.to(roomKey).emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
