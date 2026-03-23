// lib/prisma.ts
//import { PrismaClient } from "@prisma/client/extension";    //非推奨らしい
import { PrismaClient } from "@prisma/client";    //推奨らいし
//import { PrismaClient } from "../generated/prisma/index.js";

export const prisma = new PrismaClient();
