"use client";
import { PropsWithChildren } from "react";

import { UseFormReturn, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

import { PcbListResponse } from "@/types/generated/strapi.schemas";

import { Button } from "@/components/ui/button";
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

const useSyncFormValues = (f: UseFormReturn) => {
  const values = useWatch({
    control: f.control,
  });

  console.info("watch values", values);
};

export default function GeographicScopeForm({ items }: GeographicScopeFormProps) {
  const formSchema = z.object({
    ...items?.data?.reduce(
      (acc, { id }) => {
        if (!id) {
          return acc;
        }

        acc[id] = z.string().min(10);

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.info(values);
  };

  useSyncFormValues(form);

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
                name={`${id}`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      {`${pcb_category?.data?.attributes?.display_order}.${display_order}`} {title}
                    </FormLabel>
                    <div className="prose">{parse(description)}</div>

                    <FormControl className="flex py-2.5">
                      <Textarea {...field} rows={4} className="w-full" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
