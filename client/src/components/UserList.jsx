import { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // saved after login/register

        const res = await axios.get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="w-1/4 border-r border-gray-300 p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => onSelect(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
