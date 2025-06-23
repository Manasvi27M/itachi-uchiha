import { div } from "framer-motion/client";
import HeroSection from "../components/landingPage/HeroSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import { LampComponent } from "../components/landingPage/LampEffect";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <LampComponent />
    </div>
  );
}
