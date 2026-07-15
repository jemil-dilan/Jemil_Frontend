export function StatsCard({ stat }) {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: ".75rem",
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{stat.icon}</span>
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".65rem",
            color: "#4ADE80",
            background: "rgba(74,222,128,.1)",
            border: "1px solid rgba(74,222,128,.2)",
            borderRadius: "999px",
            padding: ".15rem .55rem",
          }}
        >
          {stat.delta}
        </span>
      </div>
      <div
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1.55rem",
          color: stat.color,
          lineHeight: 1,
          marginBottom: ".3rem",
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 600,
          fontSize: ".7rem",
          color: "rgba(245,241,232,.38)",
          textTransform: "uppercase",
          letterSpacing: ".1em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
