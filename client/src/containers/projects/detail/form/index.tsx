"use client";
import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parse from "html-react-parser";
import { ZodTypeAny, z } from "zod";

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

export interface ProjectsDetailFormProps extends PropsWithChildren {
  items: {
    data: {
      id: string;
      title: string;
      description: string;
      display_order: string;
      category: {
        display_order: string;
      };
      input: {
        type: string;
        radio_options: {
          value: string;
          label: string;
          additional_input?: {
            id: string;
            label: string;
            error: string;
          };
        }[];
      };
    }[];
  };
}

// const useSyncFormValues = (f: UseFormReturn) => {
//   const values = useWatch({
//     control: f.control,
//   });

//   console.info("watch values", values);
// };

export default function ProjectsDetailForm({ items }: ProjectsDetailFormProps) {
  const formSchema = z.object({
    ...items.data.reduce(
      (acc, { id, input }) => {
        switch (input.type) {
          case "radio":
            acc[id] = z.record(z.string(), z.string()).superRefine((data, context) => {
              // if radio is present and is yes then notes is required
              // if radio is present and is no then notes is not required
              const ro_additional = input.radio_options.find((ro) => !!ro.additional_input);

              if (
                !!ro_additional &&
                ro_additional.additional_input &&
                data.answer === ro_additional.value &&
                !data[`${ro_additional.additional_input.id}`]
              ) {
                context.addIssue({
                  code: "custom",
                  message: ro_additional.additional_input.error,
                });
              }
            });
            break;
          default:
            acc[id] = z.string();
            break;
        }

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

  // useSyncFormValues(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 border-t border-gray-100 pt-5"
      >
        {items.data
          .sort((a, b) => +a.display_order - +b.display_order)
          .map(({ id, title, description, display_order, category, input }) => {
            return (
              <FormField
                key={id}
                control={form.control}
                name={`${id}`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      {`${category.display_order}.${display_order}`} {title}
                    </FormLabel>
                    <div className="prose">{parse(description)}</div>

                    {input.type === "text" && (
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                    )}

                    {input.type === "radio" && (
                      <>
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
                            {input.radio_options.map(({ value, label }) => (
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

                        {input.radio_options.map(({ value, additional_input }) => (
                          <FormField
                            key={value}
                            control={form.control}
                            name={`${id}`}
                            render={({ field }) => (
                              <>
                                {field.value?.answer === value && additional_input && (
                                  <FormItem>
                                    <FormLabel>{additional_input?.label}</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        rows={5}
                                        {...field}
                                        value={field.value?.notes}
                                        onChange={(e) => {
                                          field.onChange({
                                            ...field.value,
                                            [additional_input?.id]: e.target.value,
                                          });
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              </>
                            )}
                          />
                        ))}
                      </>
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
