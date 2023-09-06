"use client";

import Image from "next/image";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
            <h1>Human rights toolset</h1>
          </Link>

          <nav className="flex items-center space-x-5">
            {!!session && (
              <Link href="/projects">
                <Button variant="secondary">My Projects</Button>
              </Link>
            )}

            {!!session && (
              <Button
                onClick={() => {
                  signOut();
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
