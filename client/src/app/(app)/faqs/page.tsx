import { Metadata } from "next";

import FAQs from "@/containers/faqs";

export const metadata: Metadata = {
  title: "FAQs | Human Rights Tool",
  description: "",
};

export default function FAQsPage() {
  return <FAQs />;
}
