import { MONO, DIM, GREEN } from "./constants";

export function Kpi({ icon, label, value, delta, color, sub }) {
  return (
    <div
      style={{
        background: "#111111",
        borderRadius: "1.1rem",
        padding: "1.25rem 1.4rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: ".35rem",
        }}
      >
        <span style={{ fontSize: "1.35rem" }}>{icon}</span>
        {delta && (
          <span
            style={{
              ...MONO,
              fontWeight: 700,
              fontSize: ".6rem",
              color: delta.startsWith("+") ? GREEN : "#F87171",
              background: delta.startsWith("+")
                ? "rgba(74,222,128,.1)"
                : "rgba(239,68,68,.1)",
              border: `1px solid ${delta.startsWith("+") ? "rgba(74,222,128,.2)" : "rgba(239,68,68,.2)"}`,
              borderRadius: "999px",
              padding: ".15rem .5rem",
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <div
        style={{
          ...MONO,
          fontWeight: 900,
          fontSize: "1.7rem",
          color: color || "#FAF8F3",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          ...MONO,
          fontWeight: 600,
          fontSize: ".6rem",
          color: DIM,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          marginTop: ".25rem",
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            ...MONO,
            fontWeight: 500,
            fontSize: ".62rem",
            color: "rgba(245,241,232,.25)",
            marginTop: ".1rem",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
