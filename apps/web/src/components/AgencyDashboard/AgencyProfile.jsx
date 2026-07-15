export function AgencyProfile() {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color: "#FAF8F3",
          marginBottom: "1.25rem",
        }}
      >
        Agency Profile
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {[
          ["Agency Name", "General Express"],
          ["City HQ", "Douala"],
          ["Phone", "+237 699 001 002"],
          ["Email", "info@generalexpress.cm"],
          ["Founded", "1998"],
          ["License #", "MIT-CMR-00241"],
        ].map(function ([k, v]) {
          return (
            <div key={k}>
              <label
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  fontSize: ".62rem",
                  color: "rgba(245,241,232,.35)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  display: "block",
                  marginBottom: ".35rem",
                }}
              >
                {k}
              </label>
              <input
                defaultValue={v}
                style={{
                  width: "100%",
                  background: "rgba(245,241,232,.06)",
                  border: "1px solid rgba(245,241,232,.12)",
                  borderRadius: ".75rem",
                  padding: ".7rem .9rem",
                  color: "#FAF8F3",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  fontSize: ".88rem",
                  outline: "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
