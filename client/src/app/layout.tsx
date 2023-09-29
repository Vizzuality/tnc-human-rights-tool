import type { Metadata } from "next";

import "@/styles/globals.css";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LayoutProviders from "@/app/layout-providers";

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
        <body>{children}</body>
      </html>
    </LayoutProviders>
  );
}
