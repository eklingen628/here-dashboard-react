import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";

import "chartjs-adapter-date-fns";
import type { GraphData } from "../Dashboard";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
);

type ChartProps = { graphData: GraphData; yLabel?: string };


export default function HeartRateChart({ graphData, yLabel }: ChartProps) {
  // samples = [{ time: "2025-09-12T06:00:00Z", bpm: 65 }, ...]

  const xMin = `${graphData.date_queried}T00:00:00`
  const xMax = `${graphData.date_queried}T23:59:59`

  if (graphData) {
    const data = {
      datasets: [
        {
          label: yLabel,
          data: graphData.heart.map((d) => ({
            x: new Date(`${graphData.date_queried}T${d.time}`),
            y: d.value,
          })),
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 3,
          pointHoverRadius: 6,
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: "time" as const, // 👈 literal type, not just string
          time: { unit: "hour" as const },
          min: xMin,
          max: xMax
        },
        y: {
          title: { display: true, text: yLabel},
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
    };

    return <Line data={data} options={options} />;
  }
}
