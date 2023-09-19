import type { Metadata } from "next";

import "@/styles/globals.css";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LayoutProviders from "@/app/layout-poviders";

import Header from "@/containers/header";
import ScrollUp from "@/containers/scroll-up";

import { SpaceGrotesk } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Human Rights Tool",
  description: "",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <LayoutProviders session={session}>
      <html lang="en" className={`${SpaceGrotesk.variable}`}>
        <body>
          <main className="flex min-h-screen flex-col">
            <Header />
            <ScrollUp />

            <section className="flex grow flex-col space-y-5 py-16">{children}</section>
          </main>
        </body>
      </html>
    </LayoutProviders>
  );
}
