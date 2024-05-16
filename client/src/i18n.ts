import { getRequestConfig } from "next-intl/server";
import { merge } from "ts-deepmerge";

import { getMessages } from "@/types/generated/message";
// Can be imported from a shared config
const locales = ["en", "es"];

export default getRequestConfig(async ({ locale }) => {
  let l = locale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) l = "en";

  const { data: dataDefault } = await getMessages({
    locale: "en",
  });

  const { data } = await getMessages({
    locale: l,
  });

  if (!data) throw new Error("No messages found for locale: " + locale);
  if (!dataDefault) throw new Error("No messages found for locale: en");

  const DEFAULT_MESSAGES = dataDefault.reduce(
    (acc, c) => {
      return {
        ...acc,
        ...c.attributes,
      } as Record<string, string>;
    },
    {} as Record<string, string>,
  );

  const CURRENT_MESSAGES = data.reduce(
    (acc, c) => {
      return {
        ...acc,
        ...c.attributes,
      } as Record<string, string>;
    },
    {} as Record<string, string>,
  );

  for (const key in DEFAULT_MESSAGES) {
    if (!CURRENT_MESSAGES[key]) {
      CURRENT_MESSAGES[key] = DEFAULT_MESSAGES[key];
    }
  }

  return {
    messages: merge(DEFAULT_MESSAGES, CURRENT_MESSAGES),
  };
});
