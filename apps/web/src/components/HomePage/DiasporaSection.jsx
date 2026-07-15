import { useReveal } from "@/hooks/useReveal";
import { IMG_FAMILY } from "@/data/images";
import { useLang } from "@/utils/lang";

export function DiasporaSection() {
  const { t } = useLang();
  var r2 = useReveal(0.12);
  var diasRef = r2[0];
  var diasVis = r2[1];
  const features = [
    ["💶", t.dias_f1],
    ["📱", t.dias_f2],
    ["📍", t.dias_f3],
    ["🔁", t.dias_f4],
  ];

  return (
    <section
      ref={diasRef}
      style={{
        background: "#FAF8F3",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{ display: "grid", alignItems: "center", gap: "5rem" }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Text */}
          <div
            style={{
              transition: "opacity .9s, transform .9s",
              opacity: diasVis ? 1 : 0,
              transform: diasVis ? "none" : "translateX(-60px)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#E85D04",
                color: "#fff",
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 800,
                fontSize: ".68rem",
                padding: ".35rem 1rem",
                borderRadius: "999px",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              {t.dias_badge}
            </span>
            <h2
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,4.5vw,3.5rem)",
                color: "#0D0D0D",
                lineHeight: 1.05,
                letterSpacing: "-.04em",
                marginBottom: "1.5rem",
              }}
            >
              {t.dias_title1}
              <br />
              {t.dias_title2}
              <br />
              <span style={{ color: "#E85D04" }}>{t.dias_title3}</span>
            </h2>
            <p
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                color: "#555",
                lineHeight: 1.9,
                fontSize: ".95rem",
                marginBottom: "2.5rem",
              }}
            >
              {t.dias_body}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              {features.map(function (f, i) {
                return (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      borderRadius: "1rem",
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                      boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                      border: "1px solid #EFEBE3",
                      transition:
                        "opacity .55s " +
                        (0.4 + i * 0.12) +
                        "s, transform .55s " +
                        (0.4 + i * 0.12) +
                        "s",
                      opacity: diasVis ? 1 : 0,
                      transform: diasVis ? "none" : "translateY(22px)",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{f[0]}</span>
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 700,
                        fontSize: ".8rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {f[1]}
                    </span>
                  </div>
                );
              })}
            </div>
            <a href="/diaspora" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#0D0D0D",
                  color: "#FAF8F3",
                  border: "none",
                  borderRadius: "999px",
                  padding: "1rem 2.5rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: ".95rem",
                  cursor: "pointer",
                  transition: "background .2s",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "#E85D04";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "#0D0D0D";
                }}
              >
                {t.dias_cta}
              </button>
            </a>
          </div>

          {/* Real family photo */}
          <div
            style={{
              position: "relative",
              borderRadius: "2rem",
              overflow: "hidden",
              aspectRatio: "4/3",
              transition: "opacity .9s .2s, transform .9s .2s",
              opacity: diasVis ? 1 : 0,
              transform: diasVis ? "none" : "translateX(60px) scale(.95)",
              boxShadow: "0 30px 80px rgba(0,0,0,.18)",
            }}
          >
            <img
              src={IMG_FAMILY}
              alt="Cameroonian family reunion"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Overlay stats */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                right: "1.5rem",
                background: "rgba(13,13,13,.82)",
                backdropFilter: "blur(16px)",
                borderRadius: "1rem",
                padding: "1.25rem 1.5rem",
                border: "1px solid rgba(232,93,4,.22)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "1.7rem",
                    color: "#E85D04",
                  }}
                >
                  {t.dias_stat1}
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".62rem",
                    color: "rgba(245,241,232,.38)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  {t.dias_stat2}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "1.7rem",
                    color: "#4ADE80",
                  }}
                >
                  98%
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".62rem",
                    color: "rgba(245,241,232,.38)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  Happy families
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
