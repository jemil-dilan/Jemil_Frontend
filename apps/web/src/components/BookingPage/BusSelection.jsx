import { BusCard } from "./BusCard";

export function BusSelection({
  buses,
  selectedBus,
  onSelectBus,
  onBack,
  fromName,
  toName,
  date,
  passengers,
  t,
  lang,
}) {
  return (
    <div className="step-enter">
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#E85D04",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          {t.book_back}
        </button>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "#0D0D0D",
            marginTop: "0.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          {fromName} → {toName}
        </h2>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "#888",
            fontSize: "0.875rem",
          }}
        >
          {new Date(date).toLocaleDateString(
            lang === "fr" ? "fr-FR" : "en-GB",
            { weekday: "long", day: "numeric", month: "long" },
          )}{" "}
          · {passengers}{" "}
          {lang === "fr"
            ? `passager${passengers > 1 ? "s" : ""}`
            : `passenger${passengers > 1 ? "s" : ""}`}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {buses.map((b) => (
          <BusCard
            key={b.id}
            bus={b}
            selectedBus={selectedBus}
            onSelect={onSelectBus}
            passengers={passengers}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
