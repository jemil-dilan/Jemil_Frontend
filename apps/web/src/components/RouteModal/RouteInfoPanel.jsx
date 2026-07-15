import { IMG_BUS_HERO } from "@/data/modalImages";
import { useLang } from "@/utils/lang";

export function RouteInfoPanel({ route, children }) {
  const { t } = useLang();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 380,
        flexShrink: 0,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      className="hidden md:flex"
    >
      {/* Hero photo */}
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={IMG_BUS_HERO}
          alt="JEMIL bus"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 40%, rgba(10,10,10,.95) 100%)",
          }}
        />
        {/* Route codes over photo */}
        <div
          style={{
            position: "absolute",
            bottom: "1.25rem",
            left: "1.5rem",
            right: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "2.4rem",
                color: "#FAF8F3",
                lineHeight: 1,
              }}
            >
              {route.fC}
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".65rem",
                color: "rgba(245,241,232,.45)",
              }}
            >
              {route.from}
            </div>
          </div>
          <div
            style={{
              color: "#E85D04",
              fontSize: "1.5rem",
              paddingBottom: 4,
            }}
          >
            →
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "2.4rem",
                color: "#FAF8F3",
                lineHeight: 1,
              }}
            >
              {route.tC}
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".65rem",
                color: "rgba(245,241,232,.45)",
              }}
            >
              {route.to}
            </div>
          </div>
        </div>
      </div>

      {/* Render children (SidebarContent) or fallback stats */}
      {children ? (
        children
      ) : (
        <div style={{ padding: "1.5rem", flex: 1, overflowY: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".75rem",
            }}
          >
            {[
              [t.modal_duration, route.dur],
              [t.modal_distance, `${route.km} km`],
              [t.modal_buses_today, `${route.buses} buses`],
              [t.modal_from, `${route.price.toLocaleString()} XAF`],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: "rgba(245,241,232,.05)",
                  borderRadius: ".75rem",
                  padding: ".875rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.32)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    marginBottom: ".2rem",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "1rem",
                    color: k === t.modal_from ? "#E85D04" : "#FAF8F3",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
