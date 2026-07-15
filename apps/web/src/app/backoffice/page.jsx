"use client";

import { useState, useEffect } from "react";
import { BG } from "@/components/Backoffice/constants";
import { LoginScreen } from "@/components/Backoffice/LoginScreen";
import { Sidebar } from "@/components/Backoffice/Sidebar";
import { TopBar } from "@/components/Backoffice/TopBar";
import { NotificationDropdown } from "@/components/Backoffice/NotificationDropdown";
import { AddTripModal } from "@/components/Backoffice/AddTripModal";
import { OverviewTab } from "@/components/Backoffice/OverviewTab";
import { AnalyticsTab } from "@/components/Backoffice/AnalyticsTab";
import { ManifestsTab } from "@/components/Backoffice/ManifestsTab";
import { ScheduleTab } from "@/components/Backoffice/ScheduleTab";
import { IncidentsTab } from "@/components/Backoffice/IncidentsTab";
import { SettingsTab } from "@/components/Backoffice/SettingsTab";
import { useLang } from "@/utils/lang";

// Mobile tab IDs and icons (labels are set dynamically from translations)
const MOBILE_TAB_DEFS = [
  { id: "overview", icon: "🏠" },
  { id: "schedule", icon: "🚌" },
  { id: "manifests", icon: "📋" },
  { id: "analytics", icon: "📊" },
  { id: "incidents", icon: "⚠️" },
  { id: "settings", icon: "⚙️" },
];

export default function AgencyBackoffice() {
  const { t } = useLang();
  // Build mobile tabs with translated labels
  const MOBILE_TABS = MOBILE_TAB_DEFS.map((item, i) => ({
    ...item,
    label: t.bo_nav[i],
  }));

  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [manifestDep, setManifestDep] = useState("GE-001");
  const [expandedDep, setExpandedDep] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newTripOpen, setNewTripOpen] = useState(false);
  const [time, setTime] = useState("");
  const [analyticsRange, setAnalyticsRange] = useState("12m");
  const [toast, setToast] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        fontFamily: "Montserrat,sans-serif",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: isMobile ? "5.5rem" : "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#1a1a1a",
            border: `1px solid ${toast.type === "error" ? "rgba(248,113,113,.5)" : toast.type === "warning" ? "rgba(251,191,36,.5)" : "rgba(74,222,128,.5)"}`,
            borderRadius: "999px",
            padding: ".7rem 1.5rem",
            fontFamily: "Montserrat,sans-serif",
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

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          tab={tab}
          setTab={setTab}
          onSignOut={() => setAuthed(false)}
        />
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Mobile top bar */}
        {isMobile && (
          <div
            style={{
              background: "#111",
              borderBottom: "1px solid rgba(245,241,232,.08)",
              padding: ".875rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".6rem" }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg,#E85D04,#CC5500)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
              >
                🚌
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: ".95rem",
                    color: "#FAF8F3",
                  }}
                >
                  JEMIL
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: ".55rem",
                    color: "rgba(245,241,232,.35)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  {t.bo_portal}
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
            >
              <button
                onClick={() => setNewTripOpen(true)}
                style={{
                  background: "rgba(232,93,4,.15)",
                  border: "1px solid rgba(232,93,4,.3)",
                  borderRadius: "999px",
                  color: "#E85D04",
                  fontWeight: 800,
                  fontSize: ".7rem",
                  padding: ".4rem .875rem",
                  cursor: "pointer",
                }}
              >
                {t.bo_add_trip}
              </button>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "rgba(245,241,232,.6)",
                }}
              >
                🔔
              </button>
              <button
                onClick={() => setAuthed(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: ".7rem",
                  color: "rgba(245,241,232,.4)",
                  fontWeight: 700,
                }}
              >
                {t.bo_sign_out}
              </button>
            </div>
          </div>
        )}

        {/* Desktop TopBar */}
        {!isMobile && (
          <TopBar
            tab={tab}
            time={time}
            notifOpen={notifOpen}
            setNotifOpen={setNotifOpen}
            setNewTripOpen={setNewTripOpen}
          />
        )}

        {notifOpen && (
          <NotificationDropdown
            onClose={() => setNotifOpen(false)}
            showToast={showToast}
          />
        )}

        <main
          style={{
            flex: 1,
            padding: isMobile ? "1rem" : "1.5rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            paddingBottom: isMobile ? "5.5rem" : "1.5rem",
          }}
        >
          {tab === "overview" && (
            <OverviewTab
              setManifestDep={setManifestDep}
              setTab={setTab}
              showToast={showToast}
            />
          )}
          {tab === "analytics" && (
            <AnalyticsTab
              analyticsRange={analyticsRange}
              setAnalyticsRange={setAnalyticsRange}
            />
          )}
          {tab === "manifests" && (
            <ManifestsTab
              manifestDep={manifestDep}
              setManifestDep={setManifestDep}
              showToast={showToast}
            />
          )}
          {tab === "schedule" && (
            <ScheduleTab
              expandedDep={expandedDep}
              setExpandedDep={setExpandedDep}
              setNewTripOpen={setNewTripOpen}
              setManifestDep={setManifestDep}
              setTab={setTab}
              showToast={showToast}
            />
          )}
          {tab === "incidents" && <IncidentsTab showToast={showToast} />}
          {tab === "settings" && <SettingsTab showToast={showToast} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "#111",
            borderTop: "1px solid rgba(245,241,232,.1)",
            display: "flex",
            overflowX: "auto",
          }}
        >
          {MOBILE_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                minWidth: 54,
                padding: ".55rem .25rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".2rem",
                borderTop: `2px solid ${tab === t.id ? "#E85D04" : "transparent"}`,
                transition: "border-color .15s",
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>
                {t.icon}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".52rem",
                  color: tab === t.id ? "#E85D04" : "rgba(245,241,232,.4)",
                  letterSpacing: ".04em",
                }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </nav>
      )}

      {newTripOpen && (
        <AddTripModal
          onClose={() => setNewTripOpen(false)}
          onSubmit={(trip) => {
            showToast(
              `🚌 Bus scheduled: ${trip.from} → ${trip.to} at ${trip.time}`,
            );
            setNewTripOpen(false);
            setTab("schedule");
          }}
        />
      )}
    </div>
  );
}
