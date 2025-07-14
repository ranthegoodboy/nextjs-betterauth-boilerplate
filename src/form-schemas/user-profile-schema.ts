import * as z from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z
    .string()
    .url({
      message: "Please enter a valid image URL.",
    })
    .optional()
    .or(z.literal("")),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
