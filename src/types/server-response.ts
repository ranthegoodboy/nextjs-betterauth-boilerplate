import { UserRole } from "@/generated/prisma";
import { User } from "better-auth";

export type ActionResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
  status: number;
};

export type UserType = {
  role: UserRole;
  isActive: boolean;
} & User;
