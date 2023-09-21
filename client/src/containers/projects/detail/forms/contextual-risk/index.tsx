"use client";
import { PropsWithChildren } from "react";

import { UseFormReturn, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

import { ContextualRiskListResponse } from "@/types/generated/strapi.schemas";

import { Button } from "@/components/ui/button";
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

const useSyncFormValues = (f: UseFormReturn) => {
  const values = useWatch({
    control: f.control,
  });

  console.info("watch values", values);
};

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
  const formSchema = z.object({
    ...items?.data?.reduce(
      (acc, { id }) => {
        if (!id) {
          return acc;
        }

        acc[id] = z.record(z.string(), z.string()).superRefine((data, context) => {
          // if radio is present and is yes then notes is required
          // if radio is present and is no then notes is not required
          if (data.answer === "yes" && !data.contextual_notes) {
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

            const { title, description, display_order, contextual_risk_category } = attributes;

            return (
              <FormField
                key={id}
                control={form.control}
                name={`${id}`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      {`${contextual_risk_category?.data?.attributes?.display_order}.${display_order}`}{" "}
                      {title}
                    </FormLabel>
                    <div className="prose">{parse(description)}</div>

                    <FormControl className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                      <RadioGroup
                        className="flex space-x-2.5"
                        onValueChange={(v) =>
                          field.onChange({
                            ...field.value,
                            answer: v,
                          })
                        }
                        defaultValue={field.value}
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

                    {field.value?.answer === "yes" && (
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
