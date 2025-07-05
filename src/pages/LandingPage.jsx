import { div } from "framer-motion/client";
import HeroSection from "../components/landingPage/HeroSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import { LampComponent } from "../components/landingPage/LampEffect";
import NavBar from "../components/shared/NavBar";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <LampComponent />
    </div>
  );
}
