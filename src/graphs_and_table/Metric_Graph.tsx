import type { GraphData } from "../App";
import HeartRateChart from "./HeartRateChart";
import StepsChart from "./StepsChart";
import SleepChart from "./SleepChart";

type MetricGraphProps = {
  graphData: GraphData;
  yLabel: string; // optional, for axis
  type: "heart" | "sleep" | "steps";
};

export default function Metric_Graph({
  graphData,
  yLabel,
  type,
}: MetricGraphProps) {
  let chart;
  let title;

  if (type === "heart") {
    chart = <HeartRateChart graphData={graphData} yLabel={yLabel} />;
    title = "Heart Rate";
  }

  if (type === "steps") {
    chart = <StepsChart graphData={graphData} yLabel={yLabel} />;
    title = "Steps";
  }

  if (type === "sleep") {
    chart = <SleepChart graphData={graphData} yLabel={yLabel} />;
    title = "Sleep";
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 mt-4 mb-4">
          <div className="card " style={{padding: 25}}>
            <div
              className="card-body"
              style={{ width: "100%", height: "350px" }}
            >
              <h6>
                {title} for User {graphData.user_id}
              </h6>
              <div className="chart" style={{ width: "100%", height: "100%" }}>
                {chart}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
