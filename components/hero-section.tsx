"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  profile: any;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-primary font-semibold text-lg">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="text-gradient">
              {profile?.name || "Your Name"}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold mb-6 text-muted-foreground"
          >
            {profile?.tagline || "Full Stack Developer"}
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg font-normal md:text-xl mb-4 text-muted-foreground"
          >
            {profile?.bio || "Fast Learner | Team Work | Hard Worker"}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg mb-8 text-muted-foreground max-w-2xl mx-auto"
          >
            {(() => {
              const heroText =
                profile?.heroDescription ||
                "A growing full-stack developer passionate about modern web technologies and continuously learning and building modern web applications.";

              const maxLength = 200;
              return heroText.length > maxLength
                ? heroText.substring(0, maxLength) + "..."
                : heroText;
            })()}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
            whileHover={{ y: -2 }}
          >
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-out hover:scale-[1.04] hover:shadow-lg"
            >
              <a href="#projects" className="flex items-center gap-2">
                <span className="text-white">View My Work</span>
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2 text-white" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="group transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-[1.03]"
            >
              <a href="#contact" className="flex items-center gap-2">
                Get In Touch
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <div className="flex justify-center gap-4">
              {[
                { icon: Github, href: "https://github.com/yourusername" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/yourprofile",
                },
                {
                  icon: Mail,
                  href: `mailto:${
                    profile?.contact?.email ||
                    profile?.email ||
                    "your-email@example.com"
                  }`,
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-primary dark:hover:text-gray-800 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
