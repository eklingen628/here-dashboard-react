import type { UserData } from "../App";

export default function User_Table(props: {
  userData: UserData[];
  setSelectedUser: (id: string) => void;
}) {
  const problemNum = 50;
  const warnNum = 90;
  const problemColor = "red";
  const warnColor = "#ff8c00";

  const colorize = (val: number) =>
    val < problemNum ? problemColor : val < warnNum ? warnColor : "inherit";

  // Non-% columns (span 2 header rows)
  const metricCols: { key: keyof UserData; label: string; width?: string }[] = [
    { key: "user_id", label: "ID", width: "60px" },
    { key: "daily_readiness", label: "Readiness Score" },
    { key: "efficiency", label: "Sleep Score", width: "100px" },
    { key: "stressscore", label: "Stress Score", width: "100px" },
    { key: "calories_out", label: "Calories", width: "80px" },
    { key: "steps", label: "Steps", width: "80px" },
  ] as const;

  // %Worn columns (second header row)
  const wornCols: {
    key: keyof UserData;
    label: string;
    sub: string;
    width?: string;
  }[] = [
    { key: "pct_morning", label: "Morning", sub: "(6AM–Noon)", width: "80px" },
    { key: "pct_afternoon", label: "Afternoon", sub: "(Noon–6PM)", width: "80px" },
    { key: "pct_evening", label: "Evening", sub: "(6PM–12AM)", width: "80px" },
    { key: "pct_night", label: "Night", sub: "(12AM–6AM)", width: "80px" },
  ] as const;

  const renderMetricCell = (u: UserData, key: keyof UserData) => {
    if (key === "user_id") {
      return (
        <button
          style={{
            all: "unset",
            cursor: "pointer",
            color: "blue",
            fontSize: "0.8rem",
          }}
          onClick={() => props.setSelectedUser(u.user_id as unknown as string)}
        >
          {u.user_id as unknown as string}
        </button>
      );
    }
    return u[key] as React.ReactNode;
  };

  return (
    <div className="row mb-4">
      <div className="col-lg-12 col-md-12 mb-md-0 mb-4">
        <div className="card">
          <div className="card-header pb-0">
            <h6>User Data Summary</h6>
            <p className="text-sm mb-0">Click an ID below for more details.</p>
          </div>

          <div className="card-body px-0 pb-2">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    {metricCols.map((c) => (
                      <th
                        key={String(c.key)}
                        rowSpan={2}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.25rem",
                          width: c.width,
                          whiteSpace: "normal",
                          lineHeight: 1.1,
                        }}
                      >
                        {c.label}
                      </th>
                    ))}

                    {/* Grouped %Worn header with legend */}
                    <th
                      colSpan={wornCols.length}
                      style={{ textAlign: "center", fontSize: "0.8rem" }}
                    >
                      %Worn
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "1rem",
                          marginTop: "0.25rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        <span
                          style={{ color: problemColor }}
                        >{`< ${problemNum}`}</span>
                        <span
                          style={{ color: warnColor }}
                        >{`< ${warnNum}`}</span>
                      </div>
                    </th>
                  </tr>

                  <tr>
                    {wornCols.map((c) => (
                      <th
                        key={String(c.key)}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.25rem",
                          width: c.width,
                          textAlign: "center",
                          lineHeight: "1.2",
                        }}
                      >
                        {c.label}
                        <div style={{ fontSize: "0.7rem", color: "#555" }}>
                          {c.sub}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {props.userData.map((u) => (
                    <tr key={String(u.user_id)}>
                      {metricCols.map((c) => (
                        <td key={String(c.key)}
                            style={{ fontSize: "0.8rem" }}
                        >
                          {renderMetricCell(u, c.key)}
                        </td>
                      ))}

                      {wornCols.map((c) => {
                        const v = u[c.key] as unknown as number;
                        return (
                          <td
                            key={String(c.key)}
                            style={{ color: colorize(v), textAlign: "center", fontSize: "0.8rem" }}
                          >
                            {v ?? 0}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
