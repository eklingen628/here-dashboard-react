import type { UserData } from "../App";

export default function User_Table(props: {
  userData: UserData[];
  setSelectedUser: (id: string) => void;
}) {
  const columns = [
    { key: "user_id", label: "ID" },
    { key: "readiness", label: "Readiness Score" },
    { key: "efficiency", label: "Sleep Score" },
    { key: "stress", label: "Stress Score" },
    { key: "calories", label: "Calories" },
    { key: "steps", label: "Steps" },
    { key: "morning", label: "Morning (6AM-noon)" },
    { key: "afternoon", label: "Afternoon (noon-4PM)" },
    { key: "evening", label: "Evening (4PM-10PM)" },
    { key: "night", label: "Night (10PM-6AM)" },
  ];

  {
    /* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  ID
</th>
<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
  Last Sync
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Max Time Gap
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Total Time Gap
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Morning (6AM-noon)
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Afternoon (noon-4PM)
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Evening (4PM-10PM)
</th>
<th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
  Night (10PM-6AM)
</th> */
  }

  return (
    <>
      <div className="container-fluid py-2"></div>
      <div className="row">
        {/* <div className="ms-3">
            <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
            <p className="mb-4">
             
            </p>
          </div> */}

        <div className="row mb-4">
          <div className="col-lg-12 col-md-12 mb-md-0 mb-4">
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-12 col-7">
                    <h6>User Time Gap Summary</h6>
                    <p className="text-sm mb-0">
                      <i
                        className="fa fa-check text-info"
                        aria-hidden="true"
                      ></i>
                      <span className="font-weight-bold ms-1">Time Gap</span> is
                      the amount of time data is unreported for a particular
                      user
                    </p>
                    <p className="text-sm mb-0">
                      Click on an ID for detailed information about a particular
                      user
                    </p>
                  </div>
                  <div className="col-lg-6 col-5 my-auto text-end">
                    <div className="dropdown float-lg-end pe-4">
                      <a
                        className="cursor-pointer"
                        id="dropdownTable"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-ellipsis-v text-secondary"></i>
                      </a>
                      <ul
                        className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                        aria-labelledby="dropdownTable"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            Action
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            Another action
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    {/* <thead>
    <tr>
      <th rowSpan={2}>ID</th>
      <th rowSpan={2}>Readiness Score</th>
      <th rowSpan={2}>Sleep Score</th>
      <th rowSpan={2}>Stress Score</th>
      <th rowSpan={2}>Calories</th>
      <th rowSpan={2}>Steps</th>
      <th colSpan={4} style={{ textAlign: "center" }}>%Worn</th>
    </tr>
    <tr>
      {[
        { key: "morning", label: "Morning (6AM-Noon)" },
        { key: "afternoon", label: "Afternoon (Noon-4PM)" },
        { key: "evening", label: "Evening (4PM-10PM)" },
        { key: "night", label: "Night (10PM-6AM)" },
      ].map((col) => (
        <th
          key={col.key}
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            fontSize: "0.8rem",
            padding: "0.25rem",
            width: "80px",
          }}
        >
          {col.label}
        </th>
      ))}
    </tr>
  </thead> */}

                    <thead>
                      <tr>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "60px",
                          }}
                        >
                          ID
                        </th>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "100px",
                          }}
                        >
                          Readiness Score
                        </th>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "100px",
                          }}
                        >
                          Sleep Score
                        </th>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "100px",
                          }}
                        >
                          Stress Score
                        </th>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "80px",
                          }}
                        >
                          Calories
                        </th>
                        <th
                          rowSpan={2}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem",
                            width: "80px",
                          }}
                        >
                          Steps
                        </th>
                        <th
                          colSpan={4}
                          style={{ textAlign: "center", fontSize: "0.8rem" }}
                        >
                          %Worn
                        </th>
                      </tr>
                      <tr>
                        {[
                          {
                            key: "morning",
                            label: "Morning",
                            sub: "(6AM–Noon)",
                          },
                          {
                            key: "afternoon",
                            label: "Afternoon",
                            sub: "(Noon–4PM)",
                          },
                          {
                            key: "evening",
                            label: "Evening",
                            sub: "(4PM–10PM)",
                          },
                          { key: "night", label: "Night", sub: "(10PM–6AM)" },
                        ].map((col) => (
                          <th
                            key={col.key}
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.25rem",
                              width: "80px",
                              textAlign: "center",
                              lineHeight: "1.2",
                            }}
                          >
                            {col.label}
                            <div style={{ fontSize: "0.7rem", color: "#555" }}>
                              {col.sub}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {props.userData.map((u) => {
                        return (
                          <tr>
                            <td>
                            <button
                              style={{ all: "unset", cursor: "pointer", color: "blue" }}
                              onClick={() => props.setSelectedUser(u.user_id)}
                            >

                                {u.user_id}
                              </button>
                            </td>
                            <td>{u.daily_readiness}</td>
                            <td>{u.efficiency}</td>
                            <td>{u.stressscore}</td>
                            <td>{u.calories_out}</td>
                            <td>{u.steps}</td>
                            <td>{u.pct_morning}</td>
                            <td>{u.pct_afternoon}</td>
                            <td>{u.pct_evening}</td>
                            <td>{u.pct_night}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
