import { BookingsTable } from "./BookingsTable";
import { RevenueSummary } from "./RevenueSummary";

export function BookingsTab({ bookings }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <h2
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            fontSize: "1.25rem",
            color: "#FAF8F3",
          }}
        >
          Live Bookings
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            background: "rgba(74,222,128,.1)",
            border: "1px solid rgba(74,222,128,.2)",
            borderRadius: "999px",
            padding: ".35rem .75rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4ADE80",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".68rem",
              color: "#4ADE80",
            }}
          >
            Real-time updates
          </span>
        </div>
      </div>
      <BookingsTable bookings={bookings} />
      <RevenueSummary />
    </div>
  );
}
