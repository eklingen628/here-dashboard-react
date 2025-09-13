import type { GraphData } from "../App";
import HeartRateChart from "./HeartRateChart";
import StepsChart from "./StepsChart";


type MetricGraphProps = {
  graphData: GraphData;
  yLabel: string;     // optional, for axis
  type: "heart" | "sleep" | "steps";
};






export default function Metric_Graph({ graphData, yLabel, type }: MetricGraphProps) {
  let chart;
  let title;

  if (type === "heart") {
    chart = <HeartRateChart graphData={graphData} yLabel={yLabel} />;
    title = "Heart Rate"
  }

  if (type === "steps") {
    chart = <StepsChart graphData={graphData} yLabel={yLabel} />;
    title = "Steps"
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 mt-4 mb-4">
          <div className="card ">
            <div className="card-body">
              {/* <h6 className="mb-0 "> Heart Rate for User <?php echo $_GET['uid']; ?> */}
              <h6>{title} for User {graphData.user_id}</h6>

              <div className="pe-2">
                <div className="chart">
                  {chart}
                </div>
              </div>

              <hr className="dark horizontal" />
              <div className="d-flex ">
                <i className="material-symbols-rounded text-sm my-auto me-1">
                  schedule
                </i>
                <p className="mb-0 text-sm" id="heart_update">
                  {" "}
                  updated 4 min ago{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
