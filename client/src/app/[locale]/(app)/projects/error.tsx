"use client";

import { useTranslations } from "next-intl";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n";

// Error components must be Client Components

export default function Error() {
  const t = useTranslations();

  return (
    <div className="flex grow flex-col items-center justify-center">
      <Wrapper>
        <div className="flex grow flex-col items-center justify-center space-y-2">
          <div className="flex grow flex-col items-center justify-center space-y-5">
            <div className="prose text-center">
              <h2>Something went wrong loading the project!</h2>
              <p>Please try again later or contact the administrator if the problem persists.</p>
            </div>

            <div className="flex space-x-2">
              <Button variant="secondary" size="lg">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="secondary" size="lg">
                <Link href="/projects">{t("projects")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
