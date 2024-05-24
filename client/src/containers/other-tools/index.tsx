"use client";

import { useTranslations } from "next-intl";

import Wrapper from "@/containers/wrapper";

import Markdown from "@/components/ui/markdown";

export default function OtherTools() {
  const t = useTranslations();
  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <Markdown>{t("other_tools_description")}</Markdown>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
