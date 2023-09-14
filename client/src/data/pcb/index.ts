import CMS from "@/services/cms";

export async function getPCBs(categoryId?: string) {
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
    }[];
  }>({
    method: "GET",
    url: `/items/pcb`,
    params: {
      fields: "*.*",
      filter: {
        category: categoryId,
      },
    },
  });
}
