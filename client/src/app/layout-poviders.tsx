"use client";

import { PropsWithChildren } from "react";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function LayoutProviders({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
