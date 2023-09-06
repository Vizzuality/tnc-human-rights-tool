"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  const href = session ? "/projects" : "/auth/signin";

  return (
    <Wrapper>
      <section className="flex max-w-6xl grow flex-col py-24">
        <div className="max-w-md space-y-5">
          <h1 className="text-4xl">Human Rights Tool</h1>
          <p>
            This Human Rights Toolset, sponsored by the Natural Climate Solutions (NCS) Science
            team, provides a screening process that will help TNC field teams identify project risks
            from a human rights-based perspective and prioritize those risks for further attention
            and action in collaboration with IPLCs. It represents a first step to fulfill the larger
            responsibility of human rights due diligence.
          </p>

          <Link href={href} className="inline-block">
            <Button>Get started</Button>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
}
