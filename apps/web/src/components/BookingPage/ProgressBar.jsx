import { STEPS_EN, STEPS_FR } from "@/data/bookingSteps";

export function ProgressBar({ step, lang }) {
  const STEPS = lang === "fr" ? STEPS_FR : STEPS_EN;

  return (
    <div
      style={{
        background: "#0D0D0D",
        paddingTop: "5rem",
        paddingBottom: "1.5rem",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", gap: 0, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              right: "12px",
              height: "2px",
              background: "rgba(255,255,255,0.1)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              height: "2px",
              background: "#E85D04",
              zIndex: 0,
              width: `${(step / (STEPS.length - 1)) * (100 - 3)}%`,
              transition: "width 0.4s",
            }}
          />
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i <= step ? "#E85D04" : "rgba(255,255,255,0.1)",
                  border: i === step ? "3px solid rgba(232,93,4,0.35)" : "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: i <= step ? "white" : "rgba(255,255,255,0.35)",
                  transition: "all 0.3s",
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <div
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: i <= step ? "#E85D04" : "rgba(255,255,255,0.3)",
                  marginTop: "0.4rem",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
