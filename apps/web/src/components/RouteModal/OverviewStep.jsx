import { useLang } from "@/utils/lang";

export function OverviewStep({ route, agencies, date, setDate, setStep }) {
  const { t } = useLang();
  const today = new Date().toISOString().split("T")[0];
  const chips = [t.modal_chip1, t.modal_chip2, t.modal_chip3, t.modal_chip4];

  return (
    <div style={{ flex: 1 }}>
      {/* Mobile route display */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(245,241,232,.05)",
          borderRadius: "1rem",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
        }}
        className="md:hidden"
      >
        <div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "2rem",
              color: "#FAF8F3",
            }}
          >
            {route.fC}
          </div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              fontSize: ".65rem",
              color: "rgba(245,241,232,.4)",
            }}
          >
            {route.from}
          </div>
        </div>
        <div style={{ color: "#E85D04", fontSize: "1.2rem" }}>→</div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: "2rem",
              color: "#FAF8F3",
            }}
          >
            {route.tC}
          </div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              fontSize: ".65rem",
              color: "rgba(245,241,232,.4)",
            }}
          >
            {route.to}
          </div>
        </div>
      </div>

      {/* Date picker */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".68rem",
            color: "rgba(245,241,232,.45)",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: ".5rem",
          }}
        >
          {t.modal_select_date}
        </label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            background: "rgba(245,241,232,.07)",
            border: "1px solid rgba(245,241,232,.14)",
            borderRadius: ".875rem",
            padding: ".9rem 1rem",
            color: "#FAF8F3",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer",
            colorScheme: "dark",
          }}
        />
      </div>

      {/* Agency highlights */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".68rem",
            color: "rgba(245,241,232,.45)",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: ".75rem",
          }}
        >
          {t.modal_agencies_on_route}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          {agencies.slice(0, 3).map((a, i) => {
            const TYPE_COLORS = {
              Premium: { bg: "#F3E8FF", border: "#7C3AED", text: "#7C3AED" },
              VIP: { bg: "#FFF5E8", border: "#E85D04", text: "#E85D04" },
              Standard: { bg: "#F0FDF4", border: "#16A34A", text: "#16A34A" },
            };
            const tc = TYPE_COLORS[a.type] || TYPE_COLORS.Standard;
            return (
              <div
                key={i}
                style={{
                  background: "rgba(245,241,232,.05)",
                  borderRadius: ".875rem",
                  padding: ".875rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(245,241,232,.07)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".75rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 800,
                        fontSize: ".9rem",
                        color: "#FAF8F3",
                      }}
                    >
                      {a.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 600,
                        fontSize: ".7rem",
                        color: "rgba(245,241,232,.4)",
                      }}
                    >
                      {a.dep} · ★ {a.rating}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".75rem",
                  }}
                >
                  <span
                    style={{
                      background: tc.bg,
                      border: `1px solid ${tc.border}`,
                      color: tc.text,
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 700,
                      fontSize: ".6rem",
                      padding: ".2rem .55rem",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                    }}
                  >
                    {a.type}
                  </span>
                  <div
                    style={{
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: 900,
                      fontSize: "1rem",
                      color: "#E85D04",
                    }}
                  >
                    {a.price.toLocaleString()}
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: ".65rem",
                        color: "rgba(245,241,232,.35)",
                      }}
                    >
                      {" "}
                      XAF
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {agencies.length > 3 && (
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: ".78rem",
                color: "rgba(245,241,232,.35)",
                textAlign: "center",
                padding: ".5rem",
              }}
            >
              {t.modal_more_agencies(agencies.length - 3)}
            </div>
          )}
        </div>
      </div>

      {/* Info pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".6rem",
          marginBottom: "2rem",
        }}
      >
        {chips.map((chip) => (
          <span
            key={chip}
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              fontSize: ".7rem",
              color: "rgba(245,241,232,.5)",
              background: "rgba(245,241,232,.06)",
              border: "1px solid rgba(245,241,232,.1)",
              borderRadius: 999,
              padding: ".28rem .8rem",
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      <button
        onClick={() => setStep(1)}
        style={{
          width: "100%",
          background: "linear-gradient(135deg,#E85D04,#CC5500)",
          color: "white",
          border: "none",
          borderRadius: "999px",
          padding: "1.1rem",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 0 35px rgba(232,93,4,.35)",
          letterSpacing: ".02em",
          marginTop: "auto",
        }}
      >
        {t.modal_see_buses}
      </button>
    </div>
  );
}
