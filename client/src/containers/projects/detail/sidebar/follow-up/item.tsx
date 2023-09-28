"use client";
import { useParams } from "next/navigation";

import { useGetProjectsId } from "@/types/generated/project";
import { ContextualRiskListResponseDataItem } from "@/types/generated/strapi.schemas";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface FollowUpSidebarItemProps {
  items?: ContextualRiskListResponseDataItem[];
}

export default function FollowUpSidebarItem({ items }: FollowUpSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});

  const completed =
    items?.filter((item) => {
      return !!RISKS_VALUES[`${item?.id}`]?.follow_up_notes;
    }).length ?? 0;
  const total = items?.length ?? 0;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
