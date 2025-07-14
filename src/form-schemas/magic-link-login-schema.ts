import * as z from "zod";

export const magicLinkLoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type MagicLinkLoginSchema = z.infer<typeof magicLinkLoginSchema>;
