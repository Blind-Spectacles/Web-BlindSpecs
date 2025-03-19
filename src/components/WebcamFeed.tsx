import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const SERVER_URL = "http://172.20.10.3:5000/detect"; // Replace with your Flask server IP

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [result, setResult] = useState<any>(null);

  // Capture image and send to server
  const captureAndDetect = useCallback(async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "webcam.jpg");

    try {
      const response = await axios.post(SERVER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
        className="w-full h-full object-cover rounded-xl"
      />
      
      <button onClick={captureAndDetect} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Capture & Detect
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold">Detected Objects:</h2>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;
