import { useState, useEffect } from "react";
import { FlipWord } from "./FlipWord";
import { Counter } from "./Counter";
import { IMG_AERIAL, IMG_BUS_HERO } from "@/data/images";
import HeroThreeScene from "@/components/HeroThreeScene";
import { useLang } from "@/utils/lang";

export function HeroSection() {
  const { t } = useLang();
  var fromCity = useState("");
  var setFrom = fromCity[1];
  fromCity = fromCity[0];
  var toCity = useState("");
  var setTo = toCity[1];
  toCity = toCity[0];
  var date = useState("");
  var setDate = date[1];
  date = date[0];
  var busIn = useState(false);
  var setBusIn = busIn[1];
  busIn = busIn[0];
  var today = new Date().toISOString().split("T")[0];

  useEffect(function () {
    var t = setTimeout(function () {
      setBusIn(true);
    }, 700);
    return function () {
      clearTimeout(t);
    };
  }, []);

  const cities = [
    "Douala",
    "Yaoundé",
    "Bafoussam",
    "Bamenda",
    "Limbe",
    "Ngaoundéré",
  ];

  const trustChips = [t.hero_chip1, t.hero_chip2, t.hero_chip3, t.hero_chip4];
  const stats = [
    { n: 500, s: "+", l: t.hero_stat1 },
    { n: 40, s: "+", l: t.hero_stat2 },
    { n: 10000, s: "+", l: t.hero_stat3 },
    { n: 99, s: "%", l: t.hero_stat4 },
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "#060606",
      }}
    >
      {/* Background: real aerial Cameroon photo */}
      <img
        src={IMG_AERIAL}
        alt="Cameroon highlands road"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
          opacity: 0.5,
        }}
      />

      {/* ── THREE.JS 3D ROUTE NETWORK ── (layered above photo, screen blend) */}
      <HeroThreeScene />

      {/* Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(6,6,6,.65) 0%, rgba(6,6,6,.05) 40%, rgba(6,6,6,.25) 65%, rgba(6,6,6,.97) 100%)",
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(6,6,6,.85) 0%, rgba(6,6,6,.2) 55%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* REAL BUS IMAGE */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "clamp(300px, 52vw, 780px)",
          zIndex: 4,
          pointerEvents: "none",
          transition:
            "transform 1.5s cubic-bezier(.16,1,.3,1), opacity 1.2s ease",
          transform: busIn ? "translateX(0)" : "translateX(115%)",
          opacity: busIn ? 1 : 0,
        }}
      >
        <img
          src={IMG_BUS_HERO}
          alt="JEMIL intercity bus"
          style={{
            width: "100%",
            display: "block",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 16%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 16%, black 82%, transparent 100%)",
          }}
        />
        {/* Glow under bus */}
        <div
          style={{
            position: "absolute",
            bottom: "-8%",
            left: "5%",
            right: "5%",
            height: "35%",
            background:
              "radial-gradient(ellipse, rgba(232,93,4,.4) 0%, transparent 70%)",
            filter: "blur(22px)",
          }}
        />
      </div>

      {/* HERO CONTENT */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 5,
          paddingTop: "6rem",
          paddingBottom: "3rem",
        }}
      >
        <div style={{ maxWidth: 580 }}>
          {/* Live pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".65rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                position: "relative",
                width: 10,
                height: 10,
                display: "inline-flex",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#E85D04",
                  borderRadius: "50%",
                  opacity: 0.55,
                  animation: "ripple 1.5s ease-out infinite",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: "#E85D04",
                  borderRadius: "50%",
                  display: "block",
                  position: "relative",
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".72rem",
                color: "rgba(245,241,232,.7)",
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              {t.hero_live}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-.05em",
              fontSize: "clamp(3.2rem,9vw,6.5rem)",
              color: "#FAF8F3",
              marginBottom: "1.5rem",
            }}
          >
            {t.hero_travels.split(" ").slice(0, 1).join(" ")}
            <br />
            {t.hero_travels.split(" ").slice(1).join(" ")}{" "}
            <FlipWord words={t.hero_flip} />
          </h1>

          <p
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(245,241,232,.65)",
              lineHeight: 1.9,
              maxWidth: 460,
              marginBottom: "2.5rem",
            }}
          >
            {t.hero_sub}
          </p>

          {/* Search box */}
          <div
            style={{
              background: "rgba(6,6,6,.6)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(232,93,4,.22)",
              borderRadius: "1.25rem",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".75rem",
                marginBottom: ".75rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.38)",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: ".35rem",
                  }}
                >
                  {t.hero_from}
                </label>
                <select
                  value={fromCity}
                  onChange={function (e) {
                    setFrom(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,.07)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: ".75rem",
                    padding: ".8rem 1rem",
                    color: "#FAF8F3",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".9rem",
                    outline: "none",
                    cursor: "pointer",
                    colorScheme: "dark",
                  }}
                >
                  <option value="">{t.hero_select_city}</option>
                  {cities.map(function (c) {
                    return (
                      <option
                        key={c}
                        value={c}
                        style={{ background: "#1a0800" }}
                      >
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.38)",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: ".35rem",
                  }}
                >
                  {t.hero_to}
                </label>
                <select
                  value={toCity}
                  onChange={function (e) {
                    setTo(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,.07)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: ".75rem",
                    padding: ".8rem 1rem",
                    color: "#FAF8F3",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".9rem",
                    outline: "none",
                    cursor: "pointer",
                    colorScheme: "dark",
                  }}
                >
                  <option value="">{t.hero_select_city}</option>
                  {cities.map(function (c) {
                    return (
                      <option
                        key={c}
                        value={c}
                        style={{ background: "#1a0800" }}
                      >
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: ".75rem",
                alignItems: "flex-end",
              }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.38)",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: ".35rem",
                  }}
                >
                  {t.hero_date}
                </label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={function (e) {
                    setDate(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,.07)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: ".75rem",
                    padding: ".8rem 1rem",
                    color: "#FAF8F3",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".9rem",
                    outline: "none",
                    cursor: "pointer",
                    colorScheme: "dark",
                  }}
                />
              </div>
              <a
                href={
                  "/book?from=" + fromCity + "&to=" + toCity + "&date=" + date
                }
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    background: "linear-gradient(135deg,#E85D04,#CC5500)",
                    color: "#fff",
                    border: "none",
                    borderRadius: ".75rem",
                    padding: ".8rem 1.75rem",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: ".9rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 0 32px rgba(232,93,4,.45)",
                  }}
                >
                  {t.hero_search} →
                </button>
              </a>
            </div>
          </div>

          {/* Trust chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".6rem",
              marginTop: "1.25rem",
            }}
          >
            {trustChips.map(function (t) {
              return (
                <span
                  key={t}
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".7rem",
                    color: "rgba(245,241,232,.5)",
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: "999px",
                    padding: ".3rem .9rem",
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          borderTop: "1px solid rgba(232,93,4,.18)",
          background: "rgba(6,6,6,.82)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
            }}
          >
            {stats.map(function (stat, i) {
              return (
                <div
                  key={i}
                  style={{
                    padding: "1.4rem 1rem",
                    textAlign: "center",
                    borderLeft: i > 0 ? "1px solid rgba(232,93,4,.1)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "1.9rem",
                      color: "#E85D04",
                    }}
                  >
                    <Counter end={stat.n} suffix={stat.s} />
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 600,
                      fontSize: ".62rem",
                      color: "rgba(245,241,232,.32)",
                      textTransform: "uppercase",
                      letterSpacing: ".12em",
                      marginTop: ".2rem",
                    }}
                  >
                    {stat.l}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
