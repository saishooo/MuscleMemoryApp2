// prisma/seed.ts
// DBのデータを作成する

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.exerciseCategory.createMany({
    data: [
      { name: "胸" },
      { name: "背中" },
      { name: "脚" },
      { name: "腕" },
      { name: "肩" },
      { name: "腹" },
    ],
    skipDuplicates: true,
  });

  console.log("seed完了");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
