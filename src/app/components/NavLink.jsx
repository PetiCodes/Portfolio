"use client";
import { useRouter } from "next/navigation";

const NavLink = ({ href, title, onClick }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Close mobile menu if onClick handler is provided
    if (onClick) {
      onClick();
    }
    
    // Check if it's a hash link (internal section)
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Smooth scroll to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Update URL hash without page reload
        window.history.pushState(null, null, href);
      }
    } else {
      // For external links, use normal navigation
      router.push(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white cursor-pointer transition-colors duration-200"
    >
      {title}
    </a>
  );
};

export default NavLink;
