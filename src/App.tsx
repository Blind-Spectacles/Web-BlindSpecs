import React from "react";
import WebcamFeed from "./components/WebcamFeed";
import Logs from "./components/Logs";
import StaticText from "./components/StaticText";
import StaticImage from "./components/StaticImage";

const App: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center overflow">
      <h1 className="text-2xl font-bold text-blue-400 mb-2">
        Blind Navigation System
      </h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-3 w-[98vw] h-[90vh] m-3">
        {/* Left Side (Static Text & Webcam) */}
        <div className="flex flex-col gap-3 col-span-2">
          <div className="h-[70%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
            <WebcamFeed />
          </div>
          <div className="h-[30%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
            <StaticText />
          </div>
        </div>

        {/* Right Side (Static Image & Logs) */}
        <div className="flex flex-col gap-3 col-span-1">
          <div className="h-[55%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
            <Logs detectedObjects={[]} />
          </div>
          <div className="h-[45%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
            <StaticImage src="/images/sample.png" alt="System Feature" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
