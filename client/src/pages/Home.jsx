import { useState, useContext } from "react";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">
      {/* Main Chat Container */}
      <div className="flex flex-col w-[95%] max-w-6xl h-[90%] bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        
        {/* Top Bar with App Name */}
        <div className="flex items-center justify-between px-6 py-3 border-b-2 border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow">
            💬 CHAT SPHERE
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">
              {user.username}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Chat Content (Sidebar + ChatBox) */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-1/4 border-r-2 border-gray-200 p-4 flex flex-col bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Users
            </h2>
            <UserList onSelect={setSelectedUser} />
          </div>

          {/* ChatBox */}
          <div className="flex-1 bg-white border-l border-gray-100">
            <ChatBox selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
