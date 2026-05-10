#!/bin/bash
# =============================================================================
# sync-citadelle.sh — Sync OneDrive → WSL (Citadelle Jiu-Jitsu)
# =============================================================================
# Usage (depuis WSL) :
#   bash sync-citadelle.sh          → sync + redémarre le dev server
#   bash sync-citadelle.sh --no-dev → sync seulement (sans npm run dev)
#
# À lancer après chaque session Cowork qui a modifié des fichiers.
# =============================================================================

SRC="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu"
DEST="$HOME/Horizon91/divisions/Web/citadelle-jiu-jitsu"

echo "🥋 Sync Citadelle Jiu-Jitsu : OneDrive → WSL"
echo "   SRC  : $SRC"
echo "   DEST : $DEST"
echo ""

# ── Fichiers racine ────────────────────────────────────────────────────────────
echo "📄 Fichiers racine..."
for f in \
  next.config.ts \
  proxy.ts \
  tsconfig.json \
  postcss.config.mjs \
  eslint.config.mjs \
  package.json
do
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$DEST/$f" && echo "   ✓ $f"
  fi
done

# ── Dossiers complets (rsync récursif) ────────────────────────────────────────
echo ""
echo "📁 Dossiers..."
for dir in app components lib i18n messages prisma public scripts; do
  if [ -d "$SRC/$dir" ]; then
    rsync -a --delete "$SRC/$dir/" "$DEST/$dir/" && echo "   ✓ $dir/"
  fi
done

# ── Nettoyage — fichiers obsolètes ────────────────────────────────────────────
# middleware.ts remplacé par proxy.ts en Next.js 16 — supprimer s'il traîne
if [ -f "$DEST/middleware.ts" ]; then
  rm "$DEST/middleware.ts" && echo "   🗑  middleware.ts supprimé (obsolète)"
fi

echo ""
echo "✅ Sync terminé."

# ── Dev server ────────────────────────────────────────────────────────────────
if [ "$1" != "--no-dev" ]; then
  echo ""
  echo "🚀 Redémarrage du dev server..."
  cd "$DEST"
  rm -rf .next
  npm run dev
fi
