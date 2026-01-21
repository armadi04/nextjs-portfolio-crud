"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href.substring(1));
  };

  // Variants for mobile menu container
  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  // Variants for individual list items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-6xl bg-background/80 backdrop-blur-md border border-border/40 rounded-full shadow-lg px-2 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-extrabold text-gradient px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLinkClick("#home")}
        >
          Portfolio
        </motion.a>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center space-x-1 gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 rounded-full text-sm font-extrabold transition-colors hover:text-primary ${
                activeSection === item.href.substring(1)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick(item.href)}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute bottom-1.5 left-0 right-0 h-[2px] w-[60%] mx-auto bg-gradient-to-r from-primary to-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Right Side: Socials + Theme Toggle */}
        <div className="hidden md:flex items-center gap-2 px-2">
          {/* Github */}
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-primary/10 transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>

          {/* Linkedin */}
          <motion.a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-blue-600 bg-transparent hover:bg-primary/10 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>

          <div className="w-[1px] h-6 bg-border mx-1"></div>

          {/* Theme Toggle Wrapper */}
          <motion.div
            whileHover={{ scale: 1.12, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile Menu Button - Hamburger Animation */}
        <div className="md:hidden flex items-center gap-2 pr-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 rounded-full"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown - With Staggered Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/40 rounded-2xl shadow-xl p-4 md:hidden flex flex-col gap-2 overflow-hidden z-40"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                variants={itemVariants}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors text-center ${
                  activeSection === item.href.substring(1)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
                onClick={() => handleLinkClick(item.href)}
              >
                {item.name}
              </motion.a>
            ))}

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mt-4 py-4 border-t border-border/50"
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-full hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-full hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
