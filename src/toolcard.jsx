// src/ToolCard.jsx
import React from "react";
import { useStore } from "./storecontext.jsx"; // same folder

function ToolCard({ tool }) {
  const { addToStack, setSelectedTool } = useStore();

  return (
    <div
      className="bg-white shadow-md rounded-xl p-5 transition transform hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] duration-200 ease-in-out"
    >
      {/* Tool Title */}
      <h3 className="text-lg font-bold text-gray-800">{tool.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{tool.description}</p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => addToStack(tool)}
          aria-label={`Add ${tool.name} to My Stack`}
          className="btn-success"
        >
          Add to Stack
        </button>

        <button
          onClick={() => setSelectedTool(tool)}
          aria-label={`View details for ${tool.name}`}
          className="btn-secondary"
        >
          View Details
        </button>

        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${tool.name} website`}
          className="btn-primary text-center"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
}

export default ToolCard;
