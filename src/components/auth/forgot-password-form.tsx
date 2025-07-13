"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  formgotPasswordSchema,
  type FormgotPasswordSchema,
} from "@/form-schemas/forgot-password-schema";
import { forgetPassword } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormgotPasswordSchema>({
    resolver: zodResolver(formgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormgotPasswordSchema) {
    startTransition(async () => {
      await forgetPassword({
        email: values.email,
        redirectTo: "/auth/reset-password",
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Reset password email sent.");
            form.reset();
            router.push("/auth/login");
          },
          onRequest: () => {},
        },
      });
    });
  }

  return (
    <div className="max-w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                    className="w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-fit" disabled={isPending}>
            Send Password Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
