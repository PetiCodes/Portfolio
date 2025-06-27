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
  const aboutMeAnimationRef = useRef(null);
  const projectsAnimationRef = useRef(null);
  const inProgressAnimationRef = useRef(null);
  const connectAnimationRef = useRef(null);
  const experienceAnimationRef = useRef(null);

  const resetAnimation = (ref) => {
    if (ref.current && typeof ref.current.resetAnimation === 'function') {
      ref.current.resetAnimation();
    }
  };

  const value = {
    aboutMeAnimationRef,
    projectsAnimationRef,
    inProgressAnimationRef,
    connectAnimationRef,
    experienceAnimationRef,
    resetAboutMeAnimation: () => resetAnimation(aboutMeAnimationRef),
    resetProjectsAnimation: () => resetAnimation(projectsAnimationRef),
    resetInProgressAnimation: () => resetAnimation(inProgressAnimationRef),
    resetConnectAnimation: () => resetAnimation(connectAnimationRef),
    resetExperienceAnimation: () => resetAnimation(experienceAnimationRef),
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}; 