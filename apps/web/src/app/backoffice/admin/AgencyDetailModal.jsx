import { ACCENT } from "./constants";
const GREEN = "#4ADE80";

export function AgencyDetailModal({
  agencyModal,
  setAgencyModal,
  onAgencyAction,
  showToast,
}) {
  if (!agencyModal) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.82)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setAgencyModal(null);
      }}
    >
      <div
        style={{
          background: "#131313",
          border: "1px solid rgba(245,241,232,.1)",
          borderRadius: "1.5rem",
          padding: "2rem",
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                background: "rgba(232,93,4,.15)",
                border: "2px solid rgba(232,93,4,.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: ACCENT,
              }}
            >
              {agencyModal.name[0]}
            </div>
            <div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#FAF8F3",
                }}
              >
                {agencyModal.name}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: ".68rem",
                  color: "rgba(245,241,232,.38)",
                }}
              >
                {agencyModal.id} · {agencyModal.city}
              </div>
            </div>
          </div>
          <button
            onClick={() => setAgencyModal(null)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(245,241,232,.35)",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: ".9rem",
            marginBottom: "1.25rem",
          }}
        >
          {[
            ["Plan", agencyModal.plan],
            ["Status", agencyModal.status],
            ["Commission", agencyModal.commission + "%"],
            ["Buses", agencyModal.buses],
            ["Total Tickets", agencyModal.tickets.toLocaleString()],
            ["GMV", (agencyModal.gmv / 1000000).toFixed(1) + "M XAF"],
            ["Rating", "⭐ " + agencyModal.rating],
            ["Partner Since", agencyModal.since],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                background: "rgba(245,241,232,.04)",
                borderRadius: ".875rem",
                padding: ".875rem 1rem",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: ".58rem",
                  color: "rgba(245,241,232,.3)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginBottom: ".18rem",
                }}
              >
                {k}
              </div>
              <div
                style={{ fontWeight: 800, fontSize: ".9rem", color: "#FAF8F3" }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {agencyModal.status === "Active" && (
            <button
              onClick={() =>
                onAgencyAction(
                  agencyModal.id,
                  "Suspended",
                  `⊘ ${agencyModal.name} suspended`,
                )
              }
              style={{
                background: "rgba(239,68,68,.08)",
                border: "1px solid rgba(239,68,68,.2)",
                color: "#F87171",
                borderRadius: "999px",
                padding: ".5rem 1.1rem",
                fontWeight: 700,
                fontSize: ".75rem",
                cursor: "pointer",
              }}
            >
              ⊘ Suspend Agency
            </button>
          )}
          {agencyModal.status === "Pending" && (
            <button
              onClick={() =>
                onAgencyAction(
                  agencyModal.id,
                  "Active",
                  `✅ ${agencyModal.name} approved`,
                )
              }
              style={{
                background: "rgba(74,222,128,.1)",
                border: "1px solid rgba(74,222,128,.25)",
                color: GREEN,
                borderRadius: "999px",
                padding: ".5rem 1.1rem",
                fontWeight: 700,
                fontSize: ".75rem",
                cursor: "pointer",
              }}
            >
              ✓ Approve
            </button>
          )}
          {agencyModal.status === "Suspended" && (
            <button
              onClick={() =>
                onAgencyAction(
                  agencyModal.id,
                  "Active",
                  `↩ ${agencyModal.name} reinstated`,
                )
              }
              style={{
                background: "rgba(74,222,128,.08)",
                border: "1px solid rgba(74,222,128,.2)",
                color: GREEN,
                borderRadius: "999px",
                padding: ".5rem 1.1rem",
                fontWeight: 700,
                fontSize: ".75rem",
                cursor: "pointer",
              }}
            >
              ↩ Reinstate
            </button>
          )}
          <button
            onClick={() =>
              showToast(`✏️ Edit mode activated for ${agencyModal.name}`, "info")
            }
            style={{
              background: "rgba(245,241,232,.05)",
              border: "1px solid rgba(245,241,232,.09)",
              color: "rgba(245,241,232,.55)",
              borderRadius: "999px",
              padding: ".5rem 1.1rem",
              fontWeight: 700,
              fontSize: ".75rem",
              cursor: "pointer",
            }}
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() =>
              showToast(
                `📩 Contact request sent to ${agencyModal.name} manager`,
                "info",
              )
            }
            style={{
              background: "rgba(245,241,232,.05)",
              border: "1px solid rgba(245,241,232,.09)",
              color: "rgba(245,241,232,.55)",
              borderRadius: "999px",
              padding: ".5rem 1.1rem",
              fontWeight: 700,
              fontSize: ".75rem",
              cursor: "pointer",
            }}
          >
            💬 Contact Manager
          </button>
        </div>
      </div>
    </div>
  );
}
