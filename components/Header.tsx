import React from 'react';
import { Compass, Rocket, Sparkles } from 'lucide-react';
import { useStore } from '../hooks/useStore';

const Header: React.FC = () => {
  const { activeView, setActiveView, setIsSuggesterOpen } = useStore();

  const baseButtonClass = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200";
  const activeButtonClass = "bg-slate-700 text-white";
  const inactiveButtonClass = "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white";

  return (
    <header className="py-6 px-4 md:px-8 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            AI Tool Directory
          </h1>
          <p className="text-slate-400">Your curated guide to the world of AI.</p>
        </div>
        <div className="flex items-center bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('finder')}
            className={`${baseButtonClass} ${activeView === 'finder' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Compass size={18} />
            Tool Finder
          </button>
          <button
            onClick={() => setActiveView('mvp')}
            className={`${baseButtonClass} ${activeView === 'mvp' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Rocket size={18} />
            Create Your MVP
          </button>
        </div>
      </div>
      {activeView === 'finder' && (
        <div className="max-w-7xl mx-auto mt-6 flex justify-center">
            <button 
                onClick={() => setIsSuggesterOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-transform transform hover:scale-105 duration-300"
            >
                <Sparkles size={20} />
                Can't find a tool? Ask our AI Suggester!
            </button>
        </div>
      )}
    </header>
  );
};

export default Header;