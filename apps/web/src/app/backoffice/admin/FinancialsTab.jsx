import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { PLATFORM_MONTHLY } from "@/data/backofficeData";
import { ChartCard } from "./ChartCard";
import { Kpi } from "./Kpi";
import { Badge } from "./Badge";
import {
  ACCENT,
  PURPLE,
  GREEN,
  YELLOW,
  CARD,
  CHART_TOOLTIP,
  AXIS,
} from "./constants";

export function FinancialsTab({ settlements, onProcess, showToast }) {
  return (
    <>
      <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#FAF8F3" }}>
        Financial Settlements
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))",
          gap: "1rem",
        }}
      >
        <Kpi
          icon="💰"
          label="Total Settled Today"
          value="85.05M XAF"
          color={GREEN}
        />
        <Kpi
          icon="🏦"
          label="Commission Collected"
          value="2.45M XAF"
          color={PURPLE}
        />
        <Kpi
          icon="⏳"
          label="Pending Settlement"
          value="3.1M XAF"
          color={YELLOW}
        />
        <Kpi
          icon="📅"
          label="Monthly Commissions"
          value="13.08M XAF"
          delta="+22%"
          color={ACCENT}
        />
      </div>
      <ChartCard
        title="Commission Revenue Growth"
        subtitle="Monthly commissions earned — last 12 months"
        height={220}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={PLATFORM_MONTHLY}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(245,241,232,.05)"
            />
            <XAxis
              dataKey="month"
              tick={AXIS}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={AXIS}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v / 1000000).toFixed(0) + "M"}
            />
            <Tooltip
              {...CHART_TOOLTIP}
              formatter={(v) => [
                (v / 1000000).toFixed(2) + " M XAF",
                "Commission",
              ]}
            />
            <Line
              type="monotone"
              dataKey="commission"
              stroke={PURPLE}
              strokeWidth={2.5}
              dot={{ fill: PURPLE, r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
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
            Settlement Register
          </span>
          <button
            onClick={() =>
              showToast("📄 Settlement register exported to CSV", "info")
            }
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: "rgba(245,241,232,.5)",
              background: "rgba(245,241,232,.05)",
              border: "1px solid rgba(245,241,232,.09)",
              borderRadius: "999px",
              padding: ".28rem .75rem",
              cursor: "pointer",
            }}
          >
            📄 Export All
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {[
                  "Ref",
                  "Agency",
                  "Gross",
                  "Commission",
                  "Net Paid",
                  "Method",
                  "Date",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: ".6rem 1rem",
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
              {settlements.map((s) => (
                <tr
                  key={s.id}
                  style={{ borderBottom: "1px solid rgba(245,241,232,.04)" }}
                >
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".75rem",
                      color: ACCENT,
                    }}
                  >
                    {s.id}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".82rem",
                      color: "#FAF8F3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.agency}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      color: "rgba(245,241,232,.6)",
                    }}
                  >
                    {s.amount.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      color: PURPLE,
                    }}
                  >
                    {s.commission.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 900,
                      fontSize: ".82rem",
                      color: GREEN,
                    }}
                  >
                    {s.net.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".73rem",
                      color: "rgba(245,241,232,.48)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.method}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".72rem",
                      color: "rgba(245,241,232,.38)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.date}
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={s.status} />
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    {s.status === "Pending" && (
                      <button
                        onClick={() => onProcess(s.id)}
                        style={{
                          background: "rgba(74,222,128,.1)",
                          border: "1px solid rgba(74,222,128,.25)",
                          color: GREEN,
                          borderRadius: "999px",
                          padding: ".22rem .65rem",
                          fontWeight: 700,
                          fontSize: ".67rem",
                          cursor: "pointer",
                        }}
                      >
                        Process Now
                      </button>
                    )}
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
