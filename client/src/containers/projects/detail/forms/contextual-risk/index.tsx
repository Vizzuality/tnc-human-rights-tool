"use client";
import { useMemo } from "react";

import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ZodTypeAny, z } from "zod";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";

import FooterForm from "@/containers/projects/detail/forms/common/footer";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Markdown from "@/components/ui/markdown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const RADIO_OPTIONS = [
  {
    value: "yes",
    label: "yes",
  },
  {
    value: "no",
    label: "no",
  },
  {
    value: "more-research",
    label: "more_research",
  },
];

export default function ContextualRiskForm() {
  const { id: projectId, categorySlug = "" } = useParams();

  const t = useTranslations();

  const queryContextualRiskCategories = useGetContextualRiskCategories({
    sort: "display_order:asc",
    locale: "all",
  });
  const { data: contextualRiskCategoriesData } = useGetLocalizedList(queryContextualRiskCategories);

  const queryContextualRisks = useGetContextualRisks({
    filters: {
      contextual_risk_category: {
        slug: categorySlug,
      },
    },
    populate: "*",
    locale: "all",
    "pagination[limit]": 300,
  });

  const { data: itemsData } = useGetLocalizedList(queryContextualRisks);

  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);

  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const defaultValuesCategory = (projectIdData?.data?.attributes?.risks || {}) as Record<
    string,
    Record<string, { contextual_risk: string }>
  >;

  const nextCategory = useMemo(() => {
    const i = contextualRiskCategoriesData?.data?.findIndex(
      (c) => c.attributes?.slug === categorySlug,
    );

    if (!categorySlug || i === undefined) {
      return {
        href: `/projects/${projectId}/contextual-risk`,
        label: t("contextual_risk"),
      };
    }

    const n = contextualRiskCategoriesData?.data?.[i + 1];

    if (!n) {
      return {
        href: `/projects/${projectId}/project-risk`,
        label: t("project_risk"),
      };
    }

    return {
      href: `/projects/${projectId}/contextual-risk/${n.attributes?.slug}`,
      label: n.attributes?.title ?? "",
    };
  }, [t, contextualRiskCategoriesData, categorySlug, projectId]);

  const formSchema = z.object({
    ...itemsData?.data?.reduce(
      (acc, { id }) => {
        if (!id) {
          return acc;
        }

        acc[id] = z
          .record(z.string(), z.string())
          .optional()
          .nullable()
          .superRefine((data, context) => {
            // if radio is present and is yes then notes is required
            // if radio is present and is no then notes is not required
            if (data?.contextual_risk === "yes" && !data?.contextual_notes) {
              context.addIssue({
                code: "custom",
                message: "Notes/Specific Risk are required",
              });
            }
          });

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesCategory[`${categorySlug}`],
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return new Promise((resolve) => {
      if (projectIdData?.data?.attributes) {
        const parsedValues = Object.entries(values).reduce(
          (acc, [key, value]) => {
            if (value?.contextual_risk === "yes") {
              acc[key] = value || null;
              return acc;
            }

            acc[key] = {
              contextual_risk: value?.contextual_risk,
            };

            return acc;
          },
          {} as Record<string, Record<string, string>>,
        );

        return putProjectMutation.mutate(
          {
            id: +projectId,
            data: {
              data: {
                name: projectIdData.data.attributes.name,
                description: projectIdData.data.attributes.description,
                risks: {
                  ...defaultValuesCategory,
                  [`${categorySlug}`]: parsedValues,
                },
              },
            },
          },
          {
            onSettled: () => {
              resolve(true);
            },
          },
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 border-t border-gray-100 pt-5"
      >
        {itemsData?.data
          ?.sort((a, b) => {
            if (a?.attributes?.display_order && b?.attributes?.display_order) {
              return +a.attributes.display_order - +b.attributes.display_order;
            }

            return 0;
          })
          ?.map(({ id, attributes }) => {
            if (!id || !attributes) {
              return null;
            }

            const { title, description, display_order, contextual_risk_category } = attributes;

            return (
              <FormField
                key={id}
                control={form.control}
                name={`${id}`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center">
                      {`${contextual_risk_category?.data?.attributes?.display_order}.${display_order}`}{" "}
                      {title}
                      <Dialog>
                        <DialogTrigger className="ml-2">
                          <InfoCircledIcon className="inline-block h-4 w-4 text-primary hover:text-primary/50" />
                        </DialogTrigger>

                        <DialogContent className="max-h-[90svh] overflow-auto">
                          <Markdown>{t.raw("contextual_risk_info_description")}</Markdown>
                        </DialogContent>
                      </Dialog>
                    </FormLabel>
                    <div className="prose">
                      <Markdown>{description}</Markdown>
                    </div>

                    <FormControl className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                      <RadioGroup
                        className="flex space-x-2.5"
                        onValueChange={(v) =>
                          field.onChange({
                            ...field.value,
                            contextual_risk: v,
                          })
                        }
                        defaultValue={field.value?.contextual_risk}
                      >
                        {RADIO_OPTIONS.map(({ value, label }) => (
                          <FormItem key={value}>
                            <div className="flex items-center">
                              <FormControl>
                                <RadioGroupItem {...field} value={value} />
                              </FormControl>
                              <FormLabel className="cursor-pointer pl-2 font-normal">
                                {t(label)}
                              </FormLabel>
                            </div>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    {field.value?.contextual_risk === "yes" && (
                      <FormField
                        control={form.control}
                        name={`${id}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("notes_specific_risk")}</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={5}
                                {...field}
                                value={field.value?.contextual_notes}
                                onChange={(e) => {
                                  field.onChange({
                                    ...field.value,
                                    contextual_notes: e.target.value,
                                  });
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

        <FooterForm next={nextCategory} />
      </form>
    </Form>
  );
}
