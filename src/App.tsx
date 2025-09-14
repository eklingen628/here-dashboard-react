import { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./Nav";
import User_Table from "./graphs_and_table/User_Table";
import Metric_Graph from "./graphs_and_table/Metric_Graph";
import Aggregate_Table from "./graphs_and_table/agg_tables/Aggregate_Table";




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






// raw from DB
type AggHRV = { date_queried: string; user_id: string; daily_rmssd: number | null };
type AggSteps = { date_queried: string; user_id: string; steps: number | null };
type AggSleep = { date_queried: string; user_id: string; efficiency: number | null };
type AggWorn  = { date_queried: string; user_id: string; worn: number | null };

// what the API returns
type AggData = {
  HRV: AggHRV[];
  steps: AggSteps[];
  sleep: AggSleep[];
  worn: AggWorn[];
};



type AggPivoted = {
  HRV: PivotedRow[];
  steps: PivotedRow[];
  sleep: PivotedRow[];
  worn: PivotedRow[];
};





export type PivotedRow = {
  date_queried: string;
  [userId: string]: number | null | string;
};



// function pivotAgg<T extends { date_queried: string; user_id: string }>(
//   data: (T & Record<string, any>)[]
// ) {
//   const users = [...new Set(data.map(r => r.user_id))];
//   const dates = [...new Set(data.map(r => r.date_queried))];

//   return dates.map(date => {
//     const row: Record<string, any> = { date_queried: date };
//     users.forEach(u => {
//       row[u] = data.find(r => r.date_queried === date && r.user_id === u) ?? null;
//     });
//     return row;
//   });
// }





function pivotAgg<T extends { date_queried: string; user_id: string }>(
  data: (T & Record<string, any>)[]
): PivotedRow[] {
  if (!data.length) return [];

  // find the metric column (not date_queried or user_id)
  const metricKey = Object.keys(data[0]).find(
    k => k !== "date_queried" && k !== "user_id"
  )!;

  const users = [...new Set(data.map(r => r.user_id))];
  const dates = [...new Set(data.map(r => r.date_queried))];

  return dates.map(date => {
    const row: PivotedRow = { date_queried: date };
    users.forEach(u => {
      row[u] = data.find(r => r.date_queried === date && r.user_id === u)?.[metricKey] ?? null;
    });
    return row;
  });
}











function App() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const [date, setDate] = useState(
    new Date(Date.now() - 86400000).toLocaleDateString("en-CA"),
  );

  const [userDailyData, setuserDailyData] = useState<UserData[] | []>([]);

  const [graphData, setGraphData] = useState<GraphData>({
    user_id: "",
    date_queried: "",
    heart: [],
    steps: [],
    sleep: [],
  });

  const [viewMode, setViewMode] = useState<
  | "Daily"
  | "Aggregate - Steps"
  | "Aggregate - HRV"
  | "Aggregate - Sleep"
  | "Aggregate - %Worn"
>("Daily");


const [aggregateData, setAggregateData] = useState<AggPivoted>({
  HRV: [],
  steps: [],
  sleep: [],
  worn: [],
});



const [aggregateLoaded, setAggregateLoaded] = useState(false);


useEffect(() => {
  if (viewMode === "Daily") {
    setAggregateLoaded(false); // reset when leaving aggregates
    return;
  }

  if (!aggregateLoaded) {
    fetch("/api/aggregate")
      .then((res) => res.json())
      .then((rows: AggData) => {
        
        setAggregateData({
          HRV:   pivotAgg(rows?.HRV   ?? []),
          steps: pivotAgg(rows?.steps ?? []),
          sleep: pivotAgg(rows?.sleep ?? []),
          worn:  pivotAgg(rows?.worn  ?? []),
        });
        setAggregateLoaded(true);
      });
  }
}, [viewMode]);


  useEffect(() => {
    fetch(`/api/users?date=${date}`)
      .then((res) => res.json())
      .then((rows) => {
        setuserDailyData(rows);

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
        userDailyData={userDailyData}
        viewMode={viewMode}
        setViewMode={setViewMode}

      />


<main
  style={{
    marginTop: "60px",
    padding: "0 1rem",
    boxSizing: "border-box",
  }}
>
  {viewMode === "Daily" && (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* Left side: user table */}
      <div
        style={{
          flex: "1 1 600px",
          minWidth: "400px",
          maxWidth: "800px",
        }}
      >
        <User_Table userData={userDailyData} setSelectedUser={setSelectedUser} />
      </div>

      {/* Right side: graphs */}
      <div
        style={{
          flex: "2 1 600px",
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Metric_Graph graphData={graphData} type="heart" yLabel="BPM" />
        <Metric_Graph graphData={graphData} type="steps" yLabel="Steps" />
        <Metric_Graph graphData={graphData} type="sleep" yLabel="Sleep Stage" />
      </div>
    </div>
  )}
  
{viewMode === "Aggregate - HRV"     && <Aggregate_Table data={aggregateData.HRV} title="HRV Daily" />}
{viewMode === "Aggregate - Steps"   && <Aggregate_Table data={aggregateData.steps} title="Steps" />}
{viewMode === "Aggregate - Sleep"   && <Aggregate_Table data={aggregateData.sleep} title="Sleep Scores" />}
{viewMode === "Aggregate - %Worn"   && <Aggregate_Table data={aggregateData.worn} title="%Worn" />}


</main>


    </>
  );
}

export default App;
