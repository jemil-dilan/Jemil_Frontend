import { useState } from "react";
import { QuickSeatPicker } from "./QuickSeatPicker";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { useLang } from "@/utils/lang";

export function SeatAndPaymentStep({
  route,
  chosenBus,
  selSeat,
  setSelSeat,
  name,
  setName,
  phone,
  setPhone,
  payMethod,
  setPayMethod,
  setBooked,
  setStep,
}) {
  const { t } = useLang();
  const [errors, setErrors] = useState({});

  const handlePay = () => {
    const errs = {};
    if (!name.trim()) errs.name = t.modal_err_name;
    if (!phone.trim()) errs.phone = t.modal_err_phone;
    if (!selSeat) errs.seat = t.modal_err_seat;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setBooked(true); // parent handles the paying state
  };

  const inputStyle = (hasErr) => ({
    width: "100%",
    background: hasErr ? "rgba(248,113,113,.08)" : "rgba(245,241,232,.07)",
    border: `1px solid ${hasErr ? "rgba(248,113,113,.5)" : "rgba(245,241,232,.12)"}`,
    borderRadius: ".75rem",
    padding: ".8rem 1rem",
    color: "#FAF8F3",
    fontFamily: "Montserrat,sans-serif",
    fontWeight: 600,
    outline: "none",
    fontSize: ".9rem",
    boxSizing: "border-box",
  });

  const errStyle = {
    color: "#F87171",
    fontSize: ".68rem",
    fontFamily: "Montserrat,sans-serif",
    fontWeight: 600,
    marginTop: ".25rem",
  };

  const labelStyle = {
    fontFamily: "Montserrat,sans-serif",
    fontWeight: 700,
    fontSize: ".68rem",
    color: "rgba(245,241,232,.4)",
    letterSpacing: ".12em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: ".4rem",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => setStep(1)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(245,241,232,.45)",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: 700,
          fontSize: ".8rem",
          cursor: "pointer",
          marginBottom: "1.25rem",
          textAlign: "left",
          padding: 0,
        }}
      >
        ← {t.modal_back}
      </button>

      {/* Chosen bus recap */}
      <div
        style={{
          background: "rgba(232,93,4,.1)",
          border: "1px solid rgba(232,93,4,.25)",
          borderRadius: ".875rem",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              color: "#FAF8F3",
              fontSize: ".95rem",
            }}
          >
            {chosenBus.name}
          </div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 600,
              color: "rgba(245,241,232,.45)",
              fontSize: ".75rem",
            }}
          >
            {chosenBus.dep} · {route.from} → {route.to}
          </div>
        </div>
        <div
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 900,
            color: "#E85D04",
            fontSize: "1.4rem",
          }}
        >
          {chosenBus.price.toLocaleString()}{" "}
          <span
            style={{
              fontSize: ".7rem",
              fontWeight: 600,
              color: "rgba(245,241,232,.3)",
            }}
          >
            XAF
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "1.5rem", flex: 1 }}
      >
        {/* Seat picker */}
        <div>
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".68rem",
              color: "rgba(245,241,232,.4)",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              marginBottom: ".75rem",
            }}
          >
            {t.modal_pick_seat}
          </div>
          <QuickSeatPicker
            selected={selSeat}
            onSelect={(s) => {
              setSelSeat(s);
              if (s) setErrors((p) => ({ ...p, seat: null }));
            }}
          />
          {errors.seat && <div style={errStyle}>⚠ {errors.seat}</div>}
        </div>

        {/* Details + pay */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>{t.modal_full_name}</label>
            <input
              type="text"
              placeholder={t.modal_name_ph}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value) setErrors((p) => ({ ...p, name: null }));
              }}
              style={inputStyle(errors.name)}
            />
            {errors.name && <div style={errStyle}>⚠ {errors.name}</div>}
          </div>
          <div>
            <label style={labelStyle}>{t.modal_phone}</label>
            <input
              type="tel"
              placeholder={t.modal_phone_ph}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (e.target.value) setErrors((p) => ({ ...p, phone: null }));
              }}
              style={inputStyle(errors.phone)}
            />
            {errors.phone && <div style={errStyle}>⚠ {errors.phone}</div>}
          </div>

          <PaymentMethodSelector
            payMethod={payMethod}
            setPayMethod={setPayMethod}
          />

          <button
            onClick={handlePay}
            style={{
              marginTop: "auto",
              width: "100%",
              background: "linear-gradient(135deg,#E85D04,#CC5500)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: "1rem",
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 900,
              fontSize: ".95rem",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(232,93,4,.35)",
              transition: "all .2s",
            }}
          >
            {t.modal_pay(chosenBus.price.toLocaleString())}
          </button>
        </div>
      </div>
    </div>
  );
}
