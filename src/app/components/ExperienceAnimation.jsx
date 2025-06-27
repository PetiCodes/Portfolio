"use client";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";

const japaneseMap = {
  'M': 'ま', 'y': 'い', ' ': ' ', 'E': 'え', 'x': 'く', 'p': 'ぷ', 'e': 'え', 'r': 'り', 'i': 'い', 'n': 'ん', 'c': 'せ'
};

const ExperienceAnimation = forwardRef(({
  className = "",
  speed = 100
}, ref) => {
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const targetText = "My Experience";

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
      const targetChar = targetText[currentCharIndex];
      const japaneseChar = japaneseMap[targetChar] || targetChar;
      
      const baseText = targetText.slice(0, currentCharIndex);
      setDisplayText(baseText + japaneseChar);
      
      timeout = setTimeout(() => {
        setDisplayText(baseText + targetChar);
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      
    } else if (isTyping && currentCharIndex >= targetText.length) {
      timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentCharIndex(0);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isTyping, speed, animationKey, targetText]);

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

ExperienceAnimation.displayName = 'ExperienceAnimation';

export default ExperienceAnimation; 