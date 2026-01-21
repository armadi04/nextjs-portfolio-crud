"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar, BookOpen } from "lucide-react";

interface ExperienceSectionProps {
  experience: any[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With {portfolioData.stats.yearsExperience}+ year of experience
            building real-world web applications and learning by doing.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* CENTER AXIS */}
          <div className="absolute inset-y-0 left-10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{
                scaleY: lineScale,
                transformOrigin: "top",
              }}
              className="h-full w-[2px] bg-gradient-to-b from-primary to-purple-600"
            />
          </div>

          <div className="space-y-16">
            {(experience || portfolioData.experience).map((exp, index) => {
              // Handle description being either string (from DB) or array (from static)
              const description = Array.isArray(exp.description)
                ? exp.description
                : typeof exp.description === "string"
                ? exp.description.split("\n")
                : [];

              return (
                <TimelineItem
                  key={index}
                  exp={{ ...exp, description }}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline Item */
/* ------------------------------------------------------------------ */

function TimelineItem({ exp, index }: any) {
  const itemRef = useRef(null);
  const isActive = useInView(itemRef, {
    margin: "-30% 0px -30% 0px",
  });

  const isLeft = index % 2 === 0;
  const isStudy = exp.title.toLowerCase().includes("study");

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`relative flex ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* DOT – PERFECT CENTER */}
      <div className="absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          {/* Pulse */}
          <motion.div
            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="flex h-12 w-12 items-center justify-center
                                   rounded-full bg-background border-2
                                   border-primary shadow-md"
          >
            {isStudy ? (
              <BookOpen className="h-5 w-5 text-primary" />
            ) : (
              <Briefcase className="h-5 w-5 text-primary" />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* CARD */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${
          isLeft ? "md:mr-16" : "md:ml-16"
        }`}
      >
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-xl">{exp.title}</CardTitle>

              <p className="text-primary font-semibold">{exp.company}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {exp.period}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              {exp.description.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="text-primary mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
