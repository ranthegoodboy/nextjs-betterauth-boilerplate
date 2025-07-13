import * as z from "zod";

export const formgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type FormgotPasswordSchema = z.infer<typeof formgotPasswordSchema>;
