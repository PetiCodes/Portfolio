"use client";
import React from "react";
import Image from "next/image";
import { useAnimation } from "../context/AnimationContext";
import ExperienceAnimation from "./ExperienceAnimation";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  const { experienceAnimationRef } = useAnimation();
  return (
    <section id="experience" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-center text-4xl font-bold text-white mb-8">
          <ExperienceAnimation
            ref={experienceAnimationRef}
            className="text-center text-4xl font-bold text-white"
            speed={100}
          />
        </h2>
      </motion.div>
      <br></br>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="max-w-xl">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/unitile-logo.png"
              alt="Unitile Logo"
              width={200}
              height={100}
              className="rounded"
            />
          </div>
          <br></br>
          <p className="text-gray-400 text-center">Software Development Intern | June 2025 – Present</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
            <li>🛠 Overseeing the development of ERP software solutions.</li>
            <li>Coordinating and managing the entire development lifecycle of Unitile's custom ERP system.</li>
            <li>Defining feature requirements, tracking progress, and ensuring alignment with business goals.</li>
            <li>Maintaining quality assurance by identifying bottlenecks, bugs, and workflow improvements during testing phases.</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection; 