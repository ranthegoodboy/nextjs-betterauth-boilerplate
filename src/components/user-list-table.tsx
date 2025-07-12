"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { DataTable } from "./table/data-table";

import { deleteUser } from "@/actions/user/delete-user.actions";
import { toggleUserActiveStatus } from "@/actions/user/toggle-user-active-status.actions";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useUsers } from "@/hooks/user-users";
import { UserType } from "@/types/server-response";
import { toast } from "sonner";

const createColumns = ({
  onToggleStatus,
  onDeleteUser,
}: {
  onToggleStatus: (id: string, checked: boolean) => void;
  onDeleteUser: (id: string) => void;
}): ColumnDef<UserType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-mono text-xs">
        {(row.getValue("id") as string).slice(0, 8)}...
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "ADMIN" ? "destructive" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active Status",
    cell: ({ row }) => {
      const user = row.original;
      const isActive = row.getValue("isActive");

      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={isActive as boolean}
            onCheckedChange={(checked) => onToggleStatus(user.id, checked)}
            aria-label={`Toggle active status for ${user.name}`}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
          />
          <span
            className={`text-sm ${
              isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified") as boolean;
      return (
        <Badge variant={verified ? "default" : "outline"}>
          {verified ? "Verified" : "Unverified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDeleteUser(user.id)}
            >
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const UserListTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const queryClient = useQueryClient();

  const handleToggleActiveStatus = async (id: string, checked: boolean) => {
    const { success, error } = await toggleUserActiveStatus(id, {
      isActive: checked,
    });
    if (success) {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        `User ${checked ? "activated" : "deactivated"} successfully!`
      );
    } else {
      toast.error(error || "Failed to update user status");
    }
  };

  const handleDeleteUser = async (id: string) => {
    const { success, error } = await deleteUser(id);
    if (success) {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfully deleted user!");
    } else {
      toast.error(error || "Failed to delete user");
    }
  };

  const columns = React.useMemo(
    () =>
      createColumns({
        onToggleStatus: handleToggleActiveStatus,
        onDeleteUser: handleDeleteUser,
      }),
    []
  );

  if (isError) return <div>Something went wrong. Please refresh the page.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!users) return null;

  return <DataTable columns={columns} data={users} />;
};

export default UserListTable;
