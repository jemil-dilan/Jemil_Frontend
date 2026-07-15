export function RevenueBar({ day, amount, max }) {
  var pct = (amount / max) * 100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: ".4rem",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(245,241,232,.06)",
          borderRadius: "4px 4px 0 0",
          height: 80,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "linear-gradient(180deg,#E85D04,#CC5500)",
            borderRadius: "4px 4px 0 0",
            height: pct + "%",
            transition: "height .6s cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 700,
          fontSize: ".6rem",
          color: "rgba(245,241,232,.35)",
          textAlign: "center",
          width: "100%",
        }}
      >
        {day}
      </span>
    </div>
  );
}
