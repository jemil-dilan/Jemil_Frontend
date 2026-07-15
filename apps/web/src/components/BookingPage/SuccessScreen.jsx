export function SuccessScreen({
  bookingRef,
  fromCity,
  toCity,
  fromName,
  toName,
  date,
  bus,
  selectedSeat,
  name,
  passengers,
  t,
  lang,
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAF8F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "7rem 1rem 4rem",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        {/* Success icon */}
        <div
          style={{
            position: "relative",
            width: 80,
            height: 80,
            margin: "0 auto 2rem",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "#4ADE80",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            ✓
          </div>
          <div
            style={{
              position: "absolute",
              inset: -8,
              border: "3px solid rgba(74,222,128,0.3)",
              borderRadius: "50%",
              animation: "successPing 1.5s ease-out infinite",
            }}
          />
        </div>
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "2.2rem",
            color: "#0D0D0D",
            marginBottom: "0.5rem",
          }}
        >
          {t.book_youre_booked}
        </h1>
        <p
          style={{
            fontFamily: "Merriweather, serif",
            fontWeight: 300,
            color: "#666",
            marginBottom: "2.5rem",
          }}
        >
          {t.book_ticket_sent}
        </p>

        {/* Ticket */}
        <div
          style={{
            background: "#0D0D0D",
            borderRadius: "1.5rem",
            overflow: "hidden",
            textAlign: "left",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #E85D04, #CC5500)",
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                color: "white",
                fontSize: "1.1rem",
              }}
            >
              {t.book_ticket_label}
            </div>
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
              }}
            >
              #{bookingRef}
            </div>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#FAF8F3",
                  }}
                >
                  {fromCity}
                </div>
                <div
                  style={{
                    color: "rgba(245,241,232,0.45)",
                    fontSize: "0.75rem",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {fromName}
                </div>
              </div>
              <div style={{ color: "#E85D04", fontSize: "1.5rem" }}>→</div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#FAF8F3",
                  }}
                >
                  {toCity}
                </div>
                <div
                  style={{
                    color: "rgba(245,241,232,0.45)",
                    fontSize: "0.75rem",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {toName}
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "2px dashed rgba(245,241,232,0.1)",
                margin: "0.75rem 0",
              }}
            />
            {[
              [t.book_passenger, name || "Traveler"],
              [
                t.book_date_label,
                new Date(date).toLocaleDateString(
                  lang === "fr" ? "fr-FR" : "en-GB",
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                ),
              ],
              [t.book_departure, bus.departure],
              [t.book_agency, bus.agency],
              [
                t.book_seat,
                selectedSeat ? `Siège ${selectedSeat}` : t.book_any_seat,
              ],
              [
                t.book_amount_paid,
                `${(bus.price * passengers).toLocaleString()} XAF`,
              ],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <span
                  style={{
                    color: "rgba(245,241,232,0.35)",
                    fontSize: "0.7rem",
                    fontFamily: "Montserrat, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    color: "#FAF8F3",
                    fontSize: "0.8rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ flex: 1, minWidth: 140 }}>
            <button
              style={{
                width: "100%",
                background: "#0D0D0D",
                color: "#FAF8F3",
                border: "none",
                borderRadius: "999px",
                padding: "1rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {t.book_back_home}
            </button>
          </a>
          <a href="/track" style={{ flex: 1, minWidth: 140 }}>
            <button
              style={{
                width: "100%",
                background: "#E85D04",
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: "1rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {t.book_track_bus}
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
