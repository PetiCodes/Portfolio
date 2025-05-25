"use client";
import React, { useTransition, useState } from "react";
import LaptopModel from "./LaptopModel";
import TabButton from "./TabButton";
import AboutMeAnimation from "./AboutMeAnimation";
import { useAnimation } from "../context/AnimationContext";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Python</li>
        <li>Java</li>
        <li>PHP</li>
        <li>MERN Stack</li>
        <li>Git & GitHub</li>
        <li>3D Modelling</li>
        <li>Video Editing</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>HSNC University, Mumbai - BSc IT (Graduating April 2025)</li>
        <li>Awards: 2nd prize in Innohack (Hackathon) for SoulBuddy</li>
      </ul>
    ),
  },
  {
    title: "Leadership",
    id: "leadership",
    content: (
      <ul className="list-disc pl-2">
        <li>Project Leader - Plant Disease Detection ML/DL Project</li>
        <li>Project Leader - BuddyVerse Web Application</li>
        <li>Project Leader - SoulBuddy Mental Health Platform</li>
        <li>Social Media Co-Head - Systematic Chaos (KC College Cultural Techfest)</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const { aboutMeAnimationRef } = useAnimation();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <h2 className="text-center text-4xl font-bold text-white mt-24 mb-4 md:mb-6">
        <AboutMeAnimation 
          ref={aboutMeAnimationRef}
          className="text-center text-4xl font-bold text-white"
          speed={200}
        />
      </h2>
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="w-full h-[400px] md:h-[500px] relative bg-[#181818] overflow-hidden">
          <LaptopModel />
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <p className="text-base lg:text-lg">
          Hey there! To introduce myself, I've always been the kind of person who asks "what happens if I press this?" and then actually presses it. 
          That curiosity led me to Tech, but it didn't stop there.<br></br><br></br> 
          I love poking around new tech, figuring things out just because it's fun, and occasionally getting lost in a YouTube rabbit hole about things like neural networks or weird JavaScript quirks.
          I'm happiest when I'm building, breaking, and rebuilding things—whether it's a tiny script or an entire web app. <br></br><br></br>
          I think in logic, speak in semicolons, and sometimes argue with my laptop like it's a co-worker.
          Outside the screen, you'll find me chasing random thoughts, solving problems just for the thrill of it, or celebrating small wins (like finally fixing that one bug that's been haunting me for hours).
          Basically, I'm here to explore, create, and enjoy the ride. Let's see where it takes us.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("leadership")}
              active={tab === "leadership"}
            >
              {" "}
              Leadership{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
