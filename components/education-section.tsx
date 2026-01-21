"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";

interface EducationSectionProps {
  education: any[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="py-20 relative">
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
            <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and continuous learning path in the world of
            technology.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* LEFT AXIS - Always on left */}
          <div className="absolute inset-y-0 left-10">
            <motion.div
              style={{
                scaleY: lineScale,
                transformOrigin: "top",
              }}
              className="h-full w-[2px] bg-gradient-to-b from-primary to-purple-600"
            />
          </div>

          <div className="space-y-12">
            {(education || portfolioData.education).map((edu, index) => (
              <TimelineItem key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline Item */
/* ------------------------------------------------------------------ */

function TimelineItem({ edu, index }: any) {
  const itemRef = useRef(null);
  const isActive = useInView(itemRef, {
    margin: "-30% 0px -30% 0px",
  });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative flex justify-start"
    >
      {/* DOT – LEFT ALIGNED */}
      <div className="absolute left-4 top-6 z-10">
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
            <GraduationCap className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* CARD */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full ml-20 md:ml-24"
      >
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-xl">{edu.degree}</CardTitle>

              <p className="text-primary font-semibold">{edu.institution}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {edu.period}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {edu.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
