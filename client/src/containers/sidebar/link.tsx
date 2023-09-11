"use client";

import { PropsWithChildren } from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarLinkProps extends LinkProps, PropsWithChildren {}

export default function SidebarLink({ children, ...props }: SidebarLinkProps) {
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
