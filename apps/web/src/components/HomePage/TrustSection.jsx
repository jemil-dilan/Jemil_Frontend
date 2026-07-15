import { useReveal } from "@/hooks/useReveal";
import { IMG_PASSENGER } from "@/data/images";
import { useLang } from "@/utils/lang";

export function TrustSection() {
  const { t } = useLang();
  var r3 = useReveal(0.12);
  var trustRef = r3[0];
  var trustVis = r3[1];

  const trustStats = [
    { n: t.trust_s1_v, l: t.trust_s1_k, d: t.trust_s1_b },
    { n: t.trust_s2_v, l: t.trust_s2_k, d: t.trust_s2_b },
    { n: t.trust_s3_v, l: t.trust_s3_k, d: t.trust_s3_b },
    { n: t.trust_s4_v, l: t.trust_s4_k, d: t.trust_s4_b },
  ];

  return (
    <section
      ref={trustRef}
      style={{
        background: "#0D0D0D",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{ display: "grid", alignItems: "center", gap: "5rem" }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Stats */}
          <div
            style={{
              transition: "opacity .9s, transform .9s",
              opacity: trustVis ? 1 : 0,
              transform: trustVis ? "none" : "translateY(50px)",
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
              {t.trust_badge}
            </p>
            <h2
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,4.5vw,3.5rem)",
                color: "#FAF8F3",
                lineHeight: 1.05,
                letterSpacing: "-.04em",
                marginBottom: "3rem",
              }}
            >
              {t.trust_title1}
              <br />
              {t.trust_title2}
            </h2>
            {trustStats.map(function (stat, i) {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid rgba(245,241,232,.07)",
                    transition:
                      "opacity .55s " +
                      (0.2 + i * 0.1) +
                      "s, transform .55s " +
                      (0.2 + i * 0.1) +
                      "s",
                    opacity: trustVis ? 1 : 0,
                    transform: trustVis ? "none" : "translateX(-22px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "#E85D04",
                      minWidth: 68,
                      flexShrink: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.n}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 800,
                        fontSize: ".95rem",
                        color: "#FAF8F3",
                        marginBottom: ".3rem",
                      }}
                    >
                      {stat.l}
                    </div>
                    <div
                      style={{
                        fontFamily: "Merriweather,serif",
                        fontWeight: 300,
                        fontSize: ".82rem",
                        color: "rgba(245,241,232,.42)",
                        lineHeight: 1.8,
                      }}
                    >
                      {stat.d}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Photo */}
          <div
            style={{
              position: "relative",
              borderRadius: "2rem",
              overflow: "hidden",
              aspectRatio: "3/4",
              transition: "opacity .9s .25s, transform .9s .25s",
              opacity: trustVis ? 1 : 0,
              transform: trustVis ? "none" : "scale(.9)",
              boxShadow: "0 40px 100px rgba(0,0,0,.55)",
            }}
          >
            <img
              src={IMG_PASSENGER}
              alt="Happy JEMIL passenger"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(0deg, rgba(13,13,13,.75) 0%, transparent 48%)",
              }}
            />
            {/* Testimonial quote */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                right: "1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "Merriweather,serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: ".88rem",
                  color: "rgba(245,241,232,.85)",
                  lineHeight: 1.8,
                  marginBottom: ".75rem",
                }}
              >
                "{t.trust_quote}"
              </div>
              <div
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 800,
                  fontSize: ".75rem",
                  color: "#E85D04",
                }}
              >
                — {t.trust_attr}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
