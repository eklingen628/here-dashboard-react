import { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./Nav";
import User_Table from "./graphs_and_table/User_Table";

import Metric_Graph from "./graphs_and_table/Metric_Graph";

export type UserData = {
  user_id: string;
  date_queried: string;
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
  sleep: SleepStage[];
};

type Sample = {
  time: string; // ISO timestamp
  value: number;
};

type SleepStage = {
  stage: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
  duration_minutes: number;
};

function App() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const [date, setDate] = useState(
    new Date(Date.now() - 86400000).toLocaleDateString("en-CA"),
  );

  const [users, setUsers] = useState<UserData[] | []>([]);

  const [graphData, setGraphData] = useState<GraphData>({
    user_id: "",
    date_queried: "",
    heart: [],
    steps: [],
    sleep: [],
  });

  useEffect(() => {
    fetch(`/api/users?date=${date}`)
      .then((res) => res.json())
      .then((rows) => {
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

  function shiftDate(date: string, days: number) {
    const [y, m, d] = date.split("-").map(Number);
    const dt = new Date(y, m - 1, d); // local midnight
    dt.setDate(dt.getDate() + days);
    return dt.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  return (
    <>
      <NavBar
        setDate={setDate}
        shiftDate={shiftDate}
        date={date}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
      />


      <main
  style={{
    marginTop: "60px",
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    width: "100%",        // use container width, not viewport width
    maxWidth: "100%",
    padding: "0 1rem",
    boxSizing: "border-box",
  }}
>
  {/* Left side: user table */}
{/* Left side: user table */}
<div
  style={{
    flex: "1 1 0",        // grow and shrink equally
    minWidth: "400px",    // don’t collapse too narrow
    maxWidth: "50%",      // cap at half
  }}
>
  <User_Table userData={users} setSelectedUser={setSelectedUser} />
</div>

{/* Right side: graphs */}
<div
  style={{
    flex: "1 1 0",        // grow and shrink equally
    minWidth: "400px",    // same safety minimum
    maxWidth: "50%",      // cap at half
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  }}
>
  <Metric_Graph graphData={graphData} type="heart" yLabel="BPM" />
  <Metric_Graph graphData={graphData} type="steps" yLabel="Steps" />
  <Metric_Graph graphData={graphData} type="sleep" yLabel="Sleep Stage" />
</div>

</main>



    </>
  );
}

export default App;
