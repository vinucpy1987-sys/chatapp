const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve files from "public" folder
app.use(express.static("public"));

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
