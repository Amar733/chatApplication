import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

const ChatBox = ({ selectedUser }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      const { data } = await API.get("/chat/messages");
      const filtered = data.filter(
        (m) =>
          (m.sender._id === user._id && m.receiver._id === selectedUser._id) ||
          (m.sender._id === selectedUser._id && m.receiver._id === user._id)
      );
      setMessages(filtered);
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (msg) => {
      if (msg.sender === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [socket, selectedUser]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;

    const msg = { sender: user._id, receiver: selectedUser._id, content: input };
    socket.emit("sendMessage", msg);
    await API.post("/chat/send", { receiver: selectedUser._id, content: input });

    setMessages((prev) => [...prev, { sender: user, receiver: selectedUser, content: input }]);
    setInput("");
  };

  if (!selectedUser) return <div className="flex-1 flex items-center justify-center">Select a user</div>;

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h2 className="font-bold mb-2">Chat with {selectedUser.username}</h2>
      <div className="flex-1 border overflow-y-auto p-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender._id === user._id ? "text-right" : "text-left"}>
            <p><b>{m.sender.username || "You"}:</b> {m.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
