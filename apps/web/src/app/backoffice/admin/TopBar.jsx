import { MONO, NAV, BAR, GREEN } from "./constants";

export function TopBar({ tab, time, notifOpen, setNotifOpen }) {
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
            color: "rgba(245,241,232,.28)",
          }}
        >
          JEMIL Platform · Super Admin
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: ".875rem" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: ".76rem",
            color: "rgba(245,241,232,.3)",
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
            background: "rgba(74,222,128,.07)",
            border: "1px solid rgba(74,222,128,.18)",
            borderRadius: "999px",
            padding: ".22rem .65rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: GREEN,
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: `0 0 6px ${GREEN}`,
            }}
          />
          <span style={{ fontWeight: 700, fontSize: ".57rem", color: GREEN }}>
            8 Active Agencies
          </span>
        </div>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            position: "relative",
            background: "rgba(245,241,232,.04)",
            border: "1px solid rgba(245,241,232,.08)",
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
              background: "#F87171",
              borderRadius: "50%",
              border: `2px solid ${BAR}`,
            }}
          />
        </button>
        <a
          href="/backoffice"
          style={{
            fontWeight: 700,
            fontSize: ".7rem",
            color: "rgba(245,241,232,.32)",
            textDecoration: "none",
            background: "rgba(245,241,232,.04)",
            border: "1px solid rgba(245,241,232,.08)",
            borderRadius: "999px",
            padding: ".35rem .85rem",
          }}
        >
          Agency View →
        </a>
      </div>
    </header>
  );
}
