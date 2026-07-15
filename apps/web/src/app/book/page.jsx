"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/utils/lang";
import { CITIES } from "@/data/cities";
import { MOCK_BUSES } from "@/data/bookingData";
import { PayingOverlay } from "@/components/BookingPage/PayingOverlay";
import { ProgressBar } from "@/components/BookingPage/ProgressBar";
import { SearchForm } from "@/components/BookingPage/SearchForm";
import { BusSelection } from "@/components/BookingPage/BusSelection";
import { SeatSelection } from "@/components/BookingPage/SeatSelection";
import { PaymentStep } from "@/components/BookingPage/PaymentStep";
import { SuccessScreen } from "@/components/BookingPage/SuccessScreen";

// Name/code → canonical city code
const NAME_TO_CODE = {};
CITIES.forEach((c) => {
  NAME_TO_CODE[c.name.toLowerCase()] = c.code;
  NAME_TO_CODE[c.code.toLowerCase()] = c.code;
});

export default function BookPage() {
  const { lang, t } = useLang();

  const [step, setStep] = useState(0);
  const [fromCity, setFromCity] = useState("DLA");
  const [toCity, setToCity] = useState("YDE");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [payMethod, setPayMethod] = useState("mtn");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [sameCityError, setSameCityError] = useState(false);
  const bookingRef = useRef(null);

  // ── Prefill from/to via URL search params ────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get("from");
    const toParam = params.get("to");
    let resolvedFrom = null,
      resolvedTo = null;
    if (fromParam) {
      const c = NAME_TO_CODE[fromParam.toLowerCase()];
      if (c) {
        setFromCity(c);
        resolvedFrom = c;
      }
    }
    if (toParam) {
      const c = NAME_TO_CODE[toParam.toLowerCase()];
      if (c) {
        setToCity(c);
        resolvedTo = c;
      }
    }
    // Auto-advance to bus list when both cities are pre-filled and valid
    if (resolvedFrom && resolvedTo && resolvedFrom !== resolvedTo) setStep(1);
  }, []);

  const fromName = CITIES.find((c) => c.code === fromCity)?.name || fromCity;
  const toName = CITIES.find((c) => c.code === toCity)?.name || toCity;
  const bus = MOCK_BUSES.find((b) => b.id === selectedBus);
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSelectBus = (id) => {
    setSelectedBus(id);
    setSelectedSeat(null); // clear seat when bus changes
    setStep(2);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromCity === toCity) {
      setSameCityError(true);
      return;
    }
    setSameCityError(false);
    setStep(1);
  };

  const handlePay = () => {
    const errs = {};
    if (!name.trim()) errs.name = t.book_error_name;
    if (!phone.trim()) errs.phone = t.book_error_phone;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setPaying(true);
    if (!bookingRef.current) {
      bookingRef.current = `JML-${Math.floor(10000 + Math.random() * 90000)}`;
    }
    // Simulate payment processing
    setTimeout(() => {
      setPaying(false);
      setConfirmed(true);
    }, 2800);
  };

  // ─── SUCCESS SCREEN ───────────────────────────────────────────
  if (confirmed && bus) {
    const ref = bookingRef.current;
    return (
      <>
        <Header />
        <SuccessScreen
          bookingRef={ref}
          fromCity={fromCity}
          toCity={toCity}
          fromName={fromName}
          toName={toName}
          date={date}
          bus={bus}
          selectedSeat={selectedSeat}
          name={name}
          passengers={passengers}
          t={t}
          lang={lang}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      {paying && <PayingOverlay t={t} />}
      <Header />
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        <ProgressBar step={step} lang={lang} />

        <div
          className="container py-10"
          style={{
            maxWidth: "760px",
            paddingTop: "2.5rem",
            paddingBottom: "4rem",
          }}
        >
          {/* ── STEP 0: Search ───────────────────────────────── */}
          {step === 0 && (
            <SearchForm
              fromCity={fromCity}
              setFromCity={(v) => {
                setFromCity(v);
                setSameCityError(false);
              }}
              toCity={toCity}
              setToCity={(v) => {
                setToCity(v);
                setSameCityError(false);
              }}
              date={date}
              setDate={setDate}
              passengers={passengers}
              setPassengers={setPassengers}
              onSubmit={handleSearch}
              cities={CITIES}
              todayStr={todayStr}
              t={t}
              lang={lang}
              sameCityError={sameCityError}
            />
          )}

          {/* ── STEP 1: Select Bus ───────────────────────────── */}
          {step === 1 && (
            <BusSelection
              buses={MOCK_BUSES}
              selectedBus={selectedBus}
              onSelectBus={handleSelectBus}
              onBack={() => setStep(0)}
              fromName={fromName}
              toName={toName}
              date={date}
              passengers={passengers}
              t={t}
              lang={lang}
            />
          )}

          {/* ── STEP 2: Seat Selection ───────────────────────── */}
          {step === 2 && bus && (
            <SeatSelection
              bus={bus}
              selectedSeat={selectedSeat}
              onSelectSeat={setSelectedSeat}
              onBack={() => setStep(1)}
              onContinue={() => {
                if (selectedSeat) setStep(3);
              }}
              passengers={passengers}
              t={t}
            />
          )}

          {/* ── STEP 3: Payment ──────────────────────────────── */}
          {step === 3 && bus && (
            <PaymentStep
              bus={bus}
              payMethod={payMethod}
              setPayMethod={setPayMethod}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              errors={errors}
              setErrors={setErrors}
              fromCity={fromCity}
              toCity={toCity}
              date={date}
              selectedSeat={selectedSeat}
              passengers={passengers}
              onBack={() => setStep(2)}
              onPay={handlePay}
              t={t}
              lang={lang}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
