import { STATUS_MAP } from "@/data/backofficeData";
import { MONO } from "./constants";

export function Badge({ label }) {
  const s = STATUS_MAP[label] || STATUS_MAP["Resolved"];
  return (
    <span
      style={{
        background: s.bg,
        color: s.c,
        border: `1px solid ${s.b}`,
        ...MONO,
        fontWeight: 700,
        fontSize: ".6rem",
        padding: ".18rem .6rem",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: ".06em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
