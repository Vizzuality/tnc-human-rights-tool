"use client";

import { PropsWithChildren, useState } from "react";

import { useSearchParams } from "next/navigation";

import { ShadowIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PDFViewerProps extends PropsWithChildren {
  url: string;
  filename: string;
}

type WebshotMutationProps = { url: string; filename: string };

const useWebshotMutation = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

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

      if (!response.ok) {
        toast({
          title: "PDF Not Generated",
          description: "The pdf could not be generated. Please try again.",
          variant: "destructive",
        });

        throw new Error("The pdf could not be generated. Please try again.");
      }

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const format = searchParams.get("format");

  const webshotMutation = useWebshotMutation();

  const handleExportAsPdf = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    webshotMutation.mutate(
      { url, filename },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <div
      className={cn({
        "flex flex-col items-center": true,
        "py-20": format !== "pdf",
      })}
    >
      {format !== "pdf" && (
        <header className="mb-10 flex w-[210mm] justify-end">
          <Button className="relative" size="lg" onClick={handleExportAsPdf}>
            {isSubmitting ? (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <ShadowIcon className="h-4 w-4 animate-spin" />
              </span>
            ) : null}

            <span className={cn(isSubmitting ? "opacity-20" : "opacity-100")}>Export as pdf</span>
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
