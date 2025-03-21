import React, { useState, useEffect } from "react";
import Logs from "./Logs";

const mockData = [
  { label: "person", distance: 2.5, sentence: "A person was detected at 2.50 meters." },
  { label: "car", distance: 5.0, sentence: "A car was detected at 5.00 meters." },
  { label: "dog", distance: 0.8, sentence: "A dog was detected at 0.80 meters." },
];

const TestPage: React.FC = () => {
  const [detectedObjects, setDetectedObjects] = useState(mockData);

  useEffect(() => {
    // Simulating dynamic object detection every 3 seconds
    const interval = setInterval(() => {
      setDetectedObjects((prevObjects) =>
        prevObjects.map((obj) => ({
          ...obj,
          distance: Math.max(0.5, obj.distance - Math.random() * 2), // Decrease distance randomly
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Test AI Detection Logs</h1>
      <Logs detectedObjects={detectedObjects} />
    </div>
  );
};

export default TestPage;
