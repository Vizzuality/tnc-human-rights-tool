import { NextFetchEvent } from "next/server";

import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import withIntl from "next-intl/middleware";

const locales = ["en", "es"];
const privatePages = ["/projects"];

const intlMiddleware = withIntl({
  locales,
  localePrefix: "always",
  defaultLocale: "en",
});

// middleware is applied to all projects routes
const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token === null) {
          return false;
        }
        return true;
      },
    },
  },
);

export default function middleware(req: NextRequestWithAuth, ev: NextFetchEvent) {
  const privatePathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/.*?$`,
    "i",
  );
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  if (isPrivatePage) {
    return authMiddleware(req, ev);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
