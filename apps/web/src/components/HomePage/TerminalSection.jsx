import { IMG_TERMINAL } from "@/data/images";
import { useLang } from "@/utils/lang";

export function TerminalSection() {
  const { t } = useLang();
  return (
    <section
      style={{
        position: "relative",
        height: "56vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={IMG_TERMINAL}
        alt="Douala bus terminal at dawn"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 45%",
          transition: "transform 8s ease",
          transform: "scale(1.04)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(13,13,13,.9) 0%, rgba(13,13,13,.45) 55%, rgba(13,13,13,.1) 100%)",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <p
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".72rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#E85D04",
            marginBottom: ".75rem",
          }}
        >
          {t.term_badge}
        </p>
        <h2
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem,6vw,4.5rem)",
            color: "#FAF8F3",
            lineHeight: 1.05,
            letterSpacing: "-.04em",
            marginBottom: "1.5rem",
          }}
        >
          {t.term_l1}
          <br />
          {t.term_l2}
          <br />
          {t.term_l3}
        </h2>
        <a href="/routes" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "rgba(245,241,232,.1)",
              backdropFilter: "blur(12px)",
              color: "#FAF8F3",
              border: "2px solid rgba(245,241,232,.3)",
              borderRadius: "999px",
              padding: ".9rem 2rem",
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 800,
              fontSize: ".9rem",
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E85D04";
              e.currentTarget.style.borderColor = "#E85D04";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,241,232,.1)";
              e.currentTarget.style.borderColor = "rgba(245,241,232,.3)";
            }}
          >
            {t.term_cta}
          </button>
        </a>
      </div>
    </section>
  );
}
