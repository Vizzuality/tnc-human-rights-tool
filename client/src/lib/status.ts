import {
  ContextualRiskCategoryListResponseDataItem,
  PcbCategoryListResponseDataItem,
} from "@/types/generated/strapi.schemas";
import { PCBs, Risks } from "@/types/project";

export interface GetStatusProps {
  risks?: Risks;
  pcbs?: PCBs;
  pcbCategories?: PcbCategoryListResponseDataItem[];
  contextualRiskCategories?: ContextualRiskCategoryListResponseDataItem[];
}

export const getStatus = ({
  risks,
  pcbs,
  pcbCategories,
  contextualRiskCategories,
}: GetStatusProps) => {
  const RISKS_VALUES =
    risks &&
    Object.values(risks).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  const PCBcompleted =
    pcbs &&
    pcbCategories?.every((pcbCategory) => {
      const slug = pcbCategory.attributes?.slug;

      if (!slug) return false;

      return !!pcbs[slug] && Object.values(pcbs[slug]).every((v) => !!v);
    });

  const contextualRiskCompleted =
    risks &&
    contextualRiskCategories?.every((contextualRiskCategory) => {
      const slug = contextualRiskCategory.attributes?.slug;

      if (!slug) return false;

      return !!risks[slug] && Object.values(risks[slug]).every((v) => !!v);
    });

  const projectRiskCompleted =
    !!RISKS_VALUES &&
    Object.values(RISKS_VALUES)
      .filter((v) => !!v && v.contextual_risk === "yes")
      .every((v) => !!v && !!v.proyect_risk_priorization);

  const followUpCompleted =
    !!RISKS_VALUES &&
    Object.values(RISKS_VALUES)
      .filter((v) => !!v && v.contextual_risk === "yes")
      .every((v) => !!v && !!v.follow_up_notes);

  if (!PCBcompleted) return 1;

  if (PCBcompleted && !contextualRiskCompleted) return 2;

  if (PCBcompleted && contextualRiskCompleted && !projectRiskCompleted) return 3;

  if (PCBcompleted && contextualRiskCompleted && projectRiskCompleted && !followUpCompleted)
    return 4;

  if (PCBcompleted && contextualRiskCompleted && projectRiskCompleted && followUpCompleted)
    return 5;

  return 1;
};
