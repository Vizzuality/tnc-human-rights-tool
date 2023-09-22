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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface CarbonOffsetProjectControversiesFormProps extends PropsWithChildren {
  projectId: string;
  items: PcbListResponse;
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
];

export default function CarbonOffsetProjectControversiesForm({
  projectId,
  items,
}: CarbonOffsetProjectControversiesFormProps) {
  const { data: projectIdData } = useGetProjectsId(+projectId);
  const putProjectMutation = usePutProjectsId();

  const formSchema = z.object({
    ...items?.data?.reduce(
      (acc, { id, attributes }) => {
        if (!id || !attributes) {
          return acc;
        }

        const { display_order, pcb_category } = attributes;

        acc[`${pcb_category?.data?.attributes?.display_order}-${display_order}`] = z.record(
          z.string(),
          z.string(),
        );

        return acc;
      },
      {} as Record<string, ZodTypeAny>,
    ),
  });

  const defaultValuesCategory = (projectIdData?.data?.attributes?.pcbs || {}) as Record<
    'carbon-offset-project-controversies' | 'geographic-scope',
    Record<string, { answer: string }>
    >;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesCategory['carbon-offset-project-controversies'],
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
                pcbs: {
                  ...defaultValuesCategory,
                  'carbon-offset-project-controversies': values,
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

        <FooterForm />
      </form>
    </Form>
  );
}
