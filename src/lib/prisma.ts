// lib/prisma.ts
// PrismaClientを生成するファイル

//⚫︎PrismaClientはデータベースにアクセスするためのツール
import { PrismaClient } from "@prisma/client";

//⚫︎global変数にprismaのプロパティを持たせる
//⚫︎型のキャストをしている。global型からunknwon型へ、unknown型からprisma:PrismaClient型へ変換
const globalForPrisma = global as unknown as { prisma: PrismaClient }


export function getPrisma() {
    //⚫︎各ファイルごとで[ const prisma = new PrismaClient ]はインスタンスが増殖するためNG
    //⚫︎PrismaClientがない時だけインスタンスを生成し、増殖を防ぐ
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient()
    }
  return globalForPrisma.prisma
}
