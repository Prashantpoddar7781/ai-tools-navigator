
import React from 'react';
import type { LucideProps } from 'lucide-react';
import { Plus, Info, ArrowUpRight, Check } from 'lucide-react';
import type { Tool } from '../types';
import { useStore } from '../hooks/useStore';

interface ToolCardProps {
  tool: Tool;
  categoryIcon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, categoryIcon: CategoryIcon }) => {
  const { stack, addToStack, setSelectedTool } = useStore();
  const isInStack = stack.some(t => t.name === tool.name);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col justify-between hover:border-cyan-500 transition-colors duration-300">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white">{tool.name}</h3>
          <div className="p-1.5 bg-slate-700 rounded-md">
            <CategoryIcon className="text-cyan-400" size={20} />
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-4 h-20 overflow-hidden">
          {tool.description}
        </p>
      </div>
      <div className="flex gap-2 justify-end mt-auto">
        <button
          onClick={() => addToStack(tool)}
          disabled={isInStack}
          className="flex-1 text-sm flex items-center justify-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 bg-slate-700 text-slate-300 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed hover:enabled:bg-cyan-600 hover:enabled:text-white"
        >
          {isInStack ? <Check size={16} /> : <Plus size={16} />}
          {isInStack ? 'In Stack' : 'Add'}
        </button>
        <button
          onClick={() => setSelectedTool(tool)}
          className="flex-1 text-sm flex items-center justify-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 bg-slate-700 text-slate-300 hover:bg-cyan-600 hover:text-white"
        >
          <Info size={16} /> Details
        </button>
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm flex items-center justify-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 bg-slate-700 text-slate-300 hover:bg-cyan-600 hover:text-white"
        >
          <ArrowUpRight size={16} /> Visit
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
