export function DashboardTopBar({ agencyName, onAddTrip }) {
  return (
    <div
      style={{
        background: "#111",
        borderBottom: "1px solid rgba(232,93,4,.15)",
        padding: "1.25rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".65rem",
                color: "#E85D04",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                marginBottom: ".25rem",
              }}
            >
              Agency Dashboard
            </p>
            <h1
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "1.6rem",
                color: "#FAF8F3",
                letterSpacing: "-.03em",
                lineHeight: 1,
              }}
            >
              {agencyName}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            {/* Live indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                background: "rgba(74,222,128,.1)",
                border: "1px solid rgba(74,222,128,.25)",
                borderRadius: "999px",
                padding: ".35rem .875rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ADE80",
                  display: "inline-block",
                  animation: "ripple 1.5s ease-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".68rem",
                  color: "#4ADE80",
                }}
              >
                Live · Sync active
              </span>
            </div>
            <button
              onClick={onAddTrip}
              style={{
                background: "linear-gradient(135deg,#E85D04,#CC5500)",
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: ".55rem 1.25rem",
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 800,
                fontSize: ".78rem",
                cursor: "pointer",
                boxShadow: "0 0 18px rgba(232,93,4,.3)",
              }}
            >
              + Add Bus Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
