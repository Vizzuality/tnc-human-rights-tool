import { Metadata } from "next";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "@/components/ui/markdown";

export type ProjectsDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProjectsDetailPageProps): Promise<Metadata> {
  return {
    title: `Project ${params.id} | Human Rights Screening Tool`,
    description: "Generated by create next app",
  };
}

export default function ProjectsDetailPage({ params }: ProjectsDetailPageProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
      <div className="col-span-12 lg:col-span-8">
        <Markdown>{t("project_intro")}</Markdown>
      </div>

      <div className="col-span-12 sm:col-span-8 lg:col-span-4">
        <Card className="sticky top-10">
          <CardHeader className="prose w-full">
            <CardTitle>{t("research_phase")}</CardTitle>
          </CardHeader>
          <CardContent className="prose w-full">
            <p>{t("research_phase_description")}</p>
            <Link
              href={`/projects/${params.id}/project-and-background-community`}
              className="block"
            >
              <Button size="lg" className="w-full">
                {t("get_started")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
