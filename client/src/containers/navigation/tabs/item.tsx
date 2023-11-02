"use client";

import { PropsWithChildren } from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";

interface TabsNavigationItemProps extends LinkProps, PropsWithChildren {
  className?: string;
}

export default function TabsNavigationItem({
  children,
  className,
  ...props
}: TabsNavigationItemProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn({
        "flex flex-col items-center space-y-1": true,
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
      </Button>
    </Link>
  );
}
