"use client";

import { useTranslations } from "next-intl";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "@/components/ui/markdown";

import { Link } from "@/i18n";

export default function Home() {
  const t = useTranslations();

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <Markdown>{t.raw("intro")}</Markdown>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-4">
          <Card className="sticky top-10">
            <CardHeader className="prose w-full">
              <CardTitle>{t("get_started")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Markdown>{t.raw("get_started_description")}</Markdown>
              <div className="space-y-2">
                <Link href="/projects" className="block">
                  <Button size="lg" className="w-full">
                    {t("get_started")}
                  </Button>
                </Link>
                <p className="text-center">or</p>
                <a href="/hr-tool-full-en.pdf" download="Report" className="block">
                  <Button size="lg" className="w-full" variant="outline">
                    {t("download_report")}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}
