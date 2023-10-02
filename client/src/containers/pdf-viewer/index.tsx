"use client";

import { PropsWithChildren } from "react";

import { useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface PDFViewerProps extends PropsWithChildren {
  url: string;
  filename: string;
}

type WebshotMutationProps = { url: string; filename: string };

const useWebshotMutation = () => {
  const { data: session } = useSession();

  return useMutation(
    async ({ url, filename }: WebshotMutationProps) => {
      const response = await fetch(
        // `https://staging.tnc-hrt.dev-vizzuality.com/webshot/api/v1/webshot?url=${url}&filename=screenshot.pdf`,
        `/api/webshot?url=${url}&filename=${filename}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.apiToken}`,
            "Content-Type": "application/pdf",
          },
        },
      );

      return response.blob();
    },
    {
      onSuccess: (data, variables) => {
        const { filename } = variables;
        const objUrl = window.URL.createObjectURL(data);

        const link = document.createElement("a");
        link.href = objUrl;
        link.download = filename;
        link.click();

        // For Firefox it is necessary to delay revoking the ObjectURL.
        setTimeout(() => {
          window.URL.revokeObjectURL(objUrl);
        }, 250);
      },
    },
  );
};

export default function PDFViewer({ children, url, filename }: PDFViewerProps) {
  const searchParams = useSearchParams();
  const format = searchParams.get("format");

  const webshotMutation = useWebshotMutation();

  return (
    <div
      className={cn({
        "flex flex-col items-center": true,
        "py-20": format !== "pdf",
      })}
    >
      {format !== "pdf" && (
        <header className="mb-10 flex w-[210mm] justify-end">
          <Button
            onClick={() => {
              webshotMutation.mutate({
                url,
                filename,
              });
            }}
          >
            Export as pdf
          </Button>
        </header>
      )}

      <div
        className={cn({
          "w-[210mm] overflow-hidden rounded-md bg-white": true,
          "p-8": format === "pdf",
          "m-4 p-8 shadow-lg": format !== "pdf",
        })}
      >
        {children}
      </div>
    </div>
  );
}
