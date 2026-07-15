"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/utils/lang";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setActivePath(window.location.pathname);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav_book, href: "/book" },
    { label: t.nav_routes, href: "/routes" },
    { label: t.nav_track, href: "/track" },
    { label: t.nav_agencies, href: "/agencies" },
    { label: t.nav_about, href: "/about" },
    { label: t.nav_help, href: "/help" },
  ];

  const isActive = (href) => activePath === href;

  // Language toggle button (reusable)
  const LangBtn = ({ mobile }) => (
    <button
      onClick={toggle}
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 800,
        fontSize: mobile ? "0.85rem" : "0.75rem",
        color: "rgba(245,241,232,0.65)",
        background: "rgba(232,93,4,0.12)",
        border: "1px solid rgba(232,93,4,0.28)",
        borderRadius: "999px",
        padding: mobile ? "0.6rem 1.2rem" : "0.4rem 0.875rem",
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "all 0.15s",
        width: mobile ? "100%" : "auto",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(232,93,4,0.22)";
        e.currentTarget.style.color = "#FAF8F3";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(232,93,4,0.12)";
        e.currentTarget.style.color = "rgba(245,241,232,0.65)";
      }}
    >
      {lang === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}
    </button>
  );

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        background: scrolled ? "rgba(13,13,13,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,93,4,0.15)" : "none",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #E85D04, #CC5500)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                boxShadow: "0 0 20px rgba(232,93,4,0.3)",
                flexShrink: 0,
              }}
            >
              🚌
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  color: "#FAF8F3",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                JEMIL
              </div>
              <div
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.6rem",
                  color: "rgba(245,241,232,0.4)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {t.tagline}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: isActive(link.href)
                    ? "#E85D04"
                    : "rgba(245,241,232,0.7)",
                  textDecoration: "none",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "999px",
                  background: isActive(link.href)
                    ? "rgba(232,93,4,0.12)"
                    : "transparent",
                  transition: "all 0.15s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = "#FAF8F3";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = "rgba(245,241,232,0.7)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            className="hidden md:flex"
          >
            <LangBtn mobile={false} />
            <a
              href="/backoffice"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "rgba(245,241,232,0.5)",
                textDecoration: "none",
                padding: "0.5rem 0.875rem",
                borderRadius: "999px",
                border: "1px solid rgba(245,241,232,0.12)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FAF8F3";
                e.currentTarget.style.borderColor = "rgba(245,241,232,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(245,241,232,0.5)";
                e.currentTarget.style.borderColor = "rgba(245,241,232,0.12)";
              }}
            >
              {t.nav_agency_login}
            </a>
            <a href="/book" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg, #E85D04, #CC5500)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.65rem 1.4rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(232,93,4,0.3)",
                  letterSpacing: "0.02em",
                }}
              >
                {t.nav_book_now}
              </button>
            </a>
          </div>

          {/* Mobile right: lang toggle + hamburger */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            className="md:hidden"
          >
            <button
              onClick={toggle}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "0.72rem",
                color: "rgba(245,241,232,0.65)",
                background: "rgba(232,93,4,0.12)",
                border: "1px solid rgba(232,93,4,0.28)",
                borderRadius: "999px",
                padding: "0.35rem 0.7rem",
                cursor: "pointer",
              }}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "flex",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background: "rgba(232,93,4,0.15)",
                border: "1px solid rgba(232,93,4,0.3)",
                cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#E85D04"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#E85D04"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "rgba(13,13,13,0.98)",
            borderTop: "1px solid rgba(232,93,4,0.15)",
            backdropFilter: "blur(20px)",
          }}
          className="md:hidden"
        >
          <nav
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: isActive(link.href)
                    ? "#E85D04"
                    : "rgba(245,241,232,0.75)",
                  textDecoration: "none",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.875rem",
                  background: isActive(link.href)
                    ? "rgba(232,93,4,0.1)"
                    : "transparent",
                  display: "block",
                }}
              >
                {link.label}
              </a>
            ))}
            <div
              style={{
                paddingTop: "1rem",
                borderTop: "1px solid rgba(245,241,232,0.08)",
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <a href="/backoffice" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    borderRadius: "999px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    background: "none",
                    border: "1px solid rgba(245,241,232,0.15)",
                    color: "rgba(245,241,232,0.7)",
                    cursor: "pointer",
                  }}
                >
                  {t.nav_agency_login}
                </button>
              </a>
              <a href="/book" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #E85D04, #CC5500)",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.875rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  {t.nav_book_now}
                </button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
