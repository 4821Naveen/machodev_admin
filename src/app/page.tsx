"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { OfferDetails } from "@/components/landing/OfferDetails";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { TrustSection } from "@/components/landing/TrustSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#030014]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Features />
        <OfferDetails />
        <RegistrationForm />
        <TrustSection />
        <Footer />
      </div>
    </main>
  );
}
