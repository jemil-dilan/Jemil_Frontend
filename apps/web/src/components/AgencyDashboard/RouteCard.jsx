import { SeatMap } from "./SeatMap";
import { STATUS_STYLE } from "@/data/agencyDashboardData";

export function RouteCard({ route, isOpen, onToggle }) {
  var pct = Math.round((route.sold / route.seats) * 100);
  var st = STATUS_STYLE[route.status] || STATUS_STYLE["On Sale"];

  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "1.25rem",
        border: `1.5px solid ${isOpen ? "rgba(232,93,4,.4)" : "rgba(245,241,232,.07)"}`,
        overflow: "hidden",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        {/* Route */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            minWidth: 0,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: "#FAF8F3",
              }}
            >
              {route.code}
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".72rem",
                color: "rgba(245,241,232,.4)",
              }}
            >
              {route.dep} → {route.arr}
            </div>
          </div>
        </div>
        {/* Center: seat fill bar */}
        <div style={{ flex: 1, minWidth: 120, maxWidth: 220 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".3rem",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".68rem",
                color: "rgba(245,241,232,.45)",
              }}
            >
              {route.sold}/{route.seats} seats
            </span>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".68rem",
                color:
                  pct >= 90 ? "#F87171" : pct >= 60 ? "#FBBF24" : "#4ADE80",
              }}
            >
              {pct}%
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: "rgba(245,241,232,.08)",
              borderRadius: 999,
            }}
          >
            <div
              style={{
                height: "100%",
                width: pct + "%",
                background:
                  pct >= 90 ? "#F87171" : pct >= 60 ? "#FBBF24" : "#4ADE80",
                borderRadius: 999,
              }}
            />
          </div>
        </div>
        {/* Right: price + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 900,
                fontSize: "1.05rem",
                color: "#E85D04",
              }}
            >
              {route.price.toLocaleString()} XAF
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 600,
                fontSize: ".62rem",
                color: "rgba(245,241,232,.35)",
              }}
            >
              per seat
            </div>
          </div>
          <span
            style={{
              background: st.bg,
              color: st.color,
              border: `1px solid ${st.border}`,
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".65rem",
              padding: ".3rem .75rem",
              borderRadius: "999px",
              textTransform: "uppercase",
              letterSpacing: ".06em",
              whiteSpace: "nowrap",
            }}
          >
            {route.status}
          </span>
          <span
            style={{
              color: "rgba(245,241,232,.3)",
              fontSize: "1rem",
              transition: "transform .2s",
              transform: isOpen ? "rotate(180deg)" : "none",
            }}
          >
            ▾
          </span>
        </div>
      </div>
      {/* Expanded: seat map + actions */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(245,241,232,.07)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".65rem",
                color: "rgba(245,241,232,.35)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".65rem",
              }}
            >
              Seat Map
            </p>
            <SeatMap sold={route.sold} total={route.seats} />
            <div
              style={{
                display: "flex",
                gap: ".75rem",
                marginTop: ".65rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: "#E85D04",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.4)",
                  }}
                >
                  Sold
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: "rgba(245,241,232,.12)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.4)",
                  }}
                >
                  Available
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              flex: 1,
              minWidth: 200,
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".65rem",
                color: "rgba(245,241,232,.35)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".15rem",
              }}
            >
              Actions
            </p>
            {[
              {
                label: "📋 View Passenger Manifest",
                action: "View",
              },
              { label: "💱 Change Seat Price", action: "Edit" },
              {
                label: "❌ Cancel & Refund All",
                action: "Cancel",
              },
              {
                label: "📤 Export Booking List",
                action: "Export",
              },
            ].map(function (a) {
              return (
                <button
                  key={a.label}
                  style={{
                    background: "rgba(245,241,232,.04)",
                    border: "1px solid rgba(245,241,232,.09)",
                    borderRadius: ".75rem",
                    padding: ".65rem 1rem",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 700,
                    fontSize: ".8rem",
                    color: "rgba(245,241,232,.7)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all .15s",
                  }}
                  onMouseEnter={function (e) {
                    e.currentTarget.style.borderColor = "rgba(232,93,4,.4)";
                    e.currentTarget.style.color = "#FAF8F3";
                  }}
                  onMouseLeave={function (e) {
                    e.currentTarget.style.borderColor = "rgba(245,241,232,.09)";
                    e.currentTarget.style.color = "rgba(245,241,232,.7)";
                  }}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
