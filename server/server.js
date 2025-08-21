import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import chatSocket from "./sockets/chatSocket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

chatSocket(io);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
