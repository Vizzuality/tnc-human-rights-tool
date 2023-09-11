"use client";

import { PropsWithChildren } from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavigationSidebarItemProps extends LinkProps, PropsWithChildren {}

export default function NavigationSidebarItem({ children, ...props }: NavigationSidebarItemProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn({
        "text-primary": pathname === props.href,
        "hover:text-gray-500": pathname !== props.href,
      })}
    >
      {children}
    </Link>
  );
}
