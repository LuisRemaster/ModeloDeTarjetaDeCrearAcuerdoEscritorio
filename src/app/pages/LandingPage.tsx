import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { AgreementTypes } from '../components/AgreementTypes';
import { Features } from '../components/Features';
import { TrustSection } from '../components/TrustSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1F2F2D] text-white selection:bg-[#FF9B6F] selection:text-[#1F2F2D] font-['Poppins']">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <AgreementTypes />
        <Features />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
