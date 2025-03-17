import React from "react";
import { motion } from "framer-motion";

interface StaticImageProps {
  src: string;
  alt: string;
}

const StaticImage: React.FC<StaticImageProps> = ({ src, alt }) => {
  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-md bg-secondary w-full h-full flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img src={src} alt={alt} className="w-auto h-4/5 rounded-md" />
    </motion.div>
  );
};

export default StaticImage;
