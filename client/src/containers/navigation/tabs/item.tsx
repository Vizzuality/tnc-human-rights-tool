"use client";

import { PropsWithChildren } from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";

interface TabsNavigationItemProps extends LinkProps, PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

export default function TabsNavigationItem({
  children,
  className,
  disabled,
  ...props
}: TabsNavigationItemProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn({
        "flex flex-col items-center space-y-1": true,
        [`${className}`]: !!className,
        "pointer-events-none": disabled,
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
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  );
}
