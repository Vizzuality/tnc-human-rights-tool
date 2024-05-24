"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Locale } from "@/constants/navigation";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter, usePathname, Link } from "@/i18n";

import { AXIOS_SIGNOUT } from "@/services/api";

export default function Header() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const pathname = usePathname();
  const router = useRouter();

  const onLanguageChange = (locale: Locale) => {
    router.push(pathname, { locale });
  };

  return (
    <header
      className={cn({
        "border-b border-gray-200 bg-white py-4": true,
        hidden: searchParams.get("format") === "pdf",
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link locale={locale} href="/" className="flex items-center space-x-2.5">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
            <h1>{t("human_rights_screening_tool")}</h1>
          </Link>

          <nav className="flex items-center space-x-5">
            {!!session && (
              <Link locale={locale} href="/projects">
                <Button variant="link">{t("my_projects")}</Button>
              </Link>
            )}

            <Link locale={locale} href="/glossary">
              <Button variant="link">{t("glossary")}</Button>
            </Link>

            <Link locale={locale} href="/faqs">
              <Button variant="link">{t("faqs")}</Button>
            </Link>

            <Link locale={locale} href="/other-tools">
              <Button variant="link">{t("other_tools")}</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="items-center space-x-1">
                  <span>Language</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLanguageChange("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("es")}>Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("pt")}>
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!!session && (
              <Button
                variant="outline"
                onClick={() => {
                  AXIOS_SIGNOUT();
                }}
              >
                {t("logout")}
              </Button>
            )}

            {!session && (
              <Link locale={locale} href="/auth/signin">
                <Button>{t("login")}</Button>
              </Link>
            )}
          </nav>
        </div>
      </Wrapper>
    </header>
  );
}
