import React, { useState, useEffect } from "react";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    // Bẫy lỗi tuyệt đối không về số âm
    if (timeLeft <= 0) {
      setIsRunning(false);
      console.log("Hết giờ!");
      return;
    }

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning && interval !== null) {
      clearInterval(interval);
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Format giây thành MM:SS
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{timeLeft === 0 ? "HẾT GIỜ!" : `${minutes}:${seconds}`}</h1>

      <button
        onClick={() => setIsRunning(true)}
        disabled={isRunning || timeLeft === 0}
      >
        Play
      </button>
      <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
