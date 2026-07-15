import { useReveal } from "@/hooks/useReveal";
import { IMG_BUS_HERO } from "@/data/images";
import { useLang } from "@/utils/lang";

export function FinalCTASection() {
  const { t } = useLang();
  var r4 = useReveal(0.18);
  var ctaRef = r4[0];
  var ctaVis = r4[1];

  return (
    <section
      ref={ctaRef}
      style={{ position: "relative", overflow: "hidden", padding: "8rem 0" }}
    >
      <img
        src={IMG_BUS_HERO}
        alt="JEMIL bus"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 55%",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #E85D04 0%, #B33D00 100%)",
          opacity: 0.92,
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            maxWidth: 680,
            transition: "opacity .8s, transform .8s",
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? "none" : "translateY(40px)",
          }}
        >
          <h2
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem,8vw,6rem)",
              color: "#FAF8F3",
              lineHeight: 0.93,
              letterSpacing: "-.05em",
              marginBottom: "2rem",
            }}
          >
            {t.cta_ready}
            <br />
            {t.cta_book}
          </h2>
          <p
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(245,241,232,.78)",
              lineHeight: 1.9,
              marginBottom: "2.5rem",
              maxWidth: 500,
            }}
          >
            {t.cta_sub}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/book" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#FAF8F3",
                  color: "#E85D04",
                  border: "none",
                  borderRadius: "999px",
                  padding: "1.1rem 2.75rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 8px 30px rgba(0,0,0,.2)",
                }}
              >
                {t.cta_btn1}
              </button>
            </a>
            <a href="/routes" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "rgba(245,241,232,.85)",
                  border: "2px solid rgba(245,241,232,.4)",
                  borderRadius: "999px",
                  padding: "1.1rem 2.75rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                {t.cta_btn2}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
