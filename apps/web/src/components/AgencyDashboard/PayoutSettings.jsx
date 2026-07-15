export function PayoutSettings() {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color: "#FAF8F3",
          marginBottom: "1.25rem",
        }}
      >
        Payout Settings
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
        }}
      >
        {[
          ["MTN Mobile Money", "237699001002"],
          ["Orange Money", "237692001003"],
        ].map(function ([provider, number]) {
          return (
            <div
              key={provider}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(245,241,232,.04)",
                borderRadius: ".875rem",
                padding: ".875rem 1rem",
                border: "1px solid rgba(245,241,232,.08)",
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
                  {provider}
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".72rem",
                    color: "rgba(245,241,232,.4)",
                  }}
                >
                  {number}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".65rem",
                  color: "#4ADE80",
                  background: "rgba(74,222,128,.1)",
                  border: "1px solid rgba(74,222,128,.2)",
                  borderRadius: "999px",
                  padding: ".2rem .65rem",
                }}
              >
                Active
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
