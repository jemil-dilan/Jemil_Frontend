import { RevenueBar } from "./RevenueBar";

export function RevenueChart({ weekRevenue }) {
  var maxRevenue = Math.max.apply(
    null,
    weekRevenue.map(function (d) {
      return d.amount;
    }),
  );

  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid rgba(245,241,232,.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".65rem",
              color: "rgba(245,241,232,.38)",
              textTransform: "uppercase",
              letterSpacing: ".12em",
              marginBottom: ".2rem",
            }}
          >
            This Week
          </p>
          <h3
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "1.3rem",
              color: "#FAF8F3",
            }}
          >
            Revenue (XAF)
          </h3>
        </div>
        <span
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".7rem",
            color: "#4ADE80",
          }}
        >
          ↑ 22% vs last week
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          alignItems: "flex-end",
        }}
      >
        {weekRevenue.map(function (d) {
          return (
            <RevenueBar
              key={d.day}
              day={d.day}
              amount={d.amount}
              max={maxRevenue}
            />
          );
        })}
      </div>
    </div>
  );
}
