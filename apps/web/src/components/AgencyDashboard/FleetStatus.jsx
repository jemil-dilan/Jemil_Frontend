export function FleetStatus() {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <p
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 700,
          fontSize: ".65rem",
          color: "rgba(245,241,232,.38)",
          textTransform: "uppercase",
          letterSpacing: ".12em",
          marginBottom: ".2rem",
        }}
      >
        Today
      </p>
      <h3
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1.3rem",
          color: "#FAF8F3",
          marginBottom: "1.25rem",
        }}
      >
        Fleet Status
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
        }}
      >
        {[
          {
            label: "Buses on road now",
            value: 8,
            color: "#4ADE80",
          },
          {
            label: "At terminal / boarding",
            value: 3,
            color: "#FBBF24",
          },
          { label: "Full (sold out)", value: 2, color: "#F87171" },
          { label: "Available buses", value: 5, color: "#60A5FA" },
        ].map(function (item) {
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".6rem",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".82rem",
                    color: "rgba(245,241,232,.65)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: item.color,
                }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
