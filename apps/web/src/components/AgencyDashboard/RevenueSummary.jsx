import { MOCK_BOOKINGS } from "@/data/agencyDashboardData";

export function RevenueSummary() {
  const handleExport = () => {
    const header =
      "Booking ID,Passenger,Route,Seat,Payment,Amount (XAF),When\n";
    const rows = MOCK_BOOKINGS.map((b) =>
      [b.id, b.name, b.route, b.seat, b.pay, b.amount, b.time].join(","),
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        background: "rgba(232,93,4,.08)",
        border: "1px solid rgba(232,93,4,.2)",
        borderRadius: "1rem",
        padding: "1.25rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".65rem",
            color: "rgba(245,241,232,.45)",
            textTransform: "uppercase",
            letterSpacing: ".12em",
            marginBottom: ".2rem",
          }}
        >
          Total Collected Today
        </p>
        <div
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            fontSize: "2rem",
            color: "#E85D04",
          }}
        >
          28,450,000{" "}
          <span
            style={{
              fontSize: ".75rem",
              fontWeight: 600,
              color: "rgba(245,241,232,.3)",
            }}
          >
            XAF
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {[
          ["342", "Passengers", "#FAF8F3"],
          ["18", "Buses", "#4ADE80"],
        ].map(([v, k, c]) => (
          <div key={k} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "1.4rem",
                color: c,
              }}
            >
              {v}
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".6rem",
                color: "rgba(245,241,232,.35)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
              }}
            >
              {k}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleExport}
        style={{
          background: "linear-gradient(135deg,#E85D04,#CC5500)",
          color: "white",
          border: "none",
          borderRadius: "999px",
          padding: ".75rem 1.75rem",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 800,
          fontSize: ".85rem",
          cursor: "pointer",
        }}
      >
        Export Report →
      </button>
    </div>
  );
}
