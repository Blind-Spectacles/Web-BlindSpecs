import React from "react";
import { motion } from "framer-motion";

const StaticText: React.FC = () => {
  return (
    <motion.div
      className="w-full h-full bg-secondary p-6 rounded-lg shadow-md flex items-center justify-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-lg text-gray-300 text-center">
        Welcome to the Blind Navigation System. This system uses AI to detect objects in your surroundings and provides real-time audio feedback.
      </p>
    </motion.div>
  );
};

export default StaticText;
