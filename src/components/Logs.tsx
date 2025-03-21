import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetectedObject {
  label: string;
  distance: number;
  sentence: string;
}

const Logs: React.FC<{ detectedObjects: DetectedObject[] }> = ({ detectedObjects }) => {
  const [logs, setLogs] = useState<DetectedObject[]>([]);
  const [spokenObjects, setSpokenObjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs];

      detectedObjects.forEach((newObj) => {
        const existingObj = updatedLogs.find((obj) => obj.label === newObj.label);
        if (existingObj) {
          existingObj.distance = newObj.distance;
        } else {
          updatedLogs.unshift(newObj);
        }
      });

      return updatedLogs.slice(0, 10); // Keep only the latest 10 logs
    });

    // Check and speak if objects are within 3 meters
    detectedObjects.forEach((obj) => {
      if (obj.distance < 3 && !spokenObjects.has(obj.label)) {
        speakText(obj.sentence);
        setSpokenObjects((prevSet) => new Set(prevSet).add(obj.label));
      }
    });
  }, [detectedObjects]);

  // Function to convert text to speech
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice to English if available
      const voices = synth.getVoices();
      utterance.voice = voices.find((v) => v.lang === "en-US") || voices[0];

      synth.cancel();
      synth.speak(utterance);

      console.log("✅ Speaking:", text);
    } else {
      console.warn("❌ Speech synthesis not supported.");
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-secondary p-4 rounded-lg shadow-md overflow-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-lg font-semibold text-accent">AI Detection Logs</h2>
      <ul className="mt-2 space-y-2 text-sm">
        <AnimatePresence>
          {logs.map((obj, index) => (
            <motion.li
              key={index}
              className="p-2 bg-gray-800 rounded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <strong>{obj.label}</strong> - {obj.sentence} (Distance: {obj.distance.toFixed(2)}m)
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default Logs;
