import { StatsCard } from "@/components/AgencyDashboard/StatsCard";
import { RevenueChart } from "@/components/AgencyDashboard/RevenueChart";
import { FleetStatus } from "@/components/AgencyDashboard/FleetStatus";
import { TopRoutes } from "@/components/AgencyDashboard/TopRoutes";
import { QuickActions } from "@/components/AgencyDashboard/QuickActions";

export function OverviewTab({ stats, weekRevenue }) {
  return (
    <div>
      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map(function (s) {
          return <StatsCard key={s.label} stat={s} />;
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <RevenueChart weekRevenue={weekRevenue} />
        <FleetStatus />
        <TopRoutes />
        <QuickActions />
      </div>
    </div>
  );
}
