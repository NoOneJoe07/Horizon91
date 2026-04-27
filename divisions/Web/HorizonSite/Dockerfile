# ---- Étape de build ----
FROM node:20-alpine AS builder

# Création du répertoire de travail
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie du code et build
COPY . .
RUN npm run build

# ---- Étape de production ----
FROM node:20-alpine
WORKDIR /app

# Copier uniquement le build final et dépendances nécessaires
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]

