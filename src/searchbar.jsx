// src/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";
import { useStore } from "./storecontext.jsx"; // same folder


function SearchBar() {
  const { searchQuery, setSearchQuery, searchAll, setSearchAll, sortOrder, setSortOrder } = useStore();

  return (
    <div
      className="flex flex-col gap-3 mb-6 bg-white shadow-md rounded-lg px-4 py-4"
      role="search"
      aria-label="Search tools"
    >
      {/* Search input */}
      <div className="flex items-center">
        <Search className="text-gray-400 mr-2" aria-hidden="true" focusable="false" />
        <input
          type="text"
          placeholder="Search tools..."
          aria-label="Search tools input"
          className="flex-1 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Checkbox + Sort dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={searchAll}
            onChange={(e) => setSearchAll(e.target.checked)}
            className="w-4 h-4"
          />
          Search all categories
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          aria-label="Sort tools"
        >
          <option value="A-Z">Sort: A → Z</option>
          <option value="Z-A">Sort: Z → A</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
