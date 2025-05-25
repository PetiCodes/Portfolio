"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InProgressAnimation from "./InProgressAnimation";
import { useAnimation } from "../context/AnimationContext";

const ProgressBar = ({ skill, progress, color = "bg-gradient-to-r from-primary-400 to-secondary-600" }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium text-sm md:text-base">{skill}</span>
        <span className="text-[#ADB7BE] text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-[#33353F] rounded-full h-2 md:h-3">
        <motion.div
          className={`h-2 md:h-3 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const CurrentProject = ({ title, description, status, technologies }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-[#181818] rounded-lg p-6 border border-[#33353F] hover:border-primary-500 transition-colors duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">{title}</h3>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-full">
          {status}
        </span>
      </div>
              <p className="text-[#ADB7BE] mb-4 text-sm md:text-base">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-[#33353F] text-[#ADB7BE] rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const InProgressSection = () => {
  const { inProgressAnimationRef } = useAnimation();
  const currentProjects = [
    {
      title: "Advanced Portfolio Features",
      description: "Enhancing my portfolio with advanced animations, dark/light mode toggle, and improved user experience.",
      status: "In Progress",
      technologies: ["Next.js","Framer Motion","Tailwind CSS","Three.js"]
    },
    {
      title: "MEG AI Infotech Website",
      description: "Developing a website for MEG AI Infotech, a company that provides AI solutions.",
      status: "In Progress",
      technologies: ["Next.js","Tailwind CSS","Supabase","Razorpay"]
    },
    {
      title: "AI Agents",
      description: "Learning how to develop AI agents that can perform tasks autonomously, using natural language processing and machine learning.",
      status: "Learning",
      technologies: ["Python","OpenAI","N8N"]
    },
    {
      title: "3D Modelling",
      description: "Learning how to create 3D models and animations using Blender.",
      status: "Learning",
      technologies: ["Blender"]
    }
  ];

  const currentSkills = [
    { skill: "Next.js Advanced Features", progress: 50, color: "bg-gradient-to-r from-primary-400 to-primary-600" },
    { skill: "AI Agents", progress: 30, color: "bg-gradient-to-r from-secondary-400 to-secondary-600" },
    { skill: "3D Modelling", progress: 25, color: "bg-gradient-to-r from-primary-500 to-secondary-500" },
    { skill: "Video Editing", progress: 40, color: "bg-gradient-to-r from-secondary-500 to-primary-500" }
  ];

  return (
    <section className="text-white py-16" id="in-progress">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-center text-4xl font-bold text-white mt-4 mb-4">
          <InProgressAnimation 
            ref={inProgressAnimationRef}
            className="text-center text-4xl font-bold text-white"
            speed={200}
          />
        </h2>
        <p className="text-[#ADB7BE] text-lg max-w-2xl mx-auto">
          Here&apos;s what I&apos;m actively building and learning right now
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {currentProjects.map((project, index) => (
          <CurrentProject key={index} {...project} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-[#181818] rounded-lg p-6 md:p-8 border border-[#33353F]"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Skills I&apos;m Developing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSkills.map((item, index) => (
            <ProgressBar key={index} {...item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default InProgressSection; 