import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL_NEW!;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const baseTraining = await prisma.training.findFirst();

  if (!baseTraining) {
    throw new Error("Trainingデータが存在しません");
  }

  await prisma.training.createMany({
    data: [
      {
        sessionId: baseTraining.sessionId,
        exerciseId: baseTraining.exerciseId,
        weight: 398,
        reps: baseTraining.reps,
        createdAt: new Date("2026-06-18T14:30:00.000Z"), // JST 6/18 23:30
      },
      {
        sessionId: baseTraining.sessionId,
        exerciseId: baseTraining.exerciseId,
        weight: 299,
        reps: baseTraining.reps,
        createdAt: new Date("2026-06-18T15:30:00.000Z"), // JST 6/19 00:30
      },
      {
        sessionId: baseTraining.sessionId,
        exerciseId: baseTraining.exerciseId,
        weight: 199,
        reps: baseTraining.reps,
        createdAt: new Date("2026-06-19T14:30:00.000Z"), // JST 6/19 23:30
      },
      {
        sessionId: baseTraining.sessionId,
        exerciseId: baseTraining.exerciseId,
        weight: 10,
        reps: baseTraining.reps,
        createdAt: new Date("2026-06-19T15:30:00.000Z"), // JST 6/20 00:30
      },
    ],
  });

  console.log("テストデータ作成完了");
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
