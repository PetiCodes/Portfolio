"use client";
import React, { createContext, useContext, useRef } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const aboutMeAnimationRef = useRef();
  const projectsAnimationRef = useRef();
  const connectAnimationRef = useRef();

  const resetAboutMeAnimation = () => {
    if (aboutMeAnimationRef.current) {
      aboutMeAnimationRef.current.resetAnimation();
    }
  };

  const resetProjectsAnimation = () => {
    if (projectsAnimationRef.current) {
      projectsAnimationRef.current.resetAnimation();
    }
  };

  const resetConnectAnimation = () => {
    if (connectAnimationRef.current) {
      connectAnimationRef.current.resetAnimation();
    }
  };

  return (
    <AnimationContext.Provider value={{
      aboutMeAnimationRef,
      projectsAnimationRef,
      connectAnimationRef,
      resetAboutMeAnimation,
      resetProjectsAnimation,
      resetConnectAnimation
    }}>
      {children}
    </AnimationContext.Provider>
  );
}; 