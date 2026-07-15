import { motion } from "motion/react";
import { TYPE_COLORS } from "@/data/busTypeColors";
import { useLang } from "@/utils/lang";

export function BusSelectionStep({ agencies, selBus, setSelBus, setStep }) {
  const { t } = useLang();
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => setStep(0)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(245,241,232,.45)",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 700,
          fontSize: ".8rem",
          cursor: "pointer",
          marginBottom: "1.25rem",
          textAlign: "left",
          padding: 0,
        }}
      >
        {t.modal_back}
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".875rem",
          flex: 1,
        }}
      >
        {agencies.map((a, i) => {
          var tc = TYPE_COLORS[a.type] || TYPE_COLORS.Standard;
          var isSel = selBus === a.name;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.013,
                boxShadow: "0 8px 32px rgba(232,93,4,.18)",
              }}
              whileTap={{ scale: 0.983 }}
              onClick={() => {
                setSelBus(a.name);
                setStep(2);
              }}
              style={{
                background: isSel
                  ? "rgba(232,93,4,.1)"
                  : "rgba(245,241,232,.04)",
                borderRadius: "1.1rem",
                padding: "1.25rem",
                cursor: "pointer",
                border: `1.5px solid ${isSel ? "#E85D04" : "rgba(245,241,232,.08)"}`,
                boxShadow: isSel ? "0 0 30px rgba(232,93,4,.22)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: ".5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".6rem",
                      marginBottom: ".3rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: "1rem",
                        color: "#FAF8F3",
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        background: tc.bg,
                        border: `1px solid ${tc.border}`,
                        color: tc.text,
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 700,
                        fontSize: ".58rem",
                        padding: ".18rem .5rem",
                        borderRadius: 999,
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      {a.type}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".82rem",
                      color: "rgba(245,241,232,.5)",
                      marginBottom: ".6rem",
                    }}
                  >
                    {a.dep} → {a.arr} &nbsp;·&nbsp; ★ {a.rating} &nbsp;·&nbsp;{" "}
                    {a.seats} {t.modal_seats_left}
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}
                  >
                    {a.amenities.map((am) => (
                      <span
                        key={am}
                        style={{
                          background: "rgba(245,241,232,.08)",
                          color: "rgba(245,241,232,.5)",
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 600,
                          fontSize: ".62rem",
                          padding: ".2rem .55rem",
                          borderRadius: 999,
                        }}
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "#E85D04",
                      lineHeight: 1,
                    }}
                  >
                    {a.price.toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 600,
                      fontSize: ".65rem",
                      color: "rgba(245,241,232,.35)",
                    }}
                  >
                    {t.modal_per_seat}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".75rem",
                      color: "rgba(245,241,232,.45)",
                      marginTop: ".5rem",
                    }}
                  >
                    {t.modal_select}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
