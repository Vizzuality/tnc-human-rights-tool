import type { Metadata } from "next";

import "@/styles/globals.css";

import BackToTop from "@/containers/back-to-top";
import Header from "@/containers/header";

export const metadata: Metadata = {
  title: "Human Rights Screening Tool",
  description: "",
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <BackToTop />

      <section className="flex grow flex-col space-y-5 py-16">{children}</section>
    </main>
  );
}
