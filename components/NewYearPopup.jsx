"use client"
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const NewYearPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1080, height: 720 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setIsVisible(false), 10000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const closePopup = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <Confetti width={dimensions.width} height={dimensions.height} />
      
      <div className="relative bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-lg shadow-2xl p-8 w-11/12 max-w-lg text-center">
        <button
          className="absolute top-2 right-2 text-white bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full p-1.5"
          onClick={closePopup}
        >
          ✖
        </button>

        <h2 className="text-3xl font-extrabold text-white animate-pulse">
          🎆 Happy New Year! 🎆
        </h2>
        <p className="text-lg text-white mt-4">
          Wishing you an amazing year filled with joy, success, and endless possibilities!
        </p>

        <button
          className="mt-6 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition transform hover:scale-105"
          onClick={closePopup}
        >
          Let's Celebrate! 🎉
        </button>
      </div>
    </div>
  );
};

export default NewYearPopup;
