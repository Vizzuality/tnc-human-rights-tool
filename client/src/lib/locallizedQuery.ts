import { UseQueryResult } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { defaultLocale } from "@/constants/navigation";

type StrapiDATA = {
  data?: {
    id?: number;
    attributes?: Record<string, unknown>;
  }[];
  meta?: Record<string, unknown>;
};

export const useGetLocalizedList = <T, E>(query: UseQueryResult<T, E>) => {
  const locale = useLocale();

  const { data } = query as UseQueryResult<StrapiDATA, E>;

  if (Array.isArray(data?.data)) {
    const LOCALE_DATA = data.data.filter((item) => {
      return item?.attributes?.locale === locale;
    });

    const DEFAULT_DATA = data.data.filter((item) => {
      return item?.attributes?.locale === defaultLocale;
    });

    const DATA = DEFAULT_DATA.map((item) => {
      const LOCALE_ITEM = LOCALE_DATA.find((localeItem) => {
        return (
          localeItem.attributes?.slug &&
          item.attributes?.slug &&
          localeItem.attributes.slug === item.attributes.slug
        );
      });

      return {
        ...item,
        attributes: {
          ...item.attributes,
          ...LOCALE_ITEM?.attributes,
        },
      };
    });

    return {
      ...query,
      data: {
        ...query.data,
        data: DATA,
      },
    } as unknown as UseQueryResult<T, E>;
  }

  return query;
};
