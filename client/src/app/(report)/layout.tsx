import { PropsWithChildren } from "react";

interface ReportsLayoutProps extends PropsWithChildren {}

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  return <>{children}</>;
}
