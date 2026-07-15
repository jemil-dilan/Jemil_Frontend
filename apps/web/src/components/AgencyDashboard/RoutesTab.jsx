import { RouteCard } from "./RouteCard";

export function RoutesTab({ routes, selectedRoute, onRouteToggle }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: ".75rem",
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
          Today's Departures
        </h2>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              fontSize: ".72rem",
              color: "rgba(245,241,232,.45)",
              background: "rgba(245,241,232,.06)",
              border: "1px solid rgba(245,241,232,.1)",
              borderRadius: "999px",
              padding: ".3rem .75rem",
            }}
          >
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {routes.map(function (r) {
          var isOpen = selectedRoute === r.id;
          return (
            <RouteCard
              key={r.id}
              route={r}
              isOpen={isOpen}
              onToggle={function () {
                onRouteToggle(isOpen ? null : r.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
