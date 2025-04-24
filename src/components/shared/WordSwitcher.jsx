import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Container animation for staggered letters and exit
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
  exit: {
    scale: 2,
    opacity: 0,
    rotateX: 15,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Letter animation
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2 },
  },
};

// Component that animates each letter of a word
const AnimatedWord = ({ word }) => {
  const letters = word.split("");

  return (
    <motion.div
      className="inline-flex"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {letters.map((char, idx) => (
        <motion.span key={idx} variants={letterVariants} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Main reusable component
const WordSwitcher = ({ words, interval = 5000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="relative inline-block">
      {/* Placeholder to keep layout stable */}
      <span className="invisible">{words.reduce((a, b) => (a.length > b.length ? a : b))}</span>

      {/* Animated word */}
      <div className="absolute inset-0 flex justify-center">
        <AnimatePresence mode="wait">
          <AnimatedWord key={words[index]} word={words[index]} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WordSwitcher;
