import React, { useState } from "react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import PlansSection from "../components/PlansSection";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import PaymentModal from "../components/PaymentModal";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <PurpleRaysBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <PlansSection onSelectPlan={setSelectedPlan} />
        <ReviewsSection />
        <ContactSection />
        <FooterSection />
      </div>

      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}