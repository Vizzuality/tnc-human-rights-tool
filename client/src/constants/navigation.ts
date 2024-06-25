import { enUS, es, pt } from "date-fns/locale";
export const locales = ["en", "es", "pt"] as const;
export const defaultLocale = "en";
export const localePrefix = "always"; // Default

export const LOCALES = {
  en: {
    label: "English",
    dateFns: enUS,
  },
  es: {
    label: "Español",
    dateFns: es,
  },
  pt: {
    label: "Português",
    dateFns: pt,
  },
};

export type Locale = (typeof locales)[number];
