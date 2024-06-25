"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { usePostAuthForgotPassword } from "@/types/generated/users-permissions-auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Link, useRouter } from "@/i18n";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
});

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);

  const t = useTranslations();

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const forgotPasswordMutation = usePostAuthForgotPassword();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // 3. Submit the form.
    forgotPasswordMutation.mutate(
      {
        data: values,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          replace(`/auth/forgot-password`);
        },
        onError: (error) => {
          console.error(error);
          const searchParams = new URLSearchParams();
          searchParams.set("error", error?.response?.data?.error?.message ?? "Unknown error");
          replace(`/auth/forgot-password?${searchParams.toString()}`);
        },
      },
    );
  }

  return (
    <Card className="min-w-[380px]">
      <CardHeader>
        <CardTitle>{t("forgot_password")}</CardTitle>
        {!!searchParams.get("error") && (
          <div className="rounded-md bg-destructive/90 p-3 text-sm text-destructive-foreground">
            {searchParams.get("error")}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {success && (
          <div className="prose max-w-xs">
            <h3>{t("success")}</h3>
            <p>{t("reset_password_notification")}</p>
          </div>
        )}

        {!success && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <fieldset className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
              <div className="space-y-3">
                <Button className="w-full" type="submit">
                  {t("send")}
                </Button>

                <p className="text-center text-sm">
                  {t("sign_in_cta")}{" "}
                  <Link className="text-primary hover:underline" href="/auth/signin">
                    {t("sig_in")}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
