// src/ToolDetailsModal.jsx
import React from "react";
import { useStore } from "./storecontext.jsx"; // same folder

function ToolDetailsModal({ tool }) {
  const { setSelectedTool } = useStore();

  const handleClose = () => setSelectedTool(null);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
      aria-describedby="tool-modal-description"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative transform transition-all animate-scaleIn"
      >
        {/* Close Button (top-right) */}
        <button
          onClick={handleClose}
          aria-label="Close tool details"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Tool Name */}
        <h2
          id="tool-modal-title"
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {tool.name}
        </h2>

        {/* Tool Description */}
        <p id="tool-modal-description" className="text-gray-600 mb-4">
          {tool.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${tool.name} website`}
            className="btn-primary text-center"
          >
            🌐 Visit Website
          </a>
          <button
            onClick={handleClose}
            aria-label="Close tool details"
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolDetailsModal;
