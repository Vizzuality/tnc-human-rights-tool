import { PropsWithChildren } from "react";

interface ReportsLayoutProps extends PropsWithChildren {}

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="w-[210mm] overflow-hidden rounded-md bg-white">{children}</div>
    </div>
  );
}
