import { motion } from "framer-motion";

export default function MissionCard({
  title,
  description,
  position,
  scrollTrigger,
  scrollY,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
      animate={{
        opacity: scrollY > scrollTrigger ? 1 : 0,
        x: scrollY > scrollTrigger ? 0 : position === "left" ? -50 : 50,
      }}
      transition={{ duration: 0.6 }}
      className={`relative mb-16 ${
        position === "left" ? "md:ml-[50%] md:pl-10" : "md:mr-[50%] md:pr-10"
      }`}
    >
      <div
        className={`absolute top-0 z-50 ${
          position === "left" ? "left-0 md:-left-2" : "right-0 md:-right-2"
        } w-4 h-4 rounded-full bg-primary-600`}
      />
      <div className="rounded-lg border border-gray-200 bg-tonal-500 text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
