"use client";
import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";
import { PcbListResponse } from "@/types/generated/strapi.schemas";
import { Input } from "@/types/project";

import FooterForm from "@/containers/projects/detail/forms/common/footer";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export interface GeographicScopeFormProps extends PropsWithChildren {
  items: PcbListResponse;
}

export default function GeographicScopeForm({ items }: GeographicScopeFormProps) {
  const { id: projectId } = useParams();

  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const formSchema = z.object({
    ...items?.data?.reduce(
      (acc, { id, attributes }) => {
        if (!id || !attributes) {
          return acc;
        }

        const { display_order, pcb_category, input } = attributes;
        const ip = input as Input;

        if (ip.type === "checkbox") {
          acc[`${pcb_category?.data?.attributes?.display_order}-${display_order}`] = z
            .array(z.string())
            .optional();
        }

        if (ip.type === "textarea") {
          acc[`${pcb_category?.data?.attributes?.display_order}-${display_order}`] = z
            .string()
            .optional();
        }

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const defaultValuesCategory = (projectIdData?.data?.attributes?.pcbs || {}) as Record<
    "carbon-offset-project-controversies" | "geographic-scope",
    Record<string, string>
  >;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesCategory["geographic-scope"],
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return new Promise((resolve) => {
      if (projectIdData?.data?.attributes) {
        const parsedValues = Object.entries(values).reduce(
          (acc, [key, value]) => {
            acc[key] = value || "";

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
                  "geographic-scope": parsedValues,
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

            const { title, description, display_order, pcb_category, input } = attributes;
            const ip = input as Input;

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
                      <div className="prose">{parse(description)}</div>

                      {ip.type === "textarea" && (
                        <FormControl className="flex py-2.5">
                          <Textarea {...field} rows={4} className="w-full" />
                        </FormControl>
                      )}

                      {ip.type === "checkbox" && !!ip.options && (
                        <>
                          {ip.options
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((o) => (
                              <FormField
                                key={o.value}
                                control={form.control}
                                name={`${pcb_category?.data?.attributes?.display_order}-${display_order}`}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={o.value}
                                      className="flex flex-row items-start space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          className="mt-0.5 cursor-pointer"
                                          checked={field.value?.includes(o.value)}
                                          onCheckedChange={(checked) => {
                                            const prevValue = field.value || [];

                                            return checked
                                              ? field.onChange([...prevValue, o.value])
                                              : field.onChange(
                                                  prevValue?.filter(
                                                    (value: string) => value !== o.value,
                                                  ),
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="cursor-pointer pl-2 text-sm font-normal">
                                        {o.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                        </>
                      )}

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}

        <FooterForm />
      </form>
    </Form>
  );
}
