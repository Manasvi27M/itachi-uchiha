import { motion } from "framer-motion";
import MissionCard from "./MissionCard";
import Button from "../shared/Button";

export default function MissionSection({ scrollY, scrollToSection }) {
  const missions = [
    {
      title: "Innovation",
      description:
        "We believe in pushing the boundaries of what's possible. Our team is constantly exploring new technologies and approaches to solve complex problems in elegant ways.",
      position: "left",
      scrollTrigger: 900,
    },
    {
      title: "Accessibility",
      description:
        "Technology should be for everyone. We're committed to creating products that are accessible to all users, regardless of their abilities or background.",
      position: "right",
      scrollTrigger: 1000,
    },
    {
      title: "Community",
      description:
        "We believe in the power of community. By fostering an open and collaborative environment, we can create better solutions together than we ever could alone.",
      position: "left",
      scrollTrigger: 1100,
    },
  ];

  return (
    <section id="mission" className="py-20 px-4">
      {/* <div className="flex bg-surface-100 top-0 bottom-0 left-[50%] w-0.5 bg-border z-30" /> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 800 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-4xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Our Mission
        </h2>

        <div className="relative">
          <div className="absolute bg-surface-600 top-0 bottom-0 left-[50%] w-0.5 bg-border z-10" />

          {missions.map((mission) => (
            <MissionCard
              key={mission.title}
              title={mission.title}
              description={mission.description}
              position={mission.position}
              scrollTrigger={mission.scrollTrigger}
              scrollY={scrollY}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" onClick={() => scrollToSection("intro")}>
            Back to Top
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
