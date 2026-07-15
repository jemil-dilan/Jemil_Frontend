import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AGENCY_MONTHLY,
  AGENCY_WEEK,
  ROUTE_PERF,
  PAYMENT_MIX,
} from "@/data/backofficeData";
import { ACCENT, CHART_TOOLTIP, AXIS_STYLE, CARD, MONO } from "./constants";
import { Kpi } from "./Kpi";
import { ChartCard } from "./ChartCard";
import { useLang } from "@/utils/lang";

export function AnalyticsTab({ analyticsRange, setAnalyticsRange }) {
  const { t } = useLang();
  const chartData = analyticsRange === "12m" ? AGENCY_MONTHLY : AGENCY_WEEK;

  const rangeOptions = [
    ["12m", t.bo_months_12],
    ["7d", t.bo_week_7],
  ];
  const tableHeaders = [
    t.bo_col_route,
    t.bo_col_tickets,
    t.bo_col_revenue,
    t.bo_col_occ,
    t.bo_col_trend,
  ];
  const payoutCards = [
    {
      label: t.bo_last_payout,
      value: "28,450,000 XAF",
      sub: "Today at 06:00 · MTN Money",
      c: "#4ADE80",
    },
    {
      label: t.bo_pending,
      value: "3,210,000 XAF",
      sub: "Processes in ~2h",
      c: "#FBBF24",
    },
    {
      label: t.bo_commission_ded,
      value: "943,950 XAF",
      sub: "3% JEMIL fee this month",
      c: "#A78BFA",
    },
    {
      label: t.bo_net_month,
      value: "121,638,000 XAF",
      sub: "After all commissions",
      c: "#4ADE80",
    },
  ];

  return (
    <>
      {/* Range selector */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
        {rangeOptions.map(([v, l]) => (
          <button
            key={v}
            onClick={() => setAnalyticsRange(v)}
            style={{
              fontWeight: 700,
              fontSize: ".72rem",
              color: analyticsRange === v ? "#FAF8F3" : "rgba(245,241,232,.4)",
              background:
                analyticsRange === v
                  ? "rgba(232,93,4,.18)"
                  : "rgba(245,241,232,.05)",
              border: `1.5px solid ${analyticsRange === v ? "rgba(232,93,4,.4)" : "rgba(245,241,232,.1)"}`,
              borderRadius: "999px",
              padding: ".38rem .9rem",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
        <span
          style={{
            fontWeight: 600,
            fontSize: ".7rem",
            color: "rgba(245,241,232,.25)",
            marginLeft: ".5rem",
          }}
        >
          {t.bo_auto_refresh}
        </span>
      </div>

      {/* Summary KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))",
          gap: "1rem",
        }}
      >
        <Kpi
          icon="💰"
          label={t.bo_monthly_revenue}
          value="125.4M XAF"
          delta="+22%"
          color="#4ADE80"
        />
        <Kpi
          icon="🎫"
          label={t.bo_tickets_month}
          value="2,734"
          delta="+18%"
          color={ACCENT}
        />
        <Kpi
          icon="💺"
          label={t.bo_avg_occ}
          value="83%"
          delta="+5pts"
          color="#FBBF24"
        />
        <Kpi
          icon="🏦"
          label={t.bo_commission}
          value="3.76M XAF"
          color="#A78BFA"
        />
        <Kpi
          icon="↩️"
          label={t.bo_refund_rate}
          value="1.8%"
          delta="-0.4%"
          color="#4ADE80"
        />
      </div>

      {/* Revenue & Tickets trend */}
      <ChartCard
        title={t.bo_rev_ticket}
        subtitle={
          analyticsRange === "12m"
            ? `${t.bo_monthly_trend} — last 12 months`
            : `Daily trend — this week`
        }
        height={260}
        action={
          <span
            style={{ fontWeight: 700, fontSize: ".7rem", color: "#4ADE80" }}
          >
            ↑ 22% vs last period
          </span>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACCENT} stopOpacity={0.3} />
                <stop offset="95%" stopColor={ACCENT} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="tickG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(245,241,232,.05)"
            />
            <XAxis
              dataKey={analyticsRange === "12m" ? "month" : "day"}
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="rev"
              orientation="right"
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v / 1000000).toFixed(0) + "M"}
            />
            <YAxis
              yAxisId="tic"
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              {...CHART_TOOLTIP}
              formatter={(v, n) =>
                n === "revenue"
                  ? [(v / 1000000).toFixed(2) + " M XAF", "Revenue"]
                  : [v.toLocaleString(), "Tickets"]
              }
            />
            <Area
              yAxisId="rev"
              type="monotone"
              dataKey="revenue"
              stroke={ACCENT}
              strokeWidth={2.5}
              fill="url(#revG)"
              dot={false}
              activeDot={{ r: 5, fill: ACCENT }}
            />
            <Area
              yAxisId="tic"
              type="monotone"
              dataKey="tickets"
              stroke="#4ADE80"
              strokeWidth={2}
              fill="url(#tickG)"
              dot={false}
              activeDot={{ r: 4, fill: "#4ADE80" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}
      >
        <ChartCard
          title={t.bo_occ_rate}
          subtitle={t.bo_monthly_trend}
          height={220}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={AGENCY_MONTHLY}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(245,241,232,.05)"
              />
              <XAxis
                dataKey="month"
                tick={AXIS_STYLE}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={AXIS_STYLE}
                axisLine={false}
                tickLine={false}
                domain={[60, 100]}
                tickFormatter={(v) => v + "%"}
              />
              <Tooltip
                {...CHART_TOOLTIP}
                formatter={(v) => [v + "%", "Occupancy"]}
              />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#FBBF24"
                strokeWidth={2.5}
                dot={{ fill: "#FBBF24", r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title={t.bo_payment_methods}
          subtitle={t.bo_rev_share}
          height={220}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PAYMENT_MIX}
                cx="40%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {PAYMENT_MIX.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Pie>
              <Tooltip
                {...CHART_TOOLTIP}
                formatter={(v) => [v + "%", "Share"]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span
                    style={{
                      ...MONO,
                      fontSize: ".68rem",
                      color: "rgba(245,241,232,.6)",
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

      <ChartCard
        title={t.bo_route_perf}
        subtitle={t.bo_tickets_per_route}
        height={220}
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
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="route"
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              {...CHART_TOOLTIP}
              formatter={(v) => [v.toLocaleString(), "Tickets"]}
            />
            <Bar dataKey="tickets" radius={[0, 4, 4, 0]} fill={ACCENT} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Route detail table */}
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
          }}
        >
          <span
            style={{ fontWeight: 900, fontSize: ".95rem", color: "#FAF8F3" }}
          >
            {t.bo_route_profit}
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {tableHeaders.map((h) => (
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
                      fontSize: ".88rem",
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
                      color: "#4ADE80",
                    }}
                  >
                    {r.revenue.toLocaleString()}
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
                                  ? "#FBBF24"
                                  : "#4ADE80",
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
                                ? "#FBBF24"
                                : "#4ADE80",
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
                      color: r.trend.startsWith("+") ? "#4ADE80" : "#F87171",
                    }}
                  >
                    {r.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
        }}
      >
        {payoutCards.map((p) => (
          <div
            key={p.label}
            style={{
              background: CARD,
              border: "1px solid rgba(245,241,232,.07)",
              borderRadius: "1.1rem",
              padding: "1.1rem 1.25rem",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: ".58rem",
                color: "rgba(245,241,232,.3)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".3rem",
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "1.1rem",
                color: p.c,
                lineHeight: 1.1,
              }}
            >
              {p.value}
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: ".62rem",
                color: "rgba(245,241,232,.28)",
                marginTop: ".2rem",
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
