import { useLang } from "@/utils/lang";

export function ModalHeader({ step, route, onClose }) {
  const { t } = useLang();
  const titles = {
    0: { label: t.modal_route_details, heading: `${route.from} → ${route.to}` },
    1: { label: t.modal_available_buses, heading: t.modal_choose_bus },
    2: { label: t.modal_complete, heading: t.modal_seat_pay },
  };
  const current = titles[step] || titles[0];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.75rem",
        flexShrink: 0,
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".65rem",
            color: "#E85D04",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: ".3rem",
          }}
        >
          {current.label}
        </p>
        <h2
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            fontSize: "1.6rem",
            color: "#FAF8F3",
            lineHeight: 1.1,
            letterSpacing: "-.03em",
          }}
        >
          {current.heading}
        </h2>
      </div>
      <button
        onClick={onClose}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(245,241,232,.08)",
          border: "1px solid rgba(245,241,232,.12)",
          color: "rgba(245,241,232,.6)",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}
