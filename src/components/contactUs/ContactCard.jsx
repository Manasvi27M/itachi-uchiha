import { motion } from "framer-motion";

export default function ContactCard({
  icon,
  title,
  details,
  delay,
  scrollY,
  scrollTrigger,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: scrollY > scrollTrigger ? 1 : 0,
        y: scrollY > scrollTrigger ? 0 : 20,
      }}
      transition={{ duration: 0.5, delay }}
      className="bg-tonal-600 rounded-lg border-2 border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-surface-300 rounded-full text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-gray-700 text-md">{details}</div>
      </div>
    </motion.div>
  );
}
