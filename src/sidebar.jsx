// src/Sidebar.jsx
import React from "react";
import { X } from "lucide-react";
import StackSection from "./StackSection.jsx"; // ✅ fixed casing
import { useStore } from "./storecontext.jsx"; // ✅ same folder

function Sidebar({ categories, sidebarOpen, setSidebarOpen }) {
  const { activeCategory, setActiveCategory, stack, removeFromStack, clearStack } =
    useStore();

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 z-40 overflow-y-auto ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
      aria-label="Sidebar with categories and your saved stack"
    >
      {/* Sidebar Header (mobile close) */}
      <div className="flex justify-between items-center mb-5 md:mb-6">
        <h2 className="text-lg font-bold text-gray-800">Categories</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Category List */}
      <nav className="flex flex-col gap-2 mb-8" aria-label="Tool categories">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSidebarOpen(false);
            }}
            aria-pressed={activeCategory === category}
            aria-label={`Show ${category} tools`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              activeCategory === category
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {categories[category].icon}
            <span>{category}</span>
          </button>
        ))}
      </nav>

      {/* My Stack */}
      <StackSection
        stack={stack}
        removeFromStack={removeFromStack}
        clearStack={clearStack}
      />
    </aside>
  );
}

export default Sidebar;
