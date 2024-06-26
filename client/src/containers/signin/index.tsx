"use client";

import { useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { z } from "zod";

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

import { Link } from "@/i18n";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
  password: z.string().nonempty({ message: "Please enter your password" }),
});

export default function Signin() {
  const t = useTranslations();
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: searchParams.get("callbackUrl") ?? "/projects",
    });
  }

  return (
    <Card className="min-w-[380px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        {!!searchParams.get("error") && (
          <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">
            Invalid username or password. Please try again.
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <fieldset className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </fieldset>

            <div className="space-y-3">
              <Button className="w-full" type="submit">
                {t("sig_in")}
              </Button>
              <p className="text-center text-sm">
                {t("sign_up_cta")}{" "}
                <Link className="text-primary hover:underline" href="/auth/signup">
                  {t("sign_up")}
                </Link>
              </p>
              <p className="text-center text-sm">
                {t("forgot_password_cta")}{" "}
                <Link className="text-primary hover:underline" href="/auth/forgot-password">
                  {t("reset_password")}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
