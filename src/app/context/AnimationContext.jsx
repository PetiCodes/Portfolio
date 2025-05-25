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
  const inProgressAnimationRef = useRef();
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

  const resetInProgressAnimation = () => {
    if (inProgressAnimationRef.current) {
      inProgressAnimationRef.current.resetAnimation();
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
      inProgressAnimationRef,
      connectAnimationRef,
      resetAboutMeAnimation,
      resetProjectsAnimation,
      resetInProgressAnimation,
      resetConnectAnimation
    }}>
      {children}
    </AnimationContext.Provider>
  );
}; 