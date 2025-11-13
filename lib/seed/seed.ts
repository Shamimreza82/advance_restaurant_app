import { prisma } from "../prisma";



export const main = async () => {
  // Seed function content

 console.log("🌱 Seeding database...");

  const existingTables = await prisma.table.findMany();
  if (existingTables.length > 0) {
    console.log("✅ Tables already exist. Skipping seeding.");
    return;
  }

  // --- 1️⃣ Create Tables ---
  const tables = await prisma.table.createMany({
    data: [
      { name: "Table 1", capacity: 2 },
      { name: "Table 2", capacity: 4 },
      { name: "Table 3", capacity: 4 },
      { name: "Table 4", capacity: 6 },
      { name: "VIP Booth", capacity: 8 },
      { name: "VIP Booth 2", capacity: 1 },
    ],
  });

  console.log("✅ Tables created!");
}

// Run the seed function
main()
  .then(() => {
    console.log("🌿 Seeding completed.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });