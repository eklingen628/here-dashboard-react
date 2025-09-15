import type { UserData } from "./Dashboard";

type NavBarProps = {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  shiftDate: (date: string, days: number) => string;
  date: string;
  selectedUser: string;
  setSelectedUser: (id: string) => void;
  userDailyData: UserData[];
  viewMode:
    | "Daily"
    | "Aggregate - Steps"
    | "Aggregate - HRV"
    | "Aggregate - Sleep"
    | "Aggregate - %Worn";
  setViewMode: React.Dispatch<
    React.SetStateAction<
      | "Daily"
      | "Aggregate - Steps"
      | "Aggregate - HRV"
      | "Aggregate - Sleep"
      | "Aggregate - %Worn"
    >
  >;
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
}: NavBarProps) {


  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.reload(); // goes back to <Login />
  }


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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", // ✅ allow items to wrap on smaller screens
          rowGap: "0.75rem", // ✅ space between rows when wrapping
          columnGap: "2rem",
        }}
      >
        {/* Title */}
        <div style={{ marginRight: "clamp(1rem, 10vw, 5rem)" }}>
          <h4 style={{ margin: 0, fontWeight: "bold" }}>Here-Dashboard</h4>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Aggregate or Daily selector */}
          <select
            value={viewMode}
            onChange={(e) =>
              setViewMode(
                e.target.value as
                  | "Daily"
                  | "Aggregate - Steps"
                  | "Aggregate - HRV"
                  | "Aggregate - Sleep"
                  | "Aggregate - %Worn",
              )
            }
            style={{
              backgroundColor: "red",
              color: "white",
              border: "1px red",
              borderRadius: "12px",
              fontWeight: "bold",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              padding: "0.25rem 2rem 0.25rem 0.75rem",
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "25px",
              cursor: "pointer",
            }}
          >
            <option value="Daily">Daily</option>
            <option value="Aggregate - Steps">Aggregate - Steps</option>
            <option value="Aggregate - HRV">Aggregate - HRV</option>
            <option value="Aggregate - Sleep">Aggregate - Sleep</option>
            <option value="Aggregate - %Worn">Aggregate - %Worn</option>
          </select>

          {viewMode === "Daily" && (
            <>
              {/* User selector */}
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "1px solid #0056b3",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  padding: "0.25rem 2rem 0.25rem 0.75rem",
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "25px",
                  cursor: "pointer",
                }}
              >
                {userDailyData.map((u) => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.user_id}
                  </option>
                ))}
              </select>

              {/* Back button */}
              <button
                onClick={() => setDate((prev) => shiftDate(prev, -1))}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "1px solid #5a6268",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>

              {/* Date picker */}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />

              {/* Forward button */}
              <button
                onClick={() => setDate((prev) => shiftDate(prev, 1))}
                style={{
                  backgroundColor: "#17a2b8",
                  color: "white",
                  border: "1px solid #117a8b",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Forward
              </button>
            </>
          )}
        </div>
        <button
        onClick={handleSignOut}
        style={{
          padding: "0.4rem 0.8rem",
          border: "none",
          borderRadius: "4px",
          background: "#dc3545", // red
          color: "white",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
      </div>
    </nav>
  );
}
