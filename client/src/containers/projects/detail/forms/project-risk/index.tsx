"use client";
import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import { DETERMINATIONS, PRIORIZATIONS } from "@/constants";

export interface ProjectRiskFormProps extends PropsWithChildren {
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

export default function ProjectRiskForm() {
  const formSchema = z.object({
    determination: z.enum(DETERMINATIONS.map(({ value }) => value) as [string, ...string[]]),
    priorization: z.enum(
      PRIORIZATIONS.filter(({ value }) => value !== "more-research").map(({ value }) => value) as [
        string,
        ...string[],
      ],
    ),
    screening_notes: z.string(),
    specific_risk_notes: z.string(),
    research_notes: z.string(),
    key_determination_factors: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.info(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 border-t border-gray-100 pt-5"
      >
        <FormField
          control={form.control}
          name="determination"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Project Risk Determination</FormLabel>

              <FormControl className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                <RadioGroup
                  className="space-y-2.5"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {DETERMINATIONS.map(({ value, label }) => (
                    <FormItem key={value}>
                      <div className="flex items-center">
                        <FormControl>
                          <RadioGroupItem {...field} value={value} />
                        </FormControl>
                        <FormLabel className="cursor-pointer pl-2 font-normal">{label}</FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priorization"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Project Risk Prioritization</FormLabel>

              <FormControl className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                <RadioGroup
                  className="space-y-2.5"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {PRIORIZATIONS.filter(({ value }) => value !== "more-research").map(
                    ({ value, label }) => (
                      <FormItem key={value}>
                        <div className="flex items-center">
                          <FormControl>
                            <RadioGroupItem {...field} value={value} />
                          </FormControl>
                          <FormLabel className="cursor-pointer pl-2 font-normal">{label}</FormLabel>
                        </div>
                      </FormItem>
                    ),
                  )}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screening_notes"
          defaultValue="lorem ipsum"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Screening Notes</FormLabel>

              <div className="prose">Notes you previously entered in the contextual risk</div>

              <FormControl>
                <Textarea rows={5} readOnly {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specific_risk_notes"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Specific Risk Notes</FormLabel>

              <div className="prose">
                Describe the indicated risk as it applies to this project.
              </div>

              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="research_notes"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Research Notes</FormLabel>

              <div className="prose">
                Briefly describe research and Community engagement on this risk.
              </div>

              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="key_determination_factors"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Key Determination Factors</FormLabel>

              <div className="prose">
                Describe key factors used to determine the risk as high or low.
              </div>

              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
