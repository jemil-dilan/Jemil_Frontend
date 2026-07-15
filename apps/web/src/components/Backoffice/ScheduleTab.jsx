import { useState } from "react";
import { DEPARTURES } from "@/data/backofficeData";
import { CARD, ACCENT } from "./constants";
import { Badge } from "./Badge";
import { SeatMapMini } from "./SeatMapMini";
import { useLang } from "@/utils/lang";

export function ScheduleTab({
  expandedDep,
  setExpandedDep,
  setNewTripOpen,
  setManifestDep,
  setTab,
  showToast,
}) {
  const { t } = useLang();
  const [departures, setDepartures] = useState(DEPARTURES);
  const [editingPrice, setEditingPrice] = useState({});
  const [promoShown, setPromoShown] = useState({});
  const [cancelled, setCancelled] = useState({});
  // ── Custom confirm modal (replaces window.confirm) ──────────────
  const [confirmModal, setConfirmModal] = useState(null); // { dep } | null

  const handleExportCSV = (dep) => {
    const passengers = Array.from({ length: dep.sold }, (_, i) => ({
      seat: i + 1,
      name: [
        "Jean Nkwain",
        "Alice Mbah",
        "Paul Tanga",
        "Marie Onana",
        "Eric Bih",
        "Grace Fon",
        "David Mbu",
      ][i % 7],
      phone: `+237 6${String(70000000 + i * 13337).padStart(8, "0")}`,
      status: "Confirmed",
    }));
    const header = "Seat,Name,Phone,Status\n";
    const rows = passengers
      .map((p) => `${p.seat},${p.name},${p.phone},${p.status}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manifest-${dep.id}-${dep.route.replace(" ", "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast && showToast("📄 CSV exported");
  };

  const handleUpdatePrice = (dep) => {
    const newPrice = parseInt(editingPrice[dep.id]);
    if (!newPrice || newPrice < 500) return;
    setDepartures((prev) =>
      prev.map((d) => (d.id === dep.id ? { ...d, price: newPrice } : d)),
    );
    setEditingPrice((prev) => {
      const n = { ...prev };
      delete n[dep.id];
      return n;
    });
    showToast &&
      showToast("💱 " + t.bo_update_price.replace("💱 ", "") + " updated");
  };

  const handleCreatePromo = (dep) => {
    const code = `JEMIL${dep.id.slice(-1)}${Math.floor(10 + Math.random() * 90)}`;
    setPromoShown((prev) => ({ ...prev, [dep.id]: code }));
    showToast && showToast(`🎁 Code: ${code}`);
  };

  // Opens the custom confirm modal instead of window.confirm
  const handleCancel = (dep) => setConfirmModal({ dep });

  const confirmCancel = () => {
    if (!confirmModal) return;
    const dep = confirmModal.dep;
    setCancelled((prev) => ({ ...prev, [dep.id]: true }));
    setDepartures((prev) =>
      prev.map((d) => (d.id === dep.id ? { ...d, status: "Cancelled" } : d)),
    );
    setExpandedDep(null);
    setConfirmModal(null);
    showToast && showToast(t.bo_cancelled_msg(dep.sold));
  };

  return (
    <>
      {/* ── Custom cancel-confirm modal ────────────────────── */}
      {confirmModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmModal(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            background: "rgba(0,0,0,.78)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#1A1A1A",
              border: "1px solid rgba(248,113,113,.25)",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 32px 80px rgba(0,0,0,.6)",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              ⚠️
            </div>
            <h3
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: "#FAF8F3",
                textAlign: "center",
                marginBottom: ".75rem",
              }}
            >
              {t.bo_cancel_refund}
            </h3>
            <p
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                fontSize: ".875rem",
                color: "rgba(245,241,232,.55)",
                textAlign: "center",
                lineHeight: 1.75,
                marginBottom: "1.75rem",
              }}
            >
              {t.lang === "fr"
                ? `Annuler les ${confirmModal.dep.sold} billets sur ${confirmModal.dep.route} ${confirmModal.dep.dep} ? Cela initialisera ${confirmModal.dep.sold} remboursements.`
                : `Cancel all ${confirmModal.dep.sold} tickets on ${confirmModal.dep.route} ${confirmModal.dep.dep}? This will issue ${confirmModal.dep.sold} refunds.`}
            </p>
            <div style={{ display: "flex", gap: ".75rem" }}>
              <button
                onClick={() => setConfirmModal(null)}
                style={{
                  flex: 1,
                  background: "rgba(245,241,232,.06)",
                  border: "1px solid rgba(245,241,232,.12)",
                  borderRadius: "999px",
                  padding: ".875rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".875rem",
                  color: "rgba(245,241,232,.6)",
                  cursor: "pointer",
                }}
              >
                {t.bo_reject.replace("✕ ", "")}
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  flex: 1,
                  background: "rgba(248,113,113,.15)",
                  border: "1.5px solid rgba(248,113,113,.4)",
                  borderRadius: "999px",
                  padding: ".875rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: ".875rem",
                  color: "#F87171",
                  cursor: "pointer",
                }}
              >
                {t.bo_cancel_refund.replace("❌ ", "")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 900,
              fontSize: "1.15rem",
              color: "#FAF8F3",
              marginBottom: ".15rem",
            }}
          >
            {t.bo_schedule_title}
          </h2>
          <p
            style={{
              fontWeight: 600,
              fontSize: ".7rem",
              color: "rgba(245,241,232,.38)",
            }}
          >
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setNewTripOpen(true)}
          style={{
            background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: ".6rem 1.5rem",
            fontWeight: 800,
            fontSize: ".8rem",
            cursor: "pointer",
            boxShadow: "0 0 18px rgba(232,93,4,.3)",
          }}
        >
          {t.bo_new_bus}
        </button>
      </div>

      {/* ── Departure cards ───────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
        {departures.map((d) => {
          const pct = Math.round((d.sold / d.seats) * 100);
          const open = expandedDep === d.id;
          const isCancelled = cancelled[d.id];

          return (
            <div
              key={d.id}
              style={{
                background: CARD,
                borderRadius: "1.1rem",
                border: `1.5px solid ${isCancelled ? "rgba(248,113,113,.35)" : open ? "rgba(232,93,4,.38)" : "rgba(245,241,232,.07)"}`,
                overflow: "hidden",
                transition: "border-color .2s",
                opacity: isCancelled ? 0.7 : 1,
              }}
            >
              {/* Card header */}
              <div
                onClick={() =>
                  !isCancelled && setExpandedDep(open ? null : d.id)
                }
                style={{
                  padding: "1.1rem 1.25rem",
                  cursor: isCancelled ? "default" : "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".75rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: "1.05rem",
                      color: isCancelled ? "rgba(245,241,232,.4)" : "#FAF8F3",
                      textDecoration: isCancelled ? "line-through" : "none",
                    }}
                  >
                    {d.route}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".68rem",
                      color: "rgba(245,241,232,.35)",
                      marginTop: ".1rem",
                    }}
                  >
                    {d.id} · {d.dep} → {d.arr} · {d.plate} · {d.driver}
                  </div>
                  {isCancelled && (
                    <div
                      style={{
                        marginTop: ".3rem",
                        fontSize: ".65rem",
                        fontWeight: 700,
                        color: "#F87171",
                        letterSpacing: ".04em",
                      }}
                    >
                      {t.bo_cancelled_msg(d.sold)}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: "1rem",
                        color: ACCENT,
                      }}
                    >
                      {d.price.toLocaleString()}{" "}
                      <span
                        style={{
                          fontSize: ".58rem",
                          fontWeight: 600,
                          color: "rgba(245,241,232,.28)",
                        }}
                      >
                        XAF
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        marginTop: ".25rem",
                      }}
                    >
                      <div
                        style={{
                          width: 80,
                          height: 4,
                          background: "rgba(245,241,232,.07)",
                          borderRadius: 999,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: pct + "%",
                            background:
                              pct >= 90
                                ? "#F87171"
                                : pct >= 60
                                  ? "#FBBF24"
                                  : "#4ADE80",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: ".68rem",
                          color:
                            pct >= 90
                              ? "#F87171"
                              : pct >= 60
                                ? "#FBBF24"
                                : "#4ADE80",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <Badge label={d.status} />
                  {!isCancelled && (
                    <span
                      style={{
                        color: "rgba(245,241,232,.22)",
                        transition: "transform .2s",
                        display: "inline-block",
                        transform: open ? "rotate(180deg)" : "none",
                      }}
                    >
                      ▾
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded actions */}
              {open && !isCancelled && (
                <div
                  style={{
                    borderTop: "1px solid rgba(245,241,232,.07)",
                    padding: "1.1rem 1.25rem",
                    display: "flex",
                    gap: "2rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: ".58rem",
                        color: "rgba(245,241,232,.3)",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        marginBottom: ".5rem",
                      }}
                    >
                      {t.bo_seat_map_label(d.sold, d.seats)}
                    </div>
                    <SeatMapMini sold={d.sold} total={d.seats} />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 200,
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: ".58rem",
                        color: "rgba(245,241,232,.3)",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        marginBottom: ".1rem",
                      }}
                    >
                      {t.bo_quick_actions}
                    </div>

                    <ActionBtn
                      onClick={() => {
                        setManifestDep(d.id);
                        setTab("manifests");
                      }}
                    >
                      {t.bo_view_manifest}
                    </ActionBtn>

                    {editingPrice[d.id] !== undefined ? (
                      <div style={{ display: "flex", gap: ".4rem" }}>
                        <input
                          type="number"
                          value={editingPrice[d.id]}
                          onChange={(e) =>
                            setEditingPrice((prev) => ({
                              ...prev,
                              [d.id]: e.target.value,
                            }))
                          }
                          placeholder={t.bo_price_ph}
                          style={{
                            flex: 1,
                            background: "rgba(245,241,232,.07)",
                            border: "1px solid rgba(232,93,4,.4)",
                            borderRadius: ".5rem",
                            padding: ".4rem .7rem",
                            color: "#FAF8F3",
                            fontWeight: 700,
                            fontSize: ".75rem",
                            outline: "none",
                          }}
                        />
                        <button
                          onClick={() => handleUpdatePrice(d)}
                          style={{
                            background: ACCENT,
                            color: "white",
                            border: "none",
                            borderRadius: ".5rem",
                            padding: ".4rem .9rem",
                            fontWeight: 800,
                            fontSize: ".72rem",
                            cursor: "pointer",
                          }}
                        >
                          {t.bo_apply}
                        </button>
                        <button
                          onClick={() =>
                            setEditingPrice((prev) => {
                              const n = { ...prev };
                              delete n[d.id];
                              return n;
                            })
                          }
                          style={{
                            background: "rgba(245,241,232,.06)",
                            border: "none",
                            borderRadius: ".5rem",
                            padding: ".4rem .6rem",
                            color: "rgba(245,241,232,.4)",
                            cursor: "pointer",
                            fontSize: ".72rem",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <ActionBtn
                        onClick={() =>
                          setEditingPrice((prev) => ({
                            ...prev,
                            [d.id]: String(d.price),
                          }))
                        }
                      >
                        {t.bo_update_price}
                      </ActionBtn>
                    )}

                    {promoShown[d.id] ? (
                      <div
                        style={{
                          background: "rgba(74,222,128,.08)",
                          border: "1px solid rgba(74,222,128,.25)",
                          borderRadius: ".75rem",
                          padding: ".5rem .875rem",
                          fontSize: ".75rem",
                          fontWeight: 700,
                          color: "#4ADE80",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          🎁 Code:{" "}
                          <span style={{ letterSpacing: ".08em" }}>
                            {promoShown[d.id]}
                          </span>{" "}
                          — 10% off
                        </span>
                        <button
                          onClick={() =>
                            navigator.clipboard?.writeText(promoShown[d.id])
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "#4ADE80",
                            cursor: "pointer",
                            fontSize: ".7rem",
                            fontWeight: 700,
                          }}
                        >
                          {t.bo_copy}
                        </button>
                      </div>
                    ) : (
                      <ActionBtn onClick={() => handleCreatePromo(d)}>
                        {t.bo_create_promo}
                      </ActionBtn>
                    )}

                    <ActionBtn onClick={() => handleExportCSV(d)}>
                      {t.bo_export_pax}
                    </ActionBtn>
                    <ActionBtn danger onClick={() => handleCancel(d)}>
                      {t.bo_cancel_refund}
                    </ActionBtn>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function ActionBtn({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: danger ? "rgba(248,113,113,.07)" : "rgba(245,241,232,.04)",
        border: `1px solid ${danger ? "rgba(248,113,113,.18)" : "rgba(245,241,232,.08)"}`,
        borderRadius: ".75rem",
        padding: ".5rem .875rem",
        fontWeight: 700,
        fontSize: ".75rem",
        color: danger ? "#F87171" : "rgba(245,241,232,.6)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = danger
          ? "rgba(248,113,113,.4)"
          : "rgba(232,93,4,.3)";
        e.currentTarget.style.color = danger ? "#FCA5A5" : "#FAF8F3";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = danger
          ? "rgba(248,113,113,.18)"
          : "rgba(245,241,232,.08)";
        e.currentTarget.style.color = danger
          ? "#F87171"
          : "rgba(245,241,232,.6)";
      }}
    >
      {children}
    </button>
  );
}
