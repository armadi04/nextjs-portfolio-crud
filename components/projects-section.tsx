"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Calendar } from "lucide-react";

interface Project {
  id?: string;
  title: string | null;
  month: string | null;
  year: string | null;
  link: string | null;
  description: string | null;
  image?: string | null;
  tags?: string | string[] | null; // string[] (static) or JSON string (DB)
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            I have worked on a variety of web development projects, ranging from
            responsive websites for small businesses to full-stack applications
            and complex front-end interfaces.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => {
              // Parse tags if string, or use as is if array (legacy/fallback)
              let tags: string[] = [];
              try {
                if (typeof project.tags === "string") {
                  tags = JSON.parse(project.tags);
                } else if (Array.isArray(project.tags)) {
                  tags = project.tags;
                }
              } catch (e) {
                tags = [];
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-2 hover:border-primary transition-all group flex flex-col overflow-hidden hover:shadow-xl hover:shadow-primary">
                    {/* Project Image */}
                    {project.image && (
                      <div className="w-full aspect-video overflow-hidden border-b">
                        <img
                          src={project.image || ""}
                          alt={project.title || "Project Image"}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <CardHeader className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          <Calendar className="h-3 w-3" />
                          {project.month || "Unknown"} {project.year || ""}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {project.title || "Untitled Project"}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mb-4">
                        {project.description || "No description available."}
                      </CardDescription>

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0 mt-auto">
                      <Button className="w-full group/btn" asChild>
                        <a
                          href={project.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <span>View Live Project</span>
                          <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
