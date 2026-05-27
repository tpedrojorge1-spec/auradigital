import React, { useState, lazy, Suspense } from "react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

// Lazy-load das seções abaixo do fold
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const PortfolioSection = lazy(() => import("../components/PortfolioSection"));
const ProcessSection = lazy(() => import("../components/ProcessSection"));
const StatsSection = lazy(() => import("../components/StatsSection"));
const PlansSection = lazy(() => import("../components/PlansSection"));
const ReviewsSection = lazy(() => import("../components/ReviewsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const FooterSection = lazy(() => import("../components/FooterSection"));
const PaymentModal = lazy(() => import("../components/PaymentModal"));

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <PurpleRaysBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <Suspense fallback={null}>
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <StatsSection />
          <PlansSection onSelectPlan={setSelectedPlan} />
          <ReviewsSection />
          <ContactSection />
          <FooterSection />
        </Suspense>
      </div>

      {selectedPlan && (
        <Suspense fallback={null}>
          <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        </Suspense>
      )}
    </div>
  );
}