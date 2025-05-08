import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = [
    "<Why she put cheese on my cheese burger?/>",
    "<Initializing my chungus world/>",
    "<Sometimes I wonder why/>",
    "<Why what?/>",
    "<Title card/>",
    "<Why are flamingos pink?/>",
    "<Hi Mom 🙋🏽‍♂️/>",
    "<Are you sure?/>",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * fullText.length);
    const message = fullText[randomIndex];
    let index = 0;
    const interval = setInterval(() => {
      setText(message.substring(0, index));
      index++;

      if (index > message.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold">
        {text} <span className="animate-blink ml-1"> | </span>
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
