import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DetectedObject {
  label: string;
  distance: number;
  sentence: string;
}

const Logs: React.FC<{ detectedObjects: DetectedObject[] }> = ({ detectedObjects }) => {
  const [logs, setLogs] = useState<DetectedObject[]>([]);

  useEffect(() => {
    if (detectedObjects.length > 0) {
      setLogs((prevLogs) => [...prevLogs, ...detectedObjects]);
    }
  }, [detectedObjects]);

  return (
    <motion.div
      className="w-full h-full bg-secondary p-4 rounded-lg shadow-md overflow-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-lg font-semibold text-accent">AI Detection Logs</h2>
      <ul className="mt-2 space-y-2 text-sm">
        {logs.map((obj, index) => (
          <li key={index} className="p-2 bg-gray-800 rounded">
            <strong>{obj.label}</strong> - {obj.sentence} (Distance: {obj.distance}m)
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Logs;
