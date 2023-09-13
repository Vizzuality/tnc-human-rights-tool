import CMS from "@/services/cms";

export async function getPCBCategories() {
  return CMS<{
    data: {
      id: string;
      title: string;
    }[];
  }>({
    method: "GET",
    url: "/items/pcb_categories",
    params: {
      sort: "display_order",
    },
  });
}

export async function getPCBCategory(id: string) {
  return CMS<{
    data: {
      id: string;
      title: string;
      description: string;
    };
  }>({
    method: "GET",
    url: `/items/pcb_categories/${id}`,
  });
}
