import { div } from "framer-motion/client";
import HeroSection from "../components/landingPage/HeroSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
