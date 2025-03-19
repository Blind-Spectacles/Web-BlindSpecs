import React from "react";
import WebcamFeed from "./components/WebcamFeed";
import Logs from "./components/Logs";
import StaticText from "./components/StaticText";
import StaticImage from "./components/StaticImage";

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col items-center">
      
      {/* Sticky Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-3 sticky top-0 bg-gray-900/80 w-full text-center py-4 shadow-lg z-10">
        Blind Navigation System
      </h1>

      {/* Scrollable Content */}
      <div className="overflow-auto w-full flex-1 px-3 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[95vw]">
          
          {/* Left Side (Webcam + Static Text) */}
          <div className="flex flex-col gap-8 md:col-span-2">
            <div className="h-[60vh] md:h-[65%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-1 flex items-center justify-center">
              <WebcamFeed />
            </div>
            {/* <div className="h-[30vh] md:h-[35%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
              <StaticText />
            </div> */}
          </div>

          {/* Right Side (Logs + Static Image) */}
          <div className="flex flex-col gap-4 md:col-span-1">
            {/* <div className="h-[30vh] md:h-[65%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-3 flex items-center justify-center">
              <Logs detectedObjects={[]} />
            </div> */}
            {/* <div className="h-[30vh] md:h-[45%] rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg p-1 flex items-center justify-center">
              <StaticImage src="/images/sample.png" alt="System Feature" />
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
