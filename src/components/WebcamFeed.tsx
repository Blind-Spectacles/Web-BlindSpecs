import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { motion } from "framer-motion";

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);

  useEffect(() => {
    const detectObjects = async () => {
      const net = await cocoSsd.load();
      setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video &&
          webcamRef.current.video.readyState === 4
        ) {
          const predictions = await net.detect(webcamRef.current.video);
          setDetectedObjects(predictions.map((p) => p.class));
        }
      }, 1000);
    };

    detectObjects();
  }, []);

  return (
    <motion.div
      className="w-full h-full bg-secondary rounded-xl shadow-lg flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Webcam ref={webcamRef} className="rounded-md w-full h-full" />
    </motion.div>
  );
};

export default WebcamFeed;
