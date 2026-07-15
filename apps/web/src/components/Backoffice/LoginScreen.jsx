import { useState } from "react";
import { ACCENT, MONO } from "./constants";
import { useLang } from "@/utils/lang";

export function LoginScreen({ onLogin }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    if (email && pass) onLogin();
    else setErr(t.bo_login_err);
  }

  const fields = [
    [t.bo_login_email, "email", t.bo_login_email_ph, email, setEmail],
    [t.bo_login_pass, "password", "••••••••", pass, setPass],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060606",
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
            "linear-gradient(rgba(232,93,4,.035) 1px, transparent 1px), linear-gradient(90deg,rgba(232,93,4,.035) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle,rgba(232,93,4,.07) 0%,transparent 65%)",
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
        <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
          <div
            style={{
              width: 58,
              height: 58,
              background: `linear-gradient(135deg,${ACCENT},#CC5500)`,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.7rem",
              margin: "0 auto 1rem",
              boxShadow: `0 0 36px rgba(232,93,4,.35)`,
            }}
          >
            🚌
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
              color: "rgba(245,241,232,.3)",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginTop: ".25rem",
            }}
          >
            {t.bo_portal}
          </div>
        </div>
        <div
          style={{
            background: "#0E0E0E",
            border: "1px solid rgba(245,241,232,.08)",
            borderRadius: "1.5rem",
            padding: "2.25rem",
          }}
        >
          <h2
            style={{
              ...MONO,
              fontWeight: 900,
              fontSize: "1.3rem",
              color: "#FAF8F3",
              marginBottom: ".35rem",
            }}
          >
            {t.bo_login_welcome}
          </h2>
          <p
            style={{
              fontFamily: "Merriweather,serif",
              fontWeight: 300,
              fontSize: ".85rem",
              color: "rgba(245,241,232,.4)",
              marginBottom: "1.75rem",
              lineHeight: 1.75,
            }}
          >
            {t.bo_login_sub}
          </p>
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {fields.map(([label, type, ph, val, setter]) => (
              <div key={label}>
                <label
                  style={{
                    ...MONO,
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "rgba(245,241,232,.3)",
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
                    background: "rgba(245,241,232,.05)",
                    border: "1px solid rgba(245,241,232,.1)",
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
                boxShadow: "0 0 28px rgba(232,93,4,.3)",
                marginTop: ".5rem",
              }}
            >
              {t.bo_login_btn}
            </button>
          </form>
          <div
            style={{
              borderTop: "1px solid rgba(245,241,232,.06)",
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                ...MONO,
                fontWeight: 600,
                fontSize: ".7rem",
                color: "rgba(245,241,232,.28)",
              }}
            >
              {t.bo_login_not_agency}{" "}
              <a
                href="/agencies"
                style={{ color: ACCENT, textDecoration: "none" }}
              >
                {t.bo_login_apply}
              </a>
            </p>
            <a
              href="/backoffice/admin"
              style={{
                ...MONO,
                fontWeight: 700,
                fontSize: ".68rem",
                color: "rgba(245,241,232,.28)",
                textDecoration: "none",
              }}
            >
              {t.bo_login_admin}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
