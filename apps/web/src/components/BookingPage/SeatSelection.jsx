import { SeatMap } from "./SeatMap";

export function SeatSelection({
  bus,
  selectedSeat,
  onSelectSeat,
  onBack,
  onContinue,
  passengers,
  t,
}) {
  return (
    <div className="step-enter">
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#E85D04",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: "0.875rem",
          marginBottom: "1rem",
        }}
      >
        {t.book_back}
      </button>
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          color: "#0D0D0D",
          marginBottom: "0.5rem",
          letterSpacing: "-0.03em",
        }}
      >
        {t.book_choose_seat}
      </h2>
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          color: "#888",
          fontSize: "0.875rem",
          marginBottom: "2rem",
        }}
      >
        {bus.agency} · {bus.departure} · {bus.type}
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "1.5rem" }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "1.25rem",
            padding: "1.5rem",
            border: "1px solid #E8E4DA",
            overflowX: "auto",
          }}
        >
          <SeatMap
            busId={bus.id}
            selected={selectedSeat}
            onSelect={onSelectSeat}
          />
        </div>
        <div>
          <div
            style={{
              background: "white",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              border: "1px solid #E8E4DA",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#0D0D0D",
                marginBottom: "1rem",
              }}
            >
              {t.book_your_selection}
            </div>
            {selectedSeat ? (
              <div>
                {[
                  [t.book_seat_number, `Seat ${selectedSeat}`],
                  [
                    t.book_seat_position,
                    selectedSeat % 4 < 2
                      ? t.book_seat_window
                      : t.book_seat_aisle,
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "#666",
                        fontSize: "0.875rem",
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 800,
                        color: "#0D0D0D",
                        fontSize: "0.875rem",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #E8E4DA",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      color: "#0D0D0D",
                    }}
                  >
                    {t.book_total}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      color: "#E85D04",
                      fontSize: "1.25rem",
                    }}
                  >
                    {(bus.price * passengers).toLocaleString()} XAF
                  </span>
                </div>
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "Merriweather, serif",
                  color: "#999",
                  fontSize: "0.875rem",
                }}
              >
                {t.book_select_seat_hint}
              </p>
            )}
          </div>
          <button
            onClick={onContinue}
            disabled={!selectedSeat}
            style={{
              width: "100%",
              background: selectedSeat
                ? "linear-gradient(135deg, #E85D04, #CC5500)"
                : "#E8E4DA",
              color: selectedSeat ? "white" : "#BBB",
              border: "none",
              borderRadius: "999px",
              padding: "1.1rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "1rem",
              cursor: selectedSeat ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: selectedSeat
                ? "0 4px 20px rgba(232,93,4,0.25)"
                : "none",
            }}
          >
            {t.book_continue_payment}
          </button>
        </div>
      </div>
    </div>
  );
}
