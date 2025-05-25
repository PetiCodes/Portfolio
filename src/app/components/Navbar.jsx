"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import { useAnimation } from "../context/AnimationContext";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "In Progress",
    path: "#in-progress",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { resetAboutMeAnimation, resetProjectsAnimation, resetInProgressAnimation } = useAnimation();

  const handleAboutClick = () => {
    resetAboutMeAnimation();
    setNavbarOpen(false);
  };

  const handleProjectsClick = () => {
    resetProjectsAnimation();
    setNavbarOpen(false);
  };

  const handleInProgressClick = () => {
    resetInProgressAnimation();
    setNavbarOpen(false);
  };

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <img src="/images/logo.png" alt="Logo" className="h-8 md:h-12" />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 items-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink 
                  href={link.path} 
                  title={link.title}
                  onClick={
                    link.title === "About" ? handleAboutClick :
                    link.title === "Projects" ? handleProjectsClick :
                    link.title === "In Progress" ? handleInProgressClick :
                    undefined
                  }
                />
              </li>
            ))}
            <li className="flex gap-4 ml-4">
              <Link href="https://github.com/PetiCodes">
                <Image src={GithubIcon} alt="Mohammed Petiwala Github" className="w-6 h-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/mohdpeti">
                <Image src={LinkedinIcon} alt="Mohammed Petiwala LinkedIn" className="w-6 h-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} onLinkClick={() => setNavbarOpen(false)} onAboutClick={handleAboutClick} onProjectsClick={handleProjectsClick} onInProgressClick={handleInProgressClick} /> : null}
    </nav>
  );
};

export default Navbar;
