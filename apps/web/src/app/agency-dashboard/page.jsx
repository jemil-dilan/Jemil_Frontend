"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DashboardTopBar } from "@/components/AgencyDashboard/DashboardTopBar";
import { TabBar } from "@/components/AgencyDashboard/TabBar";
import { OverviewTab } from "@/components/AgencyDashboard/OverviewTab";
import { RoutesTab } from "@/components/AgencyDashboard/RoutesTab";
import { BookingsTab } from "@/components/AgencyDashboard/BookingsTab";
import { SettingsTab } from "@/components/AgencyDashboard/SettingsTab";
import {
  MOCK_STATS,
  MOCK_ROUTES,
  MOCK_BOOKINGS,
} from "@/data/agencyDashboardData";

export default function AgencyDashboardPage() {
  var [tab, setTab] = useState("overview");
  var [selectedRoute, setSelectedRoute] = useState(null);
  var [agencyName] = useState("General Express");

  var weekRevenue = [
    { day: "Mon", amount: 2800000 },
    { day: "Tue", amount: 3400000 },
    { day: "Wed", amount: 2200000 },
    { day: "Thu", amount: 4100000 },
    { day: "Fri", amount: 5200000 },
    { day: "Sat", amount: 6800000 },
    { day: "Sun", amount: 3900000 },
  ];

  var TABS = [
    { id: "overview", label: "📊 Overview" },
    { id: "routes", label: "🗺️ Routes & Seats" },
    { id: "bookings", label: "🎫 Live Bookings" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          paddingTop: "72px",
        }}
      >
        <DashboardTopBar agencyName={agencyName} onAddTrip={() => {}} />

        <div
          style={{
            background: "#111",
            borderBottom: "1px solid rgba(232,93,4,.15)",
            padding: "0 0 1.25rem 0",
          }}
        >
          <div className="container">
            <TabBar tabs={TABS} activeTab={tab} onTabChange={setTab} />
          </div>
        </div>

        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {tab === "overview" && (
            <OverviewTab stats={MOCK_STATS} weekRevenue={weekRevenue} />
          )}

          {tab === "routes" && (
            <RoutesTab
              routes={MOCK_ROUTES}
              selectedRoute={selectedRoute}
              onRouteToggle={setSelectedRoute}
            />
          )}

          {tab === "bookings" && <BookingsTab bookings={MOCK_BOOKINGS} />}

          {tab === "settings" && <SettingsTab />}
        </div>
      </main>
      <Footer />
    </>
  );
}
