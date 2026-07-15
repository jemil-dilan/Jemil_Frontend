import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DEPARTURES, AGENCY_WEEK } from "@/data/backofficeData";
import { ACCENT, CHART_TOOLTIP, AXIS_STYLE, CARD } from "./constants";
import { Kpi } from "./Kpi";
import { ChartCard } from "./ChartCard";
import { Badge } from "./Badge";
import { useLang } from "@/utils/lang";

export function OverviewTab({ setManifestDep, setTab }) {
  const { t } = useLang();
  const totalRevToday = DEPARTURES.reduce((s, d) => s + d.sold * d.price, 0);
  const totalTicketsToday = DEPARTURES.reduce((s, d) => s + d.sold, 0);

  const colHeaders = [
    t.bo_col_id,
    t.bo_col_route,
    t.bo_col_dep,
    t.bo_col_seats,
    t.bo_col_fill,
    t.bo_col_driver,
    t.bo_col_class,
    t.bo_col_status,
    t.bo_col_action,
  ];
  const pieData = [
    { name: t.bo_on_road, value: 8 },
    { name: t.bo_boarding, value: 3 },
    { name: t.bo_sold_out, value: 2 },
    { name: t.bo_available, value: 5 },
  ];

  return (
    <>
      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))",
          gap: "1rem",
        }}
      >
        <Kpi
          icon="🎫"
          label={t.bo_tickets_today}
          value={totalTicketsToday.toLocaleString()}
          delta="+18%"
          color={ACCENT}
        />
        <Kpi
          icon="💰"
          label={t.bo_revenue_today}
          value={(totalRevToday / 1000000).toFixed(1) + "M XAF"}
          delta="+22%"
          color="#4ADE80"
        />
        <Kpi icon="🚌" label={t.bo_buses_op} value="18" color="#60A5FA" />
        <Kpi
          icon="💺"
          label={t.bo_avg_occ}
          value="83%"
          delta="+5 pts"
          color="#FBBF24"
        />
        <Kpi
          icon="⭐"
          label={t.bo_trust}
          value="4.8/5"
          delta="+0.2"
          color="#A78BFA"
        />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.25rem",
        }}
      >
        <ChartCard
          title={t.bo_revenue_trend}
          subtitle={t.bo_week_daily}
          height={210}
          action={
            <span
              style={{ fontWeight: 700, fontSize: ".68rem", color: "#4ADE80" }}
            >
              {t.bo_vs_last}
            </span>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={AGENCY_WEEK}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ACCENT} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={ACCENT} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(245,241,232,.06)"
              />
              <XAxis
                dataKey="day"
                tick={AXIS_STYLE}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={AXIS_STYLE}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v / 1000000).toFixed(0) + "M"}
              />
              <Tooltip
                {...CHART_TOOLTIP}
                formatter={(v) => [
                  (v / 1000000).toFixed(2) + " M XAF",
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={ACCENT}
                strokeWidth={2.5}
                fill="url(#revGrad)"
                dot={false}
                activeDot={{ r: 5, fill: ACCENT }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={t.bo_bus_status} subtitle={t.bo_today} height={210}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {["#60A5FA", "#FBBF24", "#F87171", "#4ADE80"].map((c, i) => (
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

      {/* Today's departures */}
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
            {t.bo_todays_dep}
          </span>
          <button
            onClick={() => setTab("schedule")}
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: ACCENT,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t.bo_see_all}
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {colHeaders.map((h) => (
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
              {DEPARTURES.map((d) => {
                const pct = Math.round((d.sold / d.seats) * 100);
                return (
                  <tr
                    key={d.id}
                    style={{ borderBottom: "1px solid rgba(245,241,232,.04)" }}
                  >
                    <td
                      style={{
                        padding: ".7rem 1rem",
                        fontWeight: 700,
                        fontSize: ".78rem",
                        color: ACCENT,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.id}
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
                      {d.route}
                    </td>
                    <td
                      style={{
                        padding: ".7rem 1rem",
                        fontWeight: 600,
                        fontSize: ".78rem",
                        color: "rgba(245,241,232,.55)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.dep}
                    </td>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: ".72rem",
                          color: "rgba(245,241,232,.45)",
                          marginBottom: ".25rem",
                        }}
                      >
                        {d.sold}/{d.seats}
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "rgba(245,241,232,.07)",
                          borderRadius: 999,
                          width: 70,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: pct + "%",
                            background:
                              pct >= 90
                                ? "#F87171"
                                : pct >= 60
                                  ? "#FBBF24"
                                  : "#4ADE80",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </td>
                    <td
                      style={{
                        padding: ".7rem 1rem",
                        fontWeight: 700,
                        fontSize: ".78rem",
                        color:
                          pct >= 90
                            ? "#F87171"
                            : pct >= 60
                              ? "#FBBF24"
                              : "#4ADE80",
                      }}
                    >
                      {pct}%
                    </td>
                    <td
                      style={{
                        padding: ".7rem 1rem",
                        fontWeight: 600,
                        fontSize: ".73rem",
                        color: "rgba(245,241,232,.5)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.driver}
                    </td>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: ".65rem",
                          color:
                            d.cls === "VIP" ? ACCENT : "rgba(245,241,232,.45)",
                          background:
                            d.cls === "VIP"
                              ? "rgba(232,93,4,.12)"
                              : "rgba(245,241,232,.04)",
                          borderRadius: "999px",
                          padding: ".18rem .55rem",
                          border: `1px solid ${d.cls === "VIP" ? "rgba(232,93,4,.3)" : "rgba(245,241,232,.09)"}`,
                        }}
                      >
                        {d.cls}
                      </span>
                    </td>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <Badge label={d.status} />
                    </td>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <button
                        onClick={() => {
                          setManifestDep(d.id);
                          setTab("manifests");
                        }}
                        style={{
                          fontWeight: 700,
                          fontSize: ".65rem",
                          color: ACCENT,
                          background: "rgba(232,93,4,.1)",
                          border: "1px solid rgba(232,93,4,.2)",
                          borderRadius: "999px",
                          padding: ".22rem .65rem",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.bo_manifest_btn}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
