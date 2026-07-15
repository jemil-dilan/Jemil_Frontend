// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
export const BG = "#0A0A0A";
export const CARD = "#131313";
export const BAR = "#0E0E0E";
export const ACCENT = "#E85D04";
export const DIM = "rgba(245,241,232,.38)";
export const MONO = { fontFamily: "Montserrat,sans-serif" };

// ── CHART STYLES ──────────────────────────────────────────────────────────────
export const CHART_TOOLTIP = {
  contentStyle: {
    background: "#1a1a1a",
    border: "1px solid rgba(245,241,232,.12)",
    borderRadius: ".875rem",
    fontFamily: "Montserrat,sans-serif",
    fontSize: ".78rem",
    color: "#FAF8F3",
  },
  itemStyle: { color: "#FAF8F3" },
  labelStyle: { color: "rgba(245,241,232,.5)", fontWeight: 700 },
};

export const AXIS_STYLE = {
  fontSize: 10,
  fill: "rgba(245,241,232,.32)",
  fontFamily: "Montserrat,sans-serif",
  fontWeight: 600,
};

// ── NAV ITEMS ──────────────────────────────────────────────────────────────────
export const NAV = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "analytics", label: "Analytics", icon: "⟁" },
  { id: "manifests", label: "Manifests", icon: "≡" },
  { id: "schedule", label: "Schedule", icon: "⊞" },
  { id: "incidents", label: "Incidents", icon: "⚠", badge: 2 },
  { id: "settings", label: "Settings", icon: "⊙" },
];
