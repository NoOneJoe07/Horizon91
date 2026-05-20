// Met à jour les imageUrl manquants dans les articles de compétition
// node scripts/fix-image-urls.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      slug:     "east-coast-absolute-or-mai-2026",
      imageUrl: "/images/dojo-time/east-coast-absolute-mai-2026.jpg",
    },
    {
      slug:     "hub-grappling-double-or-mai-2026",
      imageUrl: "/images/dojo-time/hub-grappling-mai-2026.jpg",
    },
    {
      slug:     "adcc-calgary-open-argent-avril-2026",
      imageUrl: "/images/dojo-time/calgary-open-avril-2026.jpg",
    },
  ];

  for (const { slug, imageUrl } of updates) {
    const r = await prisma.post.updateMany({ where: { slug }, data: { imageUrl } });
    console.log(`✅ ${slug} → imageUrl ${r.count ? "mis à jour" : "introuvable"}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
