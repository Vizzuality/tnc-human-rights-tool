"use client";

import { useParams } from "next/navigation";

import Wrapper from "@/containers/wrapper";

export default function ProjectsDetail() {
  const { id } = useParams();

  return (
    <Wrapper>
      <section className="flex max-w-6xl grow flex-col space-y-5 py-24">
        <h1 className="text-4xl">Project {id}</h1>
      </section>
    </Wrapper>
  );
}
