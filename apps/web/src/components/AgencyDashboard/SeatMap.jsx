export function SeatMap({ sold, total }) {
  var pct = sold / total;
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap", maxWidth: 120 }}>
      {Array.from({ length: total }, function (_, i) {
        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: 2,
              background: i < sold ? "#E85D04" : "rgba(245,241,232,.12)",
            }}
          />
        );
      })}
    </div>
  );
}
