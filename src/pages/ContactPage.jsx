import { useState, useEffect } from "react";
import ContactFormSection from "../components/contactUs/ContactFormSection.jsx";
import ContactInfoSection from "../components/contactUs/ContactInfoSection.jsx";
import MapSection from "../components/contactUs/MapSection.jsx";
import NavBar from "../components/shared/NavBar.jsx";

export default function ContactUsPage() {
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
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="pt-24 pb-16 px-4 md:pt-32 md:pb-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to work with us? We'd love to hear from you.
          </p>
        </div>
      </div>

      <ContactFormSection scrollY={scrollY} />
      <ContactInfoSection scrollY={scrollY} />
      <MapSection scrollY={scrollY} />
    </div>
  );
}
