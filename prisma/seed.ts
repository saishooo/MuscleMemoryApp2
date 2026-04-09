// prisma/seed.ts
// DBのデータを作成する

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
  //ExerciseCategoryテーブルにデータ挿入
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

  const categories = await prisma.exerciseCategory.findMany();

  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  //Exerciseテーブルにデータ挿入
  await prisma.exercise.createMany({
    data: [
      { name: "ベンチプレス", categoryId: categoryMap["胸"] },
      { name: "インクラインベンチプレス", categoryId: categoryMap["胸"] },
      { name: "デクラインベンチプレス", categoryId: categoryMap["胸"] },
      { name: "ダンベルプレス", categoryId: categoryMap["胸"] },
      { name: "インクラインダンベルプレス", categoryId: categoryMap["胸"] },
      { name: "ダンベルフライ", categoryId: categoryMap["胸"] },
      { name: "インクラインダンベルフライ", categoryId: categoryMap["胸"] },
      { name: "ケーブルクロスオーバー", categoryId: categoryMap["胸"] },
      { name: "チェストプレス", categoryId: categoryMap["胸"] },
      { name: "ペックフライ", categoryId: categoryMap["胸"] },
      { name: "ディップス", categoryId: categoryMap["胸"] },
      { name: "プッシュアップ", categoryId: categoryMap["胸"] },

      { name: "ラットプルダウン", categoryId: categoryMap["背中"] },
      { name: "チンニング", categoryId: categoryMap["背中"] },
      { name: "懸垂", categoryId: categoryMap["背中"] },
      { name: "デッドリフト", categoryId: categoryMap["背中"] },
      { name: "ベントオーバーロウ", categoryId: categoryMap["背中"] },
      { name: "ワンハンドダンベルロウ", categoryId: categoryMap["背中"] },
      { name: "シーテッドロー", categoryId: categoryMap["背中"] },
      { name: "Tバーロウ", categoryId: categoryMap["背中"] },
      { name: "ケーブルローイング", categoryId: categoryMap["背中"] },
      { name: "ストレートアームプルダウン", categoryId: categoryMap["背中"] },
      { name: "バックエクステンション", categoryId: categoryMap["背中"] },
      { name: "シュラッグ", categoryId: categoryMap["背中"] },
      { name: "サイドリアレイズ", categoryId: categoryMap["背中"] },

      { name: "スクワット", categoryId: categoryMap["脚"] },
      { name: "フロントスクワット", categoryId: categoryMap["脚"] },
      { name: "レッグプレス", categoryId: categoryMap["脚"] },
      { name: "レッグカール", categoryId: categoryMap["脚"] },
      { name: "レッグエクステンション", categoryId: categoryMap["脚"] },
      { name: "ブルガリアンスクワット", categoryId: categoryMap["脚"] },
      { name: "ランジ", categoryId: categoryMap["脚"] },
      { name: "ヒップスラスト", categoryId: categoryMap["脚"] },
      { name: "ルーマニアンデッドリフト", categoryId: categoryMap["脚"] },
      { name: "カーフレイズ", categoryId: categoryMap["脚"] },
      { name: "シーテッドカーフレイズ", categoryId: categoryMap["脚"] },
      { name: "アダクション", categoryId: categoryMap["脚"] },
      { name: "アブダクション", categoryId: categoryMap["脚"] },

      { name: "バーベルカール", categoryId: categoryMap["腕"] },
      { name: "ダンベルカール", categoryId: categoryMap["腕"] },
      { name: "ハンマーカール", categoryId: categoryMap["腕"] },
      { name: "プリーチャーカール", categoryId: categoryMap["腕"] },
      { name: "ケーブルカール", categoryId: categoryMap["腕"] },
      { name: "コンセントレーションカール", categoryId: categoryMap["腕"] },
      { name: "トライセプスエクステンション", categoryId: categoryMap["腕"] },
      { name: "トライセプスプレスダウン", categoryId: categoryMap["腕"] },
      { name: "フレンチプレス", categoryId: categoryMap["腕"] },
      { name: "ナローベンチプレス", categoryId: categoryMap["腕"] },
      {
        name: "ライイングトライセプスエクステンション",
        categoryId: categoryMap["腕"],
      },
      { name: "リストカール", categoryId: categoryMap["腕"] },

      { name: "ショルダープレス", categoryId: categoryMap["肩"] },
      { name: "ダンベルショルダープレス", categoryId: categoryMap["肩"] },
      { name: "サイドレイズ", categoryId: categoryMap["肩"] },
      { name: "フロントレイズ", categoryId: categoryMap["肩"] },
      { name: "リアレイズ", categoryId: categoryMap["肩"] },
      { name: "アップライトロウ", categoryId: categoryMap["肩"] },
      { name: "アーノルドプレス", categoryId: categoryMap["肩"] },
      { name: "フェイスプル", categoryId: categoryMap["肩"] },
      { name: "リアデルトフライ", categoryId: categoryMap["肩"] },
      { name: "マシンショルダープレス", categoryId: categoryMap["肩"] },

      { name: "クランチ", categoryId: categoryMap["腹"] },
      { name: "レッグレイズ", categoryId: categoryMap["腹"] },
      { name: "シットアップ", categoryId: categoryMap["腹"] },
      { name: "プランク", categoryId: categoryMap["腹"] },
      { name: "サイドプランク", categoryId: categoryMap["腹"] },
      { name: "アブローラー", categoryId: categoryMap["腹"] },
      { name: "ハンギングレッグレイズ", categoryId: categoryMap["腹"] },
      { name: "ロシアンツイスト", categoryId: categoryMap["腹"] },
      { name: "バイシクルクランチ", categoryId: categoryMap["腹"] },
      { name: "ケーブルクランチ", categoryId: categoryMap["腹"] },
      { name: "リバースクランチ", categoryId: categoryMap["腹"] },
      { name: "Vアップ", categoryId: categoryMap["腹"] },
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
