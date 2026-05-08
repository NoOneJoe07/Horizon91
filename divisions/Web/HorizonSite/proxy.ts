import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
