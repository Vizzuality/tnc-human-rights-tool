import CMS from "@/services/cms";

export async function getContextualRisks(categoryId?: string) {
  return CMS<{
    data: {
      id: string;
      title: string;
      indicator_code: string;
      description: string;
    }[];
  }>({
    method: "GET",
    url: `/items/contextual_risk`,
    params: {
      filter: {
        category: categoryId,
      },
    },
  });
}
