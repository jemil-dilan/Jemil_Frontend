export function QuickActions() {
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
        Quick Actions
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: ".75rem",
        }}
      >
        {[
          {
            label: "Add New Bus",
            icon: "🚌",
            desc: "Schedule a departure",
          },
          {
            label: "Set Price",
            icon: "💱",
            desc: "Update seat pricing",
          },
          { label: "Export Report", icon: "📄", desc: "CSV / PDF" },
          {
            label: "Manage Staff",
            icon: "👤",
            desc: "Drivers & agents",
          },
          {
            label: "View Manifest",
            icon: "📋",
            desc: "Passenger list",
          },
          {
            label: "Cancel Trip",
            icon: "❌",
            desc: "Refund passengers",
          },
        ].map(function (a) {
          return (
            <button
              key={a.label}
              style={{
                background: "rgba(245,241,232,.04)",
                border: "1px solid rgba(245,241,232,.08)",
                borderRadius: ".875rem",
                padding: ".875rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .18s",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = "rgba(232,93,4,.4)";
                e.currentTarget.style.background = "rgba(232,93,4,.07)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = "rgba(245,241,232,.08)";
                e.currentTarget.style.background = "rgba(245,241,232,.04)";
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  marginBottom: ".3rem",
                }}
              >
                {a.icon}
              </div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 800,
                  fontSize: ".8rem",
                  color: "#FAF8F3",
                }}
              >
                {a.label}
              </div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 500,
                  fontSize: ".68rem",
                  color: "rgba(245,241,232,.35)",
                  marginTop: ".15rem",
                }}
              >
                {a.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
