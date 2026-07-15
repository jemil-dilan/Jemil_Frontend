import { useEffect } from "react";
import { useLang } from "@/utils/lang";

export function NotificationDropdown({ onClose }) {
  const { lang } = useLang();

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const notifications =
    lang === "fr"
      ? [
          {
            t: "⚠️ INC-041 En attente",
            d: "Demande de remboursement — Nkoumo Théodore",
            time: "07:12",
          },
          {
            t: "🎫 Bus GE-002 Complet",
            d: "DLA → BFS 07:30 — 60/60 vendus",
            time: "07:05",
          },
          {
            t: "✅ Versement effectué",
            d: "28 450 000 XAF vers MTN Money",
            time: "06:00",
          },
          {
            t: "📊 Rapport hebdomadaire",
            d: "Consultez votre résumé analytique",
            time: "Hier",
          },
        ]
      : [
          {
            t: "⚠️ INC-041 Pending",
            d: "Refund request — Nkoumo Théodore",
            time: "07:12",
          },
          {
            t: "🎫 Bus GE-002 Full",
            d: "DLA → BFS 07:30 — 60/60 sold",
            time: "07:05",
          },
          {
            t: "✅ Payout Settled",
            d: "28,450,000 XAF to MTN Money",
            time: "06:00",
          },
          {
            t: "📊 Weekly Report Ready",
            d: "View your analytics summary",
            time: "Yesterday",
          },
        ];

  const title = lang === "fr" ? "Notifications" : "Notifications";

  return (
    <>
      {/* Transparent backdrop — click closes dropdown */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 199 }}
      />
      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 68,
          right: 16,
          width: 310,
          background: "#141414",
          border: "1px solid rgba(245,241,232,.1)",
          borderRadius: "1.25rem",
          zIndex: 200,
          boxShadow: "0 24px 64px rgba(0,0,0,.6)",
          overflow: "hidden",
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
          <span
            style={{ fontWeight: 800, fontSize: ".88rem", color: "#FAF8F3" }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(245,241,232,.35)",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ✕
          </button>
        </div>
        {notifications.map((n, i) => (
          <div
            key={i}
            style={{
              padding: ".8rem 1.25rem",
              borderBottom: "1px solid rgba(245,241,232,.04)",
              cursor: "pointer",
              transition: "background .15s",
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
                color: "rgba(245,241,232,.42)",
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
        <div style={{ padding: ".75rem 1.25rem", textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(245,241,232,.3)",
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".72rem",
              cursor: "pointer",
            }}
          >
            {lang === "fr" ? "Tout marquer comme lu" : "Mark all as read"}
          </button>
        </div>
      </div>
    </>
  );
}
