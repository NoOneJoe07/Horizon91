// =============================================================================
// lib/ratelimit.ts — Rate limiting via Upstash Redis
// -----------------------------------------------------------------------------
// Protège les endpoints sensibles contre le brute force et le spam.
// Utilise @upstash/ratelimit + @upstash/redis pour Vercel Edge.
//
// Limites :
//   login    → 5 tentatives / 15 minutes par IP
//   register → 3 créations / heure par IP
//   contact  → 5 messages / heure par IP (anti-spam formulaire)
//   trial    → 3 demandes / heure par IP
//
// En développement (sans UPSTASH_REDIS_REST_URL) : rate limiting désactivé
// silencieusement → toujours { success: true }.
// =============================================================================

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function makeRatelimiter(tokens: number, windowSeconds: number) {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Dev sans Redis → pas de rate limiting
    return null;
  }

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(tokens, `${windowSeconds}s`),
    analytics: true,
    prefix: "citadelle",
  });
}

// 5 tentatives login / 15 minutes par IP
const loginLimiter = makeRatelimiter(5, 60 * 15);

// 3 inscriptions / heure par IP
const registerLimiter = makeRatelimiter(3, 60 * 60);

// 5 messages contact / heure par IP — anti-spam formulaire public
const contactLimiter = makeRatelimiter(5, 60 * 60);

// 3 demandes de séance d'essai / heure par IP
const trialLimiter = makeRatelimiter(3, 60 * 60);

export type RatelimitResult =
  | { success: true }
  | { success: false; retryAfter: number };

async function check(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<RatelimitResult> {
  if (!limiter) return { success: true };

  try {
    const { success, reset } = await limiter.limit(identifier);
    if (success) return { success: true };
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return { success: false, retryAfter };
  } catch {
    // Redis inaccessible (dev sans Upstash configuré) → pas de blocage
    return { success: true };
  }
}

export async function checkLoginRateLimit(ip: string): Promise<RatelimitResult> {
  return check(loginLimiter, `login:${ip}`);
}

export async function checkRegisterRateLimit(ip: string): Promise<RatelimitResult> {
  return check(registerLimiter, `register:${ip}`);
}

export async function checkContactRateLimit(ip: string): Promise<RatelimitResult> {
  return check(contactLimiter, `contact:${ip}`);
}

export async function checkTrialRateLimit(ip: string): Promise<RatelimitResult> {
  return check(trialLimiter, `trial:${ip}`);
}
