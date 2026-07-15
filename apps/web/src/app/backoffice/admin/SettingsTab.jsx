import { ACCENT, CARD } from "./constants";

export function SettingsTab({ showToast }) {
  return (
    <div
      style={{
        maxWidth: 700,
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
      }}
    >
      <h2
        style={{
          fontWeight: 900,
          fontSize: "1.15rem",
          color: "#FAF8F3",
        }}
      >
        Platform Settings
      </h2>
      {[
        {
          title: "Commission Rates",
          fields: [
            ["Default Commission (Starter)", "4%"],
            ["Pro Partner Commission", "3%"],
            ["Founding Partner (Free Period)", "0%"],
            ["Diaspora Transaction Fee", "€1.50"],
          ],
        },
        {
          title: "Payment Configuration",
          fields: [
            ["MTN MoMo API Endpoint", "https://api.mtn.com/momo/..."],
            ["Orange Money API Endpoint", "https://api.orange.cm/..."],
            ["Stripe Publishable Key", "pk_live_••••••••"],
            ["PayPal Client ID", "AW••••••••"],
          ],
        },
        {
          title: "Platform Identity",
          fields: [
            ["Platform Name", "JEMIL"],
            ["Support Email", "support@jemil.cm"],
            ["WhatsApp Support", "+237 699 000 001"],
            ["Min. Refund Window (hours)", "2"],
          ],
        },
      ].map((section) => (
        <div
          key={section.title}
          style={{
            background: CARD,
            borderRadius: "1.1rem",
            padding: "1.5rem",
            border: "1px solid rgba(245,241,232,.07)",
          }}
        >
          <h3
            style={{
              fontWeight: 800,
              fontSize: ".92rem",
              color: "#FAF8F3",
              marginBottom: "1.1rem",
            }}
          >
            {section.title}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".9rem",
            }}
          >
            {section.fields.map(([k, v]) => (
              <div key={k}>
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: ".58rem",
                    color: "rgba(245,241,232,.3)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    display: "block",
                    marginBottom: ".3rem",
                  }}
                >
                  {k}
                </label>
                <input
                  defaultValue={v}
                  style={{
                    width: "100%",
                    background: "rgba(245,241,232,.04)",
                    border: "1px solid rgba(245,241,232,.09)",
                    borderRadius: ".75rem",
                    padding: ".7rem .9rem",
                    color: "#FAF8F3",
                    fontWeight: 600,
                    fontSize: ".85rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        style={{
          background: "rgba(239,68,68,.06)",
          borderRadius: "1.1rem",
          padding: "1.25rem",
          border: "1px solid rgba(239,68,68,.15)",
        }}
      >
        <h3
          style={{
            fontWeight: 800,
            fontSize: ".88rem",
            color: "#F87171",
            marginBottom: ".5rem",
          }}
        >
          Danger Zone
        </h3>
        <p
          style={{
            fontFamily: "Merriweather,serif",
            fontWeight: 300,
            fontSize: ".8rem",
            color: "rgba(245,241,232,.38)",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}
        >
          These actions are irreversible. Only perform them in exceptional
          circumstances.
        </p>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.confirm(
                  `⚠️ Freeze All Settlements\n\nThis action affects all agencies. Are you sure?`,
                )
              ) {
                showToast(
                  "⊘ All settlements frozen — no new payouts",
                  "warning",
                );
              }
            }}
            style={{
              background: "rgba(239,68,68,.08)",
              border: "1px solid rgba(239,68,68,.2)",
              color: "#F87171",
              borderRadius: "999px",
              padding: ".5rem 1.1rem",
              fontWeight: 700,
              fontSize: ".75rem",
              cursor: "pointer",
            }}
          >
            ⊘ Freeze All Settlements
          </button>
          <button
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.confirm(
                  `⚠️ Enable Maintenance Mode\n\nThis action affects all agencies. Are you sure?`,
                )
              ) {
                showToast("🔒 Platform is now in maintenance mode", "warning");
              }
            }}
            style={{
              background: "rgba(239,68,68,.08)",
              border: "1px solid rgba(239,68,68,.2)",
              color: "#F87171",
              borderRadius: "999px",
              padding: ".5rem 1.1rem",
              fontWeight: 700,
              fontSize: ".75rem",
              cursor: "pointer",
            }}
          >
            🔒 Maintenance Mode
          </button>
        </div>
      </div>
      <button
        onClick={() => showToast("✅ Platform settings saved successfully")}
        style={{
          background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
          color: "white",
          border: "none",
          borderRadius: "999px",
          padding: ".9rem 2.25rem",
          fontWeight: 900,
          fontSize: ".9rem",
          cursor: "pointer",
          boxShadow: "0 0 22px rgba(232,93,4,.28)",
          alignSelf: "flex-start",
        }}
      >
        Save Changes →
      </button>
    </div>
  );
}
