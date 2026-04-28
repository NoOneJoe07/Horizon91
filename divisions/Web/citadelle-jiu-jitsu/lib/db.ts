// =============================================================================
// Client Prisma — instance unique réutilisée
// -----------------------------------------------------------------------------
// En dev : Next.js fait du hot-reload qui recrée le client à chaque save.
// Pour éviter de saturer Postgres avec des connexions, on stocke le client
// dans globalThis pendant le dev.
// =============================================================================

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
