"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { usePostAuthResetPassword } from "@/types/generated/users-permissions-auth";

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

const formSchema = z
  .object({
    password: z.string().nonempty({ message: "Please enter your password" }).min(6, {
      message: "Please enter a password with at least 6 characters",
    }),
    passwordConfirmation: z
      .string()
      .nonempty({ message: "Please enter your confirmed password" })
      .min(6, { message: "Please enter a password with at least 6 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export default function ResetPassword() {
  const [success, setSuccess] = useState(false);

  const t = useTranslations();

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const signupMutation = usePostAuthResetPassword();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // 3. Submit the form.
    signupMutation.mutate(
      {
        data: {
          ...values,
          code: searchParams.get("code") ?? "",
        },
      },
      {
        onSuccess: () => {
          setSuccess(true);
          replace(`/auth/reset-password`);
        },
        onError: (error) => {
          console.error(error);
          const sp = new URLSearchParams(searchParams);
          sp.set("error", error?.response?.data?.error?.message ?? "Unknown error");
          replace(`/auth/reset-password?${sp.toString()}`);
        },
      },
    );
  }

  return (
    <Card className="min-w-[380px]">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        {!!searchParams.get("error") && (
          <div className="rounded-md bg-destructive/90 p-3 text-sm text-destructive-foreground">
            {searchParams.get("error")}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!!success && (
          <div className="prose max-w-xs">
            <h3>{t("success")}</h3>
            <p>You have changed your password successfully.</p>
            <Link href="/auth/signin">
              <Button>{t("sig_in")}</Button>
            </Link>
          </div>
        )}

        {!success && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <fieldset className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirm_passsword")}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
              <div className="space-y-3">
                <Button className="w-full" type="submit">
                  {t("reset_password")}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
