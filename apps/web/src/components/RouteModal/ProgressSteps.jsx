import { useLang } from "@/utils/lang";

export function ProgressSteps({ step }) {
  const { t } = useLang();
  const steps = [
    ["01", t.modal_step1],
    ["02", t.modal_step2],
    ["03", t.modal_step3],
  ];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {steps.map(([n, l], i) => (
        <div
          key={n}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            padding: ".6rem 0",
            borderBottom: i < 2 ? "1px solid rgba(245,241,232,.06)" : "none",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background:
                step > i
                  ? "#E85D04"
                  : step === i
                    ? "rgba(232,93,4,.2)"
                    : "rgba(245,241,232,.07)",
              border: step === i ? "2px solid #E85D04" : "none",
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: ".65rem",
              color:
                step >= i
                  ? step > i
                    ? "white"
                    : "#E85D04"
                  : "rgba(245,241,232,.3)",
            }}
          >
            {step > i ? "✓" : n}
          </div>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: step === i ? 800 : 600,
              fontSize: ".82rem",
              color:
                step >= i
                  ? step === i
                    ? "#FAF8F3"
                    : "rgba(245,241,232,.5)"
                  : "rgba(245,241,232,.28)",
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}
