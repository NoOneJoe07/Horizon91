// Corrige le nom de marque dans tous les articles Dojo Time
// "la Citadelle" → "Citadelle Jiu-Jitsu" partout
// node scripts/fix-brand-name.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function fixBrand(text) {
  return text
    .replace(/La Citadelle Jiu-Jitsu/g, "Citadelle Jiu-Jitsu") // évite les doublons
    .replace(/la Citadelle Jiu-Jitsu/g, "Citadelle Jiu-Jitsu")
    .replace(/La Citadelle(?! Jiu)/g, "Citadelle Jiu-Jitsu")
    .replace(/la Citadelle(?! Jiu)/g, "Citadelle Jiu-Jitsu")
    .replace(/de Citadelle Jiu-Jitsu(?!\s)/g, "de Citadelle Jiu-Jitsu")
    // Titres qui commencent par "La Citadelle"
    .replace(/^La Citadelle /gm, "Citadelle Jiu-Jitsu ");
}

async function main() {
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    const updated = await prisma.post.update({
      where: { id: post.id },
      data: {
        titleFr:   fixBrand(post.titleFr),
        titleEn:   post.titleEn,
        excerptFr: fixBrand(post.excerptFr),
        excerptEn: post.excerptEn,
        contentFr: fixBrand(post.contentFr),
        contentEn: post.contentEn,
      },
    });
    console.log(`✅ ${updated.slug}`);
  }

  console.log("\n✓ Tous les articles corrigés — Citadelle Jiu-Jitsu partout.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
