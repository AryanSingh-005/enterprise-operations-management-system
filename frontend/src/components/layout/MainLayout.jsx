// Renders the interface and behavior for this application module.

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <div className="hidden w-64 shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative h-full w-64">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-lg bg-slate-800 px-3 py-2 text-white"
              aria-label="Close navigation menu"
            >
              ✕
            </button>

            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Enterprise Operations Management System.
          All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;
