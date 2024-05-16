"use client";

import Markdown from "react-markdown";

import Link from "next/link";

import { useTranslations } from "next-intl";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const t = useTranslations();

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <div className="prose w-full">
              <Markdown>{t.raw("intro")}</Markdown>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-4">
          <Card className="sticky top-10">
            <CardHeader className="prose w-full">
              <CardTitle>{t("get_started")}</CardTitle>
            </CardHeader>
            <CardContent className="prose w-full">
              <Markdown>{t.raw("get_started_description")}</Markdown>
              <Link href="/projects" className="block">
                <Button size="lg" className="w-full">
                  {t("get_started")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}
