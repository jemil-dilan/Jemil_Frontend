import { useState, useEffect } from "react";

export function PayingOverlay({ t }) {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const i = setInterval(
      () => setDots((d) => (d.length >= 3 ? "." : d + ".")),
      500,
    );
    return () => clearInterval(i);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(13,13,13,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            border: "4px solid rgba(232,93,4,0.2)",
            borderTop: "4px solid #E85D04",
            borderRadius: "50%",
            margin: "0 auto 2rem",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <div
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "1.4rem",
            color: "#FAF8F3",
            marginBottom: "0.5rem",
          }}
        >
          {t.book_processing}
          {dots}
        </div>
        <div
          style={{
            fontFamily: "Merriweather, serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "rgba(245,241,232,0.5)",
          }}
        >
          {t.book_processing_sub}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
