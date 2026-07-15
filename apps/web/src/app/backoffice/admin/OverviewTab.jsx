import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PLATFORM_MONTHLY, AGENCIES } from "@/data/backofficeData";
import { ChartCard } from "./ChartCard";
import { Kpi } from "./Kpi";
import { Badge } from "./Badge";
import {
  ACCENT,
  PURPLE,
  GREEN,
  BLUE,
  YELLOW,
  CHART_TOOLTIP,
  AXIS,
} from "./constants";

export function OverviewTab({ setTab, totalGMV, totalCommission }) {
  return (
    <>
      {/* Platform KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1rem",
        }}
      >
        <Kpi
          icon="🏢"
          label="Partner Agencies"
          value="8"
          delta="+1 pending"
          color={BLUE}
        />
        <Kpi
          icon="🎫"
          label="Total Tickets (Jun)"
          value="9,490"
          delta="+18%"
          color={ACCENT}
        />
        <Kpi
          icon="💰"
          label="Platform GMV (Jun)"
          value={(totalGMV / 1000000).toFixed(0) + "M XAF"}
          delta="+22%"
          color={GREEN}
        />
        <Kpi
          icon="🏦"
          label="Commission Earned"
          value={(totalCommission / 1000000).toFixed(1) + "M XAF"}
          color={PURPLE}
        />
        <Kpi
          icon="👤"
          label="Registered Users"
          value="14,820"
          delta="+620"
          color={YELLOW}
        />
        <Kpi
          icon="⚠"
          label="Open Incidents"
          value="3"
          color="#F87171"
          sub="2 high priority"
        />
      </div>

      {/* Main chart + pie */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.25rem",
        }}
      >
        <ChartCard
          title="Platform GMV & Commission"
          subtitle="Monthly — June 2026 YTD"
          height={240}
          action={
            <span
              style={{
                fontWeight: 700,
                fontSize: ".7rem",
                color: GREEN,
              }}
            >
              ↑ 22% vs last month
            </span>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={PLATFORM_MONTHLY}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gmvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ACCENT} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={ACCENT} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="comG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PURPLE} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={PURPLE} stopOpacity={0.02} />
                </linearGradient>
              </defs>
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
                yAxisId="gmv"
                orientation="right"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v / 1000000).toFixed(0) + "M"}
              />
              <YAxis
                yAxisId="com"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v / 1000000).toFixed(1) + "M"}
              />
              <Tooltip
                {...CHART_TOOLTIP}
                formatter={(v, n) =>
                  n === "gmv"
                    ? [(v / 1000000).toFixed(1) + " M XAF", "Platform GMV"]
                    : [(v / 1000000).toFixed(2) + " M XAF", "Commission"]
                }
              />
              <Area
                yAxisId="gmv"
                type="monotone"
                dataKey="gmv"
                stroke={ACCENT}
                strokeWidth={2.5}
                fill="url(#gmvG)"
                dot={false}
                activeDot={{ r: 5, fill: ACCENT }}
              />
              <Line
                yAxisId="com"
                type="monotone"
                dataKey="commission"
                stroke={PURPLE}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: PURPLE }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Agency Status" subtitle="Distribution" height={240}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Active",
                    value: AGENCIES.filter((a) => a.status === "Active").length,
                  },
                  {
                    name: "Pending",
                    value: AGENCIES.filter((a) => a.status === "Pending")
                      .length,
                  },
                  {
                    name: "Trial",
                    value: AGENCIES.filter((a) => a.status === "Trial").length,
                  },
                  {
                    name: "Suspended",
                    value: AGENCIES.filter((a) => a.status === "Suspended")
                      .length,
                  },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {[GREEN, YELLOW, BLUE, "#F87171"].map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontSize: ".65rem",
                      color: "rgba(245,241,232,.55)",
                    }}
                  >
                    {v}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Agency leaderboard */}
      <div
        style={{
          background: "#111111",
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
            style={{
              fontWeight: 900,
              fontSize: ".95rem",
              color: "#FAF8F3",
            }}
          >
            Agency Leaderboard — This Month
          </span>
          <button
            onClick={() => setTab("agencies")}
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: ACCENT,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Manage all →
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(245,241,232,.06)",
                }}
              >
                {[
                  "#",
                  "Agency",
                  "City",
                  "Tickets",
                  "GMV (XAF)",
                  "Commission",
                  "Rating",
                  "Plan",
                  "Status",
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
              {AGENCIES.slice(0, 5).map((a, i) => (
                <tr
                  key={a.id}
                  style={{
                    borderBottom: "1px solid rgba(245,241,232,.04)",
                  }}
                >
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 900,
                      fontSize: ".85rem",
                      color:
                        i === 0
                          ? ACCENT
                          : i === 1
                            ? "#FBBF24"
                            : "rgba(245,241,232,.4)",
                    }}
                  >
                    #{i + 1}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".85rem",
                      color: "#FAF8F3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a.name}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".75rem",
                      color: "rgba(245,241,232,.5)",
                    }}
                  >
                    {a.city}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".82rem",
                      color: "rgba(245,241,232,.7)",
                    }}
                  >
                    {a.tickets.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 900,
                      fontSize: ".82rem",
                      color: GREEN,
                    }}
                  >
                    {(a.gmv / 1000000).toFixed(1)}M
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".82rem",
                      color: PURPLE,
                    }}
                  >
                    {((a.gmv * a.commission) / 100 / 1000000).toFixed(2)}M
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".82rem",
                      color: YELLOW,
                    }}
                  >
                    ⭐ {a.rating}
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={a.plan} />
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent settlements */}
      <div
        style={{
          background: "#111111",
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
            style={{
              fontWeight: 900,
              fontSize: ".95rem",
              color: "#FAF8F3",
            }}
          >
            Recent Settlements
          </span>
          <button
            onClick={() => setTab("financials")}
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: ACCENT,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View all →
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(245,241,232,.06)",
                }}
              >
                {[
                  "ID",
                  "Agency",
                  "Gross (XAF)",
                  "Commission",
                  "Net Paid",
                  "Method",
                  "Date",
                  "Status",
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
              {[
                {
                  id: "SET-1024",
                  agency: "Touristique Express",
                  amount: 28500000,
                  commission: 855000,
                  net: 27645000,
                  method: "MTN MoMo",
                  date: "Jun 5, 2026",
                  status: "Completed",
                },
                {
                  id: "SET-1023",
                  agency: "Musango Voyages",
                  amount: 19200000,
                  commission: 576000,
                  net: 18624000,
                  method: "Orange Money",
                  date: "Jun 5, 2026",
                  status: "Completed",
                },
                {
                  id: "SET-1022",
                  agency: "Centrale Voyage",
                  amount: 22100000,
                  commission: 663000,
                  net: 21437000,
                  method: "Bank Transfer",
                  date: "Jun 4, 2026",
                  status: "Completed",
                },
                {
                  id: "SET-1021",
                  agency: "Blue Bird Express",
                  amount: 15200000,
                  commission: 456000,
                  net: 14744000,
                  method: "MTN MoMo",
                  date: "Jun 4, 2026",
                  status: "Pending",
                },
              ]
                .slice(0, 4)
                .map((s) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: "1px solid rgba(245,241,232,.04)",
                    }}
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
                        color: "rgba(245,241,232,.65)",
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
                        fontSize: ".75rem",
                        color: "rgba(245,241,232,.5)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.method}
                    </td>
                    <td
                      style={{
                        padding: ".7rem 1rem",
                        fontWeight: 600,
                        fontSize: ".73rem",
                        color: "rgba(245,241,232,.4)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.date}
                    </td>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <Badge label={s.status} />
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
