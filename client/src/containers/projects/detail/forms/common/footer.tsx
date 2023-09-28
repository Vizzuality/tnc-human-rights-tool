"use client";

import { useEffect, useRef, useState } from "react";

import { useFormContext } from "react-hook-form";

import { CheckIcon, ShadowIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type FooterFormProps = {
  className?: string;
};

export default function FooterForm({ className = "" }: FooterFormProps) {
  const { formState } = useFormContext();
  const { isSubmitting, isSubmitSuccessful } = formState;

  const [success, setSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isSubmitting && isSubmitSuccessful) {
      setSuccess(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [isSubmitting, isSubmitSuccessful]);

  return (
    <div
      className={cn({
        "pointer-events-none flex justify-end py-4": true,
        "sticky bottom-0": !className,
        [className]: !!className,
      })}
    >
      <Button className="pointer-events-auto relative" type="submit" size="lg">
        {isSubmitting ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShadowIcon className="h-4 w-4 animate-spin" />
          </span>
        ) : null}

        {success ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckIcon className="h-6 w-6" />
          </span>
        ) : null}
        <span className={cn(isSubmitting || success ? "opacity-20" : "opacity-100")}>Save</span>
      </Button>
    </div>
  );
}
