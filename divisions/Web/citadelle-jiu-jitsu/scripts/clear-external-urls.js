// Retire le lien externalUrl de tous les articles Dojo Time
// node scripts/clear-external-urls.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.post.updateMany({
    where: { externalUrl: { not: null } },
    data:  { externalUrl: null },
  });
  console.log(`✅ ${result.count} article(s) mis à jour — externalUrl retiré`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
