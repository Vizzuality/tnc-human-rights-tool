"use client";
import { PropsWithChildren, useMemo } from "react";

import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

import {
  useGetContextualRiskCategories,
  useGetContextualRiskCategoriesId,
} from "@/types/generated/contextual-risk-category";
import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";
import { ContextualRiskListResponse } from "@/types/generated/strapi.schemas";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export interface ContextualRiskFormProps extends PropsWithChildren {
  items: ContextualRiskListResponse;
}

const RADIO_OPTIONS = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
  {
    value: "more-research",
    label: "More Research",
  },
];

export default function ContextualRiskForm({ items }: ContextualRiskFormProps) {
  const { id: projectId, categoryId } = useParams();

  const { data: categoriesData } = useGetContextualRiskCategories({
    sort: "display_order:asc",
  });

  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const { data: categoryIdData } = useGetContextualRiskCategoriesId(+categoryId);

  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const categorySlug = categoryIdData?.data?.attributes?.slug ?? "";
  const defaultValuesCategory = (projectIdData?.data?.attributes?.risks || {}) as Record<
    string,
    Record<string, { contextual_risk: string }>
  >;

  const nextCategory = useMemo(() => {
    const i = categoriesData?.data?.findIndex((c) => c.id === +categoryId);

    if (!categoryId || i === undefined) {
      return {
        href: `/projects/${projectId}/contextual-risk`,
        label: "Contextual Risk",
      };
    }

    const n = categoriesData?.data?.[i + 1];

    if (!n) {
      return {
        href: `/projects/${projectId}/project-risk`,
        label: "Proyect Risk",
      };
    }

    return {
      href: `/projects/${projectId}/contextual-risk/${n.id}`,
      label: n.attributes?.title ?? "",
    };
  }, [categoriesData, categoryId, projectId]);

  const formSchema = z.object({
    ...items?.data?.reduce(
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
    defaultValues: defaultValuesCategory[categorySlug],
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
                  [categorySlug]: parsedValues,
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
        {items?.data
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
                          <div className="prose">
                            <h2>Any, Multiple, Frequent, and Pervasive</h2>
                            <p>
                              These terms are used, not interchangeably, to calibrate frequency or
                              persistence of incidents. They each have a slightly different meaning:
                            </p>
                            <ul>
                              <li>
                                <strong>any:</strong> at least one incident
                              </li>
                              <li>
                                <strong>multiple:</strong> two or more incidents
                              </li>
                              <li>
                                <strong>frequent:</strong> more than two incidents, and somewhat
                                geographically dependent — three incidents in a small community
                                might be deemed “frequent” rather than merely “multiple”
                              </li>
                              <li>
                                <strong>pervasive:</strong> high frequency over both time and
                                geographic scope
                              </li>
                            </ul>
                            <blockquote>
                              NOTE: Using “frequent” and “pervasive” with strictest rigor will help
                              teams prioritize.
                            </blockquote>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </FormLabel>
                    <div className="prose">{parse(description)}</div>

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
                                {label}
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
                            <FormLabel>Notes/Specific Risk</FormLabel>
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
