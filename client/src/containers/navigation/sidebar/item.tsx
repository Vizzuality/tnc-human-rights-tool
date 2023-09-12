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
        "block px-4 py-2 text-sm font-medium": true,
        "bg-gray-100 text-primary": pathname === props.href,
        "hover:bg-gray-50": pathname !== props.href,
      })}
    >
      {children}
    </Link>
  );
}
