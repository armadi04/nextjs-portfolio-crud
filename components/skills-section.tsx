"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { portfolioData } from "@/data/portfolio";

const skillIcons: Record<string, string> = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  redux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  nextjs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwind:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  mikrotik:
    "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mikrotik.svg",
  cisco:
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  supabase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  laravel:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  shadcn: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
  reacticons: "https://cdn.simpleicons.org/react",
  hugeicons: "https://avatars.githubusercontent.com/u/130147052?v=4",
  canva:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  capcut:
    "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/capcut.png",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  phpmyadmin:
    "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phpmyadmin-icon.png",
};

interface SkillsSectionProps {
  skills: any;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const renderSkillCategory = (
    title: string,
    skills: any[],
    delayOffset: number = 0
  ) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <span className="h-[2px] w-8 bg-primary/50"></span>
        {title}
        <span className="h-[2px] w-8 bg-primary/50"></span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + delayOffset }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="group cursor-pointer border-2 hover:border-primary transition-all h-full hover:rotate-12 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform h-12 w-12 flex items-center justify-center">
                  {skillIcons[skill.icon]?.startsWith("http") ? (
                    <img
                      src={skillIcons[skill.icon]}
                      alt={skill.name}
                      className={`w-full h-full object-contain ${
                        ["express", "shadcn", "github", "mikrotik"].includes(
                          skill.icon
                        )
                          ? "dark:invert"
                          : ""
                      } ${
                        skill.icon === "capcut" ? "invert dark:invert-0" : ""
                      } ${skill.icon === "phpmyadmin" ? "scale-[1.5]" : ""} ${
                        skill.icon === "hugeicons" ? "rounded-md" : ""
                      }`}
                    />
                  ) : (
                    skillIcons[skill.icon] || "💻"
                  )}
                </div>
                <h3 className="font-semibold text-sm md:text-base whitespace-nowrap">
                  {skill.name}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            I not only work with these technologies but excellent in using them
            with best practices to deliver high-quality results
          </p>

          {renderSkillCategory(
            "Frontend Development",
            skills?.frontend || portfolioData.skills.frontend,
            0
          )}
          {renderSkillCategory(
            "Backend Development",
            skills?.backend || portfolioData.skills.backend,
            0.2
          )}
          {renderSkillCategory(
            "Other Tools & Technologies",
            skills?.others || portfolioData.skills.others,
            0.4
          )}
        </motion.div>
      </div>
    </section>
  );
}
