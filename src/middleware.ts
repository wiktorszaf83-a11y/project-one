import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pl", "en"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
