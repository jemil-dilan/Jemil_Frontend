import { CARD, MONO, DIM } from "./constants";

export function Kpi({ icon, label, value, delta, color, sub }) {
  return (
    <div
      style={{
        background: CARD,
        borderRadius: "1.1rem",
        padding: "1.25rem 1.4rem",
        border: "1px solid rgba(245,241,232,.07)",
        display: "flex",
        flexDirection: "column",
        gap: ".3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{icon}</span>
        {delta && (
          <span
            style={{
              ...MONO,
              fontWeight: 700,
              fontSize: ".6rem",
              color: delta.startsWith("+") ? "#4ADE80" : "#F87171",
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
          fontSize: "1.65rem",
          color: color || "#FAF8F3",
          lineHeight: 1,
          marginTop: ".25rem",
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
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            ...MONO,
            fontWeight: 600,
            fontSize: ".62rem",
            color: "rgba(245,241,232,.25)",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
