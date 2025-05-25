"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Japanese character mappings
const japaneseMap = {
  'A': 'ア', 'B': 'バ', 'C': 'カ', 'D': 'デ', 'E': 'エ', 'F': 'フ', 'G': 'ガ', 'H': 'ハ',
  'I': 'イ', 'J': 'ジ', 'K': 'カ', 'L': 'ル', 'M': 'モ', 'N': 'ナ', 'O': 'オ', 'P': 'ペ',
  'Q': 'ク', 'R': 'ラ', 'S': 'ス', 'T': 'テ', 'U': 'ウ', 'V': 'ビ', 'W': 'ワ', 'X': 'ッ',
  'Y': 'ヤ', 'Z': 'ザ',
  'a': 'あ', 'b': 'ぶ', 'c': 'ち', 'd': 'ど', 'e': 'え', 'f': 'ふ', 'g': 'が', 'h': 'は',
  'i': 'い', 'j': 'じ', 'k': 'く', 'l': 'る', 'm': 'ま', 'n': 'ん', 'o': 'お', 'p': 'ぷ',
  'q': 'く', 'r': 'ら', 's': 'す', 't': 'て', 'u': 'う', 'v': 'ヴ', 'w': 'わ', 'x': 'っ',
  'y': 'よ', 'z': 'ず', '3': '三', ' ': ' ', '-': '-'
};

const JapaneseTypeAnimation = ({ 
  sequence = ["Mohammed Petiwala", "Full-Stack Developer", "Tech Enthusiast", "3D Modeller", "Video Editor"],
  className = "",
  speed = 150 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentText = sequence[currentTextIndex];

  useEffect(() => {
    let timeout;

    if (isTyping && currentCharIndex < currentText.length) {
      // Typing phase
      const targetChar = currentText[currentCharIndex];
      const japaneseChar = japaneseMap[targetChar] || targetChar;
      
      // Show Japanese character first
      const baseText = currentText.slice(0, currentCharIndex);
      setDisplayText(baseText + japaneseChar);
      
      // Then replace with English character after delay
      timeout = setTimeout(() => {
        setDisplayText(baseText + targetChar);
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      
    } else if (isTyping && currentCharIndex >= currentText.length) {
      // Finished typing current text, wait 3 seconds then instantly clear and start next
      timeout = setTimeout(() => {
        // Instantly clear text and start next sequence
        setDisplayText("");
        setCurrentCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % sequence.length);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [currentTextIndex, currentCharIndex, isTyping, currentText, sequence, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};

export default JapaneseTypeAnimation; 