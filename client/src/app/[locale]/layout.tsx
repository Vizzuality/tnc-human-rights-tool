import type { Metadata } from "next";

import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import LayoutProviders from "@/app/[locale]/layout-providers";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { Toaster } from "@/components/ui/toaster";

import { SpaceGrotesk } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Human Rights Screening Tool",
  description: "",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <LayoutProviders session={session}>
      <html lang={locale} className={`${SpaceGrotesk.variable}`}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <Toaster />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </LayoutProviders>
  );
}
