import { IMG_INTERIOR } from "@/data/modalImages";
import { ProgressSteps } from "./ProgressSteps";
import { useLang } from "@/utils/lang";

export function SidebarContent({ route, step }) {
  const { t } = useLang();
  const stats = [
    [t.modal_duration, route.dur],
    [t.modal_distance, `${route.km} km`],
    [t.modal_buses_today, `${route.buses} buses`],
    [t.modal_from, `${route.price.toLocaleString()} XAF`],
  ];

  return (
    <div style={{ padding: "1.5rem", flex: 1, overflowY: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: ".75rem",
          marginBottom: "1.5rem",
        }}
      >
        {stats.map(([k, v]) => (
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
      <ProgressSteps step={step} />
      <div
        style={{ borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/3" }}
      >
        <img
          src={IMG_INTERIOR}
          alt="Bus interior"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
