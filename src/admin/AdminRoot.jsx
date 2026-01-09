import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const AdminRoot = () => {
  // 1. State is managed here so both the Menu and the Content know about it
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Wrapper - Fixed Position */}
      <div className="absolute top-20 left-0 z-50 h-full">
        <AdminMenu
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main Content Area */}
      {/* We dynamically change the left margin based on sidebar state */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-8 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
