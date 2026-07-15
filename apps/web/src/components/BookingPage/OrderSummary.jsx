export function OrderSummary({
  fromCity,
  toCity,
  date,
  bus,
  selectedSeat,
  passengers,
  onPay,
  t,
  lang,
}) {
  return (
    <div>
      <div
        style={{
          background: "#0D0D0D",
          borderRadius: "1.25rem",
          padding: "1.5rem",
          position: "sticky",
          top: "100px",
        }}
      >
        <div
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 800,
            color: "#FAF8F3",
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          {t.book_order_summary}
        </div>
        {[
          [t.book_route, `${fromCity} → ${toCity}`],
          [
            t.book_date_label,
            new Date(date).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-GB",
              { day: "numeric", month: "short" },
            ),
          ],
          [t.book_agency, bus.agency],
          [t.book_departure, bus.departure],
          [t.book_seat, `Seat ${selectedSeat}`],
          [t.book_passengers, `× ${passengers}`],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "rgba(245,241,232,0.4)",
                fontSize: "0.8rem",
              }}
            >
              {k}
            </span>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                color: "#FAF8F3",
                fontSize: "0.8rem",
              }}
            >
              {v}
            </span>
          </div>
        ))}
        <div
          style={{
            borderTop: "1px solid rgba(245,241,232,0.1)",
            paddingTop: "1rem",
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "#FAF8F3",
              fontWeight: 800,
            }}
          >
            {t.book_total}
          </span>
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              color: "#E85D04",
              fontSize: "1.5rem",
            }}
          >
            {(bus.price * passengers).toLocaleString()} XAF
          </span>
        </div>
        <button
          onClick={onPay}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #E85D04, #CC5500)",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "1.1rem",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(232,93,4,0.3)",
            transition: "all 0.2s",
          }}
        >
          {t.book_pay_btn} {(bus.price * passengers).toLocaleString()} XAF →
        </button>
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.7rem",
            color: "rgba(245,241,232,0.3)",
          }}
        >
          {t.book_ssl}
        </div>
      </div>
    </div>
  );
}
