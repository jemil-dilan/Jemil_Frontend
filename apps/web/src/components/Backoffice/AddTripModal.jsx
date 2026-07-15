import { useState } from "react";
import { ACCENT, MONO } from "./constants";
import { useLang } from "@/utils/lang";

export function AddTripModal({ onClose, onSubmit }) {
  const { t } = useLang();
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    time: "",
    seats: "",
    price: "",
    driver: "",
    plate: "",
    cls: "Standard",
  });
  const [err, setErr] = useState("");

  const fields = [
    [t.bo_trip_from, "text", t.bo_trip_from_ph, "from"],
    [t.bo_trip_to, "text", t.bo_trip_to_ph, "to"],
    [t.bo_trip_time, "time", "", "time"],
    [t.bo_trip_seats, "number", t.bo_trip_seats_ph, "seats"],
    [t.bo_trip_price, "number", t.bo_trip_price_ph, "price"],
    [t.bo_trip_driver, "text", t.bo_trip_driver_ph, "driver"],
    [t.bo_trip_plate, "text", t.bo_trip_plate_ph, "plate"],
  ];

  function handleSubmit() {
    if (!trip.from || !trip.to || !trip.time) {
      setErr(t.bo_trip_err);
      return;
    }
    setErr("");
    onSubmit(trip);
  }

  const inputStyle = {
    width: "100%",
    background: "rgba(245,241,232,.05)",
    border: "1px solid rgba(245,241,232,.1)",
    borderRadius: ".75rem",
    padding: ".75rem .9rem",
    color: "#FAF8F3",
    fontWeight: 600,
    fontSize: ".88rem",
    outline: "none",
    boxSizing: "border-box",
    colorScheme: "dark",
  };
  const labelStyle = {
    fontWeight: 700,
    fontSize: ".58rem",
    color: "rgba(245,241,232,.3)",
    textTransform: "uppercase",
    letterSpacing: ".1em",
    display: "block",
    marginBottom: ".28rem",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.78)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#131313",
          border: "1px solid rgba(245,241,232,.1)",
          borderRadius: "1.5rem",
          padding: "2rem",
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontWeight: 900, fontSize: "1.1rem", color: "#FAF8F3" }}>
            {t.bo_trip_modal_title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(245,241,232,.38)",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}
        >
          {fields.map(([l, tp, p, k]) => (
            <div key={l}>
              <label style={labelStyle}>{l}</label>
              <input
                type={tp}
                placeholder={p}
                value={trip[k]}
                onChange={(e) => {
                  setTrip((prev) => ({ ...prev, [k]: e.target.value }));
                  setErr("");
                }}
                style={inputStyle}
              />
            </div>
          ))}
          <div>
            <label style={labelStyle}>{t.bo_trip_class}</label>
            <select
              value={trip.cls}
              onChange={(e) =>
                setTrip((prev) => ({ ...prev, cls: e.target.value }))
              }
              style={inputStyle}
            >
              <option value="Standard">{t.bo_trip_standard}</option>
              <option value="VIP">{t.bo_trip_vip}</option>
            </select>
          </div>
          {err && (
            <p
              style={{
                fontWeight: 600,
                fontSize: ".78rem",
                color: "#F87171",
                fontFamily: "Montserrat,sans-serif",
              }}
            >
              {err}
            </p>
          )}
          <button
            onClick={handleSubmit}
            style={{
              background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: ".95rem",
              fontWeight: 900,
              fontSize: ".9rem",
              cursor: "pointer",
              marginTop: ".5rem",
              boxShadow: "0 0 20px rgba(232,93,4,.28)",
            }}
          >
            {t.bo_trip_submit}
          </button>
        </div>
      </div>
    </div>
  );
}
