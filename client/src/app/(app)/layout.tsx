import type { Metadata } from "next";

import "@/styles/globals.css";

import Header from "@/containers/header";
import ScrollUp from "@/containers/scroll-up";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Human Rights Tool",
  description: "",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <ScrollUp />
      <Toaster />

      <section className="flex grow flex-col space-y-5 py-16">{children}</section>
    </main>
  );
}
