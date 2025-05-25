import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const MenuOverlay = ({ links, onLinkClick, onAboutClick, onProjectsClick, onInProgressClick }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink 
            href={link.path} 
            title={link.title} 
            onClick={
              link.title === "About" ? onAboutClick :
              link.title === "Projects" ? onProjectsClick :
              link.title === "In Progress" ? onInProgressClick :
              onLinkClick
            }
          />
        </li>
      ))}
      <li className="flex gap-4 mt-4">
        <Link href="https://github.com/PetiCodes">
          <Image src={GithubIcon} alt="Mohammed Petiwala Github" className="w-6 h-6" />
        </Link>
        <Link href="https://www.linkedin.com/in/mohdpeti">
          <Image src={LinkedinIcon} alt="Mohammed Petiwala LinkedIn" className="w-6 h-6" />
        </Link>
      </li>
    </ul>
  );
};

export default MenuOverlay;
