import { Metadata } from "next";

import Header from "@/containers/header";

export const metadata: Metadata = {
  title: "404 | Human Rights Screening Tool",
  description: "Generated by create next app",
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <section className="flex grow flex-col items-center justify-center space-y-5 py-24">
        <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <h1 className="text-4xl">404</h1>
        </div>
      </section>
    </main>
  );
}
