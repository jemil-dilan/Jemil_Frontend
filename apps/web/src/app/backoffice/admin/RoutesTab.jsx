import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ROUTE_PERF } from "@/data/backofficeData";
import { ChartCard } from "./ChartCard";
import { ACCENT, GREEN, YELLOW, CARD, CHART_TOOLTIP, AXIS } from "./constants";

export function RoutesTab({ showToast }) {
  return (
    <>
      <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#FAF8F3" }}>
        Route Management
      </h2>
      <ChartCard
        title="Occupancy by Route"
        subtitle="Last 30 days — all agencies combined"
        height={200}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ROUTE_PERF}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(245,241,232,.05)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={AXIS}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => v + "%"}
            />
            <YAxis
              type="category"
              dataKey="route"
              tick={AXIS}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            <Tooltip
              {...CHART_TOOLTIP}
              formatter={(v) => [v + "%", "Occupancy"]}
            />
            <Bar dataKey="occupancy" radius={[0, 4, 4, 0]}>
              {ROUTE_PERF.map((r, i) => (
                <Cell
                  key={i}
                  fill={
                    r.occupancy >= 90
                      ? "#F87171"
                      : r.occupancy >= 70
                        ? YELLOW
                        : GREEN
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <div
        style={{
          background: CARD,
          borderRadius: "1.1rem",
          border: "1px solid rgba(245,241,232,.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: ".9rem 1.4rem",
            borderBottom: "1px solid rgba(245,241,232,.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontWeight: 900, fontSize: ".95rem", color: "#FAF8F3" }}
          >
            Route Performance
          </span>
          <button
            onClick={() => showToast("➕ Route creation form opened", "info")}
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: ACCENT,
              background: "rgba(232,93,4,.1)",
              border: "1px solid rgba(232,93,4,.22)",
              borderRadius: "999px",
              padding: ".28rem .75rem",
              cursor: "pointer",
            }}
          >
            + Add Route
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {[
                  "Route",
                  "Total Tickets",
                  "Revenue",
                  "Occupancy",
                  "Trend",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: ".6rem 1.25rem",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: ".57rem",
                      color: "rgba(245,241,232,.28)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUTE_PERF.map((r) => (
                <tr
                  key={r.route}
                  style={{ borderBottom: "1px solid rgba(245,241,232,.04)" }}
                >
                  <td
                    style={{
                      padding: ".8rem 1.25rem",
                      fontWeight: 800,
                      fontSize: ".9rem",
                      color: "#FAF8F3",
                    }}
                  >
                    {r.route}
                  </td>
                  <td
                    style={{
                      padding: ".8rem 1.25rem",
                      fontWeight: 700,
                      fontSize: ".85rem",
                      color: "rgba(245,241,232,.65)",
                    }}
                  >
                    {r.tickets.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".8rem 1.25rem",
                      fontWeight: 900,
                      fontSize: ".88rem",
                      color: GREEN,
                    }}
                  >
                    {r.revenue.toLocaleString()} XAF
                  </td>
                  <td style={{ padding: ".8rem 1.25rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".75rem",
                      }}
                    >
                      <div
                        style={{
                          height: 5,
                          width: 90,
                          background: "rgba(245,241,232,.07)",
                          borderRadius: 999,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: r.occupancy + "%",
                            background:
                              r.occupancy >= 90
                                ? "#F87171"
                                : r.occupancy >= 70
                                  ? YELLOW
                                  : GREEN,
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: ".78rem",
                          color:
                            r.occupancy >= 90
                              ? "#F87171"
                              : r.occupancy >= 70
                                ? YELLOW
                                : GREEN,
                        }}
                      >
                        {r.occupancy}%
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: ".8rem 1.25rem",
                      fontWeight: 700,
                      fontSize: ".85rem",
                      color: r.trend.startsWith("+") ? GREEN : "#F87171",
                    }}
                  >
                    {r.trend}
                  </td>
                  <td style={{ padding: ".8rem 1.25rem" }}>
                    <div style={{ display: "flex", gap: ".4rem" }}>
                      <button
                        onClick={() =>
                          showToast(`✏️ Editing route ${r.route}`, "info")
                        }
                        style={{
                          fontWeight: 700,
                          fontSize: ".65rem",
                          color: "rgba(245,241,232,.5)",
                          background: "rgba(245,241,232,.04)",
                          border: "1px solid rgba(245,241,232,.08)",
                          borderRadius: "999px",
                          padding: ".2rem .6rem",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          showToast(`⊘ Route ${r.route} disabled`, "warning")
                        }
                        style={{
                          fontWeight: 700,
                          fontSize: ".65rem",
                          color: "#F87171",
                          background: "rgba(239,68,68,.06)",
                          border: "1px solid rgba(239,68,68,.16)",
                          borderRadius: "999px",
                          padding: ".2rem .6rem",
                          cursor: "pointer",
                        }}
                      >
                        Disable
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
