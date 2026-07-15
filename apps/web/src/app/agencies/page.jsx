"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLang } from "@/utils/lang";

const IMG_AGENCY =
  "https://raw.createusercontent.com/e028914f-e490-4bd8-ae7d-197bd96baec4/";
const IMG_BUS_HERO =
  "https://raw.createusercontent.com/56470fa8-5108-46ad-bd1f-93663bc0d8f6/";
const IMG_AERIAL =
  "https://raw.createusercontent.com/643c4def-9fd0-465e-85e6-e58b6f57fcdb/";

const AGENCIES = [
  {
    id: 1,
    name: "General Express",
    city: "Douala",
    routes: 12,
    rating: 4.9,
    trips: 8200,
    founded: 1998,
    type: "VIP",
    amenities: ["AC", "WiFi", "USB", "Reclining Seats"],
    description:
      "The gold standard of Cameroon intercity transport. Known for punctuality and premium service.",
    verified: true,
  },
  {
    id: 2,
    name: "Buca Voyages",
    city: "Yaoundé",
    routes: 9,
    rating: 4.7,
    trips: 5400,
    founded: 2003,
    type: "Standard",
    amenities: ["AC", "USB"],
    description:
      "Affordable, reliable travel across central and western Cameroon with multiple daily departures.",
    verified: true,
  },
  {
    id: 3,
    name: "Vatican Express",
    city: "Douala",
    routes: 11,
    rating: 4.8,
    trips: 7100,
    founded: 2001,
    type: "VIP",
    amenities: ["AC", "WiFi", "USB", "Snack Service"],
    description:
      "Premium travel experience with complimentary refreshments and extra legroom.",
    verified: true,
  },
  {
    id: 4,
    name: "Touristique Express",
    city: "Bafoussam",
    routes: 8,
    rating: 4.5,
    trips: 4300,
    founded: 2005,
    type: "Standard",
    amenities: ["AC"],
    description:
      "Connecting the Western Highlands with major cities. Reliable and affordable.",
    verified: true,
  },
  {
    id: 5,
    name: "United Express",
    city: "Douala",
    routes: 14,
    rating: 4.6,
    trips: 9800,
    founded: 1995,
    type: "Standard",
    amenities: ["AC", "USB"],
    description:
      "One of the oldest transport companies in Cameroon with the widest route network.",
    verified: true,
  },
  {
    id: 6,
    name: "Finexs Voyages",
    city: "Yaoundé",
    routes: 7,
    rating: 4.9,
    trips: 3200,
    founded: 2010,
    type: "Premium",
    amenities: ["AC", "WiFi", "USB", "Blanket", "Snack", "Footrest"],
    description:
      "Boutique premium travel experience. Limited seats, maximum comfort.",
    verified: true,
  },
  {
    id: 7,
    name: "Garantie Express",
    city: "Bamenda",
    routes: 6,
    rating: 4.4,
    trips: 2800,
    founded: 2007,
    type: "Standard",
    amenities: ["AC"],
    description:
      "North-West Cameroon specialist. Your best choice for routes through Bamenda and Bafoussam.",
    verified: true,
  },
  {
    id: 8,
    name: "Amour Mezam",
    city: "Bafoussam",
    routes: 8,
    rating: 4.6,
    trips: 4100,
    founded: 2000,
    type: "Standard",
    amenities: ["AC", "USB"],
    description:
      "Serving the Mezam division with pride since 2000. Trusted by Western Region families.",
    verified: false,
  },
];

export default function AgenciesPage() {
  const { t } = useLang();
  const CITIES_LIST = [
    t.agencies_all_cities,
    "Douala",
    "Yaoundé",
    "Bafoussam",
    "Bamenda",
  ];
  const TYPES_LIST = [t.agencies_all_types, "Premium", "VIP", "Standard"];

  const [filterCity, setFilterCity] = useState(CITIES_LIST[0]);
  const [filterType, setFilterType] = useState(TYPES_LIST[0]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = AGENCIES.filter(
    (a) =>
      (filterCity === CITIES_LIST[0] || a.city === filterCity) &&
      (filterType === TYPES_LIST[0] || a.type === filterType) &&
      (!search || a.name.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        {/* Hero */}
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
              objectPosition: "center 35%",
              opacity: 0.16,
            }}
          />
          <img
            src={IMG_AGENCY}
            alt="Agency counter"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "45%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.25,
              maskImage: "linear-gradient(90deg,transparent 0%,black 40%)",
              WebkitMaskImage:
                "linear-gradient(90deg,transparent 0%,black 40%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(13,13,13,.97) 0%, rgba(13,13,13,.65) 55%, rgba(13,13,13,.15) 100%)",
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
              {t.agencies_badge}
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
              {t.agencies_title}
            </h1>
            <p
              style={{
                color: "rgba(245,241,232,0.55)",
                fontFamily: "Merriweather, serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                maxWidth: "520px",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {t.agencies_sub(AGENCIES.length)}
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                [t.agencies_stat1, "Licensed Agencies"],
                [t.agencies_stat2, "Daily Buses"],
                [t.agencies_stat3, "Avg. Rating"],
                [t.agencies_stat4, "Verified"],
              ].map(function ([n, l]) {
                return (
                  <div key={l}>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "1.5rem",
                        color: "#E85D04",
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        color: "rgba(245,241,232,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters */}
        <div
          style={{
            background: "white",
            borderBottom: "1px solid #E8E4DA",
            padding: "1.25rem 0",
          }}
        >
          <div className="container">
            <div className="flex flex-wrap gap-3 items-center">
              <div
                style={{
                  position: "relative",
                  flex: "1",
                  minWidth: "200px",
                  maxWidth: "300px",
                }}
              >
                <input
                  type="text"
                  placeholder={t.agencies_search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    border: "2px solid #E8E4DA",
                    borderRadius: "999px",
                    padding: "0.6rem 1rem 0.6rem 2.5rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#CCC",
                    fontSize: "0.875rem",
                  }}
                >
                  🔍
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {CITIES_LIST.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilterCity(c)}
                    style={{
                      background: filterCity === c ? "#0D0D0D" : "#F5F1E8",
                      color: filterCity === c ? "#FAF8F3" : "#666",
                      border: "none",
                      borderRadius: "999px",
                      padding: "0.5rem 1rem",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {TYPES_LIST.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={{
                      background: filterType === t ? "#E85D04" : "#F5F1E8",
                      color: filterType === t ? "white" : "#666",
                      border: "none",
                      borderRadius: "999px",
                      padding: "0.5rem 1rem",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agency Grid */}
        <div className="container py-12">
          <div
            style={{
              marginBottom: "1.5rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "#888",
            }}
          >
            {t.agencies_found(filtered.length)}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((agency) => (
              <div
                key={agency.id}
                onClick={() =>
                  setSelected(selected === agency.id ? null : agency.id)
                }
                style={{
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  border: `2px solid ${selected === agency.id ? "#E85D04" : "#E8E4DA"}`,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow:
                    selected === agency.id
                      ? "0 12px 40px rgba(232,93,4,0.15)"
                      : "0 2px 10px rgba(0,0,0,0.05)",
                  transform:
                    selected === agency.id ? "translateY(-4px)" : "none",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          color: "#0D0D0D",
                        }}
                      >
                        {agency.name}
                      </span>
                      {agency.verified && (
                        <span
                          title={t.agencies_verified}
                          style={{ fontSize: "1rem" }}
                        >
                          ✅
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        color: "#888",
                      }}
                    >
                      📍 {agency.city}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {agency.rating}
                    </span>
                    <span style={{ color: "#F59E0B", fontSize: "1rem" }}>
                      ★
                    </span>
                  </div>
                </div>

                {/* Type badge */}
                <span
                  style={{
                    background:
                      agency.type === "Premium"
                        ? "#F3E8FF"
                        : agency.type === "VIP"
                          ? "#FFF5E8"
                          : "#F0FDF4",
                    color:
                      agency.type === "Premium"
                        ? "#7C3AED"
                        : agency.type === "VIP"
                          ? "#E85D04"
                          : "#16A34A",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    border: `1px solid ${agency.type === "Premium" ? "#7C3AED" : agency.type === "VIP" ? "#E85D04" : "#16A34A"}`,
                  }}
                >
                  {agency.type}
                </span>

                <p
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "#666",
                    lineHeight: 1.8,
                    margin: "1rem 0",
                  }}
                >
                  {agency.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    [agency.routes, t.agencies_routes],
                    [agency.trips.toLocaleString(), t.agencies_trips],
                    [agency.founded, t.agencies_est],
                  ].map(([v, l]) => (
                    <div
                      key={l}
                      style={{
                        background: "#F5F1E8",
                        borderRadius: "0.75rem",
                        padding: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 900,
                          fontSize: "1rem",
                          color: "#0D0D0D",
                        }}
                      >
                        {v}
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.6rem",
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginTop: "0.15rem",
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agency.amenities.map((a) => (
                    <span
                      key={a}
                      style={{
                        background: "#F5F1E8",
                        color: "#555",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "999px",
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <a href={`/book?agency=${agency.id}`}>
                  <button
                    style={{
                      width: "100%",
                      background:
                        selected === agency.id ? "#E85D04" : "#0D0D0D",
                      color: "white",
                      border: "none",
                      borderRadius: "999px",
                      padding: "0.85rem",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {t.agencies_book(agency.name)}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Partner CTA — real bus photo behind */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#0D0D0D",
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
              objectPosition: "center 55%",
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,13,13,.9)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {/* Real agency photo inset */}
                <div
                  style={{
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    aspectRatio: "16/9",
                    marginBottom: "2rem",
                    boxShadow: "0 20px 50px rgba(0,0,0,.4)",
                    border: "1px solid rgba(245,241,232,.08)",
                  }}
                >
                  <img
                    src={IMG_AGENCY}
                    alt="Bus agency"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#FAF8F3",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.agencies_partner_title}
                  <br />
                  <span style={{ color: "#E85D04" }}>
                    {t.agencies_partner_sub}
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    color: "rgba(245,241,232,0.6)",
                    lineHeight: 1.9,
                    marginBottom: "2rem",
                    fontSize: "0.95rem",
                  }}
                >
                  {t.agencies_partner_body}
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    t.agencies_f1,
                    t.agencies_f2,
                    t.agencies_f3,
                    t.agencies_f4,
                  ].map(function (b) {
                    return (
                      <div
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            background: "#E85D04",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontSize: "0.7rem",
                              fontWeight: 900,
                            }}
                          >
                            ✓
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "rgba(245,241,232,0.8)",
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: ".75rem",
                    marginBottom: "2rem",
                  }}
                >
                  {[
                    [t.agencies_m1_v, t.agencies_m1_k],
                    [t.agencies_m2_v, t.agencies_m2_k],
                    [t.agencies_m3_v, t.agencies_m3_k],
                    [t.agencies_m4_v, t.agencies_m4_k],
                  ].map(function ([n, l]) {
                    return (
                      <div
                        key={l}
                        style={{
                          background: "rgba(245,241,232,.05)",
                          border: "1px solid rgba(245,241,232,.08)",
                          borderRadius: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 900,
                            fontSize: "1.5rem",
                            color: "#E85D04",
                          }}
                        >
                          {n}
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 600,
                            fontSize: ".65rem",
                            color: "rgba(245,241,232,.35)",
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                          }}
                        >
                          {l}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Fixed: link to /backoffice instead of /contact (which doesn't exist) */}
                <a href="/backoffice">
                  <button
                    style={{
                      background: "#E85D04",
                      color: "white",
                      border: "none",
                      borderRadius: "999px",
                      padding: "1.1rem 2.5rem",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      fontSize: "1rem",
                      cursor: "pointer",
                      boxShadow: "0 0 30px rgba(232,93,4,.35)",
                    }}
                  >
                    {t.agencies_apply}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
