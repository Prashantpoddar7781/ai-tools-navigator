// src/Header.jsx
import React from "react";
import { Menu } from "lucide-react";
import { useStore } from "./storecontext.jsx"; // ✅ bring in auth state

function Header({ setSidebarOpen, sidebarOpen }) {
  const { user, logout } = useStore(); // ✅ get user + logout

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center z-50">
      {/* App title */}
      <h1 className="text-lg font-bold">AI Tools Navigator</h1>

      {/* Right side: user info + menu */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm font-medium text-gray-800">
            {user.username}
          </span>
        )}

        {/* Logout button */}
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

        {/* Sidebar toggle (mobile menu) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
          className="text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;
