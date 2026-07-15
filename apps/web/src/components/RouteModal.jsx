"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AGENCIES_BY_ROUTE } from "@/data/agenciesByRoute";
import { RouteInfoPanel } from "./RouteModal/RouteInfoPanel";
import { SidebarContent } from "./RouteModal/SidebarContent";
import { ModalHeader } from "./RouteModal/ModalHeader";
import { OverviewStep } from "./RouteModal/OverviewStep";
import { BusSelectionStep } from "./RouteModal/BusSelectionStep";
import { SeatAndPaymentStep } from "./RouteModal/SeatAndPaymentStep";
import { BookingSuccessScreen } from "./RouteModal/BookingSuccessScreen";
import { useLang } from "@/utils/lang";

const stepVariants = {
  enter: { opacity: 0, x: 36 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: -28, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function RouteModal({ route, onClose }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [selBus, setSelBus] = useState(null);
  const [selSeat, setSelSeat] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [payMethod, setPayMethod] = useState("mtn");
  const [booked, setBooked] = useState(false);
  const [paying, setPaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const overlayRef = useRef(null);
  // Stable booking ref — generated once at booking, never changes on re-render
  const confRef = useRef(null);

  useEffect(() => {
    if (route) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [route]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setStep(0);
      setSelBus(null);
      setSelSeat(null);
      setBooked(false);
      setPaying(false);
      setShowConfetti(false);
      setPhone("");
      setName("");
      confRef.current = null;
    }, 350);
  };

  const handleSelectBus = (busName) => {
    setSelBus(busName);
    setSelSeat(null); // clear seat when bus changes
    setStep(2);
  };

  const handlePay = () => {
    if (!name || !phone || !selSeat) return;
    if (!confRef.current) {
      confRef.current = Math.floor(10000 + Math.random() * 90000);
    }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setBooked(true);
      setTimeout(() => setShowConfetti(true), 120);
    }, 2500);
  };

  const agencies = route
    ? AGENCIES_BY_ROUTE[`${route.fC}-${route.tC}`] ||
      AGENCIES_BY_ROUTE["DLA-YDE"]
    : [];
  const chosenBus = agencies.find((a) => a.name === selBus);

  if (!route) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(6,6,6,.82)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity .35s",
      }}
    >
      {/* Payment processing overlay */}
      {paying && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2rem 2rem 0 0",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              border: "4px solid rgba(232,93,4,0.2)",
              borderTop: "4px solid #E85D04",
              borderRadius: "50%",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <div
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#FAF8F3",
            }}
          >
            {t.modal_processing}
          </div>
          <div
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              color: "rgba(245,241,232,0.5)",
            }}
          >
            {t.modal_please_wait}
          </div>
        </div>
      )}

      {/* Sheet — spring slide-up */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: visible ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        style={{
          width: "100%",
          maxWidth: 1100,
          maxHeight: "92vh",
          background: "#111",
          borderRadius: "2rem 2rem 0 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -30px 80px rgba(0,0,0,.6)",
          position: "relative",
        }}
      >
        {/* Handle */}
        <div
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            className="modal-handle"
            onClick={handleClose}
            style={{
              width: 40,
              height: 4,
              background: "rgba(245,241,232,.15)",
              borderRadius: 999,
              cursor: "pointer",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flex: 1, overflow: "hidden" }}
          className="flex-col md:flex-row"
        >
          {/* Left sidebar - hide on mobile when in step 2+ */}
          <div className={step >= 2 ? "hidden md:block" : ""}>
            <RouteInfoPanel route={route}>
              <SidebarContent route={route} step={step} />
            </RouteInfoPanel>
          </div>

          {/* Right panel with AnimatePresence step transitions */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5rem clamp(1rem, 4vw, 2rem) 2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ModalHeader step={step} route={route} onClose={handleClose} />

            <AnimatePresence mode="wait">
              {step === 0 && !booked && (
                <motion.div
                  key="s0"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <OverviewStep
                    route={route}
                    agencies={agencies}
                    date={date}
                    setDate={setDate}
                    setStep={setStep}
                  />
                </motion.div>
              )}
              {step === 1 && !booked && (
                <motion.div
                  key="s1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <BusSelectionStep
                    agencies={agencies}
                    selBus={selBus}
                    setSelBus={handleSelectBus}
                    setStep={setStep}
                  />
                </motion.div>
              )}
              {step === 2 && !booked && chosenBus && (
                <motion.div
                  key="s2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <SeatAndPaymentStep
                    route={route}
                    chosenBus={chosenBus}
                    selSeat={selSeat}
                    setSelSeat={setSelSeat}
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    payMethod={payMethod}
                    setPayMethod={setPayMethod}
                    setBooked={handlePay}
                    setStep={setStep}
                  />
                </motion.div>
              )}
              {booked && chosenBus && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flex: 1 }}
                >
                  <BookingSuccessScreen
                    route={route}
                    chosenBus={chosenBus}
                    name={name}
                    phone={phone}
                    date={date}
                    selSeat={selSeat}
                    confRef={confRef.current}
                    handleClose={handleClose}
                    showConfetti={showConfetti}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes successPing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
