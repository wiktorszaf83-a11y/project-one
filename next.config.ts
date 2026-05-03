import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Tutaj znajdą się Twoje ewentualne przyszłe ustawienia Next.js
};

export default withNextIntl(nextConfig);
