"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export async function updateProjectOrder(
  items: { id: string; order: number }[]
) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.$transaction(
      items.map((item) =>
        prisma.project.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update order" };
  }
}

export async function deleteProject(id: string) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.project.delete({ where: { id } });
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to delete" };
  }
}

export async function createProject(data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        month: data.month,
        year: data.year,
        tags: Array.isArray(data.tags)
          ? JSON.stringify(data.tags)
          : data.tags || "[]",
        order: 999, // Put at end
      },
    });
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) throw new Error("Unauthorized");
    await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        month: data.month,
        year: data.year,
        tags: Array.isArray(data.tags)
          ? JSON.stringify(data.tags)
          : data.tags || "[]",
      },
    });
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update project" };
  }
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({ where: { id } });
}
