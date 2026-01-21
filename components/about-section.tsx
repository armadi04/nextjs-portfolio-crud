"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { portfolioData } from "@/data/portfolio";

interface AboutSectionProps {
  profile: any;
  stats: any;
}

export function AboutSection({ profile, stats }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-12" />

          <Card className="glass-effect border-2">
            <CardContent className="p-8">
              {/* Main Content: Text and Photo */}
              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8 items-start">
                {/* Left Column: Text Content + Stats */}
                <div className="space-y-8 order-2 md:order-1">
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="space-y-8 text-muted-foreground leading-relaxed mb-12"
                  >
                    {(profile?.about || portfolioData.about)
                      .split("\n\n")
                      .map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </motion.div>

                  {/* Stats Grid - 2 Columns */}
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 }}
                      className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {stats?.yearsExperience ||
                          portfolioData.stats.yearsExperience}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Years Experience
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 }}
                      className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {stats?.projectsCompleted ||
                          portfolioData.stats.projectsCompleted}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Projects Completed
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 }}
                      className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      <div className="text-3xl font-bold text-gradient mb-1">
                        ∞
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Learning Journey
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 }}
                      className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {portfolioData.achievements.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Awards Won
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column: Photo */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="order-1 md:order-2"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={profile?.aboutImage || "/profile-photo.jpg"}
                        alt="Profile Photo"
                        className="w-full h-full object-cover shadow-2xl transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                        {/* Center Content */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-lg">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {profile?.tagline || "Full Stack Developer"}
                          </h3>
                          <p className="text-gray-200 font-medium">
                            {stats?.yearsExperience || "1+"} year of experiences
                          </p>
                        </div>

                        {/* Bottom Info */}
                        <div className="flex justify-between items-end w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 drop-shadow-lg">
                          <div className="text-left">
                            <p className="text-xs text-gray-300 mb-1 uppercase tracking-wider font-medium">
                              Specialization
                            </p>
                            <p className="text-white font-semibold">
                              Web App Development
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-300 mb-1 uppercase tracking-wider font-medium">
                              Based in
                            </p>
                            <p className="text-white font-semibold">
                              {profile?.contact?.location || "Semarang, ID"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
