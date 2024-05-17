"use client";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { usePostProjects } from "@/types/generated/project";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your project name" }),
  description: z.string().min(5, { message: "Description must contain at least 5 characters" }),
});

export default function ProjectsNew() {
  const { push } = useRouter();

  const postProjectMutation = usePostProjects();

  const { toast } = useToast();

  const t = useTranslations();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    postProjectMutation.mutate(
      {
        data: {
          data: values,
        },
      },
      {
        onSuccess: (data) => {
          toast({
            variant: "success",
            title: "Great!",
            description: `Your project "${data?.data?.attributes?.name}" has been created successfully.`,
          });
          push(`/projects/${data?.data?.id}`);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "We couldn't create your project. Please try again.",
          });
        },
      },
    );
  }

  return (
    <Wrapper>
      <div className="max-w-6xl space-y-5">
        <h1 className="text-4xl">{t("new_project")}</h1>

        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <fieldset className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("name")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("description")}</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </fieldset>

                <div className="flex space-x-2">
                  <Link href="/projects">
                    <Button type="button" variant="secondary">
                      {t("cancel")}
                    </Button>
                  </Link>
                  <Button type="submit">{t("create")}</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
