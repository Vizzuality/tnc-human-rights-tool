"use client";

import { useParams } from "next/navigation";

import { FileIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n";

export default function ProjectsDetailReport() {
  const { id } = useParams();
  const t = useTranslations();

  return (
    <div>
      <Link href={`/reports/projects/${id}`}>
        <Button variant="outline" size="lg" className="items-center">
          <FileIcon className="mr-2 h-4 w-4" />
          <span>{t("report")}</span>
        </Button>
      </Link>
    </div>
  );
}
