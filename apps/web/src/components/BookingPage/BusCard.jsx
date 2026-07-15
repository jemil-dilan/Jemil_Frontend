export function BusCard({ bus, selectedBus, onSelect, passengers, t }) {
  return (
    <div
      onClick={() => onSelect(bus.id)}
      className="jemil-shine"
      style={{
        background: "white",
        borderRadius: "1.25rem",
        border: `2px solid ${selectedBus === bus.id ? "#E85D04" : "#E8E4DA"}`,
        padding: "1.25rem 1.5rem",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#E85D04";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(232,93,4,0.12)";
      }}
      onMouseLeave={(e) => {
        if (selectedBus !== bus.id) {
          e.currentTarget.style.borderColor = "#E8E4DA";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.4rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "1.05rem",
                color: "#0D0D0D",
              }}
            >
              {bus.agency}
            </span>
            <span
              style={{
                background:
                  bus.type === "VIP"
                    ? "#FFF5E8"
                    : bus.type === "Premium"
                      ? "#F3E8FF"
                      : "#F0FDF4",
                border: `1px solid ${bus.type === "VIP" ? "#E85D04" : bus.type === "Premium" ? "#7C3AED" : "#16A34A"}`,
                color:
                  bus.type === "VIP"
                    ? "#E85D04"
                    : bus.type === "Premium"
                      ? "#7C3AED"
                      : "#16A34A",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {bus.type}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "Montserrat, sans-serif",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#0D0D0D",
              }}
            >
              {bus.departure}
            </span>
            <span style={{ color: "#CCC" }}>→</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#0D0D0D",
              }}
            >
              {bus.arrival}
            </span>
            <span
              style={{
                color: "#888",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              4h
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              marginTop: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {bus.amenities.map((a) => (
              <span
                key={a}
                style={{
                  background: "#F5F1E8",
                  color: "#666",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "1.6rem",
              color: "#E85D04",
            }}
          >
            {(bus.price * passengers).toLocaleString()}
          </div>
          <div
            style={{
              color: "#888",
              fontSize: "0.72rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
            }}
          >
            XAF · {bus.seats} {t.book_seats_left}
          </div>
          <div
            style={{
              marginTop: "0.25rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "#0D0D0D",
            }}
          >
            ★ {bus.rating}
          </div>
        </div>
      </div>
    </div>
  );
}
