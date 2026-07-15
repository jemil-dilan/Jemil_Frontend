export function PaymentMethodSelector({ payMethod, setPayMethod, t }) {
  const methods = [
    {
      id: "mtn",
      label: t.pay_mtn,
      emoji: "🟡",
      desc: t.pay_mtn_desc,
    },
    {
      id: "orange",
      label: t.pay_orange,
      emoji: "🟠",
      desc: t.pay_orange_desc,
    },
    {
      id: "card",
      label: t.pay_card,
      emoji: "💳",
      desc: t.pay_card_desc,
    },
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid #E8E4DA",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 800,
          color: "#0D0D0D",
          marginBottom: "1.25rem",
        }}
      >
        {t.book_payment_method}
      </div>
      {methods.map((m) => (
        <div
          key={m.id}
          onClick={() => setPayMethod(m.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            borderRadius: "0.875rem",
            border: `2px solid ${payMethod === m.id ? "#E85D04" : "#E8E4DA"}`,
            marginBottom: "0.75rem",
            cursor: "pointer",
            transition: "all 0.15s",
            background: payMethod === m.id ? "#FFF5E8" : "white",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>{m.emoji}</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "#0D0D0D",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                color: "#888",
              }}
            >
              {m.desc}
            </div>
          </div>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: `2px solid ${payMethod === m.id ? "#E85D04" : "#E8E4DA"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {payMethod === m.id && (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#E85D04",
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
