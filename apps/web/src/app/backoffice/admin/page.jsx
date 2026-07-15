"use client";

import { useState, useEffect } from "react";
import { AGENCIES, SETTLEMENTS, ADMIN_INCIDENTS } from "@/data/backofficeData";
import { AdminLogin } from "./AdminLogin";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { NotificationDropdown } from "./NotificationDropdown";
import { AgencyDetailModal } from "./AgencyDetailModal";
import { OverviewTab } from "./OverviewTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { AgenciesTab } from "./AgenciesTab";
import { FinancialsTab } from "./FinancialsTab";
import { UsersTab } from "./UsersTab";
import { IncidentsTab } from "./IncidentsTab";
import { RoutesTab } from "./RoutesTab";
import { SettingsTab } from "./SettingsTab";
import { BG, MONO } from "./constants";

export default function AdminBackoffice() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [time, setTime] = useState("");
  const [agencySearch, setAgencySearch] = useState("");
  const [analyticsRange, setAnalyticsRange] = useState("12m");
  const [agencyModal, setAgencyModal] = useState(null);
  // Mutable state for interactivity
  const [agencies, setAgencies] = useState(AGENCIES);
  const [settlements, setSettlements] = useState(SETTLEMENTS);
  const [incidents, setIncidents] = useState(ADMIN_INCIDENTS);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  function handleAgencyAction(id, newStatus, msg) {
    setAgencies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
    if (agencyModal?.id === id)
      setAgencyModal((prev) => ({ ...prev, status: newStatus }));
    showToast(msg);
  }

  function handleProcessSettlement(id) {
    setSettlements((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Settled", date: "Just now" } : s,
      ),
    );
    showToast("✅ Settlement processed — funds transferred to agency");
  }

  function handleIncidentAction(id, newStatus, msg, type = "success") {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc)),
    );
    showToast(msg, type);
  }

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("fr-CM", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );
    const t = setInterval(
      () =>
        setTime(
          new Date().toLocaleTimeString("fr-CM", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        ),
      1000,
    );
    return () => clearInterval(t);
  }, []);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const filteredAgencies = agencies.filter(
    (a) =>
      a.name.toLowerCase().includes(agencySearch.toLowerCase()) ||
      a.city.toLowerCase().includes(agencySearch.toLowerCase()),
  );
  const totalGMV = agencies
    .filter((a) => a.status === "Active")
    .reduce((s, a) => s + a.gmv, 0);
  const totalCommission = agencies
    .filter((a) => a.status === "Active")
    .reduce((s, a) => s + a.gmv * (a.commission / 100), 0);

  return (
    <div
      style={{ minHeight: "100vh", background: BG, display: "flex", ...MONO }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#1a1a1a",
            border: `1px solid ${toast.type === "error" ? "rgba(248,113,113,.5)" : toast.type === "warning" ? "rgba(251,191,36,.5)" : "rgba(74,222,128,.5)"}`,
            borderRadius: "999px",
            padding: ".7rem 1.5rem",
            ...MONO,
            fontWeight: 700,
            fontSize: ".82rem",
            color:
              toast.type === "error"
                ? "#F87171"
                : toast.type === "warning"
                  ? "#FBBF24"
                  : "#4ADE80",
            boxShadow: "0 8px 32px rgba(0,0,0,.5)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {toast.msg}
        </div>
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        tab={tab}
        setTab={setTab}
        setAuthed={setAuthed}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <TopBar
          tab={tab}
          time={time}
          notifOpen={notifOpen}
          setNotifOpen={setNotifOpen}
        />

        {notifOpen && (
          <NotificationDropdown
            notifOpen={notifOpen}
            setNotifOpen={setNotifOpen}
            showToast={showToast}
          />
        )}

        <main
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {tab === "overview" && (
            <OverviewTab
              setTab={setTab}
              totalGMV={totalGMV}
              totalCommission={totalCommission}
              agencies={agencies}
              settlements={settlements}
            />
          )}
          {tab === "analytics" && (
            <AnalyticsTab
              analyticsRange={analyticsRange}
              setAnalyticsRange={setAnalyticsRange}
              agencies={agencies}
            />
          )}
          {tab === "agencies" && (
            <AgenciesTab
              agencySearch={agencySearch}
              setAgencySearch={setAgencySearch}
              setAgencyModal={setAgencyModal}
              agencies={filteredAgencies}
              onAgencyAction={handleAgencyAction}
              showToast={showToast}
            />
          )}
          {tab === "financials" && (
            <FinancialsTab
              settlements={settlements}
              onProcess={handleProcessSettlement}
              showToast={showToast}
            />
          )}
          {tab === "users" && <UsersTab showToast={showToast} />}
          {tab === "incidents" && (
            <IncidentsTab
              incidents={incidents}
              onIncidentAction={handleIncidentAction}
              showToast={showToast}
            />
          )}
          {tab === "routes" && <RoutesTab showToast={showToast} />}
          {tab === "settings" && <SettingsTab showToast={showToast} />}
        </main>
      </div>

      <AgencyDetailModal
        agencyModal={agencyModal}
        setAgencyModal={setAgencyModal}
        onAgencyAction={handleAgencyAction}
        showToast={showToast}
      />
    </div>
  );
}
