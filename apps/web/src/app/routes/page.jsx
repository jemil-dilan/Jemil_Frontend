"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RouteModal from "../../components/RouteModal";
import { useLang } from "@/utils/lang";

const IMG_AERIAL =
  "https://raw.createusercontent.com/643c4def-9fd0-465e-85e6-e58b6f57fcdb/";
const IMG_BUS_HERO =
  "https://raw.createusercontent.com/56470fa8-5108-46ad-bd1f-93663bc0d8f6/";

const ALL_ROUTES = [
  {
    from: "Douala",
    to: "Yaoundé",
    fromCode: "DLA",
    toCode: "YDE",
    duration: "4h",
    km: 245,
    priceFrom: 5000,
    departures: 22,
    agencies: 8,
    rating: 4.8,
    popular: true,
  },
  {
    from: "Yaoundé",
    to: "Bafoussam",
    fromCode: "YDE",
    toCode: "BFS",
    duration: "3h30",
    km: 180,
    priceFrom: 4500,
    departures: 16,
    agencies: 6,
    rating: 4.7,
    popular: true,
  },
  {
    from: "Douala",
    to: "Bafoussam",
    fromCode: "DLA",
    toCode: "BFS",
    duration: "6h",
    km: 380,
    priceFrom: 8000,
    departures: 14,
    agencies: 5,
    rating: 4.6,
    popular: true,
  },
  {
    from: "Douala",
    to: "Limbe",
    fromCode: "DLA",
    toCode: "LIM",
    duration: "1h30",
    km: 70,
    priceFrom: 2000,
    departures: 30,
    agencies: 9,
    rating: 4.9,
    popular: false,
  },
  {
    from: "Yaoundé",
    to: "Ngaoundéré",
    fromCode: "YDE",
    toCode: "NGE",
    duration: "8h",
    km: 450,
    priceFrom: 9500,
    departures: 8,
    agencies: 4,
    rating: 4.5,
    popular: false,
  },
  {
    from: "Bafoussam",
    to: "Bamenda",
    fromCode: "BFS",
    toCode: "BDA",
    duration: "2h",
    km: 90,
    priceFrom: 2500,
    departures: 18,
    agencies: 6,
    rating: 4.7,
    popular: false,
  },
  {
    from: "Douala",
    to: "Buea",
    fromCode: "DLA",
    toCode: "BUE",
    duration: "2h",
    km: 80,
    priceFrom: 2200,
    departures: 25,
    agencies: 7,
    rating: 4.8,
    popular: false,
  },
  {
    from: "Yaoundé",
    to: "Ebolowa",
    fromCode: "YDE",
    toCode: "EBW",
    duration: "3h",
    km: 150,
    priceFrom: 4000,
    departures: 10,
    agencies: 4,
    rating: 4.6,
    popular: false,
  },
  {
    from: "Douala",
    to: "Kumba",
    fromCode: "DLA",
    toCode: "KBI",
    duration: "3h",
    km: 120,
    priceFrom: 3500,
    departures: 12,
    agencies: 5,
    rating: 4.5,
    popular: false,
  },
  {
    from: "Yaoundé",
    to: "Bertoua",
    fromCode: "YDE",
    toCode: "BTA",
    duration: "5h",
    km: 280,
    priceFrom: 7000,
    departures: 7,
    agencies: 3,
    rating: 4.4,
    popular: false,
  },
  {
    from: "Bafoussam",
    to: "Yaoundé",
    fromCode: "BFS",
    toCode: "YDE",
    duration: "3h30",
    km: 180,
    priceFrom: 4500,
    departures: 14,
    agencies: 5,
    rating: 4.7,
    popular: false,
  },
  {
    from: "Ngaoundéré",
    to: "Garoua",
    fromCode: "NGE",
    toCode: "GOU",
    duration: "4h",
    km: 200,
    priceFrom: 5500,
    departures: 6,
    agencies: 3,
    rating: 4.3,
    popular: false,
  },
];

const CITIES = [...new Set(ALL_ROUTES.flatMap((r) => [r.from, r.to]))].sort();

// Cameroon SVG Map with route highlights
function CameroonMap({ selectedRoute }) {
  const nodes = {
    DLA: { x: 120, y: 310, label: "Douala" },
    YDE: { x: 280, y: 270, label: "Yaoundé" },
    BFS: { x: 210, y: 180, label: "Bafoussam" },
    BDA: { x: 155, y: 145, label: "Bamenda" },
    NGE: { x: 340, y: 120, label: "Ngaoundéré" },
    LIM: { x: 100, y: 350, label: "Limbe" },
    BUE: { x: 130, y: 340, label: "Buea" },
    EBW: { x: 255, y: 340, label: "Ebolowa" },
    KBI: { x: 145, y: 290, label: "Kumba" },
    BTA: { x: 390, y: 250, label: "Bertoua" },
    GOU: { x: 360, y: 80, label: "Garoua" },
  };

  const routeLines = ALL_ROUTES.map((r) => ({
    x1: nodes[r.fromCode]?.x,
    y1: nodes[r.fromCode]?.y,
    x2: nodes[r.toCode]?.x,
    y2: nodes[r.toCode]?.y,
    from: r.fromCode,
    to: r.toCode,
    active:
      selectedRoute &&
      selectedRoute.fromCode === r.fromCode &&
      selectedRoute.toCode === r.toCode,
  })).filter((l) => l.x1 && l.x2);

  return (
    <svg
      viewBox="0 0 460 420"
      className="w-full max-w-md mx-auto"
      style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
    >
      {/* Cameroon outline (simplified) */}
      <path
        d="M120 60 L140 40 L190 35 L240 42 L290 38 L340 50 L390 70 L420 110 L430 155 L420 195 L410 240 L400 280 L385 320 L365 355 L330 375 L290 385 L250 390 L210 385 L170 375 L140 360 L115 340 L95 310 L80 275 L75 240 L80 200 L85 160 L95 120 L120 60 Z"
        fill="#FFF5E8"
        stroke="#E8DDD0"
        strokeWidth="2"
      />

      {/* Route lines */}
      {routeLines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={l.active ? "#E85D04" : "#E8C9A0"}
          strokeWidth={l.active ? 3 : 1.5}
          strokeDasharray={l.active ? "0" : "5 3"}
          opacity={l.active ? 1 : 0.6}
        />
      ))}

      {/* City nodes */}
      {Object.entries(nodes).map(([code, pos]) => {
        const isActive =
          selectedRoute &&
          (selectedRoute.fromCode === code || selectedRoute.toCode === code);
        return (
          <g key={code}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 9 : 6}
              fill={isActive ? "#E85D04" : "#CC7722"}
              opacity={isActive ? 1 : 0.75}
            />
            {isActive && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r="13"
                fill="none"
                stroke="#E85D04"
                strokeWidth="2"
                opacity="0.4"
              />
            )}
            <text
              x={pos.x}
              y={pos.y - 13}
              textAnchor="middle"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "9px",
                fill: "#2C2C2C",
              }}
            >
              {pos.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RoutesPage() {
  const { t } = useLang();
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [selRoute, setSelRoute] = useState(null);

  const filtered = ALL_ROUTES.filter(
    (r) =>
      (!filterFrom || r.from === filterFrom) &&
      (!filterTo || r.to === filterTo),
  );

  return (
    <>
      <Header />
      {selRoute && (
        <RouteModal
          route={{
            from: selRoute.from,
            to: selRoute.to,
            fC: selRoute.fromCode,
            tC: selRoute.toCode,
            dur: selRoute.duration,
            km: selRoute.km,
            price: selRoute.priceFrom,
            buses: selRoute.departures,
          }}
          onClose={() => setSelRoute(null)}
        />
      )}
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        {/* Page Hero — real aerial photo */}
        <section
          style={{
            background: "#0D0D0D",
            paddingTop: "7rem",
            paddingBottom: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={IMG_AERIAL}
            alt="Cameroon roads"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              opacity: 0.18,
            }}
          />
          <img
            src={IMG_BUS_HERO}
            alt="JEMIL bus"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              height: "85%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "right bottom",
              opacity: 0.22,
              maskImage: "linear-gradient(90deg, transparent 0%, black 30%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 30%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(13,13,13,.95) 0%, rgba(13,13,13,.6) 65%, rgba(13,13,13,.2) 100%)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
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
              {t.routes_badge}
            </p>
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#FAF8F3",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              {t.routes_title}
            </h1>
            <p
              style={{
                color: "rgba(245,241,232,0.55)",
                fontFamily: "Merriweather, serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                maxWidth: "520px",
                lineHeight: 1.8,
              }}
            >
              {t.routes_sub(ALL_ROUTES.length)}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <select
                value={filterFrom}
                onChange={(e) => setFilterFrom(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  color: "#FAF8F3",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  outline: "none",
                  colorScheme: "dark",
                }}
              >
                <option value="">{t.routes_all_dep}</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={filterTo}
                onChange={(e) => setFilterTo(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  color: "#FAF8F3",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  outline: "none",
                  colorScheme: "dark",
                }}
              >
                <option value="">{t.routes_all_dest}</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {(filterFrom || filterTo) && (
                <button
                  onClick={() => {
                    setFilterFrom("");
                    setFilterTo("");
                  }}
                  style={{
                    background: "rgba(232,93,4,0.2)",
                    border: "1px solid rgba(232,93,4,0.4)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1.25rem",
                    color: "#E85D04",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  {t.routes_clear}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Map + Routes grid */}
        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Map panel — unchanged */}
            <div className="lg:col-span-1">
              <div
                style={{
                  position: "sticky",
                  top: "100px",
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #E8E4DA",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#0D0D0D",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.routes_map}
                </h3>
                <CameroonMap selectedRoute={hoveredRoute} />
                {hoveredRoute ? (
                  <div
                    style={{
                      marginTop: "1rem",
                      textAlign: "center",
                      background: "#FFF5E8",
                      borderRadius: "0.75rem",
                      padding: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {hoveredRoute.from} → {hoveredRoute.to}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        color: "#E85D04",
                        marginTop: "0.25rem",
                      }}
                    >
                      {hoveredRoute.km} km · {hoveredRoute.duration}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <div
                      style={{
                        color: "#999",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.75rem",
                      }}
                    >
                      {t.routes_map_hint}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Routes list — Book buttons now open modal */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "#666",
                  }}
                >
                  {t.routes_found(filtered.length)}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {filtered.map((route, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRoute(route)}
                    onMouseLeave={() => setHoveredRoute(null)}
                    style={{
                      background: "white",
                      borderRadius: "1.25rem",
                      border: "1.5px solid",
                      borderColor:
                        hoveredRoute === route ? "#E85D04" : "#E8E4DA",
                      padding: "1.5rem",
                      transition: "all 0.2s",
                      boxShadow:
                        hoveredRoute === route
                          ? "0 8px 30px rgba(232,93,4,0.12)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 900,
                                fontSize: "1.5rem",
                                color: "#0D0D0D",
                              }}
                            >
                              {route.fromCode}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                style={{
                                  width: "30px",
                                  height: "1px",
                                  background: "#E85D04",
                                  opacity: 0.5,
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  color: "#999",
                                }}
                              >
                                {route.duration}
                              </span>
                              <div
                                style={{
                                  width: "30px",
                                  height: "1px",
                                  background: "#E85D04",
                                  opacity: 0.5,
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 900,
                                fontSize: "1.5rem",
                                color: "#0D0D0D",
                              }}
                            >
                              {route.toCode}
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              color: "#888",
                              marginTop: "0.25rem",
                            }}
                          >
                            {route.from} → {route.to} · {route.km} km
                          </div>
                        </div>
                        {route.popular && (
                          <span
                            style={{
                              background: "#FFF5E8",
                              border: "1px solid #E85D04",
                              color: "#E85D04",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 700,
                              fontSize: "0.65rem",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "999px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t.routes_popular}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 900,
                              fontSize: "1.1rem",
                              color: "#E85D04",
                            }}
                          >
                            {route.departures}
                          </div>
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              color: "#999",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {t.routes_buses_day}
                          </div>
                        </div>
                        <div className="text-center hidden sm:block">
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 900,
                              fontSize: "1.1rem",
                              color: "#0D0D0D",
                            }}
                          >
                            {route.rating} ★
                          </div>
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              color: "#999",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {t.routes_rating}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              color: "#999",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {t.routes_from}
                          </div>
                          <div
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 900,
                              fontSize: "1.3rem",
                              color: "#0D0D0D",
                            }}
                          >
                            {route.priceFrom.toLocaleString()}{" "}
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#999",
                              }}
                            >
                              XAF
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelRoute(route)}
                          style={{
                            background: "#0D0D0D",
                            color: "#FAF8F3",
                            border: "none",
                            borderRadius: "999px",
                            padding: "0.75rem 1.5rem",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 800,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#E85D04")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#0D0D0D")
                          }
                        >
                          {t.routes_book}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
