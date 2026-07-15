export function PlanInfo() {
  return (
    <div
      style={{
        background: "rgba(232,93,4,.08)",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(232,93,4,.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".65rem",
              color: "#E85D04",
              textTransform: "uppercase",
              letterSpacing: ".12em",
              marginBottom: ".3rem",
            }}
          >
            Current Plan
          </p>
          <h3
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "1.35rem",
              color: "#FAF8F3",
            }}
          >
            Pro Partner
          </h3>
          <p
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: ".82rem",
              color: "rgba(245,241,232,.5)",
              lineHeight: 1.7,
              marginTop: ".4rem",
            }}
          >
            3% commission per ticket · Instant payouts · Priority listing ·
            Analytics dashboard
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "#E85D04",
            }}
          >
            3%
          </div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              fontSize: ".65rem",
              color: "rgba(245,241,232,.35)",
            }}
          >
            per ticket only
          </div>
        </div>
      </div>
    </div>
  );
}
