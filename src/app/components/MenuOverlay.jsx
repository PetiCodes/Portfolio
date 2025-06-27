import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const MenuOverlay = ({ links, onLinkClick, onAboutClick, onProjectsClick, onInProgressClick, onExperienceClick }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            onClick={() => {
              onLinkClick();
              if (link.title === "About") onAboutClick();
              if (link.title === "Experience") onExperienceClick();
              if (link.title === "Projects") onProjectsClick();
              if (link.title === "In Progress") onInProgressClick();
            }}
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
