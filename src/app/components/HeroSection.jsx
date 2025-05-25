"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-tight font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Mohammed Petiwala",
                1000,
                "Full-Stack Developer",
                1000,
                "Tech Enthusiast",
                1000,
                "3D Modeller",
                1000,
                "Video Editor",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-3xl sm:text-4xl lg:text-6xl block -mt-1 lg:-mt-2"
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          Living between curiosity and the command line.
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Contact Me
            </Link>
            <Link
              href="/resume.pdf"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download Resume
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden">
            <Image
              src="/images/Me.jpg"
              alt="Mohammed Petiwala - Full Stack Developer"
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"><span class="text-white text-6xl font-bold">MP</span></div>';
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
