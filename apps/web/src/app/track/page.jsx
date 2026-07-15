"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLang } from "@/utils/lang";

// Animated tracking map
function TrackingMap({ progress, fromCity, toCity }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    // Background
    ctx.fillStyle = "#FFF5E8";
    ctx.fillRect(0, 0, W, H);

    // Simplified Cameroon-ish road
    const start = { x: W * 0.18, y: H * 0.65 };
    const mid1 = { x: W * 0.35, y: H * 0.45 };
    const mid2 = { x: W * 0.55, y: H * 0.38 };
    const end = { x: W * 0.78, y: H * 0.45 };

    // Draw road shadow
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(mid1.x, mid1.y, mid2.x, mid2.y, end.x, end.y);
    ctx.strokeStyle = "#E8C9A0";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.stroke();

    // Draw road
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(mid1.x, mid1.y, mid2.x, mid2.y, end.x, end.y);
    ctx.strokeStyle = "#D4A878";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw road dashes
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(mid1.x, mid1.y, mid2.x, mid2.y, end.x, end.y);
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 10]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Progress on curve
    const t = progress / 100;
    const busX =
      (1 - t) ** 3 * start.x +
      3 * (1 - t) ** 2 * t * mid1.x +
      3 * (1 - t) * t ** 2 * mid2.x +
      t ** 3 * end.x;
    const busY =
      (1 - t) ** 3 * start.y +
      3 * (1 - t) ** 2 * t * mid1.y +
      3 * (1 - t) * t ** 2 * mid2.y +
      t ** 3 * end.y;

    // Draw traveled path
    const steps = 50;
    ctx.beginPath();
    for (let i = 0; i <= steps * t; i++) {
      const ti = i / steps;
      const px =
        (1 - ti) ** 3 * start.x +
        3 * (1 - ti) ** 2 * ti * mid1.x +
        3 * (1 - ti) * ti ** 2 * mid2.x +
        ti ** 3 * end.x;
      const py =
        (1 - ti) ** 3 * start.y +
        3 * (1 - ti) ** 2 * ti * mid1.y +
        3 * (1 - ti) * ti ** 2 * mid2.y +
        ti ** 3 * end.y;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "#E85D04";
    ctx.lineWidth = 4;
    ctx.stroke();

    // City dots
    [start, end].forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? "#CC7722" : "#E85D04";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });

    // City labels
    ctx.font = "bold 12px Montserrat, sans-serif";
    ctx.fillStyle = "#0D0D0D";
    ctx.textAlign = "center";
    ctx.fillText(fromCity, start.x, start.y + 26);
    ctx.fillText(toCity, end.x, end.y + 26);

    // Bus icon
    ctx.save();
    const angle = Math.atan2(
      (1 - t) ** 2 * (mid1.y - start.y) +
        2 * (1 - t) * t * (mid2.y - mid1.y) +
        t ** 2 * (end.y - mid2.y),
      (1 - t) ** 2 * (mid1.x - start.x) +
        2 * (1 - t) * t * (mid2.x - mid1.x) +
        t ** 2 * (end.x - mid2.x),
    );
    ctx.translate(busX, busY);
    ctx.rotate(angle);
    // Bus body
    ctx.fillStyle = "#E85D04";
    ctx.beginPath();
    ctx.roundRect(-18, -10, 36, 20, 4);
    ctx.fill();
    // Windows
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    [-8, 2, 12].forEach((wx) => {
      ctx.fillRect(wx, -7, 7, 8);
    });
    // Wheels
    ctx.fillStyle = "#0D0D0D";
    [-8, 10].forEach((wx) => {
      ctx.beginPath();
      ctx.arc(wx, 11, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Pulse around bus
    ctx.beginPath();
    ctx.arc(busX, busY, 22, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(232,93,4,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [progress, fromCity, toCity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "280px", borderRadius: "1rem" }}
    />
  );
}

const DEMO_JOURNEYS = [
  {
    ref: "JML-2847",
    from: "Douala",
    to: "Yaoundé",
    departure: "07:00",
    arrival: "11:00",
    progress: 62,
    status: "On the way",
    agency: "General Express",
    seat: "12A",
    driver: "Pierre Mbou",
    plate: "LT-458-AD",
  },
  {
    ref: "JML-2641",
    from: "Yaoundé",
    to: "Bafoussam",
    departure: "09:30",
    arrival: "13:00",
    progress: 35,
    status: "On the way",
    agency: "Vatican Express",
    seat: "7B",
    driver: "Samuel Nkono",
    plate: "CE-201-BF",
  },
];

export default function TrackPage() {
  const { lang, t } = useLang();
  const [refCode, setRefCode] = useState("");
  const [journey, setJourney] = useState(null);
  const [live, setLive] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    const found = DEMO_JOURNEYS.find(
      (j) => j.ref.toLowerCase() === refCode.toLowerCase().trim(),
    );
    if (found) {
      setJourney(found);
      setSimProgress(found.progress);
      setLive(true);
    } else {
      setError(t.track_error);
      setJourney(null);
    }
  };

  // Simulate bus moving
  useEffect(() => {
    if (!live || !journey) return;
    const id = setInterval(() => {
      setSimProgress((p) => Math.min(p + 0.08, 99));
    }, 800);
    return () => clearInterval(id);
  }, [live, journey]);

  const eta = journey
    ? (() => {
        const [h, m] = journey.arrival.split(":").map(Number);
        const etaMins = Math.round(((100 - simProgress) / 100) * 240);
        const etaH = Math.floor(etaMins / 60);
        const etaM = etaMins % 60;
        return `${etaH}h ${etaM}min`;
      })()
    : "";

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
          }}
        >
          <div className="container">
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
              {t.track_badge}
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
              {t.track_title}
            </h1>
            <p
              style={{
                color: "rgba(245,241,232,0.55)",
                fontFamily: "Merriweather, serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                maxWidth: "500px",
                lineHeight: 1.8,
              }}
            >
              {t.track_sub}
            </p>

            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                placeholder={t.track_placeholder}
                style={{
                  flex: 1,
                  minWidth: "220px",
                  background: "rgba(255,255,255,0.08)",
                  border: "2px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1.25rem",
                  color: "#FAF8F3",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  outline: "none",
                  colorScheme: "dark",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #E85D04, #CC5500)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 2rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 25px rgba(232,93,4,0.35)",
                }}
              >
                {t.track_btn}
              </button>
            </form>
            {error && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  marginTop: "0.75rem",
                }}
              >
                {t.track_error}
              </p>
            )}
            {!journey && (
              <p
                style={{
                  color: "rgba(245,241,232,0.3)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                {t.track_demo_hint}
              </p>
            )}
          </div>
        </section>

        <div className="container py-12">
          {journey ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <div
                  style={{
                    background: "white",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    border: "1px solid #E8E4DA",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "1.25rem",
                        color: "#0D0D0D",
                      }}
                    >
                      {t.track_live_pos}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#4ADE80",
                          borderRadius: "50%",
                          animation: "pulse 1.5s infinite",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#4ADE80",
                        }}
                      >
                        {t.track_live}
                      </span>
                    </div>
                  </div>
                  <TrackingMap
                    progress={simProgress}
                    fromCity={journey.from}
                    toCity={journey.to}
                  />

                  {/* Progress bar */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#0D0D0D",
                        }}
                      >
                        {journey.from}
                      </span>
                      <span
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#0D0D0D",
                        }}
                      >
                        {journey.to}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: "#F0F0F0",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #E85D04, #F48C06)",
                          borderRadius: "999px",
                          width: `${simProgress}%`,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          color: "#E85D04",
                        }}
                      >
                        {t.track_pct(simProgress)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey card */}
              <div>
                <div
                  style={{
                    background: "#0D0D0D",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #E85D04, #CC5500)",
                      padding: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        color: "white",
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {journey.ref}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {t.track_journey}
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    {/* Route */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 900,
                            fontSize: "1.75rem",
                            color: "#FAF8F3",
                          }}
                        >
                          {journey.from.slice(0, 3).toUpperCase()}
                        </div>
                        <div
                          style={{
                            color: "rgba(245,241,232,0.45)",
                            fontSize: "0.7rem",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {journey.from}
                        </div>
                      </div>
                      <div style={{ alignSelf: "center", color: "#E85D04" }}>
                        →
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 900,
                            fontSize: "1.75rem",
                            color: "#FAF8F3",
                          }}
                        >
                          {journey.to.slice(0, 3).toUpperCase()}
                        </div>
                        <div
                          style={{
                            color: "rgba(245,241,232,0.45)",
                            fontSize: "0.7rem",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {journey.to}
                        </div>
                      </div>
                    </div>

                    {/* ETA highlight */}
                    <div
                      style={{
                        background: "rgba(74,222,128,0.1)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        borderRadius: "0.875rem",
                        padding: "1rem",
                        textAlign: "center",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          color: "#4ADE80",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {t.track_eta}
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 900,
                          fontSize: "2rem",
                          color: "#4ADE80",
                        }}
                      >
                        {eta}
                      </div>
                    </div>

                    {[
                      [t.track_status, journey.status],
                      [t.track_agency, journey.agency],
                      [t.track_seat, journey.seat],
                      [t.track_driver, journey.driver],
                      [t.track_plate, journey.plate],
                      [t.track_departed, journey.departure],
                      [t.track_arrives, journey.arrival],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: "0.6rem",
                          borderBottom: "1px solid rgba(245,241,232,0.06)",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgba(245,241,232,0.35)",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {k}
                        </span>
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 700,
                            color: "#FAF8F3",
                            fontSize: "0.78rem",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(
                          `🚌 ${lang === "fr" ? "Mon bus est en route !" : "My bus is on the way!"}\n` +
                            `Ref: ${journey.ref}\n` +
                            `${lang === "fr" ? "Ligne" : "Route"}: ${journey.from} → ${journey.to}\n` +
                            `${lang === "fr" ? "Avancement" : "Progress"}: ${Math.round(
                              simProgress,
                            )}%\n` +
                            `ETA: ${eta}\n` +
                            `JEMIL — jemil.travel`,
                        );
                        window.open(
                          `https://wa.me/?text=${msg}`,
                          "_blank",
                          "noopener",
                        );
                      }}
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        background: "#25D366",
                        color: "white",
                        border: "none",
                        borderRadius: "999px",
                        padding: "0.875rem",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 800,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                      }}
                    >
                      {t.track_whatsapp}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {DEMO_JOURNEYS.map((j) => (
                <div
                  key={j.ref}
                  onClick={() => {
                    setRefCode(j.ref);
                    setJourney(j);
                    setSimProgress(j.progress);
                    setLive(true);
                  }}
                  style={{
                    background: "white",
                    borderRadius: "1.25rem",
                    padding: "1.75rem",
                    border: "2px solid #E8E4DA",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E85D04";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(232,93,4,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E8E4DA";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "0.9rem",
                        color: "#E85D04",
                      }}
                    >
                      {j.ref}
                    </span>
                    <span
                      style={{
                        background: "#F0FDF4",
                        color: "#16A34A",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                      }}
                    >
                      ● {j.status}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "#0D0D0D",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {j.from} → {j.to}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      color: "#888",
                      marginBottom: "1rem",
                    }}
                  >
                    {j.agency}
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "#F0F0F0",
                      borderRadius: "999px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "#E85D04",
                        borderRadius: "999px",
                        width: `${j.progress}%`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      color: "#888",
                      marginTop: "0.4rem",
                    }}
                  >
                    {t.track_pct_label(j.progress)}
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      textAlign: "center",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "#E85D04",
                    }}
                  >
                    {t.track_click}
                  </div>
                </div>
              ))}
              <div
                style={{
                  background: "#FFF5E8",
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                  border: "2px dashed #E8C9A0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ fontSize: "2.5rem" }}>🎫</div>
                <div
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#0D0D0D",
                  }}
                >
                  {t.track_no_ticket}
                </div>
                <div
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "#888",
                    lineHeight: 1.7,
                  }}
                >
                  {t.track_no_ticket_body}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </>
  );
}
