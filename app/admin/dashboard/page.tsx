"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { LogOut, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getPortfolioData } from "@/actions/portfolio";
import { HeroTab } from "@/components/admin/hero-tab";
import { AboutTab } from "@/components/admin/about-tab";
import { SkillsTab } from "@/components/admin/skills-tab";
import { ExperienceTab } from "@/components/admin/experience-tab";
import { ProjectsTab } from "@/components/admin/projects-tab";
import { EducationTab } from "@/components/admin/education-tab";
import { AchievementsTab } from "@/components/admin/achievements-tab";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [dbData, setDbData] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [router]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  const fetchData = async () => {
    const data = await getPortfolioData();
    if (data) {
      setDbData(data);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "achievements", label: "Achievements" },
  ];

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (!dbData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Prepare data for each tab
  const heroData = {
    name: dbData.profile?.name || portfolioData.name,
    tagline: dbData.profile?.tagline || portfolioData.tagline,
    bio: dbData.profile?.bio || portfolioData.bio,
    heroDescription:
      dbData.profile?.heroDescription ||
      "A growing full-stack developer passionate about modern web technologies and continuously learning and building modern web applications.",
    contact: {
      email: dbData.profile?.email || portfolioData.contact.email,
      whatsapp: dbData.profile?.whatsapp || portfolioData.contact.whatsapp,
      location: dbData.profile?.location || portfolioData.contact.location,
    },
    stats: {
      yearsExperience:
        dbData.profile?.yearsExperience || portfolioData.stats.yearsExperience,
      projectsCompleted:
        dbData.profile?.projectsCompleted ||
        portfolioData.stats.projectsCompleted,
    },
    about: dbData.profile?.about || portfolioData.about,
  };

  const aboutData = {
    about: dbData.profile?.about || portfolioData.about,
    stats: {
      yearsExperience:
        dbData.profile?.yearsExperience || portfolioData.stats.yearsExperience,
      projectsCompleted:
        dbData.profile?.projectsCompleted ||
        portfolioData.stats.projectsCompleted,
    },
    // Keep other fields for server action compatibility
    name: dbData.profile?.name || portfolioData.name,
    tagline: dbData.profile?.tagline || portfolioData.tagline,
    bio: dbData.profile?.bio || portfolioData.bio,
    contact: {
      email: dbData.profile?.email || portfolioData.contact.email,
      whatsapp: dbData.profile?.whatsapp || portfolioData.contact.whatsapp,
      location: dbData.profile?.location || portfolioData.contact.location,
    },
  };

  const skillsData = dbData.skills || portfolioData.skills;

  const experienceData =
    dbData.experience?.map((e: any) => ({
      ...e,
      description: Array.isArray(e.description)
        ? e.description
        : e.description?.split("\n") || [],
    })) || portfolioData.experience;

  const projectsData =
    dbData.projects?.map((p: any) => ({
      ...p,
      tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags || [],
    })) || portfolioData.projects;

  const educationData = dbData.education || portfolioData.education;

  const achievementsData =
    dbData.achievements?.map((a: any) => ({
      ...a,
      image: a.image || "",
    })) || portfolioData.achievements;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "hero" && <HeroTab initialData={heroData} />}
          {activeTab === "about" && <AboutTab initialData={aboutData} />}
          {activeTab === "skills" && <SkillsTab initialData={skillsData} />}
          {activeTab === "experience" && (
            <ExperienceTab initialData={experienceData} />
          )}
          {activeTab === "projects" && (
            <ProjectsTab initialData={projectsData} />
          )}
          {activeTab === "education" && (
            <EducationTab initialData={educationData} />
          )}
          {activeTab === "achievements" && (
            <AchievementsTab initialData={achievementsData} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
