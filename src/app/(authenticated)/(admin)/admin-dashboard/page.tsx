import { UserListTable } from "@/components/user-list-table";
import { db } from "@/lib/db";
import React from "react";

const AdminDashboardPage = async () => {
  const users = await db.user.findMany();

  console.log("users", users);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <UserListTable users={users} />
    </div>
  );
};

export default AdminDashboardPage;
