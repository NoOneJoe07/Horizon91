# =============================================================================
# Dockerfile — Citadelle Jiu-Jitsu (Next.js standalone)
# -----------------------------------------------------------------------------
# Multi-stage build pour image finale légère (~150MB).
# Compatible avec docker-compose dans ~/Horizon91/core/
# =============================================================================

# --- Stage 1 : dependencies --------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --ignore-scripts

# --- Stage 2 : build ---------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 3 : runtime -------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Utilisateur non-root pour sécurité
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# Démarre Next.js en mode production
CMD ["npm", "run", "start"]
