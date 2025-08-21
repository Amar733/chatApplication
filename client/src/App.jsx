import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";

function App() {
  const { user } = useContext(AuthContext);
  return <>{user ? <Home /> : <AuthPage />}</>;
}

export default App;
