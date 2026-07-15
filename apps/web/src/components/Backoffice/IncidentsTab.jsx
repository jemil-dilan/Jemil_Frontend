import { useState } from "react";
import { AGENCY_INCIDENTS } from "@/data/backofficeData";
import { CARD } from "./constants";
import { Badge } from "./Badge";
import { useLang } from "@/utils/lang";

export function IncidentsTab({ showToast }) {
  const { t } = useLang();
  const [incidents, setIncidents] = useState(AGENCY_INCIDENTS);
  const [msgModal, setMsgModal] = useState(null); // passenger name
  const [msgText, setMsgText] = useState("");
  const [noteModal, setNoteModal] = useState(null); // incident id
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState({}); // { [incidentId]: string }

  function handleApproveRefund(id) {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: "Approved" } : inc)),
    );
    showToast("✅ " + t.bo_approve_refund.replace("✓ ", ""));
  }
  function handleReject(id) {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: "Resolved" } : inc)),
    );
    showToast("✕ Incident closed", "warning");
  }
  function sendMessage() {
    if (!msgText.trim()) return;
    showToast(`💬 SMS sent to ${msgModal}`);
    setMsgModal(null);
    setMsgText("");
  }
  function saveNote(id) {
    if (!noteText.trim()) return;
    setNotes((prev) => ({ ...prev, [id]: noteText.trim() }));
    setNoteModal(null);
    setNoteText("");
    showToast("📝 Note saved");
  }

  const pendingCount = incidents.filter((i) => i.status === "Pending").length;
  const reviewCount = incidents.filter(
    (i) => i.status === "Under Review",
  ).length;

  const btnStyle = (color, bg) => ({
    background: bg,
    border: `1px solid ${color}`,
    color,
    borderRadius: "999px",
    padding: ".3rem .875rem",
    fontWeight: 700,
    fontSize: ".7rem",
    cursor: "pointer",
  });

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
          {t.bo_incident_title}
        </h2>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: ".67rem",
              color: "#FBBF24",
              background: "rgba(250,204,21,.1)",
              border: "1px solid rgba(250,204,21,.2)",
              borderRadius: "999px",
              padding: ".28rem .75rem",
            }}
          >
            {pendingCount} Pending
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: ".67rem",
              color: "#60A5FA",
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
              border: "1px solid rgba(245,241,232,.07)",
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
                      color: "#E85D04",
                    }}
                  >
                    {inc.id}
                  </span>
                  <Badge label={inc.type} />
                  <Badge label={inc.priority} />
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
                    color: "rgba(245,241,232,.42)",
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
                        color: "rgba(245,241,232,.3)",
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
                color: "rgba(245,241,232,.52)",
                lineHeight: 1.75,
                marginBottom: ".8rem",
                fontStyle: "italic",
              }}
            >
              "{inc.reason}"
            </div>

            {/* Saved note display */}
            {notes[inc.id] && (
              <div
                style={{
                  background: "rgba(245,241,232,.05)",
                  border: "1px solid rgba(245,241,232,.1)",
                  borderRadius: ".75rem",
                  padding: ".6rem .875rem",
                  marginBottom: ".6rem",
                  fontSize: ".75rem",
                  color: "rgba(245,241,232,.6)",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                📝 {notes[inc.id]}
              </div>
            )}

            <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
              {inc.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApproveRefund(inc.id)}
                    style={btnStyle("#4ADE80", "rgba(74,222,128,.1)")}
                  >
                    {t.bo_approve_refund}
                  </button>
                  <button
                    onClick={() => handleReject(inc.id)}
                    style={btnStyle("#F87171", "rgba(239,68,68,.08)")}
                  >
                    {t.bo_reject}
                  </button>
                </>
              )}
              <button
                onClick={() => setMsgModal(inc.passenger)}
                style={btnStyle(
                  "rgba(245,241,232,.55)",
                  "rgba(245,241,232,.04)",
                )}
              >
                {t.bo_msg_passenger}
              </button>
              <button
                onClick={() => {
                  setNoteModal(inc.id);
                  setNoteText(notes[inc.id] || "");
                }}
                style={btnStyle(
                  "rgba(245,241,232,.55)",
                  "rgba(245,241,232,.04)",
                )}
              >
                {t.bo_add_note}
              </button>
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
                {t.bo_msg_title(msgModal)}
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
              placeholder={t.bo_msg_ph}
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
              {t.bo_send_sms}
            </button>
          </div>
        </div>
      )}

      {/* Note modal */}
      {noteModal && (
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
            if (e.target === e.currentTarget) setNoteModal(null);
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
                {t.bo_add_note}
              </h2>
              <button
                onClick={() => setNoteModal(null)}
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
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t.bo_note_ph}
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
              onClick={() => saveNote(noteModal)}
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
              {t.bo_note_save}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
