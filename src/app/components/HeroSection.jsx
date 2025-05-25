"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import JapaneseTypeAnimation from "./JapaneseTypeAnimation";

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
            <JapaneseTypeAnimation
              sequence={[
                "Mohammed Petiwala",
                "Full-Stack Developer",
                "Tech Enthusiast",
                "3D Modeller",
                "Video Editor",
              ]}
              speed={50}
              className="text-3xl sm:text-4xl lg:text-6xl block -mt-1 lg:-mt-2"
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          Living between curiosity and the command line.
          </p>
          <div>
            <Link
              href="/contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Say Hi!
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
        <div className="relative flex items-center justify-center">
  {/* Main image container (larger size) */}
  <div className="relative w-[300px] h-[380px] lg:w-[360px] lg:h-[440px]">
    <div className="bg-[#181818] w-full h-full relative overflow-hidden rounded-lg border border-gray-700 shadow-2xl">
      <Image
        src="/images/Me.jpg"
        alt="Mohammed Petiwala - Full Stack Developer"
        fill
        sizes="(max-width: 768px) 300px, 360px"
        className="object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement.innerHTML =
            '<div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"><span class="text-white text-6xl font-bold">MP</span></div>';
        }}
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
    </div>

    {/* プロフィール text - bigger, tighter, shifted up */}
    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-[65%]">
      <div className="transform rotate-[270deg] origin-center">
        <div className="text-white text-5xl lg:text-8xl font-extrabold tracking-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap">
          プロフィール
        </div>
      </div>
    </div>
  </div>
</div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
