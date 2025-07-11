import LinkButton from "@/components/link-button";
import UserListTable from "@/components/user-list-table";

import React from "react";

const AdminDashboardPage = async () => {
  return (
    <div className="container">
      <div className="flex items-center gap-5 mb-5">
        <LinkButton label={"Back"} href={"/user-profile"} />
        <h1>Admin Dashboard</h1>
      </div>

      <UserListTable />
    </div>
  );
};

export default AdminDashboardPage;
