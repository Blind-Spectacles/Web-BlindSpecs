import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Logs: React.FC<{ detectedObjects: string[] }> = ({ detectedObjects }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (detectedObjects.length > 0) {
      setLogs((prevLogs) => [...prevLogs, `Detected: ${detectedObjects.join(", ")}`]);
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
        {logs.map((log, index) => (
          <li key={index} className="p-2 bg-gray-800 rounded">{log}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Logs;
