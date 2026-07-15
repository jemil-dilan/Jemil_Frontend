import { MONO, NAV, BAR, ACCENT, GREEN } from "./constants";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  tab,
  setTab,
  setAuthed,
}) {
  const SIDEBAR_W = sidebarOpen ? 224 : 64;

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
            fontSize: "1.25rem",
            flexShrink: 0,
            boxShadow: "0 0 18px rgba(232,93,4,.4)",
          }}
        >
          🛡
        </div>
        {sidebarOpen && (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: ".92rem",
                color: "#FAF8F3",
                letterSpacing: "-.02em",
                whiteSpace: "nowrap",
              }}
            >
              JEMIL Admin
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: ".52rem",
                color: "rgba(245,241,232,.28)",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Platform Control
            </div>
          </div>
        )}
      </div>

      {/* Platform health strip */}
      {sidebarOpen && (
        <div
          style={{
            margin: ".6rem .75rem",
            background: "rgba(74,222,128,.06)",
            border: "1px solid rgba(74,222,128,.15)",
            borderRadius: ".75rem",
            padding: ".5rem .75rem",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              background: GREEN,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${GREEN}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: ".58rem",
              color: "rgba(74,222,128,.8)",
              whiteSpace: "nowrap",
            }}
          >
            All systems operational
          </span>
        </div>
      )}

      <nav
        style={{
          flex: 1,
          padding: ".5rem .5rem",
          display: "flex",
          flexDirection: "column",
          gap: ".12rem",
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
                padding: sidebarOpen ? ".68rem .875rem" : ".68rem 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: ".875rem",
                background: active ? "rgba(232,93,4,.14)" : "transparent",
                border: `1.5px solid ${active ? "rgba(232,93,4,.32)" : "transparent"}`,
                color: active ? ACCENT : "rgba(245,241,232,.42)",
                cursor: "pointer",
                width: "100%",
                transition: "all .14s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(245,241,232,.04)";
                  e.currentTarget.style.color = "#FAF8F3";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(245,241,232,.42)";
                }
              }}
            >
              <span style={{ fontSize: "1.05rem", flexShrink: 0 }}>
                {n.icon}
              </span>
              {sidebarOpen && (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: ".78rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
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
                    border: `2px solid ${BAR}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

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
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: "rgba(232,93,4,.18)",
              border: "2px solid rgba(232,93,4,.38)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: ".88rem",
              color: ACCENT,
              flexShrink: 0,
            }}
          >
            J
          </div>
          {sidebarOpen && (
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: ".78rem",
                  color: "#FAF8F3",
                  whiteSpace: "nowrap",
                }}
              >
                Super Admin
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: ".6rem",
                  color: "rgba(245,241,232,.3)",
                  whiteSpace: "nowrap",
                }}
              >
                admin@jemil.cm
              </div>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <button
            onClick={() => setAuthed(false)}
            style={{
              width: "100%",
              background: "none",
              border: "1px solid rgba(245,241,232,.07)",
              borderRadius: ".75rem",
              padding: ".5rem",
              fontWeight: 700,
              fontSize: ".7rem",
              color: "rgba(245,241,232,.32)",
              cursor: "pointer",
              marginTop: ".35rem",
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
