type PivotedRow = {
  date_queried: string;
  [userId: string]: number | string | null;
};

type AggTableProps = {
  data: PivotedRow[];
  title: string;
};

export default function Aggregate_Table({ data, title }: AggTableProps) {
  if (!data.length) return <p>No data</p>;

  // // take all keys except date
  const users = Object.keys(data[0]).filter((k) => k !== "date_queried");

  // const devUserIds = [
  //   "TEST01",
  //   "TEST02",
  //   "TEST03",
  //   "TEST04",
  //   "TEST05",
  //   "TEST06",
  //   "TEST07",
  //   "TEST08",
  //   "TEST09",
  //   "TEST10",
  //   "TEST11",
  //   "TEST12",
  //   "TEST13",
  //   "TEST14",
  //   "TEST15",
  //   "TEST16",
  //   "TEST17",
  //   "TEST18",
  //   "TEST19",
  //   "TEST20",
  // ];
  // const users = [
  //   ...new Set([
  //     ...Object.keys(data[0]).filter((k) => k !== "date_queried"),
  //     ...devUserIds,
  //   ]),
  // ];

  return (
    <>
      <h4>{title}</h4>

      <div
        style={{
          overflow: "auto", // ✅ only scrolls if needed
          maxWidth: "90vw", // ✅ fits viewport width
          maxHeight: "70vh", // ✅ fits viewport height
          margin: "0 auto", // ✅ centers
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%", // ✅ table stretches naturally
            marginTop: "1rem",
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  position: "sticky",
                  top: 0,
                }}
              >
                Date
              </th>
              {users.map((u) => (
                <th
                  key={u}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  {u}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.date_queried}>
                <td
                  style={{
                    padding: "6px",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                    position: "sticky",
                    left: 0,
                    background: "white", // ✅ keep it readable on top of scroll
                    zIndex: 1,
                  }}
                >
                  {new Date(row.date_queried).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                {users.map((u) => (
                  <td
                    key={u}
                    style={{
                      padding: "6px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {row[u] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
