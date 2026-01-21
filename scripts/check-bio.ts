import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const profile = await prisma.profile.findFirst();
  console.log("Raw Bio:", JSON.stringify(profile?.bio));
}
main();
