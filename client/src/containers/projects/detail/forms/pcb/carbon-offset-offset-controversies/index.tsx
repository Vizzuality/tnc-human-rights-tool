"use client";
import { useMemo } from "react";

import { useForm } from "react-hook-form";
import Markdown from "react-markdown";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ZodTypeAny, z } from "zod";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetPcbs } from "@/types/generated/pcb";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";

import FooterForm from "@/containers/projects/detail/forms/common/footer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RADIO_OPTIONS = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

export default function CarbonOffsetProjectControversiesForm() {
  const { id: projectId, categorySlug } = useParams();
  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const queryPcbCategories = useGetPcbCategories({
    sort: "display_order:asc",
    locale: "all",
  });
  const { data: pcbCategoriesData } = useGetLocalizedList(queryPcbCategories);

  const queryPcbs = useGetPcbs({
    filters: {
      pcb_category: {
        slug: categorySlug,
      },
    },
    populate: "*",
    locale: "all",
  });

  const { data: itemsData } = useGetLocalizedList(queryPcbs);

  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const nextCategory = useMemo(() => {
    const i = pcbCategoriesData?.data?.findIndex((c) => c.attributes?.slug === categorySlug);

    if (!categorySlug || i === undefined) {
      return {
        href: `/projects/${projectId}/project-and-background-community`,
        label: "Contextual Risk",
      };
    }

    const n = pcbCategoriesData?.data?.[i + 1];

    if (!n) {
      return {
        href: `/projects/${projectId}/contextual-risk`,
        label: "Proyect Risk",
      };
    }

    return {
      href: `/projects/${projectId}/project-and-background-community/${n.id}`,
      label: n.attributes?.title ?? "",
    };
  }, [pcbCategoriesData, categorySlug, projectId]);

  const formSchema = z.object({
    ...itemsData?.data?.reduce(
      (acc, { id, attributes }) => {
        if (!id || !attributes) {
          return acc;
        }

        const { display_order, pcb_category } = attributes;

        acc[`${pcb_category?.data?.attributes?.display_order}-${display_order}`] = z
          .record(z.string(), z.string())
          .nullable()
          .optional();

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const defaultValuesCategory = (projectIdData?.data?.attributes?.pcbs || {}) as Record<
    "carbon-offset-project-controversies" | "geographic-scope",
    Record<string, { answer: string }>
  >;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesCategory["carbon-offset-project-controversies"],
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return new Promise((resolve) => {
      if (projectIdData?.data?.attributes) {
        const parsedValues = Object.entries(values).reduce(
          (acc, [key, value]) => {
            acc[key] = value || null;

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
                pcbs: {
                  ...defaultValuesCategory,
                  "carbon-offset-project-controversies": parsedValues,
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

            const { title, description, display_order, pcb_category } = attributes;
            return (
              <FormField
                key={id}
                control={form.control}
                name={`${pcb_category?.data?.attributes?.display_order}-${display_order}`}
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        {`${pcb_category?.data?.attributes?.display_order}.${display_order}`}{" "}
                        {title}
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
                              answer: v,
                            })
                          }
                          defaultValue={field.value?.answer}
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

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}

        <FooterForm next={nextCategory} />
      </form>
    </Form>
  );
}
