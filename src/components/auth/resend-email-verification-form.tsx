"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type EmailVerificationSchema,
  emailVerificationSchema,
} from "@/form-schemas/email-verification-schema";
import { sendVerificationEmail } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ResendEmailVerificationForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<EmailVerificationSchema>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: EmailVerificationSchema) {
    startTransition(async () => {
      await sendVerificationEmail({
        email: values.email,
        callbackURL: "/auth/verify",
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Verification email sent.");
            form.reset();
            router.push("/auth/verify?success=true");
          },
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
            Resend Verification Email
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResendEmailVerificationForm;
