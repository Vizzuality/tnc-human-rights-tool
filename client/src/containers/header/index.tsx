"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

import { AXIOS_SIGNOUT } from "@/services/api";

export default function Header() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

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
            <h1>Human Rights Screening Tool</h1>
          </Link>

          <nav className="flex items-center space-x-5">
            {!!session && (
              <Link href="/projects">
                <Button variant="link">My Projects</Button>
              </Link>
            )}

            <Link href="/glossary">
              <Button variant="link">Glossary</Button>
            </Link>

            <Link href="/faqs">
              <Button variant="link">FAQs</Button>
            </Link>

            <Link href="/other-tools">
              <Button variant="link">Other Tools</Button>
            </Link>

            {!!session && (
              <Button
                variant="outline"
                onClick={() => {
                  AXIOS_SIGNOUT();
                }}
              >
                Logout
              </Button>
            )}

            {!session && (
              <Link href="/auth/signin">
                <Button>Sign in</Button>
              </Link>
            )}
          </nav>
        </div>
      </Wrapper>
    </header>
  );
}
