"use client";

import { useTranslations } from "next-intl";

import Markdown from "@/components/ui/markdown";

export default function ProjectRiskDetermination() {
  const t = useTranslations();

  return <Markdown>{t.raw("project_risk_determination_description")}</Markdown>;
}
