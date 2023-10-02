import { PropsWithChildren } from "react";

import Header from "@/containers/header";

interface ReportsLayoutProps extends PropsWithChildren {}

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
