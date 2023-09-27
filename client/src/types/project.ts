export type Risks = Record<
  string,
  Record<
    string,
    {
      contextual_risk: string;
      contextual_notes: string;
      proyect_risk_determination: string;
      proyect_risk_priorization: string;
      proyect_risk_notes: string;
      proyect_risk_research_notes: string;
      proyect_risk_key_determination_factors: string;
      follow_up_notes: string;
    }
  >
>;

export type PCBs = Record<string, Record<string, { answer: string } | string>>;
