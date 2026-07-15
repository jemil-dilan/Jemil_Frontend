import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  PLATFORM_MONTHLY,
  PLATFORM_WEEK,
  PAYMENT_MIX,
  AGENCIES,
  ROUTE_PERF,
} from "@/data/backofficeData";
import { ChartCard } from "./ChartCard";
import { Kpi } from "./Kpi";
import {
  ACCENT,
  PURPLE,
  GREEN,
  BLUE,
  YELLOW,
  MONO,
  CHART_TOOLTIP,
  AXIS,
} from "./constants";

export function AnalyticsTab({ analyticsRange, setAnalyticsRange }) {
  const chartData = analyticsRange === "12m" ? PLATFORM_MONTHLY : PLATFORM_WEEK;

  return (
    <>
      {/* Range toggle */}
      <div style={{ display: "flex", gap: ".5rem" }}>
        {[
          ["12m", "12 Months"],
          ["7d", "This Week"],
        ].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setAnalyticsRange(v)}
            style={{
              fontWeight: 700,
              fontSize: ".72rem",
              color: analyticsRange === v ? "#FAF8F3" : "rgba(245,241,232,.38)",
              background:
                analyticsRange === v
                  ? "rgba(232,93,4,.18)"
                  : "rgba(245,241,232,.04)",
              border: `1.5px solid ${analyticsRange === v ? "rgba(232,93,4,.38)" : "rgba(245,241,232,.08)"}`,
              borderRadius: "999px",
              padding: ".38rem .9rem",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))",
          gap: "1rem",
        }}
      >
        <Kpi
          icon="💰"
          label="Platform GMV (Jun)"
          value="436M XAF"
          delta="-2% vs May"
          color={ACCENT}
        />
        <Kpi
          icon="🏦"
          label="Commission (Jun)"
          value="13.08M XAF"
          delta="-2%"
          color={PURPLE}
        />
        <Kpi
          icon="🎫"
          label="Total Tickets (Jun)"
          value="9,490"
          delta="+18%"
          color={GREEN}
        />
        <Kpi
          icon="🏢"
          label="Active Agencies"
          value="6"
          delta="+1"
          color={BLUE}
        />
        <Kpi
          icon="👤"
          label="New Users (Jun)"
          value="+620"
          delta="+35%"
          color={YELLOW}
        />
      </div>

      {/* GMV + Commission stacked area */}
      <ChartCard
        title="Platform Revenue Growth"
        subtitle={
          analyticsRange === "12m"
            ? "Monthly GMV & commission — last 12 months"
            : "Daily GMV — this week"
        }
        height={280}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACCENT} stopOpacity={0.3} />
                <stop offset="95%" stopColor={ACCENT} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="comGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PURPLE} stopOpacity={0.3} />
                <stop offset="95%" stopColor={PURPLE} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(245,241,232,.05)"
            />
            <XAxis
              dataKey={analyticsRange === "12m" ? "month" : "day"}
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
              formatter={(v, n) =>
                n === "gmv"
                  ? [(v / 1000000).toFixed(1) + " M XAF", "GMV"]
                  : n === "commission"
                    ? [(v / 1000000).toFixed(2) + " M XAF", "Commission"]
                    : [(v / 1000000).toFixed(2) + " M XAF", "GMV"]
              }
            />
            <Area
              type="monotone"
              dataKey={analyticsRange === "12m" ? "gmv" : "gmv"}
              stroke={ACCENT}
              strokeWidth={2.5}
              fill="url(#gmvGrad)"
              dot={false}
              activeDot={{ r: 5 }}
            />
            {analyticsRange === "12m" && (
              <Area
                type="monotone"
                dataKey="commission"
                stroke={PURPLE}
                strokeWidth={2}
                fill="url(#comGrad)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
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
        {/* Ticket volume bar */}
        <ChartCard
          title="Ticket Volume"
          subtitle="Daily — this week"
          height={240}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={PLATFORM_WEEK}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(245,241,232,.05)"
              />
              <XAxis
                dataKey="day"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={AXIS} axisLine={false} tickLine={false} />
              <Tooltip
                {...CHART_TOOLTIP}
                formatter={(v) => [v.toLocaleString(), "Tickets"]}
              />
              <Bar dataKey="tickets" radius={[4, 4, 0, 0]}>
                {PLATFORM_WEEK.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 5 ? ACCENT : "rgba(232,93,4,.45)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Payment mix platform-wide */}
        <ChartCard
          title="Payment Methods"
          subtitle="Platform-wide share"
          height={240}
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
                      fontSize: ".67rem",
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

      {/* Agency GMV comparison bar chart */}
      <ChartCard
        title="Agency GMV Comparison"
        subtitle="Total revenue per agency — all time"
        height={240}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={AGENCIES.filter((a) => a.status !== "Suspended").map((a) => ({
              name: a.name.split(" ")[0],
              gmv: a.gmv,
            }))}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(245,241,232,.05)"
            />
            <XAxis
              dataKey="name"
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
              formatter={(v) => [(v / 1000000).toFixed(1) + " M XAF", "GMV"]}
            />
            <Bar dataKey="gmv" radius={[4, 4, 0, 0]} fill={ACCENT} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Route performance */}
      <ChartCard
        title="Top Routes — Platform Occupancy"
        subtitle="Last 30 days"
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
              tick={AXIS}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v + "%"}
              domain={[0, 100]}
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
    </>
  );
}
