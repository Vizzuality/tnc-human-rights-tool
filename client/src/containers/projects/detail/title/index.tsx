import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export default function ProjectsDetailTitle({ children }: PropsWithChildren) {
  return (
    <h1
      className={cn({
        "sticky left-0 top-0 space-y-5 bg-white py-5 text-3xl": true,
        "after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-2.5 after:bg-gradient-to-b after:from-white after:to-white/0":
          true,
      })}
    >
      {children}
    </h1>
  );
}
