import { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./Nav";
import User_Table from "./graphs_and_table/User_Table";

import Metric_Graph from "./graphs_and_table/Metric_Graph";

export type UserData = {
  user_id: string;
  date_queried:	string;
  daily_readiness: number;
  efficiency: number;
  stressscore: number;
  calories_out: number;
  steps: number;
  pct_morning: number;
  pct_afternoon: number;
  pct_evening: number;
  pct_night: number;
};


export type GraphData = {
  user_id: string;
  date_queried: string;
  heart: Sample[];
  steps: Sample[];
}


type Sample = {
  time: string; // ISO timestamp
  value: number;
};





function App() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const [date, setDate] = useState(new Date(Date.now() - 86400000).toLocaleDateString("en-CA"));

  const [users, setUsers] = useState<UserData[] | []>([]);

  const [graphData, setGraphData] = useState<GraphData>({
    user_id: "",
    date_queried: "",
    heart: [],
    steps: []
  });

  useEffect(() => {
    fetch(`/api/users?date=${date}`)
      .then(res => res.json())
      .then(rows => {
        setUsers(rows);
  
        // only set first user on startup
        if (!selectedUser && rows.length > 0) {
          setSelectedUser(rows[0].user_id);
        }
      });
  }, [date]);
  


  // whenever selectedUser changes, pull that user’s graph data
  


  useEffect(() => {
    if (!selectedUser) return;
    fetch(`/api/user?id=${selectedUser}&date=${date}`)
      .then((res) => res.json())
      .then(setGraphData);
  }, [selectedUser, date]);





  // maybe pick this back up again
  // useEffect(() => {
  //   if (!selectedUser) return;
  //   fetch(`/api/user?id=${selectedUser}&date=${date}`)
  //     .then((res) => res.json())
  //     .then(setGraphs);
  // }, [selectedUser, date]);








  // const [users, setUsers] = useState<User[]>([])

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const loadUsers = async () => {
  //     try {
  //       const res = await fetch(`/api/users`, {
  //         signal: controller.signal,
  //       });
  //       const data = await res.json();
  //       console.log("Fetched data: ", data)
  //       setUsers(data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.error("User fetching error: ", err);
  //       }
  //     }
  //   };

  //   loadUsers();

  //   return () => controller.abort(); // cleanup if unmounted
  // }, []);

  function shiftDate(date: string, days: number) {
    const [y, m, d] = date.split("-").map(Number);
    const dt = new Date(y, m - 1, d); // local midnight
    dt.setDate(dt.getDate() + days);
    return dt.toISOString().slice(0, 10); // YYYY-MM-DD
  }
  

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          background: "white",
          borderBottom: "1px solid #ccc",
          zIndex: 1000,
        }}
      >
        <NavBar />

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
            }}
            onClick={() => setDate((prev) => shiftDate(prev, -1))}
          >
            Back
          </button>
          <span>{date}</span>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
            }}
            onClick={() => setDate((prev) => shiftDate(prev, 1))}
          >
            Forward
          </button>
        </div>
      </div>

      <main
        style={{ marginTop: "60px" }}
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
        <User_Table userData={users} setSelectedUser={setSelectedUser} />

        {/* <Sleep_Graph /> */}
        <Metric_Graph graphData={graphData} type="heart" yLabel="BPM"  />
        <Metric_Graph graphData={graphData} type="steps" yLabel="Steps"  />
      </main>
    </>
  );
}

export default App;
