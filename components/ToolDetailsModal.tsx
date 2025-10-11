
import React from 'react';
import { useStore } from '../hooks/useStore';
import { X, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react';

const ToolDetailsModal: React.FC = () => {
  const { selectedTool, setSelectedTool } = useStore();

  if (!selectedTool) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedTool(null)}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">{selectedTool.name}</h2>
          <button onClick={() => setSelectedTool(null)} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow">
          <p className="text-slate-300 mb-6">{selectedTool.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle size={20} /> Pros
              </h3>
              <ul className="space-y-2 list-inside">
                {selectedTool.pros.map((pro, index) => (
                  <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                <XCircle size={20} /> Cons
              </h3>
              <ul className="space-y-2 list-inside">
                {selectedTool.cons.map((con, index) => (
                  <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                    <XCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        
        <footer className="p-4 border-t border-slate-700 flex-shrink-0">
          <a
            href={selectedTool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
          >
            Visit Website <ArrowUpRight size={18} />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ToolDetailsModal;
