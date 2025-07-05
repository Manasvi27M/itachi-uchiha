import { useState, useEffect } from "react";
import HeroSection from "../components/aboutUsPage/HeroSection";
import TeamSection from "../components/aboutUsPage/TeamSection";
import MissionSection from "../components/aboutUsPage/MissionSection";
import NavBar from "../components/shared/NavBar";

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-screen max-h-screen">
      <NavBar />
      <div className="flex flex-col min-h-screen bg-surface-100">
        <HeroSection scrollToSection={scrollToSection} />
        <TeamSection scrollY={scrollY} />
        <MissionSection scrollY={scrollY} scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}
