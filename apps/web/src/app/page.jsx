"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HomePage/HeroSection";
import { PopularRoutesSection } from "@/components/HomePage/PopularRoutesSection";
import { HowItWorksSection } from "@/components/HomePage/HowItWorksSection";
import { TerminalSection } from "@/components/HomePage/TerminalSection";
import { DiasporaSection } from "@/components/HomePage/DiasporaSection";
import { TrustSection } from "@/components/HomePage/TrustSection";
import { FinalCTASection } from "@/components/HomePage/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PopularRoutesSection />
        <HowItWorksSection />
        <TerminalSection />
        <DiasporaSection />
        <TrustSection />
        <FinalCTASection />
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: .55; }
          100% { transform: scale(3.8); opacity: 0;   }
        }
        ::-webkit-scrollbar { display: none; }
        select option { color: #0D0D0D; background: #FAF8F3; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(.7); opacity: .6; cursor: pointer; }
        @media (max-width: 768px) {
          .grid.grid-cols-1.md\\:grid-cols-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </>
  );
}
