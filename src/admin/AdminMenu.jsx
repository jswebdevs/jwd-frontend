import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  Images
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";


// Helper Component for individual items
const SidebarItem = ({ icon, text, active, isOpen }) => (
  <div
    className={`
    flex items-center p-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap
    ${
      active
        ? "bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
    }
  `}
  >
    <div className="min-w-[20px]">{icon}</div>
    <span
      className={`ml-3 font-medium transition-all duration-300 overflow-hidden ${
        !isOpen ? "w-0 opacity-0" : "w-auto opacity-100"
      }`}
    >
      {text}
    </span>
  </div>
);

const AdminMenu = ({ isSidebarOpen, setSidebarOpen }) => {
  // 1. Get current route to highlight the active menu item automatically
  const location = useLocation();

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col border-r dark:border-gray-700 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header / Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
        <h1
          className={`font-bold text-xl text-blue-600 transition-opacity duration-300 ${
            !isSidebarOpen ? "opacity-0 w-0 hidden" : "opacity-100"
          }`}
        >
          AdminPanel
        </h1>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link to="/admin/dashboard">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={isActive("/admin/dashboard")}
            isOpen={isSidebarOpen}
          />
        </Link>

        <Link to="/admin/projects">
          <SidebarItem
            icon={<Briefcase size={20} />}
            text="Projects"
            active={isActive("/admin/projects")}
            isOpen={isSidebarOpen}
          />
        </Link>

        <Link to="/admin/services">
          <SidebarItem
            icon={<Settings size={20} />}
            text="Services"
            active={isActive("/admin/services")}
            isOpen={isSidebarOpen}
          />
        </Link>
        <Link to="/admin/media">
          <SidebarItem
            icon={<Images size={20} />}
            text="Gallery"
            active={isActive("/admin/media")}
            isOpen={isSidebarOpen}
          />
        </Link>

        <Link to="/admin/team">
          <SidebarItem
            icon={<Users size={20} />}
            text="Team"
            active={isActive("/admin/team")}
            isOpen={isSidebarOpen}
          />
        </Link>

        <Link to="/admin/messages">
          <SidebarItem
            icon={<MessageSquare size={20} />}
            text="Messages"
            active={isActive("/admin/messages")}
            isOpen={isSidebarOpen}
          />
        </Link>
      </nav>
    </div>
  );
};

export default AdminMenu;
