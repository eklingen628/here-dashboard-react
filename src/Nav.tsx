import type { UserData, ViewMode } from "./Dashboard";
import { useState, useRef, useEffect } from "react";

type NavBarProps = {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  shiftDate: (date: string, days: number) => string;
  date: string;
  selectedUser: string;
  setSelectedUser: (id: string) => void;
  userDailyData: UserData[];
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  setPWView: React.Dispatch<React.SetStateAction<"dashboard" | "changepw">>;
};

export default function NavBar({
  setDate,
  shiftDate,
  date,
  selectedUser,
  setSelectedUser,
  userDailyData,
  viewMode,
  setViewMode,
  setPWView,
}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.reload(); // goes back to <Login />
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "white",
        borderBottom: "1px solid #ccc",
        zIndex: 1000,
        padding: "0.75rem 1rem",
      }}
    >

      
<div
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  }}
>
        {/* Left: Title */}
        <h4 style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
    Here-Dashboard
  </h4>

        {/* Center: Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* View selector */}
          <select
            value={viewMode}
            onChange={(e) =>
              setViewMode(e.target.value as ViewMode)
            }
            style={{
              backgroundColor: "#4a6fa5",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              padding: "0.35rem 2rem 0.35rem 0.75rem",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "12px",
              cursor: "pointer",
            }}
          >
            <option value="Daily">Daily</option>
            <option value="Aggregate - Steps">Aggregate - Steps</option>
            <option value="Aggregate - HRV">Aggregate - HRV</option>
            <option value="Aggregate - Sleep">Aggregate - Sleep</option>
            <option value="Aggregate - %Worn">Aggregate - %Worn</option>
            <option value="File List">File List</option>

          </select>

          {viewMode === "Daily" && (
            <>
              {/* User selector */}
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{
                  backgroundColor: "#5c8d89",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  padding: "0.35rem 2rem 0.35rem 0.75rem",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "12px",
                  cursor: "pointer",
                }}
              >
                {userDailyData.map((u) => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.user_id}
                  </option>
                ))}
              </select>













              {/* Back / Date / Forward cluster */}






              <div
  style={{
    display: "inline-flex",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    alignItems: "center",
  }}
>
  <button
    onClick={() => setDate((prev) => shiftDate(prev, -1))}
    style={{
      padding: "0.4rem 1.25rem",
      border: "none",
      background: "#f5f5f5",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#e6e6e6")}
    onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
  >
    ◀
  </button>

  <input
    type="date"
    value={date}
    onChange={(e) => {
      const val = e.target.value
      if (val === "") {
        const defaultDate = new Date(Date.now() - 86400000).toLocaleDateString("en-CA")
        setDate(defaultDate)
      }
      else {
        setDate(val)

      }
    
      
      
      }}
    style={{
      width: "162px",
      border: "none",
      padding: "0.4rem 0.75rem",
      textAlign: "center",
      outline: "none",
      background: "white",
      fontWeight: "bold",
      minWidth: "130px",
    }}
  />

  <button
    onClick={() => setDate((prev) => shiftDate(prev, 1))}
    style={{
      padding: "0.4rem 1.25rem",
      border: "none",
      background: "#f5f5f5",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#e6e6e6")}
    onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
  >
    ▶
  </button>
</div>












            </>
          )}
        </div>

        {/* Right: Profile */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #c0c0c0",
              borderRadius: "6px",
              background: "#e0e0e0",
              color: "#333",
              cursor: "pointer",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.filter = "brightness(95%)")
            }
            onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
          >
            Profile ▾
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "#ffffff",
                border: "1px solid #c0c0c0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                minWidth: "160px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={handleSignOut}
                style={{
                  padding: "0.75rem 1rem",
                  border: "none",
                  background: "transparent",
                  color: "#333",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  borderRadius: "6px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f0f0f0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Sign Out
              </button>

              <button
                onClick={() => setPWView("changepw")}
                style={{
                  padding: "0.75rem 1rem",
                  border: "none",
                  background: "transparent",
                  color: "#333",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  borderRadius: "6px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f0f0f0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
