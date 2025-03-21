import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import Logs from "./Logs";

const SERVER_URL = "http://127.0.0.1:5000/process_frame";
const API_URL = "http://127.0.0.1:5000/detect";

interface DetectedObject {
  label: string;
  distance: number;
  sentence: string;
}

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [isCameraAccessible, setIsCameraAccessible] = useState<boolean>(true);

  // Function to check camera access
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setIsCameraAccessible(true))
      .catch(() => {
        setErrorMessage("Camera access denied or unavailable.");
        setIsCameraAccessible(false);
      });
  }, []);

  // Function to convert base64 to Blob
  const base64ToBlob = (base64: string) => {
    try {
      const [, data] = base64.split(",");
      if (!data) throw new Error("Invalid base64 format");
      const byteArray = Uint8Array.from(atob(data), (char) => char.charCodeAt(0));
      return new Blob([byteArray], { type: "image/jpeg" });
    } catch (error) {
      console.error("Error converting base64 to Blob:", error);
      return null;
    }
  };

  // Function to capture and send a frame
  const captureAndSendFrame = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const blob = base64ToBlob(imageSrc);
      if (!blob) throw new Error("Invalid image data");

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      // Send image to server
      const res = await fetch(SERVER_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      // Send base64 image to FastAPI detection endpoint
      const detectionResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: imageSrc.split(",")[1] }),
      });

      if (!detectionResponse.ok) throw new Error(`Detection API error: ${detectionResponse.status}`);

      const detectionData = await detectionResponse.json();

      // Update detected objects dynamically
      setDetectedObjects((prevObjects) => {
        const updatedObjects = [...prevObjects];

        detectionData.detected_objects.forEach((newObj: DetectedObject) => {
          const existingObj = updatedObjects.find((obj) => obj.label === newObj.label);
          if (existingObj) {
            existingObj.distance = newObj.distance;
          } else {
            updatedObjects.unshift(newObj);
          }
        });

        return updatedObjects.slice(0, 10); // Limit log to 10 entries
      });
    } catch (error) {
      console.error("Error processing frame:", error);
      setErrorMessage("Failed to process frame. Please check the server.");
    }
  }, []);

  useEffect(() => {
    if (isCameraAccessible) {
      const interval = setInterval(captureAndSendFrame, 1000);
      return () => clearInterval(interval);
    }
  }, [captureAndSendFrame, isCameraAccessible]);

  return (
    <div className="flex">
      <div className="w-2/3">
        {isCameraAccessible ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: 1080, height: 720, facingMode: "environment" }}
            className="rounded-lg"
          />
        ) : (
          <div className="text-red-500">Camera access denied or unavailable.</div>
        )}
        {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
      </div>
      <div className="w-1/3">
        <Logs detectedObjects={detectedObjects} />
      </div>
    </div>
  );
};

export default WebcamFeed;
