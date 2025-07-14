"use client";

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
import {
  type MagicLinkLoginSchema,
  magicLinkLoginSchema,
} from "@/form-schemas/magic-link-login-schema";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const MagicLinkLoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<MagicLinkLoginSchema>({
    resolver: zodResolver(magicLinkLoginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: MagicLinkLoginSchema) {
    startTransition(async () => {
      await signIn.magicLink({
        email: values.email,
        name: values.email.split("@")[0],
        callbackURL: "/user-profile",
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Magic link sent. Please check your email.");
            form.reset();
          },
          onRequest: () => {},
        },
      });
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="" disabled={isPending}>
            Send Magic Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MagicLinkLoginForm;
