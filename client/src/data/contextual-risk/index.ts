import CMS from "@/services/cms";

export async function getContextualRisks(categoryId?: string) {
  return CMS<{
    data: {
      id: string;
      title: string;
      display_order: string;
      description: string;
      category: {
        id: string;
        title: string;
        display_order: string;
      };
      input: {
        type: string;
        radio_options: {
          value: string;
          label: string;
        }[];
      };
    }[];
  }>({
    method: "GET",
    url: `/items/contextual_risk`,
    params: {
      fields: "*.*",
      filter: {
        category: categoryId,
      },
    },
  });
}
