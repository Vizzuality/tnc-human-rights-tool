"use client";

import { useParams } from "next/navigation";

import { useGetProjectsId } from "@/types/generated/project";
import { ContextualRiskListResponseDataItem } from "@/types/generated/strapi.schemas";
import { Risks } from "@/types/project";

import { Label } from "@/components/ui/label";

export default function ReportsProjectIdItem(props: ContextualRiskListResponseDataItem) {
  const { id: projectId } = useParams();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const slug = props?.attributes?.contextual_risk_category?.data?.attributes?.slug ?? "";
  const risks = projectIdData?.data?.attributes?.risks as Risks;
  const RISK = risks[slug]?.[`${props.id}`] ?? {};

  return (
    <div>
      <div className="prose">
        <h3>
          {props?.attributes?.contextual_risk_category?.data?.attributes?.display_order}.
          {props?.attributes?.display_order}
          {" - "}
          {props?.attributes?.title}
        </h3>

        {RISK.contextual_risk !== "more-research" && (
          <>
            <Label>Contextual Risk</Label>
            <p>{RISK.contextual_notes}</p>
          </>
        )}

        {RISK.contextual_risk !== "more-research" && (
          <>
            <Label>Project Risk</Label>
            <p>{RISK.proyect_risk_notes}</p>
          </>
        )}

        {RISK.contextual_risk !== "more-research" && (
          <>
            <Label>Research</Label>
            <p>{RISK.proyect_risk_research_notes}</p>
          </>
        )}

        {RISK.contextual_risk !== "more-research" && (
          <>
            <Label>Project Risk Determination factors</Label>
            <p>{RISK.proyect_risk_key_determination_factors}</p>
          </>
        )}

        <Label>Follow up plan</Label>
        <p>{RISK.follow_up_notes}</p>
      </div>
    </div>
  );
}
