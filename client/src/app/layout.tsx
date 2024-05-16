import type { Metadata } from "next";

import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LayoutProviders from "@/app/layout-providers";

import { Toaster } from "@/components/ui/toaster";

import { SpaceGrotesk } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Human Rights Screening Tool",
  description: "",
};

export default async function RootLayout({
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
