// src/Login.tsx
import { useState } from "react";

export default function Login({ setToken }: { setToken: (t: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      setMessage("Invalid credentials");
    }
  }

  return (
<div
  style={{
    display: "flex",

  }}
>
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.6rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Log In
        </button>

        {message && (
          <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
