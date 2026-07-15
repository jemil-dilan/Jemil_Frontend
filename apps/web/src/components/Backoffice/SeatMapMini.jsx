import { ACCENT } from "./constants";

export function SeatMapMini({ sold, total }) {
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap", maxWidth: 180 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 2,
            background: i < sold ? ACCENT : "rgba(245,241,232,.1)",
          }}
        />
      ))}
    </div>
  );
}
