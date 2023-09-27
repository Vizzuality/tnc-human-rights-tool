"use client";

import { useFormContext } from "react-hook-form";

import { ShadowIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export default function FooterForm() {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <div className="pointer-events-none sticky bottom-0 flex justify-end py-4">
      <Button className="pointer-events-auto relative" type="submit" size="lg">
        {isSubmitting ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShadowIcon className="h-4 w-4 animate-spin" />
          </span>
        ) : null}
        <span className={cn(isSubmitting ? "opacity-20" : "opacity-100")}>Save</span>
      </Button>
    </div>
  );
}
