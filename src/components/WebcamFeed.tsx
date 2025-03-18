import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  // Video constraints can be adjusted based on your needs.
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default WebcamFeed;
