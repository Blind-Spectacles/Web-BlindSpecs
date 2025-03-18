import React from "react";
import { motion } from "framer-motion";
import gif from "../assets/glass.gif"; // Ensure correct import

interface StaticImageProps {
  src?: string;
  alt: string;
}

const StaticImage: React.FC<StaticImageProps> = ({ src, alt }) => {
  const imageSrc = src && src !== "/images/sample.png" ? src : gif; // Ensure GIF is used

  console.log("Image Source:", imageSrc); // Debugging

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden shadow-md bg-white bg-opacity-70 w-full h-full flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top Center Text */}
      <p className="absolute top-2 text-green-900 font-bold text-2xl">Connected</p>

      {/* GIF Image */}
      <img src={imageSrc} alt={alt} className="w-[500px] h-[200px] object-cover" />
    </motion.div>
  );
};

export default StaticImage;
