import { Badge } from "./Badge";
import { ACCENT, GREEN, YELLOW, CARD } from "./constants";

export function AgenciesTab({
  agencySearch,
  setAgencySearch,
  setAgencyModal,
  agencies,
  onAgencyAction,
  showToast,
}) {
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
          Agency Management
        </h2>
        <div
          style={{
            display: "flex",
            gap: ".75rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            value={agencySearch}
            onChange={(e) => setAgencySearch(e.target.value)}
            placeholder="Search agencies…"
            style={{
              background: "rgba(245,241,232,.05)",
              border: "1px solid rgba(245,241,232,.09)",
              borderRadius: "999px",
              padding: ".45rem 1rem",
              color: "#FAF8F3",
              fontWeight: 600,
              fontSize: ".8rem",
              outline: "none",
              minWidth: 180,
            }}
          />
          <button
            onClick={() =>
              showToast("📧 Invite email sent to agency — check admin inbox")
            }
            style={{
              background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: ".5rem 1.25rem",
              fontWeight: 800,
              fontSize: ".78rem",
              cursor: "pointer",
            }}
          >
            + Invite Agency
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {agencies.map((a) => (
          <div
            key={a.id}
            style={{
              background: CARD,
              borderRadius: "1.1rem",
              border: `1px solid ${a.status === "Pending" ? "rgba(250,204,21,.25)" : a.status === "Suspended" ? "rgba(239,68,68,.2)" : "rgba(245,241,232,.07)"}`,
              padding: "1.1rem 1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: ".75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: ".875rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(232,93,4,.15)",
                    border: "2px solid rgba(232,93,4,.3)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "1rem",
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  {a.name[0]}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: ".5rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: "1rem",
                        color: "#FAF8F3",
                      }}
                    >
                      {a.name}
                    </span>
                    <Badge label={a.plan} />
                    <Badge label={a.status} />
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".7rem",
                      color: "rgba(245,241,232,.4)",
                      marginTop: ".15rem",
                    }}
                  >
                    {a.city} · Partner since {a.since} · {a.buses} buses ·{" "}
                    {a.commission}% commission
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".58rem",
                      color: "rgba(245,241,232,.28)",
                      marginBottom: ".12rem",
                    }}
                  >
                    GMV
                  </div>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: ".92rem",
                      color: GREEN,
                    }}
                  >
                    {(a.gmv / 1000000).toFixed(1)}M XAF
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".58rem",
                      color: "rgba(245,241,232,.28)",
                      marginBottom: ".12rem",
                    }}
                  >
                    Tickets
                  </div>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: ".92rem",
                      color: ACCENT,
                    }}
                  >
                    {a.tickets.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".58rem",
                      color: "rgba(245,241,232,.28)",
                      marginBottom: ".12rem",
                    }}
                  >
                    Rating
                  </div>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: ".92rem",
                      color: YELLOW,
                    }}
                  >
                    ⭐ {a.rating}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}
                >
                  {a.status === "Pending" && (
                    <button
                      onClick={() =>
                        onAgencyAction(
                          a.id,
                          "Active",
                          `✅ ${a.name} approved and activated`,
                        )
                      }
                      style={{
                        background: "rgba(74,222,128,.1)",
                        border: "1px solid rgba(74,222,128,.25)",
                        color: GREEN,
                        borderRadius: "999px",
                        padding: ".3rem .75rem",
                        fontWeight: 700,
                        fontSize: ".7rem",
                        cursor: "pointer",
                      }}
                    >
                      ✓ Approve
                    </button>
                  )}
                  {a.status === "Active" && (
                    <button
                      onClick={() =>
                        onAgencyAction(
                          a.id,
                          "Suspended",
                          `⊘ ${a.name} suspended`,
                        )
                      }
                      style={{
                        background: "rgba(239,68,68,.07)",
                        border: "1px solid rgba(239,68,68,.18)",
                        color: "#F87171",
                        borderRadius: "999px",
                        padding: ".3rem .75rem",
                        fontWeight: 700,
                        fontSize: ".7rem",
                        cursor: "pointer",
                      }}
                    >
                      ⊘ Suspend
                    </button>
                  )}
                  {a.status === "Suspended" && (
                    <button
                      onClick={() =>
                        onAgencyAction(a.id, "Active", `↩ ${a.name} reinstated`)
                      }
                      style={{
                        background: "rgba(74,222,128,.08)",
                        border: "1px solid rgba(74,222,128,.2)",
                        color: GREEN,
                        borderRadius: "999px",
                        padding: ".3rem .75rem",
                        fontWeight: 700,
                        fontSize: ".7rem",
                        cursor: "pointer",
                      }}
                    >
                      ↩ Reinstate
                    </button>
                  )}
                  <button
                    onClick={() => setAgencyModal(a)}
                    style={{
                      background: "rgba(245,241,232,.05)",
                      border: "1px solid rgba(245,241,232,.09)",
                      color: "rgba(245,241,232,.55)",
                      borderRadius: "999px",
                      padding: ".3rem .75rem",
                      fontWeight: 700,
                      fontSize: ".7rem",
                      cursor: "pointer",
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
