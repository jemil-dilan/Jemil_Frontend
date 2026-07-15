export function NotificationDropdown({ notifOpen, setNotifOpen, showToast }) {
  if (!notifOpen) return null;

  const notifications = [
    {
      t: "🏢 New Agency Pending",
      d: "Al Barka Line awaiting approval",
      time: "09:30",
      action: "agencies",
    },
    {
      t: "⚠️ Safety Report",
      d: "INC-037 — Blue Bird Express A1 motorway",
      time: "08:45",
      action: "incidents",
    },
    {
      t: "💰 Daily GMV Alert",
      d: "Platform GMV crossed 500M XAF today",
      time: "07:00",
      action: "analytics",
    },
    {
      t: "📊 Monthly Report",
      d: "June 2026 analytics ready",
      time: "Yesterday",
      action: "analytics",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 68,
        right: 16,
        width: 320,
        background: "#141414",
        border: "1px solid rgba(245,241,232,.1)",
        borderRadius: "1.25rem",
        zIndex: 200,
        boxShadow: "0 24px 64px rgba(0,0,0,.65)",
      }}
    >
      <div
        style={{
          padding: ".875rem 1.25rem",
          borderBottom: "1px solid rgba(245,241,232,.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: ".88rem", color: "#FAF8F3" }}>
          Admin Alerts
        </span>
        <button
          onClick={() => setNotifOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(245,241,232,.35)",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      {notifications.map((n, i) => (
        <div
          key={i}
          onClick={() => {
            setNotifOpen(false);
            if (showToast) showToast(`📌 ${n.t}`, "info");
          }}
          style={{
            padding: ".8rem 1.25rem",
            borderBottom: "1px solid rgba(245,241,232,.04)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(245,241,232,.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: ".78rem",
              color: "#FAF8F3",
              marginBottom: ".18rem",
            }}
          >
            {n.t}
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: ".68rem",
              color: "rgba(245,241,232,.4)",
            }}
          >
            {n.d}
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: ".6rem",
              color: "rgba(245,241,232,.22)",
              marginTop: ".1rem",
            }}
          >
            {n.time}
          </div>
        </div>
      ))}
    </div>
  );
}
