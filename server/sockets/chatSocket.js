const onlineUsers = new Map();

export default function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    // Save user when they login
    socket.on("userOnline", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys())); // broadcast list
    });

    // Private message
    socket.on("sendMessage", ({ sender, receiver, content }) => {
      const receiverSocket = onlineUsers.get(receiver);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", { sender, content });
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}
