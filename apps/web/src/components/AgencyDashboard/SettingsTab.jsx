import { useState } from "react";
import { AgencyProfile } from "./AgencyProfile";
import { PayoutSettings } from "./PayoutSettings";
import { PlanInfo } from "./PlanInfo";

export function SettingsTab() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <h2
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 900,
          fontSize: "1.25rem",
          color: "#FAF8F3",
          marginBottom: "1.5rem",
        }}
      >
        Agency Settings
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <AgencyProfile />
        <PayoutSettings />
        <PlanInfo />
        <button
          onClick={handleSave}
          style={{
            background: saved
              ? "linear-gradient(135deg,#4ADE80,#22C55E)"
              : "linear-gradient(135deg,#E85D04,#CC5500)",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "1rem 2.5rem",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            fontSize: ".95rem",
            cursor: "pointer",
            boxShadow: saved
              ? "0 0 30px rgba(74,222,128,.3)"
              : "0 0 30px rgba(232,93,4,.3)",
            alignSelf: "flex-start",
            transition: "all .3s",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          {saved ? "✓ Saved!" : "Save Changes →"}
        </button>
      </div>
    </div>
  );
}
