"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";

// ============================================
// GET DATA (Existing)
// ============================================
export async function getPortfolioData() {
  try {
    const [profile, skills, experience, projects, education, achievements] =
      await Promise.all([
        prisma.profile.findFirst(),
        prisma.skill.findMany({ orderBy: { order: "asc" } }),
        prisma.experience.findMany({ orderBy: { order: "asc" } }),
        prisma.project.findMany({ orderBy: { order: "asc" } }),
        prisma.education.findMany({ orderBy: { order: "asc" } }),
        prisma.achievement.findMany({ orderBy: { order: "asc" } }),
      ]);

    const groupedSkills = {
      frontend: skills.filter((s) => s.category === "frontend"),
      backend: skills.filter((s) => s.category === "backend"),
      others: skills.filter((s) => s.category === "others"),
    };

    // Hack: Split bio to get heroDescription
    // Format: "Short Bio<!--SEPARATOR-->Hero Description"
    if (profile) {
      const parts = profile.bio.split("<!--SEPARATOR-->");
      (profile as any).bio = parts[0] || "";
      (profile as any).heroDescription = parts[1] || "";

      // Hack: Split about to get aboutImage
      const aboutParts = profile.about.split("<!--SEPARATOR-->");
      (profile as any).about = aboutParts[0] || "";
      (profile as any).aboutImage = aboutParts[1] || "";
    }

    return {
      profile,
      skills: groupedSkills,
      experience,
      projects,
      education,
      achievements,
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
}

// ============================================
// UPDATE PROFILE (Basic Info)
// ============================================
export async function updateProfile(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name: data.name,
          tagline: data.tagline,
          bio: `${data.bio}<!--SEPARATOR-->${data.heroDescription || ""}`,
          about: `${data.about}<!--SEPARATOR-->${data.aboutImage || ""}`,
          email: data.contact.email,
          whatsapp: data.contact.whatsapp,
          location: data.contact.location,
          yearsExperience: data.stats?.yearsExperience || "0",
          projectsCompleted: data.stats?.projectsCompleted || "0",
        },
      });
    } else {
      await prisma.profile.create({
        data: {
          name: data.name,
          tagline: data.tagline,
          bio: `${data.bio}<!--SEPARATOR-->${data.heroDescription || ""}`,
          about: `${data.about}<!--SEPARATOR-->${data.aboutImage || ""}`,
          email: data.contact.email,
          whatsapp: data.contact.whatsapp,
          location: data.contact.location,
          yearsExperience: data.stats?.yearsExperience || "0",
          projectsCompleted: data.stats?.projectsCompleted || "0",
        },
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update profile failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update profile",
    };
  }
}

// ============================================
// UPDATE SKILLS
// ============================================
export async function updateSkills(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.skill.deleteMany();

    const skillsToCreate = [
      ...data.frontend.map((s: any, i: number) => ({
        ...s,
        category: "frontend",
        order: i,
      })),
      ...data.backend.map((s: any, i: number) => ({
        ...s,
        category: "backend",
        order: i,
      })),
      ...data.others.map((s: any, i: number) => ({
        ...s,
        category: "others",
        order: i,
      })),
    ];

    if (skillsToCreate.length > 0) {
      await prisma.skill.createMany({ data: skillsToCreate });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update skills failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update skills",
    };
  }
}

// ============================================
// UPDATE EXPERIENCE
// ============================================
export async function updateExperience(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.experience.deleteMany();

    if (data.length > 0) {
      await prisma.experience.createMany({
        data: data.map((e: any, i: number) => ({
          title: e.title,
          company: e.company,
          period: e.period,
          description: Array.isArray(e.description)
            ? e.description.join("\n")
            : e.description,
          order: i,
        })),
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update experience failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update experience",
    };
  }
}

// ============================================
// UPDATE PROJECTS
// ============================================
export async function updateProjects(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.project.deleteMany();

    if (data.length > 0) {
      await prisma.project.createMany({
        data: data.map((p: any, i: number) => ({
          title: p.title,
          description: p.description,
          link: p.link,
          image: p.image,
          month: p.month,
          year: p.year,
          tags: Array.isArray(p.tags) ? JSON.stringify(p.tags) : p.tags,
          order: i,
        })),
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update projects failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update projects",
    };
  }
}

// ============================================
// UPDATE EDUCATION
// ============================================
export async function updateEducation(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.education.deleteMany();

    if (data.length > 0) {
      await prisma.education.createMany({
        data: data.map((e: any, i: number) => ({
          degree: e.degree,
          institution: e.institution,
          period: e.period,
          description: e.description,
          order: i,
        })),
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update education failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update education",
    };
  }
}

// ============================================
// UPDATE ACHIEVEMENTS
// ============================================
export async function updateAchievements(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.achievement.deleteMany();

    if (data.length > 0) {
      await prisma.achievement.createMany({
        data: data.map((a: any, i: number) => ({
          title: a.title,
          description: a.description,
          image: a.image,
          order: i,
        })),
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update achievements failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update achievements",
    };
  }
}

// ============================================
// UPDATE ALL (Bulk - for backward compatibility)
// ============================================
export async function updatePortfolioData(data: any) {
  try {
    // Update all sections sequentially
    await updateProfile(data);
    await updateSkills(data.skills);
    await updateExperience(data.experience);
    await updateProjects(data.projects);
    await updateEducation(data.education);
    await updateAchievements(data.achievements);

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Update all failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update portfolio",
    };
  }
}
