import React from "react";
import WebcamFeed from "./components/WebcamFeed";
import Logs from "./components/Logs";
import StaticText from "./components/StaticText";
import StaticImage from "./components/StaticImage";

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Blind Navigation System</h1>

      {/* Adjusted Grid Layout */}
      <div className="grid grid-cols-3 gap-6 w-[90vw] h-[85vh]">
        {/* Left Side (Wider Webcam + Logs) */}
        <div className="flex flex-col gap-6 col-span-2 w-full h-full">
          <div className="box-component h-4/5">
            <WebcamFeed />
          </div>
          <div className="box-component h-1/5">
            <Logs detectedObjects={[]} />
          </div>
        </div>

        {/* Right Side (Narrower Static Text + Image) */}
        <div className="flex flex-col gap-6 col-span-1 w-full h-full">
          <div className="box-component h-3/5">
            <StaticText />
          </div>
          <div className="box-component h-2/5">
            <StaticImage src="/images/sample.png" alt="System Feature" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
