"use client";

import { useEffect, useState } from "react";

import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  const t = useTranslations();

  const handleScroll = () => {
    const { scrollTop } = window.document.scrollingElement || window.document.body;

    if (scrollTop > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleBackToTop = () => {
    window.document.scrollingElement?.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn({
        "pointer-events-none fixed bottom-0 left-0 flex w-full translate-y-full justify-center bg-gradient-to-b from-transparent to-white":
          true,
        "transition-transform duration-300 ease-in-out": true,
        "translate-y-0": visible,
      })}
    >
      <button className="pointer-events-auto flex space-x-2 py-5" onClick={handleBackToTop}>
        <ArrowUpIcon className="h-6 w-6" />
        <span>{t("back_to_top")}</span>
      </button>
    </div>
  );
}
