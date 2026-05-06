import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;

  setRequestLocale(resolvedParams.lang);

  const messages = await getMessages({ locale: resolvedParams.lang });

  return (
    <html lang={resolvedParams.lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="mx-auto max-w-420 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
