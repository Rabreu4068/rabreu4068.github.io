import React, { useState, useEffect } from 'react';

// List of fonts to cycle through during animation
const fontList = [
  'Courier New, monospace',
  'Georgia, serif',
  'Arial, sans-serif',
  'Comic Sans MS, cursive',
  'Times New Roman, serif',
  '"Lucida Console", Monaco, monospace',
];

// final font
const finalFont = 'Trebuchet MS, sans-serif';

// AnimatedTitle 
const AnimatedTitle = ({ text, className = '' }) => {
  // floodgate
  const [displayedText, setDisplayedText] = useState('');

  //  font  currently showing
  const [fontIndex, setFontIndex] = useState(0);

  // checks if done
  const [isComplete, setIsComplete] = useState(false);

  // current font
  const [currentFont, setCurrentFont] = useState(fontList[0]);

  // 1letter at a time
  useEffect(() => {
    if (displayedText.length < text.length) {
      // Set timeout to show next letter on delay
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 150); // Speed of typing animation (ms)
      return () => clearTimeout(timeout); // Cleanup timeout
    } else {
      // Mark animation as complete once all characters are shown
      setIsComplete(true);
    }
  }, [displayedText, text]);

  //  While animation is not complete, cycle through fonts
  useEffect(() => {
    if (isComplete) {
      
      setCurrentFont(finalFont);
      return;
    }

    // Set interval to change font periodically
    const interval = setInterval(() => {
      setFontIndex((prevIndex) => (prevIndex + 1) % fontList.length);
      setCurrentFont(fontList[fontIndex]);
    }, 200); 

    return () => clearInterval(interval); 
  }, [fontIndex, isComplete]);

  
  return (
    <h1
      className={className}
      style={{
        fontFamily: currentFont,
        transition: 'font-family 0.2s ease-in-out', 
      }}
    >
      {displayedText}
    </h1>
  );
};

export default AnimatedTitle;
