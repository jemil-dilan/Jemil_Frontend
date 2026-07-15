import { useState } from "react";
import { Badge } from "./Badge";
import { ACCENT, GREEN, BLUE, CARD } from "./constants";

export function IncidentsTab({ incidents, onIncidentAction, showToast }) {
  const [msgModal, setMsgModal] = useState(null);
  const [msgText, setMsgText] = useState("");

  function sendMessage() {
    if (!msgText.trim()) return;
    showToast(`💬 Message sent to ${msgModal}`);
    setMsgModal(null);
    setMsgText("");
  }

  const highCount = incidents.filter(
    (i) => i.priority === "High" && i.status !== "Resolved",
  ).length;
  const reviewCount = incidents.filter(
    (i) => i.status === "Under Review",
  ).length;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#FAF8F3" }}>
          Platform Incidents
        </h2>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: ".67rem",
              color: "#F87171",
              background: "rgba(239,68,68,.1)",
              border: "1px solid rgba(239,68,68,.2)",
              borderRadius: "999px",
              padding: ".28rem .75rem",
            }}
          >
            {highCount} High Priority
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: ".67rem",
              color: BLUE,
              background: "rgba(96,165,250,.1)",
              border: "1px solid rgba(96,165,250,.2)",
              borderRadius: "999px",
              padding: ".28rem .75rem",
            }}
          >
            {reviewCount} Under Review
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {incidents.map((inc) => (
          <div
            key={inc.id}
            style={{
              background: CARD,
              borderRadius: "1.1rem",
              padding: "1.25rem",
              border: `1px solid ${inc.priority === "High" ? "rgba(239,68,68,.18)" : "rgba(245,241,232,.07)"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: ".75rem",
                marginBottom: ".8rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: ".4rem",
                    alignItems: "center",
                    marginBottom: ".25rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: ".7rem",
                      color: ACCENT,
                    }}
                  >
                    {inc.id}
                  </span>
                  <Badge label={inc.type} />
                  <Badge label={inc.priority} />
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: ".65rem",
                      color: "rgba(245,241,232,.35)",
                      background: "rgba(245,241,232,.05)",
                      border: "1px solid rgba(245,241,232,.08)",
                      borderRadius: "999px",
                      padding: ".15rem .5rem",
                    }}
                  >
                    🏢 {inc.agency}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: ".9rem",
                    color: "#FAF8F3",
                  }}
                >
                  {inc.passenger}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: ".7rem",
                    color: "rgba(245,241,232,.4)",
                    marginTop: ".1rem",
                  }}
                >
                  {inc.route} · Opened {inc.opened}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: ".75rem",
                }}
              >
                {inc.amount && (
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: ".58rem",
                        color: "rgba(245,241,232,.28)",
                        marginBottom: ".1rem",
                      }}
                    >
                      Amount
                    </div>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: ".95rem",
                        color: "#F87171",
                      }}
                    >
                      {inc.amount.toLocaleString()} XAF
                    </div>
                  </div>
                )}
                <Badge label={inc.status} />
              </div>
            </div>
            <div
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                fontSize: ".82rem",
                color: "rgba(245,241,232,.5)",
                lineHeight: 1.75,
                marginBottom: ".8rem",
                fontStyle: "italic",
              }}
            >
              "{inc.reason}"
            </div>
            <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
              {inc.status === "Pending" && (
                <>
                  <button
                    onClick={() =>
                      onIncidentAction(
                        inc.id,
                        "Approved",
                        `✅ Force refund of ${(inc.amount || 0).toLocaleString()} XAF initiated`,
                      )
                    }
                    style={{
                      background: "rgba(74,222,128,.1)",
                      border: "1px solid rgba(74,222,128,.25)",
                      color: GREEN,
                      borderRadius: "999px",
                      padding: ".3rem .875rem",
                      fontWeight: 700,
                      fontSize: ".7rem",
                      cursor: "pointer",
                    }}
                  >
                    ✓ Force Refund
                  </button>
                  <button
                    onClick={() =>
                      onIncidentAction(
                        inc.id,
                        "Resolved",
                        "✕ Incident closed",
                        "warning",
                      )
                    }
                    style={{
                      background: "rgba(239,68,68,.08)",
                      border: "1px solid rgba(239,68,68,.18)",
                      color: "#F87171",
                      borderRadius: "999px",
                      padding: ".3rem .875rem",
                      fontWeight: 700,
                      fontSize: ".7rem",
                      cursor: "pointer",
                    }}
                  >
                    ✕ Close
                  </button>
                </>
              )}
              <button
                onClick={() =>
                  showToast(`📩 Email sent to ${inc.agency} operations team`)
                }
                style={{
                  background: "rgba(245,241,232,.04)",
                  border: "1px solid rgba(245,241,232,.08)",
                  color: "rgba(245,241,232,.52)",
                  borderRadius: "999px",
                  padding: ".3rem .875rem",
                  fontWeight: 700,
                  fontSize: ".7rem",
                  cursor: "pointer",
                }}
              >
                📩 Contact Agency
              </button>
              <button
                onClick={() => setMsgModal(inc.passenger)}
                style={{
                  background: "rgba(245,241,232,.04)",
                  border: "1px solid rgba(245,241,232,.08)",
                  color: "rgba(245,241,232,.52)",
                  borderRadius: "999px",
                  padding: ".3rem .875rem",
                  fontWeight: 700,
                  fontSize: ".7rem",
                  cursor: "pointer",
                }}
              >
                💬 Message Passenger
              </button>
              {inc.priority === "High" && (
                <button
                  onClick={() => {
                    onIncidentAction(
                      inc.id,
                      "Under Review",
                      "🚨 Incident escalated to senior team",
                      "warning",
                    );
                  }}
                  style={{
                    background: "rgba(239,68,68,.08)",
                    border: "1px solid rgba(239,68,68,.18)",
                    color: "#F87171",
                    borderRadius: "999px",
                    padding: ".3rem .875rem",
                    fontWeight: 700,
                    fontSize: ".7rem",
                    cursor: "pointer",
                  }}
                >
                  🚨 Escalate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message modal */}
      {msgModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.78)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMsgModal(null);
          }}
        >
          <div
            style={{
              background: "#131313",
              border: "1px solid rgba(245,241,232,.1)",
              borderRadius: "1.5rem",
              padding: "2rem",
              width: "100%",
              maxWidth: 420,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: "1rem",
                  color: "#FAF8F3",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                Message {msgModal}
              </h2>
              <button
                onClick={() => setMsgModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(245,241,232,.38)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ✕
              </button>
            </div>
            <textarea
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Type your message…"
              rows={4}
              style={{
                width: "100%",
                background: "rgba(245,241,232,.05)",
                border: "1px solid rgba(245,241,232,.1)",
                borderRadius: ".875rem",
                padding: ".875rem 1rem",
                color: "#FAF8F3",
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".88rem",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "linear-gradient(135deg,#E85D04,#CC5500)",
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: ".9rem",
                fontWeight: 900,
                fontSize: ".9rem",
                fontFamily: "Montserrat,sans-serif",
                cursor: "pointer",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              Send Message →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
