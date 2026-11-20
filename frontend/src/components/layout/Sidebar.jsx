// Renders the interface and behavior for this application module.

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const { user } = useAuth();

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
      roles: ["SUPER_ADMIN", "ADMIN", "SITE_MANAGER", "EMPLOYEE"],
    },
    {
      name: "Site Management",
      path: "/sites",
      icon: "🏢",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      name: "Unit Management",
      path: "/units",
      icon: "🏗️",
      roles: ["SUPER_ADMIN", "ADMIN", "SITE_MANAGER"],
    },
    {
      name: "User Management",
      path: "/users",
      icon: "👥",
      roles: ["SUPER_ADMIN"],
    },
  ];

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-900 text-white">

      {/* Logo */}
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-xl font-bold">
          Enterprise Ops
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Operations Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {visibleNavigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* User Info */}
      <div className="border-t border-slate-700 p-5">
        <p className="truncate text-sm font-semibold">
          {user?.name || "User"}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {user?.email}
        </p>

        <span className="mt-3 inline-block rounded-full bg-blue-900 px-3 py-1 text-xs font-medium text-blue-200">
          {user?.role}
        </span>
      </div>

    </aside>
  );
};

export default Sidebar;
