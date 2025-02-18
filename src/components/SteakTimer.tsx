import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Doneness, Cut, cookingTimes } from "../constants";
import { getSteakGradient } from "../utils";

const SteakTimer = () => {
  const [beefCut, setBeefCut] = useState<Cut>(Cut.Ribeye);
  const [doneness, setDoneness] = useState<Doneness>(Doneness.MediumRare);
  const [thickness, setThickness] = useState<number>(1); // centimeters
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [halfwayReached, setHalfwayReached] = useState(false);
  const [finished, setFinished] = useState(false);

  // Convert thickness from centimeters to inches (1 inch = 2.54 cm)
  const thicknessInInches = thickness / 2.54;
  // Compute total time and round to an integer so that time is whole seconds.
  const computedTotalTime = Math.round(
    cookingTimes[beefCut][doneness] * thicknessInInches
  );
  const totalTime = computedTotalTime;
  const halfway = Math.floor(totalTime / 2);
  const progress = timeLeft !== null ? (totalTime - timeLeft) / totalTime : 0;

  useEffect(() => {
    let timer: number;
    if (running && !paused && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null) {
            if (prev === halfway + 1) {
              setHalfwayReached(true);
            }
            if (prev === 1) {
              setFinished(true);
              setRunning(false);
            }
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, paused, timeLeft, halfway]);

  const startTimer = () => {
    setTimeLeft(totalTime);
    setRunning(true);
    setPaused(false);
    setHalfwayReached(false);
    setFinished(false);
  };

  const stopTimer = () => {
    setTimeLeft(null);
    setRunning(false);
    setPaused(false);
    setHalfwayReached(false);
    setFinished(false);
  };

  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#001f3f] text-white p-5">
      <h1 className="text-3xl font-bold mb-6">🥩 Steak Timer</h1>

      {/* Dropdowns / Inputs */}
      <div className="flex flex-col w-full max-w-sm space-y-4 mb-4">
        {/* Cut */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Cut:</label>
          <select
            className="rounded border border-gray-500 bg-[#2a2a35] p-2 text-center text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={beefCut}
            onChange={(e) => setBeefCut(e.target.value as Cut)}
            disabled={running}
          >
            {Object.values(Cut).map((cut) => (
              <option key={cut} value={cut}>
                {cut}
              </option>
            ))}
          </select>
        </div>

        {/* Thickness */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Thickness (cm):</label>
          <select
            className="rounded border border-gray-500 bg-[#2a2a35] p-2 text-center text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            disabled={running}
          >
            {[1, 2, 3, 4, 5].map((cm) => (
              <option key={cm} value={cm}>
                {cm} cm
              </option>
            ))}
          </select>
        </div>

        {/* Doneness */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Doneness:</label>
          <select
            className="rounded border border-gray-500 bg-[#2a2a35] p-2 text-center text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={doneness}
            onChange={(e) => setDoneness(e.target.value as Doneness)}
            disabled={running}
          >
            {Object.values(Doneness).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={startTimer}
          disabled={running}
          className="px-4 py-2 bg-red-500 rounded text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Start Timer
        </button>

        {running && (
          <>
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-yellow-500 rounded text-white"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={stopTimer}
              className="px-4 py-2 bg-gray-500 rounded text-white"
            >
              Stop
            </button>
          </>
        )}
      </div>

      {/* Timer Display */}
      {timeLeft !== null && (
        <div className="flex items-center space-x-10 mb-6">
          <div className="min-w-[80px] text-lg">Total: {totalTime}s</div>
          <div className="relative w-24 h-24 rounded-full border-4 border-white flex items-center justify-center">
            <motion.div
              className="absolute w-[2px] h-10 bg-red-500 origin-bottom top-2 left-1/2 -translate-x-1/2"
              animate={{
                rotate: running && !paused && !finished ? 360 : 0,
              }}
              transition={{
                duration: totalTime,
                ease: "linear",
                repeat: running && !finished ? Infinity : 0,
              }}
            />
          </div>
          <div className="min-w-[80px] text-lg">Left: {timeLeft}s</div>
        </div>
      )}

      {/* Flip Message */}
      {halfwayReached && !finished && (
        <div className="text-2xl font-bold text-red-500 animate-pulse mb-4">
          🔥 Flip Your Steak Now! 🔥
        </div>
      )}

      {/* Finished Message */}
      {finished && (
        <div className="text-2xl font-bold text-green-400 animate-pulse mb-4">
          ✅ Finished! Pick up your steak now! ✅
        </div>
      )}

      {/* Steak Gradient Visualization */}
      {timeLeft !== null && (
        <div
          className="w-72 h-24 border-2 border-white rounded-lg transition-all"
          style={{ background: getSteakGradient(doneness, progress) }}
        />
      )}
    </div>
  );
};

export default SteakTimer;
