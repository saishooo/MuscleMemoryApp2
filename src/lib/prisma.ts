// lib/prisma.ts
// PrismaClientを生成するファイル

//⚫︎PrismaClientはデータベースにアクセスするためのツール
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

//⚫︎global変数にprismaのプロパティを持たせる
//⚫︎型のキャストをしている。global型からunknwon型へ、unknown型からprisma:PrismaClient型へ変換
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export function getPrisma() {
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL); // 環境変数の有無だけ確認
  console.log("ENV:", process.env.DATABASE_URL); //環境変数を出力

  //DBにアドレスが入っていなければ終了
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL が設定されていません");
  }
  //⚫︎各ファイルごとで[ const prisma = new PrismaClient ]はインスタンスが増殖するためNG
  //⚫︎PrismaClientがない時だけインスタンスを生成し、増殖を防ぐ
  if (!globalForPrisma.prisma) {
    //DBに接続する方法を作成
    //adapter
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    //prismaにPrismaClientのインスタンスを生成
    //⚫︎DBを操作するためのAPIの生成
    globalForPrisma.prisma = new PrismaClient({
      adapter,
    });
  }
  return globalForPrisma.prisma;
}
