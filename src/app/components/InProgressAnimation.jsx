"use client";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";

// Japanese character mappings for "In Progress"
const japaneseMap = {
  'I': 'イ', 'n': 'ん', ' ': ' ', 'P': 'プ', 'r': 'ら', 'o': 'お', 'g': 'ぐ', 'e': 'え', 's': 'す'
};

const InProgressAnimation = forwardRef(({ 
  className = "",
  speed = 100 
}, ref) => {
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const targetText = "In Progress";

  // Expose reset function to parent components
  useImperativeHandle(ref, () => ({
    resetAnimation: () => {
      setDisplayText("");
      setCurrentCharIndex(0);
      setIsTyping(true);
      setAnimationKey(prev => prev + 1);
    }
  }));

  useEffect(() => {
    let timeout;

    if (isTyping && currentCharIndex < targetText.length) {
      // Typing phase
      const targetChar = targetText[currentCharIndex];
      const japaneseChar = japaneseMap[targetChar] || targetChar;
      
      // Show Japanese character first
      const baseText = targetText.slice(0, currentCharIndex);
      setDisplayText(baseText + japaneseChar);
      
      // Then replace with English character after delay
      timeout = setTimeout(() => {
        setDisplayText(baseText + targetChar);
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      
    } else if (isTyping && currentCharIndex >= targetText.length) {
      // Finished typing, wait 5 seconds then restart
      timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentCharIndex(0);
        // Keep looping the animation
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isTyping, speed, animationKey]);

  return (
    <span className={className} key={animationKey}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 bg-current ml-1"
      />
    </span>
  );
});

InProgressAnimation.displayName = 'InProgressAnimation';

export default InProgressAnimation; 