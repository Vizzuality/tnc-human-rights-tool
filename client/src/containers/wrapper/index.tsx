"use client";

import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-7xl">{children}</div>;
}
