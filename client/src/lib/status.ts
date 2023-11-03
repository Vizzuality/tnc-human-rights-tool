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

      return !!risks[slug] && Object.values(risks[slug]).every((v) => !!v && !!v?.contextual_risk);
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

export const getPCBProgress = ({ pcbs, pcbCategories }: Partial<GetStatusProps>) => {
  const progress = pcbCategories?.reduce((acc, pcbCategory) => {
    const slug = pcbCategory.attributes?.slug;

    if (!pcbs || !slug || !pcbs[slug]) return acc + 0;

    const values = Object.values(pcbs[slug]);
    const p = values.reduce((acc2, v2) => {
      if (v2) return acc2 + 1;
      return acc2;
    }, 0);

    return acc + p / values.length;
  }, 0);

  return (progress || 0) / (pcbCategories?.length || 1);
};

export const getContextualRiskProgress = ({
  risks,
  contextualRiskCategories,
}: Partial<GetStatusProps>) => {
  const progress = contextualRiskCategories?.reduce((acc, pcbCategory) => {
    const slug = pcbCategory.attributes?.slug;

    if (!risks || !slug || !risks[slug]) return acc + 0;

    const values = Object.values(risks[slug]);
    const p = values.reduce((acc2, v2) => {
      if (v2.contextual_risk) return acc2 + 1;
      return acc2;
    }, 0);

    return acc + p / values.length;
  }, 0);

  return (progress || 0) / (contextualRiskCategories?.length || 1);
};

export const getProjectRiskProgress = ({ risks }: Partial<GetStatusProps>) => {
  const RISKS_VALUES =
    risks &&
    Object.values(risks).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  if (!RISKS_VALUES) return 0;

  const values = Object.values(RISKS_VALUES).filter((v) => !!v && v.contextual_risk === "yes");

  const progress = values.reduce((acc, v) => {
    if (v && v.proyect_risk_priorization) return acc + 1;
    return acc;
  }, 0);

  return progress / values.length;
};

export const getFollowUpProgress = ({ risks }: Partial<GetStatusProps>) => {
  const RISKS_VALUES =
    risks &&
    Object.values(risks).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  if (!RISKS_VALUES) return 0;

  const values = Object.values(RISKS_VALUES).filter(
    (v) =>
      !!v &&
      ((v.contextual_risk === "yes" && !!v.proyect_risk_priorization) ||
        v.contextual_risk === "more-research"),
  );

  const progress = values.reduce((acc, v) => {
    if (v && v.follow_up_notes) return acc + 1;
    return acc;
  }, 0);

  return progress / values.length;
};

export const getProgress = ({
  risks,
  pcbs,
  pcbCategories,
  contextualRiskCategories,
}: GetStatusProps): Record<"pcb" | "contextual-risk" | "project-risk" | "follow-up", number> => {
  const PCBprogress = getPCBProgress({ pcbs, pcbCategories });

  const contextualRiskProgress = getContextualRiskProgress({
    risks,
    contextualRiskCategories,
  });

  const projectRiskProgress = getProjectRiskProgress({ risks });

  const followUpCompleted = getFollowUpProgress({ risks });

  return {
    pcb: PCBprogress,
    "contextual-risk": contextualRiskProgress,
    "project-risk": projectRiskProgress,
    "follow-up": followUpCompleted,
  };
};
