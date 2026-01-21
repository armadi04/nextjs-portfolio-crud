"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface AchievementsSectionProps {
  achievements: any[];
}

export function AchievementsSection({
  achievements,
}: AchievementsSectionProps) {
  return (
    <section id="achievements" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I have Certificates of Appreciation from various Championships,
            including in the fields of marching, religion, class ranking,
            highest score in computer and network engineering and various other
            fields.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(achievements || portfolioData.achievements).map(
            (achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg hover:shadow-primary duration-500 transition-transform border-none bg-background/50 backdrop-blur-sm">
                  <div className="relative h-64 w-full bg-white dark:bg-black/5">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
