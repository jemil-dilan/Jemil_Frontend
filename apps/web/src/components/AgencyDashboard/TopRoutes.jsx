export function TopRoutes() {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1.1rem",
          color: "#FAF8F3",
          marginBottom: "1.25rem",
        }}
      >
        Top Routes Today
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {[
          { route: "DLA → YDE", pct: 89, tickets: 96 },
          { route: "DLA → BFS", pct: 100, tickets: 60 },
          { route: "YDE → NGE", pct: 74, tickets: 40 },
          { route: "YDE → BDA", pct: 49, tickets: 22 },
        ].map(function (r) {
          return (
            <div key={r.route}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".35rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".82rem",
                    color: "#FAF8F3",
                  }}
                >
                  {r.route}
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".82rem",
                    color: "rgba(245,241,232,.45)",
                  }}
                >
                  {r.tickets} seats · {r.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: "rgba(245,241,232,.07)",
                  borderRadius: 999,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: r.pct + "%",
                    background:
                      r.pct === 100
                        ? "#F87171"
                        : "linear-gradient(90deg,#E85D04,#F48C06)",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
