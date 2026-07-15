import { CARD, MONO, DIM } from "./constants";

export function ChartCard({ title, subtitle, children, height = 220, action }) {
  return (
    <div
      style={{
        background: CARD,
        borderRadius: "1.1rem",
        border: "1px solid rgba(245,241,232,.07)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.1rem 1.4rem .5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              ...MONO,
              fontWeight: 900,
              fontSize: ".95rem",
              color: "#FAF8F3",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                ...MONO,
                fontWeight: 600,
                fontSize: ".68rem",
                color: DIM,
                marginTop: ".15rem",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {action}
      </div>
      <div style={{ height, padding: "0 .5rem .75rem" }}>{children}</div>
    </div>
  );
}
