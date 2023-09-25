"use client";

import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useGetContextualRisksId } from "@/types/generated/contextual-risk";
import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";
import { Risks } from "@/types/project";

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
import { Textarea } from "@/components/ui/textarea";

import { DETERMINATIONS, PRIORIZATIONS } from "@/constants";

export default function ProjectRiskForm() {
  const { id: projectId, ctxId } = useParams();

  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const { data: ctxIdData } = useGetContextualRisksId(+ctxId, {
    populate: "*",
  });
  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const slug = ctxIdData?.data?.attributes?.contextual_risk_category?.data?.attributes?.slug ?? "";
  const risks = projectIdData?.data?.attributes?.risks as Risks;

  const formSchema = z.object({
    proyect_risk_determination: z.enum(
      DETERMINATIONS.map(({ value }) => value) as [string, ...string[]],
    ),
    proyect_risk_priorization: z.enum(
      PRIORIZATIONS.filter(({ value }) => value !== "more-research").map(({ value }) => value) as [
        string,
        ...string[],
      ],
    ),
    contextual_notes: z.string(),
    proyect_risk_notes: z.string(),
    proyect_risk_research_notes: z.string(),
    proyect_risk_key_determination_factors: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: risks[slug]?.[`${ctxId}`],
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
                risks: {
                  ...risks,
                  [slug]: {
                    ...risks[slug],
                    [`${ctxId}`]: {
                      ...risks[slug]?.[`${ctxId}`],
                      ...values,
                    },
                  },
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
        <FormField
          control={form.control}
          name="proyect_risk_determination"
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
          name="proyect_risk_priorization"
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
          name="contextual_notes"
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
          name="proyect_risk_notes"
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
          name="proyect_risk_research_notes"
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
          name="proyect_risk_key_determination_factors"
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

        <FooterForm />
      </form>
    </Form>
  );
}
