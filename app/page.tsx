import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { portfolioData } from "@/data/portfolio";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { AchievementsSection } from "@/components/achievements-section";
import { getPortfolioData } from "@/actions/portfolio";

// Force dynamic rendering to always fetch fresh data from database
export const dynamic = "force-dynamic";

export default async function Home() {
  const dbData = await getPortfolioData();

  // Debug: Log when frontend fetches data
  console.log("RENDER FRONTEND - Fetching from database");

  // Use DB data if available, otherwise use static fallback
  const profile = dbData?.profile || {
    name: portfolioData.name,
    tagline: portfolioData.tagline,
    bio: portfolioData.bio,
    heroDescription: "",
    about: portfolioData.about,
    stats: portfolioData.stats,
    social: [], // Social links not yet in DB schema, defaulting to empty or hardcoded in component
    contact: portfolioData.contact,
  };

  const skills = dbData?.skills || portfolioData.skills;
  const experience = dbData?.experience || portfolioData.experience;
  const projects = dbData?.projects || portfolioData.projects;
  const education = dbData?.education || portfolioData.education;
  const achievements = dbData?.achievements || portfolioData.achievements;

  // Create stats object from profile fields if available
  const stats = dbData?.profile
    ? {
        yearsExperience: dbData.profile.yearsExperience,
        projectsCompleted: dbData.profile.projectsCompleted,
      }
    : portfolioData.stats;

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} stats={stats} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <AchievementsSection achievements={achievements} />
      <EducationSection education={education} />
      <ContactSection
        contact={
          dbData?.profile
            ? {
                email: dbData.profile.email,
                whatsapp: dbData.profile.whatsapp,
                location: dbData.profile.location,
              }
            : portfolioData.contact
        }
      />
      <Footer />
    </main>
  );
}
