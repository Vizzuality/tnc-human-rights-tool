import { Metadata } from "next";

import Glossary from "@/containers/glossary";

export const metadata: Metadata = {
  title: "Glossary | Human Rights Tool",
  description: "",
};

export default function GlossaryPage() {
  return <Glossary />;
}
