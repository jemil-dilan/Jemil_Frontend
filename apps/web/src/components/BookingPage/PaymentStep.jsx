import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { PassengerDetailsForm } from "./PassengerDetailsForm";
import { OrderSummary } from "./OrderSummary";

export function PaymentStep({
  bus,
  payMethod,
  setPayMethod,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  errors,
  setErrors,
  fromCity,
  toCity,
  date,
  selectedSeat,
  passengers,
  onBack,
  onPay,
  t,
  lang,
}) {
  return (
    <div className="step-enter">
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#E85D04",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: "0.875rem",
          marginBottom: "1rem",
        }}
      >
        {t.book_back}
      </button>
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          color: "#0D0D0D",
          marginBottom: "2rem",
          letterSpacing: "-0.03em",
        }}
      >
        {t.book_payment_title}
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "1.5rem" }}
      >
        <div>
          <PaymentMethodSelector
            payMethod={payMethod}
            setPayMethod={setPayMethod}
            t={t}
          />
          <PassengerDetailsForm
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            errors={errors}
            setErrors={setErrors}
            t={t}
          />
        </div>
        <OrderSummary
          fromCity={fromCity}
          toCity={toCity}
          date={date}
          bus={bus}
          selectedSeat={selectedSeat}
          passengers={passengers}
          onPay={onPay}
          t={t}
          lang={lang}
        />
      </div>
    </div>
  );
}
