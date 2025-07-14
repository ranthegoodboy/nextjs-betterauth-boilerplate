import * as z from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Current Password must be at least 6 characters.",
  }),
  newPassword: z.string().min(6, {
    message: "New Password must be at least 6 characters.",
  }),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
