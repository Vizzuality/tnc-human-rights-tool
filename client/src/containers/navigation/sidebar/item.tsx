"use client";

import { PropsWithChildren } from "react";

import { LinkProps } from "next/link";

import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { Locale } from "@/constants/navigation";

import { Link, usePathname } from "@/i18n";

interface NavigationSidebarItemProps extends LinkProps, PropsWithChildren {
  className?: string;
}

export default function NavigationSidebarItem({
  children,
  className,
  ...props
}: NavigationSidebarItemProps) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  return (
    <Link
      {...props}
      locale={locale}
      className={cn({
        "relative flex items-center space-x-2 px-4 py-2 text-sm font-medium": true,
        "bg-gray-100 text-primary": pathname === props.href,
        "hover:bg-gray-50": pathname !== props.href,
        [`${className}`]: !!className,
      })}
    >
      {children}
    </Link>
  );
}
