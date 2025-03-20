import React from "react";
import Logs from "./Logs"; // Import the Logs component

const mockData = [
  { label: "person", distance: 2.5, sentence: "A person was detected at 2.50 meters." },
  { label: "car", distance: 5.0, sentence: "A car was detected at 5.00 meters." },
  { label: "dog", distance: 0.8, sentence: "A dog was detected at 0.80 meters." },
];

const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        setTimeout(() => speakText(text), 500);
        return;
      }
  
      console.log("✅ Speaking:", text);
  
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find(v => v.lang === "en-US") || voices[0];
      speechSynthesis.speak(utterance);
    } else {
      console.warn("❌ Speech synthesis not supported.");
    }
  };
  

  
const TestPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Test AI Detection Logs</h1>
      <Logs detectedObjects={mockData} />
      <button
        onClick={() => speakText("Hello, this is a test message.")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Speak Test Message
      </button>
    </div>
  );
};

export default TestPage;
