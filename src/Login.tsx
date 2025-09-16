// src/Login.tsx
import { useState } from "react";

export default function Login({ setToken }: { setToken: (t: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign In</h2>
  
        {/* Username */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label
            htmlFor="username"
            style={{
              fontSize: "1rem",
              color: "#333",
              marginBottom: 0,
            }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
            }}
          />
        </div>
  
        {/* Password */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label
            htmlFor="password"
            style={{
              fontSize: "1rem",
              color: "#333",
              marginBottom: 0,
            }}
          >
            Password
          </label>
  
          <div style={{ position: "relative", width: "100%" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "0.5rem 3rem 0.5rem 0.75rem", // space for Show/Hide
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
  
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#007bff",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
  
        {/* Submit */}
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
