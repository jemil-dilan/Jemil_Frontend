"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLang } from "@/utils/lang";

const IMG_AERIAL =
  "https://raw.createusercontent.com/643c4def-9fd0-465e-85e6-e58b6f57fcdb/";
const IMG_AGENCY =
  "https://raw.createusercontent.com/e028914f-e490-4bd8-ae7d-197bd96baec4/";
const IMG_BOOKING =
  "https://raw.createusercontent.com/e3d786b0-8f6a-42d6-9704-6db095727e42/";
const IMG_BUS_HERO =
  "https://raw.createusercontent.com/56470fa8-5108-46ad-bd1f-93663bc0d8f6/";
const IMG_FAMILY =
  "https://raw.createusercontent.com/9c8779d8-7267-4786-b6be-d28008842a06/";

function useRevealLocal(threshold) {
  var ref = useRef(null);
  var vis = useRef(false);
  var forceUpdate = useState(0)[1];
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !vis.current) {
          vis.current = true;
          forceUpdate(function (n) {
            return n + 1;
          });
          obs.disconnect();
        }
      },
      { threshold: threshold || 0.1 },
    );
    obs.observe(el);
    return function () {
      obs.disconnect();
    };
  }, []);
  return [ref, vis.current];
}

export default function AboutPage() {
  const { t } = useLang();
  var rv0 = useRevealLocal(0.1);
  var missionRef = rv0[0];
  var missionVis = rv0[1];
  var rv1 = useRevealLocal(0.1);
  var timelineRef = rv1[0];
  var timelineVis = rv1[1];
  var rv2 = useRevealLocal(0.1);
  var teamRef = rv2[0];
  var teamVis = rv2[1];

  const TEAM = t.about_team_members;
  const TIMELINE = t.about_timeline;

  const missionCards = [
    { n: "🇨🇲", title: t.about_card1_t, d: t.about_card1_b },
    { n: "🌍", title: t.about_card2_t, d: t.about_card2_b },
    { n: "📱", title: t.about_card3_t, d: t.about_card3_b },
    { n: "💸", title: t.about_card4_t, d: t.about_card4_b },
  ];

  const values = [
    { t: t.about_val1_t, b: t.about_val1_b },
    { t: t.about_val2_t, b: t.about_val2_b },
    { t: t.about_val3_t, b: t.about_val3_b },
  ];

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        {/* ── HERO ── */}
        <section
          style={{
            background: "#0D0D0D",
            paddingTop: "7rem",
            paddingBottom: "5rem",
            position: "relative",
            overflow: "hidden",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={IMG_AERIAL}
            alt="Cameroon road"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              opacity: 0.35,
            }}
          />
          <img
            src={IMG_BUS_HERO}
            alt="JEMIL bus"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              height: "80%",
              width: "auto",
              opacity: 0.2,
              maskImage: "linear-gradient(90deg,transparent 0%,black 25%)",
              WebkitMaskImage:
                "linear-gradient(90deg,transparent 0%,black 25%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(13,13,13,.92) 0%, rgba(13,13,13,.55) 60%, rgba(13,13,13,.1) 100%)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div style={{ maxWidth: "700px" }}>
              <p
                style={{
                  color: "#E85D04",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {t.about_story_badge}
              </p>
              <h1
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  color: "#FAF8F3",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  marginBottom: "2rem",
                }}
              >
                {t.about_story_h1}
                <br />
                <span style={{ color: "#E85D04" }}>{t.about_story_h2}</span>
              </h1>
              <p
                style={{
                  fontFamily: "Merriweather, serif",
                  fontWeight: 300,
                  fontSize: "1.1rem",
                  color: "rgba(245,241,232,0.65)",
                  lineHeight: 1.9,
                  maxWidth: "580px",
                }}
              >
                {t.about_story_body}
              </p>
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section
          ref={missionRef}
          style={{
            background: "#F5F1E8",
            padding: "6rem 0",
            overflow: "hidden",
          }}
        >
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                style={{
                  transition: "opacity .9s, transform .9s",
                  opacity: missionVis ? 1 : 0,
                  transform: missionVis ? "none" : "translateX(-50px)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "#0D0D0D",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.about_mission_h}
                  <br />
                  <span style={{ color: "#E85D04" }}>{t.about_mission_h2}</span>
                </h2>
                <p
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    color: "#555",
                    lineHeight: 1.9,
                    marginBottom: "1.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  {t.about_mission_p1}
                </p>
                <p
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    color: "#555",
                    lineHeight: 1.9,
                    fontSize: "0.95rem",
                    marginBottom: "2rem",
                  }}
                >
                  {t.about_mission_p2}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {missionCards.map((v, i) => (
                    <div
                      key={i}
                      style={{
                        background: "white",
                        borderRadius: "1.25rem",
                        padding: "1.25rem",
                        border: "1px solid #E8E4DA",
                        transition: `opacity .6s ${0.3 + i * 0.12}s, transform .6s ${0.3 + i * 0.12}s`,
                        opacity: missionVis ? 1 : 0,
                        transform: missionVis ? "none" : "translateY(20px)",
                      }}
                    >
                      <div
                        style={{ fontSize: "1.75rem", marginBottom: "0.65rem" }}
                      >
                        {v.n}
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          color: "#0D0D0D",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {v.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "Merriweather, serif",
                          fontWeight: 300,
                          fontSize: "0.78rem",
                          color: "#888",
                          lineHeight: 1.6,
                        }}
                      >
                        {v.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  transition: "opacity .9s .15s, transform .9s .15s",
                  opacity: missionVis ? 1 : 0,
                  transform: missionVis
                    ? "none"
                    : "translateX(50px) scale(.96)",
                }}
              >
                <div
                  style={{
                    borderRadius: "2rem",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    boxShadow: "0 30px 70px rgba(0,0,0,.18)",
                  }}
                >
                  <img
                    src={IMG_AGENCY}
                    alt="Bus agency counter"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1.5rem",
                    left: "-1.5rem",
                    width: "55%",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,.25)",
                    border: "4px solid #F5F1E8",
                  }}
                >
                  <img
                    src={IMG_BOOKING}
                    alt="People booking"
                    style={{
                      width: "100%",
                      display: "block",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section
          ref={timelineRef}
          style={{ background: "#FAF8F3", padding: "6rem 0" }}
        >
          <div className="container" style={{ maxWidth: "860px" }}>
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#0D0D0D",
                letterSpacing: "-0.03em",
                marginBottom: "4rem",
                textAlign: "center",
                transition: "opacity .7s, transform .7s",
                opacity: timelineVis ? 1 : 0,
                transform: timelineVis ? "none" : "translateY(30px)",
              }}
            >
              {t.about_timeline_badge}
            </h2>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "120px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background: "#E8E4DA",
                }}
              />
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "3rem",
                    marginBottom: "3rem",
                    position: "relative",
                    transition: `opacity .65s ${0.1 + i * 0.1}s, transform .65s ${0.1 + i * 0.1}s`,
                    opacity: timelineVis ? 1 : 0,
                    transform: timelineVis ? "none" : "translateX(-20px)",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      flexShrink: 0,
                      textAlign: "right",
                      paddingRight: "1.5rem",
                      paddingTop: "0.2rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "0.85rem",
                        color: "#E85D04",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "113px",
                      top: "6px",
                      width: "16px",
                      height: "16px",
                      background:
                        i === TIMELINE.length - 1 ? "#E85D04" : "white",
                      border: "3px solid #E85D04",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  />
                  <div style={{ flex: 1, paddingLeft: "1rem" }}>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.05rem",
                        color: "#0D0D0D",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Merriweather, serif",
                        fontWeight: 300,
                        fontSize: "0.9rem",
                        color: "#666",
                        lineHeight: 1.8,
                      }}
                    >
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section
          ref={teamRef}
          style={{
            background: "#0D0D0D",
            padding: "6rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={IMG_FAMILY}
            alt="Team"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.06,
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#FAF8F3",
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem",
                transition: "opacity .7s, transform .7s",
                opacity: teamVis ? 1 : 0,
                transform: teamVis ? "none" : "translateY(25px)",
              }}
            >
              {t.about_team_badge}
            </h2>
            <p
              style={{
                fontFamily: "Merriweather, serif",
                fontWeight: 300,
                color: "rgba(245,241,232,0.5)",
                marginBottom: "3rem",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                transition: "opacity .7s .1s",
                opacity: teamVis ? 1 : 0,
              }}
            >
              {t.about_team_sub}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {TEAM.map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(245,241,232,0.04)",
                    borderRadius: "1.25rem",
                    padding: "2rem",
                    border: "1px solid rgba(245,241,232,0.08)",
                    display: "flex",
                    gap: "1.5rem",
                    transition: `opacity .65s ${0.15 + i * 0.12}s, transform .65s ${0.15 + i * 0.12}s`,
                    opacity: teamVis ? 1 : 0,
                    transform: teamVis ? "none" : "translateY(25px)",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #E85D04, #CC5500)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "1rem",
                        color: "#FAF8F3",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {m.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        color: "#E85D04",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {m.role}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        color: "rgba(245,241,232,.35)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      📍 {m.city}
                    </div>
                    <p
                      style={{
                        fontFamily: "Merriweather, serif",
                        fontWeight: 300,
                        fontSize: "0.85rem",
                        color: "rgba(245,241,232,.55)",
                        lineHeight: 1.8,
                      }}
                    >
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "6rem 0",
          }}
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
              objectPosition: "center 60%",
              opacity: 0.18,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #E85D04 0%, #CC3D00 100%)",
              opacity: 0.93,
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "white",
                letterSpacing: "-0.03em",
                marginBottom: "3rem",
              }}
            >
              {t.about_values_badge}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: "3px solid rgba(255,255,255,0.4)",
                    paddingTop: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                      color: "white",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {v.t}
                  </div>
                  <div
                    style={{
                      fontFamily: "Merriweather, serif",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.9,
                      fontSize: "0.9rem",
                    }}
                  >
                    {v.b}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
