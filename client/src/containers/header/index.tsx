"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

import { AXIOS_SIGNOUT } from "@/services/api";

export default function Header() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const t = useTranslations();

  return (
    <header
      className={cn({
        "border-b border-gray-200 bg-white py-4": true,
        hidden: searchParams.get("format") === "pdf",
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
            <h1>{t("human_rights_screening_tool")}</h1>
          </Link>

          <nav className="flex items-center space-x-5">
            {!!session && (
              <Link href="/projects">
                <Button variant="link">{t("my_projects")}</Button>
              </Link>
            )}

            <Link href="/glossary">
              <Button variant="link">{t("glossary")}</Button>
            </Link>

            <Link href="/faqs">
              <Button variant="link">{t("faqs")}</Button>
            </Link>

            <Link href="/other-tools">
              <Button variant="link">{t("other_tools")}</Button>
            </Link>

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
              <Link href="/auth/signin">
                <Button>{t("login")}</Button>
              </Link>
            )}
          </nav>
        </div>
      </Wrapper>
    </header>
  );
}
