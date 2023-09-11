import CMS from "@/services/cms";

export async function getContextualRiskCategories() {
  return CMS<{
    data: {
      id: string;
      title: string;
    }[];
  }>({
    method: "GET",
    url: "/items/contextual_risk_categories",
    params: {
      sort: "display_order",
    },
  });
}

export async function getContextualRiskCategory(id: string) {
  return CMS<{
    data: {
      id: string;
      title: string;
      description: string;
    };
  }>({
    method: "GET",
    url: `/items/contextual_risk_categories/${id}`,
  });
}
