import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";

import "chartjs-adapter-date-fns";
import type { GraphData } from "../App";

ChartJS.register(CategoryScale, LinearScale, BarElement, TimeScale, Tooltip, Legend);

type ChartProps = { graphData: GraphData; yLabel?: string };

// --- Helper: normalize stage names ---
function formatStage(stage: string) {
  const s = stage.toLowerCase();
  if (s === "wake") return "Wake";
  if (s === "rem") return "REM";
  if (s === "light") return "Light";
  if (s === "deep") return "Deep";
  return stage;
}

// --- Helper: stage → color ---
function stageColor(stage: string) {
  if (stage === "Wake") return "#f4a261";   // orange
  if (stage === "REM") return "#43aa8b";    // teal-green
  if (stage === "Light") return "#9d4edd";  // purple
  if (stage === "Deep") return "#277da1";   // blue
  return "#ccc";                            // fallback grey
}

export default function SleepChart({ graphData, yLabel }: ChartProps) {
  const sleepData = graphData.sleep || [];

  // Consistent y-axis order
  const stages = ["Wake", "REM", "Light", "Deep"];

  const data = {
    datasets: [
      {
        label: "Sleep Stages",
        data: sleepData.map((d) => ({
          y: formatStage(d.stage),
          x: [Date.parse(d.start_time), Date.parse(d.end_time)],
        })),
        backgroundColor: (ctx: any) => stageColor(ctx.raw?.y),
        borderSkipped: false,
        borderRadius: 3,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "hour" as const },
        title: { display: false },
      },
      y: {
        type: "category" as const,
        labels: stages,
        title: { display: true, text: yLabel || "Sleep Stage" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const [s, e] = ctx.raw.x as [number, number];
            const start = new Date(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const end = new Date(e).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const mins = (e - s) / 60000;
            return `${ctx.raw.y} • ${mins.toFixed(1)} min (${start} → ${end})`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
