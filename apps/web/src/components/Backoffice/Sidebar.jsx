import { AGENCY_PROFILE } from "@/data/backofficeData";
import { BAR, ACCENT, MONO, NAV } from "./constants";
import { useLang } from "@/utils/lang";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  tab,
  setTab,
  onSignOut,
}) {
  const { t } = useLang();
  const SIDEBAR_W = sidebarOpen ? 220 : 64;

  // Map nav IDs to translated labels
  const navLabels = {
    overview: t.bo_nav[0],
    analytics: t.bo_nav[1],
    manifests: t.bo_nav[2],
    schedule: t.bo_nav[3],
    incidents: t.bo_nav[4],
    settings: t.bo_nav[5],
  };

  return (
    <aside
      style={{
        width: SIDEBAR_W,
        minHeight: "100vh",
        background: BAR,
        borderRight: "1px solid rgba(245,241,232,.07)",
        display: "flex",
        flexDirection: "column",
        transition: "width .25s cubic-bezier(.16,1,.3,1)",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "1.25rem 1rem",
          borderBottom: "1px solid rgba(245,241,232,.06)",
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
          cursor: "pointer",
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.15rem",
            flexShrink: 0,
            boxShadow: "0 0 16px rgba(232,93,4,.35)",
          }}
        >
          🚌
        </div>
        {sidebarOpen && (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: ".95rem",
                color: "#FAF8F3",
                letterSpacing: "-.02em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              JEMIL
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: ".55rem",
                color: "rgba(245,241,232,.3)",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {t.bo_portal}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: ".75rem .5rem",
          display: "flex",
          flexDirection: "column",
          gap: ".15rem",
        }}
      >
        {NAV.map((n) => {
          const active = tab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".75rem",
                padding: sidebarOpen ? ".7rem .875rem" : ".7rem 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: ".875rem",
                background: active ? "rgba(232,93,4,.15)" : "transparent",
                border: `1.5px solid ${active ? "rgba(232,93,4,.35)" : "transparent"}`,
                color: active ? ACCENT : "rgba(245,241,232,.45)",
                cursor: "pointer",
                width: "100%",
                transition: "all .15s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(245,241,232,.05)";
                  e.currentTarget.style.color = "#FAF8F3";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(245,241,232,.45)";
                }
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>
                {n.icon}
              </span>
              {sidebarOpen && (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: ".8rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {navLabels[n.id] || n.label}
                </span>
              )}
              {n.badge && sidebarOpen && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#F87171",
                    color: "white",
                    fontSize: ".55rem",
                    fontWeight: 800,
                    borderRadius: "999px",
                    padding: ".1rem .4rem",
                    minWidth: 16,
                    textAlign: "center",
                  }}
                >
                  {n.badge}
                </span>
              )}
              {n.badge && !sidebarOpen && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 8,
                    width: 7,
                    height: 7,
                    background: "#F87171",
                    borderRadius: "50%",
                    border: "2px solid " + BAR,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: user */}
      <div
        style={{
          padding: ".75rem .5rem",
          borderTop: "1px solid rgba(245,241,232,.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            padding: ".6rem .75rem",
            borderRadius: ".875rem",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: "rgba(232,93,4,.2)",
              border: "2px solid rgba(232,93,4,.4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: ".85rem",
              color: ACCENT,
              flexShrink: 0,
            }}
          >
            G
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: ".78rem",
                  color: "#FAF8F3",
                  whiteSpace: "nowrap",
                }}
              >
                {AGENCY_PROFILE.name}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: ".6rem",
                  color: "rgba(245,241,232,.35)",
                  whiteSpace: "nowrap",
                }}
              >
                {AGENCY_PROFILE.plan}
              </div>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <button
            onClick={onSignOut}
            style={{
              width: "100%",
              background: "none",
              border: "1px solid rgba(245,241,232,.08)",
              borderRadius: ".75rem",
              padding: ".55rem",
              fontWeight: 700,
              fontSize: ".72rem",
              color: "rgba(245,241,232,.35)",
              cursor: "pointer",
              marginTop: ".35rem",
            }}
          >
            {t.bo_sign_out}
          </button>
        )}
      </div>
    </aside>
  );
}
