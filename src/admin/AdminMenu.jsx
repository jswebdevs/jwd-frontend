import {useState}  from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, active, isOpen }) => (
  <div
    className={`
    flex items-center p-3 rounded-lg cursor-pointer transition-colors
    ${
      active
        ? "bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }
  `}
  >
    {icon}
    <span
      className={`ml-3 font-medium transition-all duration-300 ${
        !isOpen && "hidden"
      }`}
    >
      {text}
    </span>
  </div>
);

const AdminMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div>
      {/* --- SIDEBAR --- */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 dark:text-white shadow-lg transition-all duration-300 flex flex-col h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1
            className={`font-bold text-xl text-blue-600 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            AdminPanel
          </h1>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active={true}
              isOpen={isSidebarOpen}
            />
          </Link>
          <Link to="/admin/projects">
            <SidebarItem
              icon={<Briefcase size={20} />}
              text="Projects"
              isOpen={isSidebarOpen}
            />
          </Link>
          <Link to="/admin/services">
            <SidebarItem
              icon={<Settings size={20} />}
              text="Services"
              isOpen={isSidebarOpen}
            />
          </Link>
          <Link to="/admin/team">
            <SidebarItem
              icon={<Users size={20} />}
              text="Team"
              isOpen={isSidebarOpen}
            />
          </Link>
          <Link to="/admin/messages">
            <SidebarItem
              icon={<MessageSquare size={20} />}
              text="Messages"
              isOpen={isSidebarOpen}
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
