import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DetectedObject {
  label: string;
  distance: number;
  sentence: string;
}

const Logs: React.FC<{ detectedObjects: DetectedObject[] }> = ({ detectedObjects }) => {
  const [logs, setLogs] = useState<DetectedObject[]>([]);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  useEffect(() => {
    if (detectedObjects.length > 0) {
      setLogs((prevLogs) => [...prevLogs, ...detectedObjects]);

      // Ensure speech works after user interaction
      if (isSpeechEnabled) {
        detectedObjects.forEach((obj) => {
          if (obj.distance < 2) {
            speakText(`Warning! ${obj.label} detected at ${obj.distance} meters.`);
          }
        });
      }
    }
  }, [detectedObjects, isSpeechEnabled]);

  // Function to enable speech (user must click once)
  const enableSpeech = () => {
    setIsSpeechEnabled(true);
    speakText("Speech enabled successfully!");
  };

  // Function to convert text to speech
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice to a specific language if available
      const voices = synth.getVoices();
      utterance.voice = voices.find(v => v.lang === "en-US") || voices[0];

      // Ensure speech isn't interrupted by previous requests
      synth.cancel();
      synth.speak(utterance);

      console.log("✅ Speaking:", text);
    } else {
      console.warn("❌ Speech synthesis not supported.");
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-secondary p-4 rounded-lg shadow-md overflow-auto mt-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-lg font-semibold text-accent">AI Detection Logs</h2>

      {/* Button to Enable Speech */}
      {!isSpeechEnabled && (
        <button
          onClick={enableSpeech}
          className="px-4 py-2 bg-blue-600 text-white rounded-md mt-2"
        >
          Enable Speech
        </button>
      )}

      <ul className="mt-2 space-y-2 text-sm">
        {logs.length > 0 ? (
          logs.map((obj, index) => (
            <li key={index} className="p-2 bg-gray-800 rounded">
              <strong>{obj.label}</strong> - {obj.sentence} (Distance: {obj.distance}m)
            </li>
          ))
        ) : (
          <li className="text-gray-500">No detections yet...</li>
        )}
      </ul>
    </motion.div>
  );
};

export default Logs;
