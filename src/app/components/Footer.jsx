"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white"
    >
      <div className="container p-12 flex justify-between">
        <span>MP \[^-^]/</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
