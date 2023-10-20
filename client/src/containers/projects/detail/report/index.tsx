"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { FileIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function ProjectsDetailReport() {
  const { id } = useParams();

  return (
    <div>
      <Link href={`/reports/projects/${id}`}>
        <Button variant="outline" size="lg" className="items-center">
          <FileIcon className="mr-2 h-4 w-4" />
          <span>Report</span>
        </Button>
      </Link>
    </div>
  );
}
