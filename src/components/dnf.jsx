import React, { useState, useEffect } from 'react';

const fontList = [
    'Courier New, monospace',
    'Gerogia, serif',
    'Arial, sans-serif',
    'Comic Sans MS, cursive',
    'Times New Roman'
]import React, { useState, useEffect } from 'react';

// List of fonts to cycle through during animation
const fontList = [
  'Courier New, monospace',
  'Georgia, serif',
  'Arial, sans-serif',
  'Comic Sans MS, cursive',
  'Times New Roman, serif',
  '"Lucida Console", Monaco, monospace',
];

// Font to lock in once animation is complete
const finalFont = 'Trebuchet MS, sans-serif';

// AnimatedTitle component
const AnimatedTitle = ({ text, className = '' }) => {
  // State to control how much of the text is currently shown
  const [displayedText, setDisplayedText] = useState('');

  // Index to track which font we're currently showing
  const [fontIndex, setFontIndex] = useState(0);

  // Boolean flag to indicate whether the full text has finished animating
  const [isComplete, setIsComplete] = useState(false);

  // Font currently being applied to the heading
  const [currentFont, setCurrentFont] = useState(fontList[0]);

  // Effect: Reveal the text one character at a time
  useEffect(() => {
    if (displayedText.length < text.length) {
      // Set timeout to show next character after a delay
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 150); // Speed of typing animation (ms)
      return () => clearTimeout(timeout); // Cleanup timeout
    } else {
      // Mark animation as complete once all characters are shown
      setIsComplete(true);
    }
  }, [displayedText, text]);

  // Effect: While animation is not complete, cycle through fonts
  useEffect(() => {
    if (isComplete) {
      // Once text is fully displayed, apply the final font and stop cycling
      setCurrentFont(finalFont);
      return;
    }

    // Set interval to change font periodically
    const interval = setInterval(() => {
      // Move to the next font in the list
      setFontIndex((prevIndex) => (prevIndex + 1) % fontList.length);
      setCurrentFont(fontList[fontIndex]);
    }, 100); // Font cycling speed (ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fontIndex, isComplete]);

  // Render the animated title with dynamic font and custom styles (Tailwind-compatible)
  return (
    <h1
      className={className}
      style={{
        fontFamily: currentFont,
        transition: 'font-family 0.2s ease-in-out', // Smooth font transition
      }}
    >
      {displayedText}
    </h1>
  );
};

export default AnimatedTitle;
✅ Usage in Your Component (With RevealOnScroll)
jsx
Copy code
import AnimatedTitle from './AnimatedTitle'; // Adjust path as necessary

<RevealOnScroll>
  <div className="text-center z-10 px-4">
    {/* Animated text title with gradient, size, and spacing from Tailwind */}
    <AnimatedTitle
      text="Hi, I'm Ryan Abreu"
      className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right"
    />
  </div>
</RevealOnScroll>
🧠 Developer Notes
The animation is self-contained, so it can be reused across your site.

The className prop lets you pass Tailwind utility classes freely.

The fonts are system fonts. You can also load custom fonts from Google Fonts if you want more visual consistency.

Would you like help using custom fonts (e.g. from Google Fonts) or making this mobile-optimized further?




Attach

Search

Reason