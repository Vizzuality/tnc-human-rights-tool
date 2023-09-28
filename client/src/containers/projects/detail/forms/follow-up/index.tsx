"use client";

import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  getGetProjectsIdQueryKey,
  useGetProjectsId,
  usePutProjectsId,
} from "@/types/generated/project";
import { ContextualRiskListResponseDataItem } from "@/types/generated/strapi.schemas";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FollowUpForm(props: ContextualRiskListResponseDataItem) {
  const { id: projectId, priorizationId } = useParams();

  const queryClient = useQueryClient();

  const { data: projectIdData } = useGetProjectsId(+projectId);
  const putProjectMutation = usePutProjectsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetProjectsIdQueryKey(+projectId));
      },
    },
  });

  const slug = props?.attributes?.contextual_risk_category?.data?.attributes?.slug ?? "";
  const risks = projectIdData?.data?.attributes?.risks as Risks;
  const RISK = risks[slug]?.[`${props.id}`] ?? {};

  const formSchema = z.object({
    follow_up_notes: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: RISK,
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
                    [`${props.id}`]: {
                      ...risks[slug]?.[`${props.id}`],
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
    <div>
      <div className="prose">
        <h2>
          {props?.attributes?.contextual_risk_category?.data?.attributes?.display_order}.
          {props?.attributes?.display_order}
          {" - "}
          {props?.attributes?.title}
        </h2>

        {priorizationId !== "more-research" && (
          <>
            <Label>Contextual Risk</Label>
            <p>{RISK.contextual_notes}</p>
          </>
        )}

        {priorizationId !== "more-research" && (
          <>
            <Label>Project Risk</Label>
            <p>{RISK.proyect_risk_notes}</p>
          </>
        )}

        {priorizationId !== "more-research" && (
          <>
            <Label>Research</Label>
            <p>{RISK.proyect_risk_research_notes}</p>
          </>
        )}

        {priorizationId !== "more-research" && (
          <>
            <Label>Project Risk Determination factors</Label>
            <p>{RISK.proyect_risk_key_determination_factors}</p>
          </>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 border-t border-gray-100 pt-5"
          >
            <FormField
              control={form.control}
              name="follow_up_notes"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Follow up plan</FormLabel>

                  <FormControl className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                    <Textarea rows={5} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FooterForm className="relative" />
          </form>
        </Form>
      </div>
    </div>
  );
}
