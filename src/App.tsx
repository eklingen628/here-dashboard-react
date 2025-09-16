import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Dashboard token={token} />;


}

export default App;
