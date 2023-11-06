import { Metadata } from "next";

import Glossary from "@/containers/glossary";

export const metadata: Metadata = {
  title: "Glossary | Human Rights Screening Tool",
  description: "",
};

export default function GlossaryPage() {
  return <Glossary />;
}
