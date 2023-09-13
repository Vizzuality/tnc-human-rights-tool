import CMS from "@/services/cms";

export async function getPCBs(categoryId?: string) {
  return CMS<{
    data: {
      id: string;
      title: string;
      indicator_code: string;
      description: string;
    }[];
  }>({
    method: "GET",
    url: `/items/pcb`,
    params: {
      filter: {
        category: categoryId,
      },
    },
  });
}
