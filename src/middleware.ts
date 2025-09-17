import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/core/i18n/config";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle internationalization first
  const intlResponse = intlMiddleware(request);

  // Extract locale from pathname
  const locale = pathname.split("/")[1];
  const isValidLocale = routing.locales.includes(locale as any);
  const pathWithoutLocale = isValidLocale
    ? pathname.slice(locale.length + 1)
    : pathname;

  // Only check authentication for admin routes
  if (pathWithoutLocale.startsWith("/admin")) {
    try {
      const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
          baseURL: request.nextUrl.origin,
          headers: {
            cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
          },
        }
      );

      if (!session) {
        // Redirect to sign-in page with locale and callback URL
        const signInUrl = new URL(
          isValidLocale ? `/${locale}/sign-in` : "/sign-in",
          request.url
        );
        // Add the current path (including search params) as callback - use relative path for multi-language support
        const callbackPath = pathname + request.nextUrl.search;
        signInUrl.searchParams.set("callbackUrl", callbackPath);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      // If session validation fails, redirect to sign-in
      const signInUrl = new URL(
        isValidLocale ? `/${locale}/sign-in` : "/sign-in",
        request.url
      );
      // Add the current path (including search params) as callback - use relative path for multi-language support
      const callbackPath = pathname + request.nextUrl.search;
      signInUrl.searchParams.set("callbackUrl", callbackPath);
      return NextResponse.redirect(signInUrl);
    }
  }

  // For all other routes (including /, /sign-in, /sign-up, /sign-out), just return the intl response
  return intlResponse;
}

export const config = {
  matcher:
    "/((?!api|trpc|_next|_vercel|privacy-policy|terms-of-service|.*\\..*).*)",
};
