import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(form.email, form.password);
    } else {
      register(form.username, form.email, form.password);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-200">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 border border-white/40">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back 👋" : "Please Create an Account ✨"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition duration-300">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          className="mt-6 w-full text-sm text-purple-700 hover:underline transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
