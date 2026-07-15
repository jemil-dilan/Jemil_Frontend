import { useState } from "react";
import { CARD, ACCENT } from "./constants";
import { Badge } from "./Badge";
import { useLang } from "@/utils/lang";

export function SettingsTab({ showToast }) {
  const { t } = useLang();

  // Build profile using translated field labels
  const FIELD_KEYS = t.bo_settings_fields;
  const FIELD_VALUES = [
    "General Express",
    "Douala",
    "+237 699 001 002",
    "ops@generalexpress.cm",
    "1998",
    "MIT-CMR-00241",
  ];

  const initProfile = () => {
    const p = {};
    FIELD_KEYS.forEach((k, i) => {
      p[k] = FIELD_VALUES[i];
    });
    return p;
  };

  const [profile, setProfile] = useState(initProfile);
  const [payouts, setPayouts] = useState([
    { provider: "MTN Mobile Money", number: "237699001002" },
    { provider: "Orange Money", number: "237692001003" },
  ]);
  const [editingPayout, setEditingPayout] = useState(null);
  const [editPayoutVal, setEditPayoutVal] = useState("");
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleProfileChange = (key, val) => {
    setProfile((prev) => ({ ...prev, [key]: val }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePayout = (i) => {
    if (!editPayoutVal.trim()) return;
    setPayouts((prev) =>
      prev.map((p, idx) =>
        idx === i ? { ...p, number: editPayoutVal.trim() } : p,
      ),
    );
    setEditingPayout(null);
    setEditPayoutVal("");
  };

  const planStats = [
    ["6", t.bo_settings_months],
    ["3,284", t.bo_settings_tickets],
    ["121.6M XAF", t.bo_settings_earned],
    ["Same Day", t.bo_settings_speed],
  ];

  return (
    <div
      style={{
        maxWidth: 680,
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
      }}
    >
      <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#FAF8F3" }}>
        {t.bo_settings_title}
      </h2>

      {/* Profile */}
      <div
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
          {t.bo_settings_profile}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: ".9rem",
          }}
        >
          {Object.entries(profile).map(([k, v]) => (
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
                value={v}
                onChange={(e) => handleProfileChange(k, e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(245,241,232,.05)",
                  border: "1px solid rgba(245,241,232,.1)",
                  borderRadius: ".75rem",
                  padding: ".7rem .9rem",
                  color: "#FAF8F3",
                  fontWeight: 600,
                  fontSize: ".85rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color .15s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(232,93,4,.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(245,241,232,.1)")
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payout */}
      <div
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
          {t.bo_settings_payout}
        </h3>
        {payouts.map((p, i) => (
          <div
            key={p.provider}
            style={{
              background: "rgba(245,241,232,.04)",
              borderRadius: ".875rem",
              padding: ".875rem 1rem",
              border: "1px solid rgba(245,241,232,.08)",
              marginBottom: ".5rem",
            }}
          >
            {editingPayout === i ? (
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: ".85rem",
                      color: "#FAF8F3",
                      marginBottom: ".4rem",
                    }}
                  >
                    {p.provider}
                  </div>
                  <input
                    value={editPayoutVal}
                    onChange={(e) => setEditPayoutVal(e.target.value)}
                    placeholder="Phone number"
                    autoFocus
                    style={{
                      width: "100%",
                      background: "rgba(245,241,232,.07)",
                      border: "1px solid rgba(232,93,4,.4)",
                      borderRadius: ".5rem",
                      padding: ".45rem .75rem",
                      color: "#FAF8F3",
                      fontWeight: 600,
                      fontSize: ".82rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  onClick={() => handleSavePayout(i)}
                  style={{
                    background: ACCENT,
                    color: "white",
                    border: "none",
                    borderRadius: ".6rem",
                    padding: ".5rem 1rem",
                    fontWeight: 800,
                    fontSize: ".72rem",
                    cursor: "pointer",
                  }}
                >
                  ✓
                </button>
                <button
                  onClick={() => setEditingPayout(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(245,241,232,.4)",
                    cursor: "pointer",
                    fontSize: ".8rem",
                    fontWeight: 700,
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: ".88rem",
                      color: "#FAF8F3",
                    }}
                  >
                    {p.provider}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".7rem",
                      color: "rgba(245,241,232,.38)",
                    }}
                  >
                    {p.number}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    alignItems: "center",
                  }}
                >
                  <Badge label={t.bo_settings_active} />
                  <button
                    onClick={() => {
                      setEditingPayout(i);
                      setEditPayoutVal(p.number);
                    }}
                    style={{
                      fontWeight: 700,
                      fontSize: ".67rem",
                      color: ACCENT,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {t.bo_settings_edit}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Plan */}
      <div
        style={{
          background: "rgba(232,93,4,.07)",
          borderRadius: "1.1rem",
          padding: "1.5rem",
          border: "1px solid rgba(232,93,4,.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: ".75rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: ".58rem",
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                marginBottom: ".3rem",
              }}
            >
              {t.bo_settings_plan}
            </p>
            <h3
              style={{ fontWeight: 900, fontSize: "1.25rem", color: "#FAF8F3" }}
            >
              {t.bo_settings_plan_name}
            </h3>
            <p
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                fontSize: ".82rem",
                color: "rgba(245,241,232,.48)",
                lineHeight: 1.75,
                marginTop: ".35rem",
              }}
            >
              {t.bo_settings_plan_desc}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 900, fontSize: "1.5rem", color: ACCENT }}>
              3%
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: ".6rem",
                color: "rgba(245,241,232,.3)",
              }}
            >
              {t.bo_settings_per_ticket}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))",
            gap: ".65rem",
          }}
        >
          {planStats.map(([v, k]) => (
            <div
              key={k}
              style={{
                background: "rgba(245,241,232,.05)",
                borderRadius: ".75rem",
                padding: ".7rem",
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: ".95rem",
                  color: "#FAF8F3",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: ".57rem",
                  color: "rgba(245,241,232,.3)",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  marginTop: ".1rem",
                }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        style={{
          background: saved
            ? "linear-gradient(135deg, #4ADE80, #22C55E)"
            : `linear-gradient(135deg,${ACCENT},#CC5500)`,
          color: "white",
          border: "none",
          borderRadius: "999px",
          padding: ".9rem 2.25rem",
          fontWeight: 900,
          fontSize: ".9rem",
          cursor: "pointer",
          boxShadow: saved
            ? "0 0 22px rgba(74,222,128,.28)"
            : "0 0 22px rgba(232,93,4,.28)",
          alignSelf: "flex-start",
          transition: "all .3s",
          display: "flex",
          alignItems: "center",
          gap: ".6rem",
        }}
      >
        {saved ? (
          <>
            <span style={{ fontSize: "1rem" }}>✓</span> {t.bo_settings_saved}
          </>
        ) : (
          <>
            {t.bo_settings_save} {dirty ? "•" : "→"}
          </>
        )}
      </button>
    </div>
  );
}
