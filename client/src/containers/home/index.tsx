"use client";

import Markdown from "react-markdown";

import Link from "next/link";

import { useGetMessages } from "@/types/generated/message";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { data, isFetched } = useGetMessages({ populate: "*" });

  const messages = isFetched && data?.data && data?.data[0]?.attributes;

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <div className="prose w-full">
              <h1>{messages && messages.human_rights_screening_tool}</h1>
              {messages && <Markdown>{messages.intro}</Markdown>}
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-4">
          <Card className="sticky top-10">
            <CardHeader className="prose w-full">
              {messages && <CardTitle>{messages.get_started}</CardTitle>}
            </CardHeader>
            <CardContent className="prose w-full">
              {messages && <Markdown>{messages.get_started_description}</Markdown>}
              <Link href="/projects" className="block">
                {messages && (
                  <Button size="lg" className="w-full">
                    {messages.get_started}
                  </Button>
                )}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}
