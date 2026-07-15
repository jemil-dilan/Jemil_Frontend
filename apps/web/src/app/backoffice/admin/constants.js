// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
export const BG = "#060606";
export const CARD = "#111111";
export const BAR = "#0A0A0A";
export const ACCENT = "#E85D04";
export const GREEN = "#4ADE80";
export const BLUE = "#60A5FA";
export const YELLOW = "#FBBF24";
export const PURPLE = "#A78BFA";
export const DIM = "rgba(245,241,232,.38)";
export const MONO = { fontFamily: "Montserrat,sans-serif" };

export const CHART_TOOLTIP = {
  contentStyle: {
    background: "#181818",
    border: "1px solid rgba(245,241,232,.12)",
    borderRadius: ".875rem",
    ...MONO,
    fontSize: ".78rem",
    color: "#FAF8F3",
  },
  itemStyle: { color: "#FAF8F3" },
  labelStyle: { color: "rgba(245,241,232,.5)", fontWeight: 700 },
};

export const AXIS = {
  fontSize: 10,
  fill: "rgba(245,241,232,.32)",
  fontFamily: "Montserrat,sans-serif",
  fontWeight: 600,
};

// ── NAVIGATION ────────────────────────────────────────────────────────────────
export const NAV = [
  { id: "overview", icon: "◈", label: "Overview" },
  { id: "analytics", icon: "⟁", label: "Analytics" },
  { id: "agencies", icon: "🏢", label: "Agencies", badge: 1 },
  { id: "financials", icon: "🏦", label: "Financials" },
  { id: "users", icon: "👤", label: "Users" },
  { id: "incidents", icon: "⚠", label: "Incidents", badge: 3 },
  { id: "routes", icon: "🗺", label: "Routes" },
  { id: "settings", icon: "⊙", label: "Settings" },
];
