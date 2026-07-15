import { useLang } from "@/utils/lang";

export default function Footer() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const footerSections = isFr
    ? [
        {
          title: "Entreprise",
          links: [
            { label: "À propos de JEMIL", href: "/about" },
            { label: "Agences partenaires", href: "/agencies" },
            { label: "Comment ça marche", href: "/#how" },
            { label: "Centre d'aide", href: "/help" },
          ],
        },
        {
          title: "Voyager",
          links: [
            { label: "Lignes populaires", href: "/routes" },
            { label: "Agences de bus", href: "/agencies" },
            { label: "Réserver une place", href: "/book" },
            { label: "Suivre mon bus", href: "/track" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Centre d'aide", href: "/help" },
            { label: "Nous contacter", href: "/help" },
            { label: "Politique de remboursement", href: "/help" },
            { label: "Normes de sécurité", href: "/help" },
          ],
        },
        {
          title: "Diaspora",
          links: [
            { label: "Réserver pour la famille", href: "/diaspora" },
            { label: "Paiement multidevises", href: "/diaspora" },
            { label: "Suivi en direct", href: "/track" },
            { label: "Portail Agence", href: "/backoffice" },
          ],
        },
      ]
    : [
        {
          title: "Company",
          links: [
            { label: "About JEMIL", href: "/about" },
            { label: "Partner Agencies", href: "/agencies" },
            { label: "How It Works", href: "/#how" },
            { label: "Help Center", href: "/help" },
          ],
        },
        {
          title: "Travel",
          links: [
            { label: "Popular Routes", href: "/routes" },
            { label: "Bus Agencies", href: "/agencies" },
            { label: "Book a Seat", href: "/book" },
            { label: "Track Journey", href: "/track" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "/help" },
            { label: "Contact Us", href: "/help" },
            { label: "Refund Policy", href: "/help" },
            { label: "Safety Standards", href: "/help" },
          ],
        },
        {
          title: "Diaspora",
          links: [
            { label: "Book for Family", href: "/diaspora" },
            { label: "Multi-Currency Pay", href: "/diaspora" },
            { label: "Live Tracking", href: "/track" },
            { label: "Agency Portal", href: "/backoffice" },
          ],
        },
      ];

  const tagline = isFr ? "Voyagez Mieux" : "Travel Smarter";
  const desc = isFr
    ? "Connecter le Cameroun à travers un voyage en bus sûr, fiable et abordable."
    : "Connecting Cameroon through safe, reliable, and affordable bus travel.";
  const copyright = isFr
    ? "© 2026 JEMIL Technologies. Tous droits réservés."
    : "© 2026 JEMIL Technologies. All rights reserved.";
  const privacy = isFr ? "Confidentialité" : "Privacy Policy";
  const terms = isFr ? "Conditions d'utilisation" : "Terms of Service";
  const cookies = isFr ? "Cookies" : "Cookie Policy";
  const made = isFr ? "🇨🇲 Fabriqué au Cameroun" : "🇨🇲 Made in Cameroon";
  const secure = isFr
    ? "Moyens de paiement sécurisés"
    : "Secure Payment Methods";

  const socials = [
    { id: "whatsapp", icon: "💬", href: "https://wa.me/237699000001" },
    { id: "facebook", icon: "📘", href: "https://facebook.com" },
    { id: "instagram", icon: "📷", href: "https://instagram.com" },
    { id: "twitter", icon: "🐦", href: "https://twitter.com" },
  ];

  const payMethods = [
    "MTN Mobile Money",
    "Orange Money",
    "Visa",
    "Mastercard",
    "PayPal",
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(160deg,#1c1c1c 0%,#111 100%)",
        color: "white",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        {/* ── Main grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: "linear-gradient(135deg,#E85D04,#CC5500)",
                  borderRadius: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                🚌
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 900,
                    fontSize: "1.35rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  JEMIL
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                  }}
                >
                  {tagline}
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "Merriweather,serif",
                fontWeight: 300,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}
            >
              {desc}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.id}
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E85D04")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  color: "#FAF8F3",
                  marginBottom: "1.1rem",
                  letterSpacing: "0.05em",
                }}
              >
                {section.title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "Montserrat,sans-serif",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.5)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#E85D04")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {copyright}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[privacy, terms, cookies].map((label) => (
                <a
                  key={label}
                  href="/help"
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {label}
                </a>
              ))}
            </div>
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {made}
            </div>
          </div>

          {/* Payment methods */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: "1rem",
              }}
            >
              {secure}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                flexWrap: "wrap",
              }}
            >
              {payMethods.map((method) => (
                <div
                  key={method}
                  style={{
                    padding: "0.35rem 0.9rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



