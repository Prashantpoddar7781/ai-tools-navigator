// src/CustomMessage.jsx
import React from "react";

function CustomMessage({ tools }) {
  if (!tools) {
    // Default welcome message (first load)
    return (
      <div className="text-center text-gray-700 mt-16">
        <div className="text-4xl mb-3">👋</div>
        <h2 className="text-2xl font-semibold">Welcome to AI Marketplace 🚀</h2>
        <p className="text-gray-500 mt-2">
          Explore categories and discover the right AI tools for your needs.
        </p>
      </div>
    );
  }

  if (Array.isArray(tools) && tools.length === 0) {
    // No tools available
    return (
      <div className="text-center text-gray-600 mt-16">
        <div className="text-5xl mb-3">🔍</div>
        <h2 className="text-xl font-semibold">No tools found</h2>
        <p className="text-gray-500 mt-1">
          Try another category or adjust your search.
        </p>
      </div>
    );
  }

  return null; // If tools exist, show nothing here
}

export default CustomMessage;
