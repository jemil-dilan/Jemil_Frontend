import { AGENCY_PROFILE } from "@/data/backofficeData";
import { BAR, ACCENT, NAV } from "./constants";

export function TopBar({ tab, time, notifOpen, setNotifOpen, setNewTripOpen }) {
  return (
    <header
      style={{
        height: 60,
        background: BAR,
        borderBottom: "1px solid rgba(245,241,232,.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      <div>
        <div style={{ fontWeight: 900, fontSize: "1rem", color: "#FAF8F3" }}>
          {NAV.find((n) => n.id === tab)?.label}
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: ".62rem",
            color: "rgba(245,241,232,.3)",
          }}
        >
          {AGENCY_PROFILE.name} · {AGENCY_PROFILE.city}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: ".875rem" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: ".78rem",
            color: "rgba(245,241,232,.35)",
            letterSpacing: ".05em",
          }}
        >
          {time}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".4rem",
            background: "rgba(74,222,128,.08)",
            border: "1px solid rgba(74,222,128,.2)",
            borderRadius: "999px",
            padding: ".22rem .65rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "#4ADE80",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: ".58rem",
              color: "#4ADE80",
            }}
          >
            Live
          </span>
        </div>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            position: "relative",
            background: "rgba(245,241,232,.05)",
            border: "1px solid rgba(245,241,232,.09)",
            borderRadius: "999px",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: ".95rem",
          }}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 8,
              height: 8,
              background: ACCENT,
              borderRadius: "50%",
              border: `2px solid ${BAR}`,
            }}
          />
        </button>
        <button
          onClick={() => setNewTripOpen(true)}
          style={{
            background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: ".4rem .95rem",
            fontWeight: 800,
            fontSize: ".72rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 0 18px rgba(232,93,4,.3)",
          }}
        >
          + Add Trip
        </button>
      </div>
    </header>
  );
}
