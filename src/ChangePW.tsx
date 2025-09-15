// src/ChangePW.tsx
import { useState } from "react";

type ChangePWProps = {
  setPWView: React.Dispatch<React.SetStateAction<"dashboard" | "changepw">>;
}

export default function ChangePW({setPWView}: ChangePWProps) {
  const [oldpw, setOldpw] = useState("");
  const [newpw1, setNewpw1] = useState("");
  const [newpw2, setNewpw2] = useState("");
  const [message, setMessage] = useState("");

  const MIN_LEN = 12;
  const MAX_LEN = 64;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (newpw1.length < MIN_LEN || newpw1.length > MAX_LEN) {
      setMessage(`Password must be between ${MIN_LEN} and ${MAX_LEN} characters`);
      return;
    }
    if (newpw1 !== newpw2) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // adjust if you store it differently
      const res = await fetch("/api/changepw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldpw, newpw1, newpw2 }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage(err.error || "Error changing password");
      } else {
        setMessage("Password changed successfully");
        setOldpw("");
        setNewpw1("");
        setNewpw2("");
      }
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldpw}
          onChange={(e) => setOldpw(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          minLength={MIN_LEN}
          maxLength={MAX_LEN}
          value={newpw1}
          onChange={(e) => setNewpw1(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <input
          type="password"
          placeholder="Re-Enter New Password"
          required
          minLength={MIN_LEN}
          maxLength={MAX_LEN}
          value={newpw2}
          onChange={(e) => setNewpw2(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "30px",
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
          Change Password
        </button>

        {message && (
          <p style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
            {message}
          </p>
        )}


<button
  type="button"
  onClick={() => setPWView("dashboard")}
  style={{
    padding: "0.6rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    background: "#6c757d", // gray
    color: "white",
    cursor: "pointer",
  }}
>
  Back
</button>
      </form>
    </div>
  );
}
