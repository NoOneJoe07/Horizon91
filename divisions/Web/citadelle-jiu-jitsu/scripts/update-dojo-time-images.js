// =============================================================================
// Script one-shot — Mettre à jour les imageUrl des articles Dojo Time
// -----------------------------------------------------------------------------
// Corrige les chemins imageUrl pour pointer vers les vrais noms de fichiers
// copiés dans public/images/dojo-time/ par Jonathan (mai 2026).
//
// Usage (depuis WSL, racine du projet) :
//   node scripts/update-dojo-time-images.js
// =============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      slug:     "east-coast-absolute-or-mai-2026",
      imageUrl: "/images/dojo-time/JS ECFS.jpg",
    },
    {
      slug:     "hub-grappling-double-or-mai-2026",
      imageUrl: "/images/dojo-time/JS_Hupfrapplng.png",
    },
    {
      slug:     "adcc-calgary-open-argent-avril-2026",
      imageUrl: "/images/dojo-time/JS_Max_Calgary.png",
    },
  ];

  for (const { slug, imageUrl } of updates) {
    const result = await prisma.post.updateMany({
      where: { slug },
      data:  { imageUrl },
    });
    if (result.count > 0) {
      console.log(`✅ ${slug} → ${imageUrl}`);
    } else {
      console.warn(`⚠️  Article introuvable : ${slug}`);
    }
  }

  console.log("Terminé.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
