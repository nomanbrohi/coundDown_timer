"use client"; // Enables client-side rendering for this component

import { useState, useRef, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import Input from your components
import { Button } from "@/components/ui/button"; // Import Button from your components

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0); // Track time left
  const [isActive, setIsActive] = useState<boolean>(false); // Track if timer is active
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval timer
  const clearInput = useRef<HTMLInputElement | null>(null)

  // Handle input change and convert to number
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setTimeLeft(Number(e.target.value));
  };

  // Format the time to minutes:seconds format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Start countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0 && !isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Countdown every second
    }
  };

  // Stop the countdown timer
  const handleStop = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setIsActive(false);
    }
  };

  // Reset the timer to zero and stop countdown
  const handleReset = (): void => {
    handleStop();
    setTimeLeft(0);
    if (clearInput.current) {
      clearInput.current.value = ""; // Clears the input field
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-auto flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-2xl md:text-3xl  font-bold text-gray-700 mb-4">Countdown Timer</h1>
        
        {/* Input for timer */}
        <Input
          type="number"
          onChange={handleInput}
          ref={clearInput}
          className="w-full p-3 mb-4 text-lg rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          placeholder="Enter time in seconds"
        />

        {/* Display formatted time */}
        <div className="text-4xl font-mono text-gray-800 dark:text-gray-200 mb-8">
          {formatTime(timeLeft)}
        </div>

        {/* Control buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={handleStart}
            className="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-yellow-600 transition"
            disabled={isActive || timeLeft <= 0}
          >
            Start
          </Button>
          <Button
            onClick={handleStop}
            className="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-yellow-600 transition"
            disabled={!isActive}
          >
            Stop
          </Button>
          <Button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-600  text-white rounded-full hover:bg-yellow-600 transition"
            disabled={timeLeft < 0 }
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
