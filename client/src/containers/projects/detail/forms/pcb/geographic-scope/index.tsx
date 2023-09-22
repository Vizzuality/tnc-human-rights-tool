"use client";
import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

import { useGetProjectsId, usePutProjectsId } from "@/types/generated/project";
import { PcbListResponse } from "@/types/generated/strapi.schemas";

import FooterForm from "@/containers/projects/detail/forms/common/footer";

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
  projectId: string;
  items: PcbListResponse;
}

export default function GeographicScopeForm({ projectId, items }: GeographicScopeFormProps) {
  const { data: projectIdData } = useGetProjectsId(+projectId);
  const putProjectMutation = usePutProjectsId();

  const formSchema = z.object({
    ...items?.data?.reduce(
      (acc, { id, attributes }) => {
        if (!id || !attributes) {
          return acc;
        }

        const { display_order, pcb_category } = attributes;

        acc[`${pcb_category?.data?.attributes?.display_order}-${display_order}`] = z
          .string()
          .min(10);

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: projectIdData?.data?.attributes?.geographic_scope as Record<string, string>,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return new Promise((resolve) => {
      if (projectIdData?.data?.attributes) {
        return putProjectMutation.mutate(
          {
            id: +projectId,
            data: {
              data: {
                name: projectIdData.data.attributes.name,
                description: projectIdData.data.attributes.description,
                geographic_scope: values,
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
                      <div className="prose">{parse(description)}</div>

                      <FormControl className="flex py-2.5">
                        <Textarea {...field} rows={4} className="w-full" />
                      </FormControl>

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
