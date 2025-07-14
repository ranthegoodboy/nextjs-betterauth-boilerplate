"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  userProfileSchema,
  type UserProfileSchema,
} from "@/form-schemas/user-profile-schema";
import { updateUser } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserProfileFormProps {
  session: {
    expiresAt: Date;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    image?: string | null | undefined | undefined;
    role: "USER" | "ADMIN";
    isActive: boolean;
  };
}

export function UserProfileForm({ user, session }: UserProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null
  );
  const [imageError, setImageError] = useState(false);

  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
  });

  // Watch the image field to update preview
  const watchedImage = form.watch("image");
  React.useEffect(() => {
    if (watchedImage && watchedImage !== imagePreview) {
      // Validate if it's a proper URL
      try {
        new URL(watchedImage);
        setImagePreview(watchedImage);
        setImageError(false);
      } catch {
        // Invalid URL, don't update preview
        setImageError(true);
      }
    } else if (!watchedImage) {
      setImagePreview(null);
      setImageError(false);
    }
  }, [watchedImage, imagePreview]);

  async function onSubmit(values: UserProfileSchema) {
    startTransition(async () => {
      await updateUser({
        name: values.name,
        image: values.image,
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("User updated successfully!");
            router.refresh();
          },
        },
      });
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">User Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {imagePreview && !imageError ? (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    onError={() => {
                      setImageError(true);
                      setImagePreview(null);
                    }}
                    priority
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/your-image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Read-only User Info Display */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-gray-900">Account Information</h3>

              {/* Account Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Email:</span>
                  <p className="mt-1 text-gray-900 italic">{user.email}</p>
                </div>
                <div>
                  <span className="font-medium">Email Verified:</span>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.emailVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="font-medium">Role:</span>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="font-medium">Account Status:</span>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-gray-900">Session</h3>

              {/* Session Information Grid */}
              <div className="grid grid-cols-1  gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Session Created:</span>
                  <p className="mt-1 italic">
                    {new Date(session.createdAt).toLocaleDateString()} at{" "}
                    {new Date(session.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Session Expires:</span>
                  <p className="mt-1 italic">
                    {new Date(session.expiresAt).toLocaleDateString()} at{" "}
                    {new Date(session.expiresAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default UserProfileForm;
