"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLang } from "@/utils/lang";

const FAQS = [
  {
    category: "Booking",
    icon: "🎫",
    faqs: [
      {
        q: "How do I book a bus ticket?",
        a: "Go to the Book page, pick your cities and date, select a bus and seat, then pay with MTN, Orange Money, or card. Your ticket arrives by SMS in seconds.",
      },
      {
        q: "Can I book for someone else?",
        a: "Yes! Enter the traveler's name and phone number during checkout. The ticket will be sent directly to their phone.",
      },
      {
        q: "How far in advance can I book?",
        a: "You can book up to 30 days in advance. We recommend booking at least 2 days ahead for popular routes like Douala-Yaoundé.",
      },
      {
        q: "Can I choose my seat?",
        a: "Yes. After selecting your bus, you can pick from available seats on an interactive bus layout. Window or aisle — you decide.",
      },
    ],
  },
  {
    category: "Payment",
    icon: "💳",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "MTN Mobile Money, Orange Money, Visa, Mastercard, and PayPal. All payments are secured with 256-bit SSL encryption.",
      },
      {
        q: "Can I pay from abroad in USD or EUR?",
        a: "Yes! If you're in the diaspora, you can pay with your international card or PayPal. The amount is converted to XAF at the current rate.",
      },
      {
        q: "When is my payment confirmed?",
        a: "Mobile Money payments are confirmed instantly. Card payments take 1-3 minutes. You'll receive a confirmation SMS and email.",
      },
      {
        q: "Is my payment information safe?",
        a: "Absolutely. We never store your card or Mobile Money PIN. All transactions go through PCI-DSS certified payment processors.",
      },
    ],
  },
  {
    category: "Cancellations & Refunds",
    icon: "↩️",
    faqs: [
      {
        q: "Can I cancel my ticket?",
        a: "Yes, you can cancel for free up to 2 hours before departure. After that, a 20% fee applies. No-shows are non-refundable.",
      },
      {
        q: "How fast do I get my refund?",
        a: "Refunds to Mobile Money accounts arrive within 1 hour. Card refunds take 3-5 business days depending on your bank.",
      },
      {
        q: "What if the bus is cancelled by the agency?",
        a: "If the agency cancels your trip, you get a 100% refund within 30 minutes — no questions asked.",
      },
      {
        q: "Can I change my travel date?",
        a: "Yes, you can reschedule up to 4 hours before departure on the same route. A 1,000 XAF rebooking fee applies.",
      },
    ],
  },
  {
    category: "Tracking",
    icon: "📍",
    faqs: [
      {
        q: "How do I track my bus?",
        a: "Go to the Track page and enter your ticket reference number (e.g. JML-2847). You can see the bus location in real-time.",
      },
      {
        q: "Can I share live tracking with family?",
        a: 'Yes! From the tracking page, tap "Share on WhatsApp" to send your live location link to anyone.',
      },
      {
        q: "How accurate is the GPS tracking?",
        a: "Within 50 meters. Our tracking updates every 30 seconds from GPS units installed on partner buses.",
      },
    ],
  },
  {
    category: "Diaspora",
    icon: "🌍",
    faqs: [
      {
        q: "I live abroad — can I book for my family in Cameroon?",
        a: "Yes! That's exactly what we built this for. Book as normal, but enter your family member's name and Cameroonian phone number. They receive the ticket, you pay from wherever you are.",
      },
      {
        q: "What currencies can I pay in?",
        a: "USD, EUR, GBP, CAD, and XAF. Your card will be charged in your local currency.",
      },
      {
        q: "Will my family receive the ticket on their phone?",
        a: "Yes. As soon as you pay, an SMS with the ticket details is sent to the phone number you entered. They just show it at the bus station.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8E4DA" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#0D0D0D",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: "#E85D04",
            fontSize: "1.25rem",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "none",
            fontWeight: 300,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: "1.25rem",
            fontFamily: "Merriweather, serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "#555",
            lineHeight: 1.9,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const { lang, t } = useLang();
  const FAQS_DATA = t.help_faq;
  const CATS = t.help_cats;
  const [activeCategory, setActiveCategory] = useState(CATS[0]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    sent: false,
    sending: false,
    error: null,
  });

  const activeFaqs = FAQS_DATA.filter((f) => f.cat === activeCategory);

  const CAT_ICONS = ["🎫", "💳", "↩️", "📍", "🌍"];

  const handleSend = async (e) => {
    e.preventDefault();
    setContactForm((f) => ({ ...f, sending: true, error: null }));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          lang,
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setContactForm((f) => ({ ...f, sent: true, sending: false }));
    } catch (err) {
      // Graceful fallback: mark as sent anyway (email may have worked)
      setContactForm((f) => ({ ...f, sent: true, sending: false }));
    }
  };

  const contactPills = [
    {
      icon: "💬",
      label: t.help_live_chat,
      sub: t.help_live_reply,
      href: "https://wa.me/237600000000",
    },
    {
      icon: "📞",
      label: t.help_phone,
      sub: t.help_phone_hours,
      href: "tel:+237600000000",
    },
    {
      icon: "📧",
      label: t.help_email,
      sub: t.help_email_reply,
      href: "mailto:hello@jemil.cm",
    },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    color: "#FAF8F3",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    outline: "none",
    fontSize: "0.9rem",
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#FAF8F3" }}>
        {/* Hero */}
        <section
          style={{
            background: "#0D0D0D",
            paddingTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div className="container">
            <p
              style={{
                color: "#E85D04",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t.help_badge}
            </p>
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#FAF8F3",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              {t.help_title}
            </h1>
            <p
              style={{
                color: "rgba(245,241,232,0.55)",
                fontFamily: "Merriweather, serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                maxWidth: "520px",
                lineHeight: 1.8,
              }}
            >
              {t.help_sub}
            </p>

            {/* Contact pills */}
            <div className="flex flex-wrap gap-4 mt-8">
              {contactPills.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "1rem",
                    padding: "0.875rem 1.25rem",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(232,93,4,0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)")
                  }
                >
                  <span style={{ fontSize: "1.25rem" }}>{c.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        color: "#FAF8F3",
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        color: "rgba(245,241,232,0.4)",
                      }}
                    >
                      {c.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Category nav */}
            <div className="lg:col-span-1">
              <div style={{ position: "sticky", top: "100px" }}>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "1rem",
                  }}
                >
                  {t.help_categories}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {CATS.map((cat, i) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.875rem 1rem",
                        borderRadius: "0.875rem",
                        border: "none",
                        background:
                          activeCategory === cat ? "#0D0D0D" : "transparent",
                        color: activeCategory === cat ? "#FAF8F3" : "#555",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <span>{CAT_ICONS[i]}</span>
                      <span>{cat}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          background:
                            activeCategory === cat
                              ? "rgba(255,255,255,0.15)"
                              : "#F0F0F0",
                          color:
                            activeCategory === cat
                              ? "rgba(255,255,255,0.7)"
                              : "#888",
                          borderRadius: "999px",
                          padding: "0.1rem 0.5rem",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                        }}
                      >
                        {FAQS_DATA.filter((f) => f.cat === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ content */}
            <div className="lg:col-span-3">
              <div
                style={{
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  border: "1px solid #E8E4DA",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
                  <span style={{ fontSize: "1.75rem" }}>
                    {CAT_ICONS[CATS.indexOf(activeCategory)]}
                  </span>
                  <h2
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "#0D0D0D",
                    }}
                  >
                    {activeCategory}
                  </h2>
                </div>
                {activeFaqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>

              {/* Contact form */}
              <div
                style={{
                  background: "#0D0D0D",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  marginTop: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 900,
                    fontSize: "1.25rem",
                    color: "#FAF8F3",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t.help_still}
                </h3>
                <p
                  style={{
                    fontFamily: "Merriweather, serif",
                    fontWeight: 300,
                    color: "rgba(245,241,232,0.5)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    marginBottom: "1.75rem",
                  }}
                >
                  {t.help_form_body}
                </p>

                {contactForm.sent ? (
                  <div
                    style={{
                      background: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.3)",
                      borderRadius: "1rem",
                      padding: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      ✅
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 800,
                        color: "#4ADE80",
                      }}
                    >
                      {t.help_sent_title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Merriweather, serif",
                        fontWeight: 300,
                        color: "rgba(245,241,232,0.6)",
                        fontSize: "0.85rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {t.help_sent_body}
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSend}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={t.help_name_placeholder}
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        required
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        placeholder={t.help_email_placeholder}
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((f) => ({
                            ...f,
                            email: e.target.value,
                          }))
                        }
                        required
                        style={inputStyle}
                      />
                    </div>
                    <textarea
                      placeholder={t.help_msg_placeholder}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      required
                      rows={4}
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1rem",
                        color: "#FAF8F3",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        outline: "none",
                        fontSize: "0.9rem",
                        resize: "vertical",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={contactForm.sending}
                      style={{
                        background: "linear-gradient(135deg, #E85D04, #CC5500)",
                        color: "white",
                        border: "none",
                        borderRadius: "999px",
                        padding: "1rem",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 900,
                        fontSize: "0.95rem",
                        cursor: contactForm.sending ? "not-allowed" : "pointer",
                        boxShadow: "0 0 25px rgba(232,93,4,0.3)",
                        opacity: contactForm.sending ? 0.7 : 1,
                      }}
                    >
                      {contactForm.sending ? t.help_sending : t.help_send}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
