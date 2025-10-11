
import React, { useRef } from 'react';
import { Package, X, Download, Upload, Trash2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import type { Tool } from '../types';

const MyStack: React.FC = () => {
  const { stack, removeFromStack, clearStack, setStack } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportStack = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(stack, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "ai-tool-stack.json";
    link.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const importStack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedStack = JSON.parse(content);
          // Basic validation
          if (Array.isArray(importedStack) && importedStack.every(item => 'name' in item && 'link' in item)) {
            setStack(importedStack as Tool[]);
          } else {
            alert('Invalid stack file format.');
          }
        } catch (error) {
          alert('Error parsing stack file.');
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleClearStack = () => {
      if(window.confirm('Are you sure you want to clear your entire stack? This cannot be undone.')) {
          clearStack();
      }
  }

  return (
    <aside className="w-64 bg-slate-800/50 border-l border-slate-700 p-4 flex-shrink-0 flex flex-col">
      <div className="flex items-center gap-2 text-white font-bold mb-4">
        <Package size={20} />
        <h2>My Stack</h2>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {stack.length === 0 ? (
          <p className="text-slate-500 text-sm text-center mt-4">Your stack is empty. Add tools to get started!</p>
        ) : (
          <ul className="space-y-2">
            {stack.map(tool => (
              <li key={tool.name} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-md">
                <span className="text-slate-300 text-sm truncate">{tool.name}</span>
                <button onClick={() => removeFromStack(tool.name)} className="text-slate-500 hover:text-red-500 transition-colors">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {stack.length > 0 && 
        <div className="mt-auto pt-4 border-t border-slate-700 space-y-2">
            <button onClick={exportStack} className="w-full flex items-center justify-center gap-2 text-sm bg-slate-700 text-slate-300 px-3 py-2 rounded-md hover:bg-slate-600 transition-colors">
                <Download size={16} /> Export Stack
            </button>
            <button onClick={handleImportClick} className="w-full flex items-center justify-center gap-2 text-sm bg-slate-700 text-slate-300 px-3 py-2 rounded-md hover:bg-slate-600 transition-colors">
                <Upload size={16} /> Import Stack
            </button>
            <input type="file" accept=".json" ref={fileInputRef} onChange={importStack} className="hidden" />
            <button onClick={handleClearStack} className="w-full flex items-center justify-center gap-2 text-sm bg-red-900/50 text-red-400 px-3 py-2 rounded-md hover:bg-red-900 transition-colors">
                <Trash2 size={16} /> Clear Stack
            </button>
        </div>
      }
    </aside>
  );
};

export default MyStack;
