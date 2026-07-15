"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMG_AERIAL, IMG_BUS_HERO } from "@/data/images";
import { useLang } from "@/utils/lang";

const STEPS = [
  {
    n: "01",
    icon: "🌍",
    title: "Book from anywhere",
    desc: "Pay with Stripe, PayPal, card, or bank transfer — in EUR, USD, GBP or XAF. No Cameroonian account needed.",
  },
  {
    n: "02",
    icon: "📲",
    title: "Relative gets an SMS",
    desc: "Your family member receives an instant SMS with their boarding code. No smartphone required — it works on any phone.",
  },
  {
    n: "03",
    icon: "🚌",
    title: "Board the bus",
    desc: "They show the SMS code or QR at the terminal. Our controller scans it in seconds, offline if needed.",
  },
  {
    n: "04",
    icon: "✅",
    title: "You get notified",
    desc: "You receive real-time alerts: boarding confirmed, bus departed, arrived at destination. Peace of mind, from Paris.",
  },
];

const CURRENCIES = [
  { code: "EUR", flag: "🇪🇺", label: "Euro", rate: 655 },
  { code: "USD", flag: "🇺🇸", label: "US Dollar", rate: 608 },
  { code: "GBP", flag: "🇬🇧", label: "British Pound", rate: 772 },
  { code: "XAF", flag: "🇨🇲", label: "CFA Franc", rate: 1 },
];

const ROUTES = [
  {
    from: "Douala",
    to: "Yaoundé",
    duration: "3h30",
    price: 4500,
    popular: true,
  },
  {
    from: "Douala",
    to: "Bafoussam",
    duration: "4h",
    price: 5500,
    popular: true,
  },
  {
    from: "Yaoundé",
    to: "Bafoussam",
    duration: "4h30",
    price: 5000,
    popular: false,
  },
  {
    from: "Bafoussam",
    to: "Bamenda",
    duration: "2h",
    price: 3000,
    popular: false,
  },
  {
    from: "Douala",
    to: "Limbe",
    duration: "1h30",
    price: 1800,
    popular: false,
  },
  {
    from: "Yaoundé",
    to: "Ngaoundéré",
    duration: "11h",
    price: 10500,
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Marie-Claire N.",
    city: "Paris, France",
    flag: "🇫🇷",
    text: "Je réserve depuis Paris pour ma mère à Bafoussam chaque mois. Elle reçoit son SMS et monte dans le bus. Simple, sûr, fiable.",
    route: "DLA → BFS",
  },
  {
    name: "Alain K.",
    city: "Brussels, Belgium",
    flag: "🇧🇪",
    text: "My brother travels from Douala to Yaoundé every week for university. I pay from Belgium, he boards without stress.",
    route: "DLA → YDE",
  },
  {
    name: "Sandra F.",
    city: "New York, USA",
    flag: "🇺🇸",
    text: "Finally a platform that understands diaspora needs. No more Western Union just to buy a bus ticket for my family.",
    route: "YDE → BFS",
  },
];

const STEP_ICONS = ["🌍", "📲", "🚌", "✅"];

export default function DiasporaPage() {
  const { t, lang } = useLang();
  var [currency, setCurrency] = useState("EUR");
  var [amount, setAmount] = useState(4500);

  const STEPS_DATA = t.dias_steps.map((s, i) => ({
    ...s,
    n: String(i + 1).padStart(2, "0"),
    icon: STEP_ICONS[i],
  }));
  const TRUST_DATA = t.dias_trust;
  const TESTIMONIALS_DATA = t.dias_testimonials;

  var selectedCurrency = CURRENCIES.find((c) => c.code === currency);
  var convertedAmount = (amount / selectedCurrency.rate).toFixed(2);

  const trustIcons = ["🔒", "↩️", "🔑", "📍", "💬", "🤝"];

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            background: "#0D0D0D",
            overflow: "hidden",
          }}
        >
          <img
            src={IMG_AERIAL}
            alt="Cameroon"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 35%",
              opacity: 0.28,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(13,13,13,.98) 0%, rgba(13,13,13,.6) 60%, rgba(13,13,13,.15) 100%)",
            }}
          />
          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
              paddingTop: "6rem",
              paddingBottom: "5rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "center",
              }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left copy */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".5rem",
                    background: "rgba(232,93,4,.12)",
                    border: "1px solid rgba(232,93,4,.3)",
                    borderRadius: "999px",
                    padding: ".3rem .875rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <span style={{ fontSize: ".75rem" }}>🌍</span>
                  <span
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".65rem",
                      color: "#E85D04",
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.dias_page_badge}
                  </span>
                </div>
                <h1
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem,7vw,5.5rem)",
                    color: "#FAF8F3",
                    lineHeight: 0.92,
                    letterSpacing: "-.05em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.dias_page_title}
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
                  {t.dias_page_body}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="/book" style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        background: "linear-gradient(135deg,#E85D04,#CC5500)",
                        color: "white",
                        border: "none",
                        borderRadius: "999px",
                        padding: "1rem 2.25rem",
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 0 28px rgba(232,93,4,.4)",
                      }}
                    >
                      {t.dias_page_cta}
                    </button>
                  </a>
                  <a href="#how-it-works" style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        background: "transparent",
                        color: "rgba(245,241,232,.75)",
                        border: "2px solid rgba(245,241,232,.2)",
                        borderRadius: "999px",
                        padding: "1rem 2.25rem",
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      {t.dias_page_learn}
                    </button>
                  </a>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".6rem",
                    marginTop: "2rem",
                  }}
                >
                  {[t.dias_chip1, t.dias_chip2, t.dias_chip3, t.dias_chip4].map(
                    (chip) => (
                      <span
                        key={chip}
                        style={{
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 600,
                          fontSize: ".7rem",
                          color: "rgba(245,241,232,.55)",
                          background: "rgba(255,255,255,.05)",
                          border: "1px solid rgba(255,255,255,.09)",
                          borderRadius: "999px",
                          padding: ".3rem .9rem",
                        }}
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Right: cost calculator */}
              <div
                style={{
                  background: "rgba(245,241,232,.04)",
                  border: "1px solid rgba(245,241,232,.1)",
                  borderRadius: "1.5rem",
                  padding: "1.75rem",
                  backdropFilter: "blur(20px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".65rem",
                    color: "#E85D04",
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.dias_calc_title}
                </p>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".6rem",
                      color: "rgba(245,241,232,.38)",
                      textTransform: "uppercase",
                      letterSpacing: ".15em",
                      display: "block",
                      marginBottom: ".4rem",
                    }}
                  >
                    {t.dias_calc_route}
                  </label>
                  <select
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      background: "rgba(245,241,232,.08)",
                      border: "1px solid rgba(245,241,232,.15)",
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
                    {ROUTES.map((r) => (
                      <option
                        key={r.from + r.to}
                        value={r.price}
                        style={{ background: "#1a0800" }}
                      >
                        {r.from} → {r.to} — {r.price.toLocaleString()} XAF
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".6rem",
                      color: "rgba(245,241,232,.38)",
                      textTransform: "uppercase",
                      letterSpacing: ".15em",
                      display: "block",
                      marginBottom: ".4rem",
                    }}
                  >
                    {t.dias_calc_currency}
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: ".5rem",
                    }}
                  >
                    {CURRENCIES.filter((c) => c.code !== "XAF").map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c.code)}
                        style={{
                          background:
                            currency === c.code
                              ? "rgba(232,93,4,.2)"
                              : "rgba(245,241,232,.06)",
                          border: `1.5px solid ${currency === c.code ? "#E85D04" : "rgba(245,241,232,.12)"}`,
                          borderRadius: ".75rem",
                          padding: ".65rem .75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: ".5rem",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: "1.1rem" }}>{c.flag}</span>
                        <span
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            fontWeight: 700,
                            fontSize: ".82rem",
                            color:
                              currency === c.code
                                ? "#E85D04"
                                : "rgba(245,241,232,.7)",
                          }}
                        >
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(232,93,4,.12)",
                    border: "1px solid rgba(232,93,4,.3)",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                    marginBottom: "1.25rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".62rem",
                      color: "rgba(245,241,232,.45)",
                      textTransform: "uppercase",
                      letterSpacing: ".12em",
                      marginBottom: ".5rem",
                    }}
                  >
                    {t.dias_calc_you_pay}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "2.5rem",
                      color: "#E85D04",
                      lineHeight: 1,
                    }}
                  >
                    {selectedCurrency.code} {convertedAmount}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 600,
                      fontSize: ".72rem",
                      color: "rgba(245,241,232,.35)",
                      marginTop: ".4rem",
                    }}
                  >
                    {t.dias_calc_fee(
                      selectedCurrency.code,
                      selectedCurrency.rate,
                    )}
                  </div>
                </div>
                <a href="/book" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg,#E85D04,#CC5500)",
                      color: "white",
                      border: "none",
                      borderRadius: "999px",
                      padding: ".95rem",
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: ".9rem",
                      cursor: "pointer",
                      boxShadow: "0 0 24px rgba(232,93,4,.35)",
                    }}
                  >
                    {t.dias_calc_book}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="how-it-works"
          style={{ background: "#FAF8F3", padding: "6rem 0" }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".72rem",
                  color: "#E85D04",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  marginBottom: ".75rem",
                }}
              >
                {t.dias_process_badge}
              </p>
              <h2
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem,5vw,3.5rem)",
                  color: "#0D0D0D",
                  lineHeight: 1,
                  letterSpacing: "-.04em",
                }}
              >
                {t.dias_process_title}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "2rem",
              }}
            >
              {STEPS_DATA.map((step, i) => (
                <div key={step.n} style={{ position: "relative" }}>
                  {i < STEPS_DATA.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "2.25rem",
                        left: "calc(50% + 2.25rem)",
                        right: "-50%",
                        height: "2px",
                        background:
                          "linear-gradient(90deg,rgba(232,93,4,.4),rgba(232,93,4,.1))",
                        zIndex: 0,
                      }}
                      className="hidden md:block"
                    />
                  )}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#E85D04,#CC5500)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        margin: "0 auto 1.25rem",
                        boxShadow: "0 8px 25px rgba(232,93,4,.3)",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: ".65rem",
                        color: "#E85D04",
                        textTransform: "uppercase",
                        letterSpacing: ".15em",
                        marginBottom: ".4rem",
                      }}
                    >
                      {t.dias_step_label(i + 1)}
                    </div>
                    <h3
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: "1.05rem",
                        color: "#0D0D0D",
                        marginBottom: ".65rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Merriweather,serif",
                        fontWeight: 300,
                        fontSize: ".85rem",
                        color: "#666",
                        lineHeight: 1.8,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR ROUTES ── */}
        <section
          style={{
            background: "white",
            padding: "5rem 0",
            borderTop: "1px solid #E8E4DA",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".72rem",
                    color: "#E85D04",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    marginBottom: ".5rem",
                  }}
                >
                  {t.dias_pop_badge}
                </p>
                <h2
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.75rem,4vw,2.75rem)",
                    color: "#0D0D0D",
                    letterSpacing: "-.03em",
                    lineHeight: 1,
                  }}
                >
                  {t.dias_pop_title}
                </h2>
              </div>
              <a href="/routes" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#0D0D0D",
                    color: "#FAF8F3",
                    border: "none",
                    borderRadius: "999px",
                    padding: ".65rem 1.5rem",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 800,
                    fontSize: ".82rem",
                    cursor: "pointer",
                  }}
                >
                  {t.dias_pop_see}
                </button>
              </a>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: "1rem",
              }}
            >
              {ROUTES.map((r) => (
                <div
                  key={r.from + r.to}
                  style={{
                    background: "#FAF8F3",
                    border: "1.5px solid #E8E4DA",
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E85D04";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(232,93,4,.12)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E8E4DA";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {r.popular && (
                    <span
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "#E85D04",
                        color: "white",
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 800,
                        fontSize: ".6rem",
                        padding: ".2rem .65rem",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      {t.dias_pop_popular}
                    </span>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {r.from}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background:
                          "linear-gradient(90deg,#E85D04,rgba(232,93,4,.2))",
                        borderRadius: 1,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%,-50%)",
                          fontSize: ".75rem",
                        }}
                      >
                        ✈
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {r.to}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 600,
                          fontSize: ".72rem",
                          color: "#888",
                          marginBottom: ".2rem",
                        }}
                      >
                        ⏱ {r.duration}
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 900,
                          fontSize: "1.35rem",
                          color: "#E85D04",
                        }}
                      >
                        {r.price.toLocaleString()}{" "}
                        <span
                          style={{
                            fontSize: ".7rem",
                            fontWeight: 600,
                            color: "#888",
                          }}
                        >
                          XAF
                        </span>
                      </div>
                    </div>
                    <a
                      href={"/book?from=" + r.from + "&to=" + r.to}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          background: "#0D0D0D",
                          color: "white",
                          border: "none",
                          borderRadius: "999px",
                          padding: ".6rem 1.25rem",
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 800,
                          fontSize: ".78rem",
                          cursor: "pointer",
                        }}
                      >
                        {t.dias_pop_book}
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          style={{
            background: "#0D0D0D",
            padding: "6rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={IMG_BUS_HERO}
            alt="Bus"
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
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,13,13,.93)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".72rem",
                  color: "#E85D04",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  marginBottom: ".75rem",
                }}
              >
                {t.trust_badge}
              </p>
              <h2
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem,5vw,3.5rem)",
                  color: "#FAF8F3",
                  letterSpacing: "-.04em",
                  lineHeight: 1,
                }}
              >
                {lang === "fr"
                  ? "Ce que dit la diaspora"
                  : "What the diaspora says"}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: "1.5rem",
              }}
            >
              {TESTIMONIALS_DATA.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(245,241,232,.04)",
                    border: "1px solid rgba(245,241,232,.09)",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Merriweather,serif",
                      fontWeight: 300,
                      fontSize: ".92rem",
                      color: "rgba(245,241,232,.78)",
                      lineHeight: 1.9,
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    "{item.text}"
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 800,
                          fontSize: ".88rem",
                          color: "#FAF8F3",
                        }}
                      >
                        {item.author}
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat,sans-serif",
                          fontWeight: 600,
                          fontSize: ".72rem",
                          color: "rgba(245,241,232,.45)",
                        }}
                      >
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section
          style={{
            background: "#FAF8F3",
            padding: "5rem 0",
            borderTop: "1px solid #E8E4DA",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.75rem,4vw,2.75rem)",
                  color: "#0D0D0D",
                  letterSpacing: "-.04em",
                }}
              >
                {t.dias_trust_title}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: "1.5rem",
              }}
            >
              {TRUST_DATA.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    border: "1.5px solid #E8E4DA",
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: ".875rem" }}>
                    {trustIcons[i]}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: ".95rem",
                      color: "#0D0D0D",
                      marginBottom: ".5rem",
                    }}
                  >
                    {item.t}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Merriweather,serif",
                      fontWeight: 300,
                      fontSize: ".8rem",
                      color: "#666",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          style={{
            background: "linear-gradient(135deg,#E85D04,#CC5500)",
            padding: "6rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={IMG_BUS_HERO}
            alt="Bus"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.08,
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2, textAlign: "center" }}
          >
            <h2
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem,7vw,5rem)",
                color: "#FAF8F3",
                lineHeight: 0.93,
                letterSpacing: "-.05em",
                marginBottom: "1.25rem",
              }}
            >
              {t.dias_final_title}
            </h2>
            <p
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                fontSize: "1.1rem",
                color: "rgba(245,241,232,.85)",
                lineHeight: 1.9,
                maxWidth: 520,
                margin: "0 auto 2.5rem",
              }}
            >
              {t.dias_final_body}
            </p>
            <a href="/book" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#FAF8F3",
                  color: "#E85D04",
                  border: "none",
                  borderRadius: "999px",
                  padding: "1.15rem 3rem",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(0,0,0,.25)",
                }}
              >
                {t.dias_final_cta}
              </button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
