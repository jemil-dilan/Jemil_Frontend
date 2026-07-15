"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ROUTES } from "@/data/routes";
import RouteModal from "@/components/RouteModal";
import { useLang } from "@/utils/lang";

export function PopularRoutesSection() {
  const { t } = useLang();
  var r0 = useReveal(0.1);
  var routesRef = r0[0];
  var routesVis = r0[1];
  var selRoute = useState(null);
  var setSelRoute = selRoute[1];
  selRoute = selRoute[0];

  return (
    <>
      {selRoute && (
        <RouteModal
          route={selRoute}
          onClose={function () {
            setSelRoute(null);
          }}
        />
      )}
      <section
        style={{
          background: "#FAF8F3",
          paddingTop: "6rem",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{ marginBottom: "2.5rem" }}
          ref={routesRef}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              transition: "opacity .7s, transform .7s",
              opacity: routesVis ? 1 : 0,
              transform: routesVis ? "none" : "translateY(35px)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".72rem",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#E85D04",
                  marginBottom: ".6rem",
                }}
              >
                {t.pop_badge}
              </p>
              <h2
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem,5vw,3.5rem)",
                  color: "#0D0D0D",
                  lineHeight: 1.05,
                  letterSpacing: "-.03em",
                }}
              >
                {t.pop_title}
              </h2>
            </div>
            <a href="/routes" style={{ textDecoration: "none" }}>
              <button
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".8rem",
                  color: "#E85D04",
                  background: "none",
                  border: "2px solid #E85D04",
                  borderRadius: "999px",
                  padding: ".55rem 1.4rem",
                  cursor: "pointer",
                }}
              >
                {t.pop_view_all}
              </button>
            </a>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            paddingBottom: "4rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {ROUTES.map(function (r, i) {
            return (
              <div
                key={i}
                onClick={function () {
                  setSelRoute(r);
                }}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                  transition:
                    "opacity .6s " +
                    i * 0.1 +
                    "s, transform .6s " +
                    i * 0.1 +
                    "s",
                  opacity: routesVis ? 1 : 0,
                  transform: routesVis ? "none" : "translateX(50px)",
                }}
              >
                <div
                  style={{
                    width: 285,
                    background: "#0D0D0D",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    transition: "transform .25s, box-shadow .25s",
                  }}
                  onMouseEnter={function (e) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 50px rgba(232,93,4,.28)";
                  }}
                  onMouseLeave={function (e) {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      background:
                        "linear-gradient(90deg,#E85D04," +
                        (i % 2 ? "#CC5500" : "#9C3D00") +
                        ",transparent)",
                    }}
                  />
                  <div style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.1rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 900,
                            fontSize: "2.2rem",
                            color: "#FAF8F3",
                            lineHeight: 1,
                          }}
                        >
                          {r.fC}
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".62rem",
                            color: "rgba(245,241,232,.38)",
                          }}
                        >
                          {r.from}
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".58rem",
                            color: "rgba(245,241,232,.28)",
                            letterSpacing: ".06em",
                            marginBottom: 4,
                          }}
                        >
                          {r.dur} · {r.km}km
                        </div>
                        <svg width="56" height="10" viewBox="0 0 56 10">
                          <line
                            x1="0"
                            y1="5"
                            x2="50"
                            y2="5"
                            stroke="#E85D04"
                            strokeWidth="1.5"
                            strokeOpacity="0.55"
                            strokeDasharray="4 2.5"
                          />
                          <polygon
                            points="48,1 56,5 48,9"
                            fill="#E85D04"
                            opacity="0.65"
                          />
                        </svg>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 900,
                            fontSize: "2.2rem",
                            color: "#FAF8F3",
                            lineHeight: 1,
                          }}
                        >
                          {r.tC}
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".62rem",
                            color: "rgba(245,241,232,.38)",
                          }}
                        >
                          {r.to}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "1rem -1.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          background: "#FAF8F3",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          borderTop: "2px dashed rgba(245,241,232,.08)",
                        }}
                      />
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          background: "#FAF8F3",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".58rem",
                            color: "rgba(245,241,232,.32)",
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            marginBottom: 0.2,
                          }}
                        >
                          {t.pop_from}
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 900,
                            fontSize: "1.25rem",
                            color: "#E85D04",
                          }}
                        >
                          {r.price.toLocaleString()}{" "}
                          <span
                            style={{
                              fontSize: ".65rem",
                              fontWeight: 600,
                              color: "rgba(245,241,232,.3)",
                            }}
                          >
                            XAF
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".58rem",
                            color: "rgba(245,241,232,.32)",
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            marginBottom: 0.2,
                          }}
                        >
                          {t.pop_today}
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 700,
                            fontSize: ".95rem",
                            color: "#4ADE80",
                          }}
                        >
                          {r.buses} {t.buses} ●
                        </div>
                      </div>
                    </div>
                    {/* Book hint */}
                    <div
                      style={{
                        marginTop: "1rem",
                        textAlign: "center",
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 800,
                        fontSize: ".72rem",
                        color: "#E85D04",
                        letterSpacing: ".06em",
                        borderTop: "1px solid rgba(232,93,4,.15)",
                        paddingTop: ".75rem",
                      }}
                    >
                      {t.pop_tap}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
