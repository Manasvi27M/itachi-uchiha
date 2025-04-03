import { motion } from "framer-motion";
import Button from "../shared/Button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="intro"
      className="pt-32 pb-20 px-4 md:pt-40 md:pb-32 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          We're <span className="text-primary">Company</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Building the future of technology, one line of code at a time.
        </p>
        <Button
          size="lg"
          onClick={() =>
            document
              .getElementById("team")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="group"
        >
          Meet Our Team
          <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </motion.div>
    </section>
  );
}
