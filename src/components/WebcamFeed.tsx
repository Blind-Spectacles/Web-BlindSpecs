import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import Logs from "./Logs";

const SERVER_URL = "http://127.0.0.1:5000/process_frame"; // Backend URL

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to convert base64 to Blob
  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    return new Blob([new Uint8Array(byteArrays)], { type: "image/jpeg" });
  };

  // Function to capture and send a frame
  const captureAndSendFrame = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot(); // Capture frame as base64
    if (!imageSrc) return;

    try {
      const blob = base64ToBlob(imageSrc);

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await fetch(SERVER_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Server Response Data:", data); // Debugging

      if (data.detections) {
        setDetections((prev) => [...prev, ...data.detections]); // Append new detections
      }
    } catch (error) {
      console.error("Error sending frame:", error);
      setErrorMessage("Failed to process frame. Please try again.");
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStreaming) {
      interval = setInterval(captureAndSendFrame, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming, captureAndSendFrame]);

  return (
    <div className="relative flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        className="rounded-lg"
      />

      <button
        onClick={() => setIsStreaming(!isStreaming)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isStreaming ? "Stop Streaming" : "Start Streaming"}
      </button>

      {errorMessage && (
        <div className="mt-2 text-red-500">
          {errorMessage}
        </div>
      )}

      <div className="mt-4 w-2/3">
        <Logs detectedObjects={detections} />
      </div>
    </div>
  );
};

export default WebcamFeed;
