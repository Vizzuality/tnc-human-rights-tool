"use client";

import { PropsWithChildren } from "react";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function LayoutProviders({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
