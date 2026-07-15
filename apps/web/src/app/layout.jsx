import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LangProvider } from "@/utils/lang";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Merriweather:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0D0D0D" />
      </head>
      <body>
        <LangProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </LangProvider>

        <style jsx global>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          body { font-family: 'Merriweather', Georgia, serif; line-height: 1.7; color: #0D0D0D; background: #FAF8F3; overflow-x: hidden; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; }
          a { color: inherit; }
          button { font-family: inherit; }
          select, input, textarea { font-family: inherit; }
          .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
          @media (max-width: 768px) { html { font-size: 15px; } }
          ::-webkit-scrollbar { width: 5px; height: 5px; }
          ::-webkit-scrollbar-track { background: #FAF8F3; }
          ::-webkit-scrollbar-thumb { background: #E8C9A0; border-radius: 999px; }

          /* ════════════════════════════════════════════════════
             MICRO-INTERACTIONS & ACTION ANIMATIONS
          ════════════════════════════════════════════════════ */

          /* ── 1. BUTTON CLICK RIPPLE ───────────────────────── */
          button { position: relative; overflow: hidden; }
          button::after {
            content: '';
            position: absolute;
            inset: 50% 50%;
            width: 0; height: 0;
            background: rgba(255,255,255,0.28);
            border-radius: 50%;
            transform: translate(-50%,-50%) scale(0);
            opacity: 0;
            pointer-events: none;
          }
          button:active::after {
            animation: btnRipple 0.5s ease-out forwards;
          }
          @keyframes btnRipple {
            0%   { width: 0; height: 0; opacity: 0.7; transform: translate(-50%,-50%) scale(0); }
            80%  { width: 300%; height: 300%; opacity: 0.25; transform: translate(-50%,-50%) scale(1); }
            100% { width: 300%; height: 300%; opacity: 0; transform: translate(-50%,-50%) scale(1.1); }
          }

          /* ── 2. CTA BUTTON PRESS SCALE ───────────────────── */
          button:active { transform: scale(0.965); transition: transform 0.08s; }

          /* ── 3. INPUT FOCUS GLOW ─────────────────────────── */
          input:focus, select:focus, textarea:focus {
            outline: none;
            box-shadow: 0 0 0 2.5px rgba(232,93,4,0.5), 0 0 18px rgba(232,93,4,0.18) !important;
            border-color: rgba(232,93,4,0.6) !important;
            transition: box-shadow 0.25s, border-color 0.25s;
          }

          /* ── 4. LIVE DOT PULSE ───────────────────────────── */
          @keyframes ripple {
            0%   { transform: scale(1);   opacity: .55; }
            100% { transform: scale(3.8); opacity: 0;   }
          }

          /* ── 5. ROUTE CARD 3D TILT (CSS perspective) ─────── */
          .jemil-card-tilt {
            transition: transform 0.2s cubic-bezier(.17,.67,.34,1.2), box-shadow 0.2s;
            transform-style: preserve-3d;
            will-change: transform;
          }
          .jemil-card-tilt:hover {
            transform: perspective(600px) rotateY(-4deg) rotateX(2deg) translateY(-6px) scale(1.01);
            box-shadow: 8px 20px 45px rgba(232,93,4,0.22);
          }

          /* ── 6. CARD SHINE SWEEP ─────────────────────────── */
          .jemil-shine {
            position: relative;
            overflow: hidden;
          }
          .jemil-shine::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 55%; height: 100%;
            background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
            pointer-events: none;
            transition: none;
          }
          .jemil-shine:hover::before {
            animation: shineSwipe 0.55s ease forwards;
          }
          @keyframes shineSwipe {
            0%   { left: -100%; opacity: 1; }
            100% { left: 160%;  opacity: 0; }
          }

          /* ── 7. SEAT SELECT BOUNCE ───────────────────────── */
          @keyframes seatBounce {
            0%   { transform: scale(1); }
            35%  { transform: scale(1.35); }
            55%  { transform: scale(0.9); }
            75%  { transform: scale(1.15); }
            90%  { transform: scale(0.97); }
            100% { transform: scale(1); }
          }
          .seat-selected { animation: seatBounce 0.42s cubic-bezier(.36,.07,.19,.97) both; }

          /* ── 8. SUCCESS CONFETTI BURST ───────────────────── */
          @keyframes confettiFall {
            0%   { transform: translateY(-30px) rotate(0deg);   opacity: 1; }
            100% { transform: translateY(80px)  rotate(360deg); opacity: 0; }
          }
          .confetti-dot {
            position: absolute;
            width: 7px; height: 7px;
            border-radius: 2px;
            animation: confettiFall 0.9s ease-out forwards;
            pointer-events: none;
          }

          /* ── 9. STEP TRANSITION SLIDE ────────────────────── */
          @keyframes stepSlideIn {
            from { opacity: 0; transform: translateX(32px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes stepSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to   { opacity: 0; transform: translateX(-32px); }
          }
          .step-enter { animation: stepSlideIn 0.32s cubic-bezier(.16,1,.3,1) both; }

          /* ── 10. BOOKING MODAL SHEET DRAG HANDLE PULSE ───── */
          @keyframes handleGlow {
            0%, 100% { background: rgba(245,241,232,.15); }
            50%       { background: rgba(232,93,4,.35); }
          }
          .modal-handle:hover { animation: handleGlow 1s ease-in-out infinite; }

          /* ── 11. PAYMENT ROW SELECTION HIGHLIGHT ─────────── */
          @keyframes paySelect {
            0%   { background-position: 200% center; }
            100% { background-position: 0%   center; }
          }

          /* ── 12. FLOATING BADGE PULSE ────────────────────── */
          @keyframes badgeFloat {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-5px); }
          }

          /* ── 13. "TAP TO BOOK" TEXT PULSE ────────────────── */
          @keyframes tapPulse {
            0%, 100% { opacity: 1; letter-spacing: .06em; }
            50%       { opacity: 0.55; letter-spacing: .12em; }
          }
          .tap-pulse { animation: tapPulse 2.2s ease-in-out infinite; }

          /* ── 14. STATS BAR NUMBER COUNT-UP GLOW ──────────── */
          @keyframes numGlow {
            0%   { text-shadow: none; }
            50%  { text-shadow: 0 0 22px rgba(232,93,4,.75); }
            100% { text-shadow: none; }
          }

          /* ── 15. BUS CARD STAGGER ENTRANCE ──────────────── */
          @keyframes cardRise {
            from { opacity: 0; transform: translateY(22px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)    scale(1); }
          }
          .card-rise { animation: cardRise 0.38s cubic-bezier(.16,1,.3,1) both; }

          /* ── 16. SUCCESS RING PING ───────────────────────── */
          @keyframes successPing {
            0%   { transform: scale(1);   opacity: 1; }
            100% { transform: scale(2.2); opacity: 0; }
          }

          /* ── 17. ROUTE CARD "TAP TO BOOK" HINT PULSE ─────── */
          @keyframes hintArrow {
            0%, 100% { transform: translateX(0); }
            50%       { transform: translateX(4px); }
          }

          /* Scrollbar hide for horizontal scroll containers */
          ::-webkit-scrollbar { display: none; }
          select option { color: #0D0D0D; background: #FAF8F3; }
          input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(.7); opacity: .6; cursor: pointer; }
          @media (max-width: 768px) {
            .grid.grid-cols-1.md\\:grid-cols-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
