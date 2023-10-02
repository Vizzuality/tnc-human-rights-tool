import { PCBs, Risks } from "@/types/project";

export const getStatus = ({ risks, pcbs }: { risks?: Risks; pcbs?: PCBs }) => {
  const PCBS_VALUES =
    pcbs &&
    Object.values(pcbs).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  const RISKS_VALUES =
    risks &&
    Object.values(risks).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  const PCBcompleted = !!PCBS_VALUES && Object.values(PCBS_VALUES).every((v) => !!v);

  const contextualRiskCompleted =
    !!RISKS_VALUES && Object.values(RISKS_VALUES).every((v) => !!v && !!v.contextual_risk);

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
