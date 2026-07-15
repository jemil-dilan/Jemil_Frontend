import { useLang } from "@/utils/lang";

export function PaymentMethodSelector({ payMethod, setPayMethod }) {
  const { t } = useLang();
  const methods = [
    ["mtn", "🟡", t.modal_mtn],
    ["orange", "🟠", t.modal_orange],
    ["card", "💳", t.modal_card],
  ];
  return (
    <div>
      <div
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 700,
          fontSize: ".68rem",
          color: "rgba(245,241,232,.4)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          marginBottom: ".5rem",
        }}
      >
        {t.modal_payment}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {methods.map(([id, em, label]) => (
          <div
            key={id}
            onClick={() => setPayMethod(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".75rem 1rem",
              borderRadius: ".75rem",
              border: `1.5px solid ${payMethod === id ? "#E85D04" : "rgba(245,241,232,.1)"}`,
              background:
                payMethod === id
                  ? "rgba(232,93,4,.1)"
                  : "rgba(245,241,232,.04)",
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{em}</span>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".82rem",
                color: payMethod === id ? "#FAF8F3" : "rgba(245,241,232,.55)",
                flex: 1,
              }}
            >
              {label}
            </span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: `2px solid ${payMethod === id ? "#E85D04" : "rgba(245,241,232,.25)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {payMethod === id && (
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#E85D04",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
