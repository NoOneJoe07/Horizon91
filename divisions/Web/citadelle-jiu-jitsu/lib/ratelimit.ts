// =============================================================================
// lib/ratelimit.ts — Rate limiting via Upstash Redis
// -----------------------------------------------------------------------------
// Protège les endpoints sensibles (login, inscription) contre le brute force.
// Utilise @upstash/ratelimit + @upstash/redis pour Vercel Edge.
//
// Limites :
//   login → 5 tentatives / 15 minutes par IP
//   register → 3 créations / heure par IP
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

export type RatelimitResult =
  | { success: true }
  | { success: false; retryAfter: number };

async function check(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<RatelimitResult> {
  if (!limiter) return { success: true };

  const { success, reset } = await limiter.limit(identifier);
  if (success) return { success: true };

  const retryAfter = Math.ceil((reset - Date.now()) / 1000);
  return { success: false, retryAfter };
}

export async function checkLoginRateLimit(ip: string): Promise<RatelimitResult> {
  return check(loginLimiter, `login:${ip}`);
}

export async function checkRegisterRateLimit(ip: string): Promise<RatelimitResult> {
  return check(registerLimiter, `register:${ip}`);
}
