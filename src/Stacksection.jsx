// src/components/StackSection.jsx
import React from "react";
import { X, Package, Upload, Download, Trash2 } from "lucide-react";

function StackSection({ stack = [], removeFromStack, clearStack }) {
  // Handle export
  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(stack, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "my-stack.json");
    dlAnchor.click();
  };

  // Handle import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          localStorage.setItem("myStack", JSON.stringify(imported));
          window.location.reload();
        } else {
          alert("❌ Invalid stack file");
        }
      } catch (err) {
        alert("❌ Failed to import stack");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-10" aria-label="Your saved tools">
      <h2 className="text-lg font-bold mb-4 text-gray-800">My Stack</h2>

      {stack.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 text-sm bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
          <Package className="w-8 h-8 mb-2 text-gray-400" aria-hidden="true" />
          <p>Your stack is empty. Add some tools to get started!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {stack.map((tool, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${tool.name} website`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {tool.name}
                </a>
                <button
                  onClick={() => removeFromStack(tool)}
                  aria-label={`Remove ${tool.name} from My Stack`}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} aria-hidden="true" focusable="false" />
                </button>
              </li>
            ))}
          </ul>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-5">
            {/* Clear stack with confirmation */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your stack?")) {
                  clearStack();
                }
              }}
              aria-label="Clear all tools from My Stack"
              className="btn-danger flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Clear Stack
            </button>

            {/* Export stack */}
            <button
              onClick={handleExport}
              aria-label="Export your stack to a JSON file"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Export Stack
            </button>

            {/* Import stack */}
            <label className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
              <Upload size={16} />
              Import Stack
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                aria-label="Import your stack from a JSON file"
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default StackSection;
