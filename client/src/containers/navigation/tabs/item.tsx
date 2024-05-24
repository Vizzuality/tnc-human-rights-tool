"use client";

import { PropsWithChildren } from "react";

import { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { Locale } from "@/constants/navigation";

import { Button, ButtonProps } from "@/components/ui/button";

import { Link } from "@/i18n";

interface TabsNavigationItemProps extends LinkProps, PropsWithChildren {
  className?: string;
  slug: "pcb" | "contextual-risk" | "project-risk" | "follow-up";
  progress?: Record<"pcb" | "contextual-risk" | "project-risk" | "follow-up", number>;
}

export default function TabsNavigationItem({
  children,
  className,
  slug,
  progress,
  ...props
}: TabsNavigationItemProps) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const p = progress?.[slug] ?? 0;

  return (
    <Link
      {...props}
      locale={locale}
      className={cn({
        "relative flex flex-col items-center space-y-1": true,
        [`${className}`]: !!className,
      })}
    >
      <Button
        size="lg"
        variant={
          cn({
            default: pathname.includes(`${props.href}`),
            secondary: !pathname.includes(`${props.href}`),
          }) as ButtonProps["variant"]
        }
        className="h-20 w-full items-center justify-center py-0"
      >
        {children}

        <div
          className={cn({
            "pointer-events-none absolute left-0 top-0 z-0 h-full w-full bg-slate-400/10": true,
            "bg-slate-600/5": !pathname.includes(`${props.href}`),
            "bg-black/5": pathname.includes(`${props.href}`),
          })}
          style={{
            width: `${p * 100}%`,
            transition: "width 0.3s ease-in-out",
          }}
        />
      </Button>
    </Link>
  );
}
