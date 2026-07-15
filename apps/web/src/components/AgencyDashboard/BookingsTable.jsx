export function BookingsTable({ bookings }) {
  return (
    <div>
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.7fr 0.7fr 0.8fr 0.8fr 0.5fr",
          gap: ".75rem",
          padding: ".6rem 1.25rem",
          marginBottom: ".25rem",
        }}
      >
        {[
          "Booking ID",
          "Passenger",
          "Route",
          "Seat",
          "Payment",
          "Amount",
          "When",
        ].map(function (h) {
          return (
            <span
              key={h}
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".6rem",
                color: "rgba(245,241,232,.32)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
              }}
            >
              {h}
            </span>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        {bookings.map(function (b, i) {
          return (
            <div
              key={b.id}
              style={{
                background: "#161616",
                border: "1px solid rgba(245,241,232,.07)",
                borderRadius: "1rem",
                padding: ".875rem 1.25rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 0.7fr 0.7fr 0.8fr 0.8fr 0.5fr",
                gap: ".75rem",
                alignItems: "center",
                animation: "cardRise .35s cubic-bezier(.16,1,.3,1) both",
                animationDelay: i * 0.06 + "s",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".8rem",
                  color: "#E85D04",
                }}
              >
                {b.id}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 800,
                  fontSize: ".85rem",
                  color: "#FAF8F3",
                }}
              >
                {b.name}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".78rem",
                  color: "rgba(245,241,232,.6)",
                }}
              >
                {b.route}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".78rem",
                  color: "#FAF8F3",
                  background: "rgba(232,93,4,.12)",
                  border: "1px solid rgba(232,93,4,.2)",
                  borderRadius: ".5rem",
                  padding: ".2rem .5rem",
                  textAlign: "center",
                }}
              >
                {b.seat}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".72rem",
                  color: "rgba(245,241,232,.55)",
                }}
              >
                {b.pay}
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: ".85rem",
                  color: "#4ADE80",
                }}
              >
                {b.amount.toLocaleString()} XAF
              </span>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".68rem",
                  color: "rgba(245,241,232,.32)",
                }}
              >
                {b.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
