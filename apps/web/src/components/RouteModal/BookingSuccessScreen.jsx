import { motion } from "motion/react";
import { useLang } from "@/utils/lang";

/* ── Confetti burst ── */
function Confetti() {
  var dots = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    color: ["#E85D04", "#4ADE80", "#FFD700", "#FF6B6B", "#60A5FA", "#A78BFA"][
      i % 6
    ],
    left: 12 + Math.random() * 76,
    delay: Math.random() * 0.55,
    dur: 0.72 + Math.random() * 0.55,
  }));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {dots.map((d) => (
        <div
          key={d.id}
          className="confetti-dot"
          style={{
            background: d.color,
            left: d.left + "%",
            top: "18%",
            animationDelay: d.delay + "s",
            animationDuration: d.dur + "s",
          }}
        />
      ))}
    </div>
  );
}

export function BookingSuccessScreen({
  route,
  chosenBus,
  name,
  phone,
  date,
  selSeat,
  confRef,
  handleClose,
  showConfetti,
}) {
  const { lang, t } = useLang();
  const fields = [
    [t.modal_passenger, name],
    [t.modal_agency, chosenBus.name],
    [t.modal_departure, chosenBus.dep],
    [
      t.modal_date_label,
      new Date(date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    ],
    [t.modal_seat, `Siège ${selSeat}`],
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showConfetti && <Confetti />}

      {/* Success ring — spring pop */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          damping: 14,
          stiffness: 240,
          delay: 0.08,
        }}
        style={{
          position: "relative",
          width: 90,
          height: 90,
          marginBottom: "1.75rem",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid #4ADE80",
            animation: "successPing 1s ease-out 1",
          }}
        />
        <div
          style={{
            width: 90,
            height: 90,
            background: "rgba(74,222,128,.15)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(74,222,128,.4)",
          }}
        >
          <span style={{ fontSize: "2.2rem" }}>✓</span>
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1.8rem",
          color: "#FAF8F3",
          marginBottom: ".5rem",
          letterSpacing: "-.03em",
          zIndex: 1,
        }}
      >
        {t.modal_booked_title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.34 }}
        style={{
          fontFamily: "Merriweather,serif",
          fontWeight: 300,
          color: "rgba(245,241,232,.5)",
          fontSize: ".9rem",
          lineHeight: 1.8,
          marginBottom: "2rem",
          zIndex: 1,
        }}
      >
        {t.modal_booked_sub(phone)}
      </motion.p>

      {/* Ticket card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "rgba(245,241,232,.05)",
          border: "1px solid rgba(245,241,232,.1)",
          borderRadius: "1.25rem",
          overflow: "hidden",
          marginBottom: "1.75rem",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#E85D04,#CC5500)",
            padding: "1rem 1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              color: "white",
              fontSize: ".9rem",
            }}
          >
            {t.modal_ticket}
          </span>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              color: "rgba(255,255,255,.7)",
              fontSize: ".72rem",
            }}
          >
            #{confRef}
          </span>
        </div>
        <div style={{ padding: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  color: "#FAF8F3",
                  lineHeight: 1,
                }}
              >
                {route.fC}
              </div>
              <div
                style={{
                  color: "rgba(245,241,232,.4)",
                  fontSize: ".65rem",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                {route.from}
              </div>
            </div>
            <div
              style={{
                color: "#E85D04",
                alignSelf: "center",
                fontSize: "1.2rem",
              }}
            >
              →
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  color: "#FAF8F3",
                  lineHeight: 1,
                }}
              >
                {route.tC}
              </div>
              <div
                style={{
                  color: "rgba(245,241,232,.4)",
                  fontSize: ".65rem",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                {route.to}
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "2px dashed rgba(245,241,232,.08)",
              margin: ".75rem 0",
            }}
          />
          {fields.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".45rem",
              }}
            >
              <span
                style={{
                  color: "rgba(245,241,232,.32)",
                  fontSize: ".65rem",
                  fontFamily: "Montserrat,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  color: "#FAF8F3",
                  fontSize: ".75rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              background: "#E85D04",
              borderRadius: ".75rem",
              padding: ".6rem",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                color: "white",
                fontSize: "1.25rem",
              }}
            >
              {chosenBus.price.toLocaleString()} XAF
            </span>
          </div>
        </div>
      </motion.div>

      <div
        style={{
          display: "flex",
          gap: ".75rem",
          width: "100%",
          maxWidth: 360,
          zIndex: 1,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
          style={{
            flex: 1,
            background: "rgba(245,241,232,.08)",
            color: "rgba(245,241,232,.7)",
            border: "none",
            borderRadius: "999px",
            padding: ".875rem",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".85rem",
            cursor: "pointer",
          }}
        >
          {t.modal_close}
        </motion.button>
        <a href="/track" style={{ flex: 1, textDecoration: "none" }}>
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 35px rgba(232,93,4,.55)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#E85D04,#CC5500)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: ".875rem",
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: ".85rem",
              cursor: "pointer",
            }}
          >
            {t.modal_track}
          </motion.button>
        </a>
      </div>
    </div>
  );
}
