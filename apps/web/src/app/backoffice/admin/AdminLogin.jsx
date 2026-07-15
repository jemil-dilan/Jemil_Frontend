import { useState } from "react";
import { MONO, ACCENT, GREEN } from "./constants";

export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    if (email && pass) onLogin();
    else setErr("Invalid credentials.");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040404",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,93,4,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,93,4,.025) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle,rgba(232,93,4,.055) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              margin: "0 auto .9rem",
              boxShadow: `0 0 40px rgba(232,93,4,.4)`,
            }}
          >
            🛡
          </div>
          <div
            style={{
              ...MONO,
              fontWeight: 900,
              fontSize: "1.7rem",
              color: "#FAF8F3",
              letterSpacing: "-.03em",
            }}
          >
            JEMIL
          </div>
          <div
            style={{
              ...MONO,
              fontWeight: 600,
              fontSize: ".6rem",
              color: "rgba(245,241,232,.28)",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginTop: ".22rem",
            }}
          >
            Platform Administration
          </div>
        </div>
        {/* Security indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              background: GREEN,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${GREEN}`,
            }}
          />
          <span
            style={{
              ...MONO,
              fontWeight: 700,
              fontSize: ".65rem",
              color: "rgba(245,241,232,.35)",
              letterSpacing: ".1em",
            }}
          >
            Secure Admin Access · Restricted
          </span>
        </div>
        <div
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(245,241,232,.08)",
            borderRadius: "1.5rem",
            padding: "2.25rem",
          }}
        >
          <h2
            style={{
              ...MONO,
              fontWeight: 900,
              fontSize: "1.25rem",
              color: "#FAF8F3",
              marginBottom: ".35rem",
            }}
          >
            Admin Sign In
          </h2>
          <p
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: ".83rem",
              color: "rgba(245,241,232,.38)",
              marginBottom: "1.75rem",
              lineHeight: 1.75,
            }}
          >
            This area is restricted to JEMIL platform administrators only.
          </p>
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              ["Admin Email", "email", "admin@jemil.cm", email, setEmail],
              ["Password", "password", "••••••••", pass, setPass],
            ].map(([label, type, ph, val, setter]) => (
              <div key={label}>
                <label
                  style={{
                    ...MONO,
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.28)",
                    textTransform: "uppercase",
                    letterSpacing: ".12em",
                    display: "block",
                    marginBottom: ".35rem",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={val}
                  onChange={(e) => {
                    setter(e.target.value);
                    setErr("");
                  }}
                  placeholder={ph}
                  style={{
                    width: "100%",
                    background: "rgba(245,241,232,.04)",
                    border: "1px solid rgba(245,241,232,.09)",
                    borderRadius: ".875rem",
                    padding: ".875rem 1rem",
                    color: "#FAF8F3",
                    ...MONO,
                    fontWeight: 600,
                    fontSize: ".9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            {err && (
              <p
                style={{
                  ...MONO,
                  fontWeight: 600,
                  fontSize: ".78rem",
                  color: "#F87171",
                }}
              >
                {err}
              </p>
            )}
            <button
              type="submit"
              style={{
                background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: "1rem",
                ...MONO,
                fontWeight: 900,
                fontSize: ".95rem",
                cursor: "pointer",
                boxShadow: "0 0 32px rgba(232,93,4,.35)",
                marginTop: ".5rem",
              }}
            >
              Access Admin Panel →
            </button>
          </form>
          <div
            style={{
              borderTop: "1px solid rgba(245,241,232,.05)",
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
            }}
          >
            <a
              href="/backoffice"
              style={{
                ...MONO,
                fontWeight: 700,
                fontSize: ".7rem",
                color: "rgba(245,241,232,.25)",
                textDecoration: "none",
              }}
            >
              ← Back to Agency Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
