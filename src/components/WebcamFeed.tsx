import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Logs from "./Logs";

const SERVER_URL = "http://192.168.207.57:5000/process_frame"; // Backend URL

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detections, setDetections] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Function to capture and send a frame every second
  const captureAndSendFrame = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot(); // Capture frame as base64
    if (!imageSrc) return;

    // Convert base64 to Blob
    const blob = await fetch(imageSrc).then(res => res.blob());
    const formData = new FormData();
    formData.append("file", blob, "frame.jpg"); // File must be named 'file' to match FastAPI

    try {
      const response = await fetch(SERVER_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.detected_objects) {
        setDetections(data.detected_objects.map((obj: any) => obj.sentence));
      }
    } catch (error) {
      console.error("Error sending frame:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStreaming) {
      interval = setInterval(captureAndSendFrame, 1000); // Capture frame every second
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Webcam Stream */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg" // Capture image as JPEG
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        className="rounded-lg"
      />

      {/* Start/Stop Streaming Button */}
      <button
        onClick={() => setIsStreaming(!isStreaming)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isStreaming ? "Stop Streaming" : "Start Streaming"}
      </button>

      {/* AI Detection Logs */}
      <div className="mt-4 w-2/3">
        <Logs detectedObjects={detections} />
      </div>
    </div>
  );
};

export default WebcamFeed;