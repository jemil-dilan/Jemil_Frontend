import { MONO, DIM } from "./constants";

export function ChartCard({
  title,
  subtitle,
  children,
  height = 240,
  action,
  noPad,
}) {
  return (
    <div
      style={{
        background: "#111111",
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
                fontSize: ".67rem",
                color: DIM,
                marginTop: ".12rem",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {action}
      </div>
      <div style={{ height, padding: noPad ? 0 : "0 .5rem .75rem" }}>
        {children}
      </div>
    </div>
  );
}
