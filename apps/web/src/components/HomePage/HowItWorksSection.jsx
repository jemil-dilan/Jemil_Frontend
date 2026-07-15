import { useReveal } from "@/hooks/useReveal";
import { IMG_INTERIOR } from "@/data/images";
import { useLang } from "@/utils/lang";

export function HowItWorksSection() {
  const { t } = useLang();
  var r1 = useReveal(0.12);
  var stepsRef = r1[0];
  var stepsVis = r1[1];

  const steps = [
    { n: "01", title: t.hiw_s1_title, desc: t.hiw_s1_body },
    { n: "02", title: t.hiw_s2_title, desc: t.hiw_s2_body },
    { n: "03", title: t.hiw_s3_title, desc: t.hiw_s3_body },
  ];

  return (
    <section
      ref={stepsRef}
      style={{
        background: "#0D0D0D",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Interior photo */}
          <div
            style={{
              position: "relative",
              borderRadius: "2rem",
              overflow: "hidden",
              aspectRatio: "4/3",
              transition: "opacity .9s, transform .9s",
              opacity: stepsVis ? 1 : 0,
              transform: stepsVis ? "none" : "translateX(-60px) scale(.96)",
            }}
          >
            <img
              src={IMG_INTERIOR}
              alt="Premium bus interior"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(13,13,13,.12) 0%, transparent 55%, rgba(13,13,13,.55) 100%)",
              }}
            />
            {/* Floating badges */}
            <div
              style={{
                position: "absolute",
                top: "1.25rem",
                left: "1.25rem",
                background: "rgba(13,13,13,.82)",
                backdropFilter: "blur(14px)",
                borderRadius: ".875rem",
                padding: ".7rem 1.2rem",
                border: "1px solid rgba(232,93,4,.3)",
              }}
            >
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  color: "#E85D04",
                  fontSize: "1.1rem",
                }}
              >
                40+
              </div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".58rem",
                  color: "rgba(245,241,232,.45)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                {t.hiw_stat1}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                right: "1.25rem",
                background: "rgba(13,13,13,.82)",
                backdropFilter: "blur(14px)",
                borderRadius: ".875rem",
                padding: ".7rem 1.2rem",
                border: "1px solid rgba(74,222,128,.3)",
              }}
            >
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  color: "#4ADE80",
                  fontSize: "1.1rem",
                }}
              >
                99%
              </div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".58rem",
                  color: "rgba(245,241,232,.45)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                {t.hiw_stat2}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div
            style={{
              transition: "opacity .9s .15s, transform .9s .15s",
              opacity: stepsVis ? 1 : 0,
              transform: stepsVis ? "none" : "translateX(60px)",
            }}
          >
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
              {t.hiw_badge}
            </p>
            <h2
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#FAF8F3",
                lineHeight: 1.1,
                letterSpacing: "-.03em",
                marginBottom: "2.5rem",
              }}
            >
              {t.hiw_title}
              <br />
              <span style={{ color: "#E85D04" }}>{t.hiw_title2}</span>
            </h2>
            {steps.map(function (s, i) {
              return (
                <div
                  key={s.n}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: "2rem",
                    transition:
                      "opacity .65s " +
                      (0.3 + i * 0.14) +
                      "s, transform .65s " +
                      (0.3 + i * 0.14) +
                      "s",
                    opacity: stepsVis ? 1 : 0,
                    transform: stepsVis ? "none" : "translateY(20px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "2.8rem",
                      color: "rgba(245,241,232,.07)",
                      lineHeight: 1,
                      flexShrink: 0,
                      width: 55,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ paddingTop: ".2rem" }}>
                    <div
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 800,
                        fontSize: ".98rem",
                        color: "#FAF8F3",
                        marginBottom: ".4rem",
                      }}
                    >
                      {s.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Merriweather,serif",
                        fontWeight: 300,
                        fontSize: ".865rem",
                        color: "rgba(245,241,232,.45)",
                        lineHeight: 1.8,
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
            <a href="/book" style={{ textDecoration: "none" }}>
              <button
                style={{
                  marginTop: "1rem",
                  background: "linear-gradient(135deg,#E85D04,#CC5500)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "1rem 2.5rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: ".95rem",
                  cursor: "pointer",
                  boxShadow: "0 0 35px rgba(232,93,4,.3)",
                  letterSpacing: ".02em",
                }}
              >
                {t.hiw_cta} →
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
