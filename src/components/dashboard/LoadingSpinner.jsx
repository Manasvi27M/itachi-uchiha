"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Loading Dashboard
        </h3>
        <p className="text-slate-600">Fetching your resume data...</p>
      </motion.div>
    </div>
  );
}
