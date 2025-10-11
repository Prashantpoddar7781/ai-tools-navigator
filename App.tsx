
import React from 'react';
import { useStore } from './hooks/useStore';
import { StoreProvider } from './context/StoreContext';
import { CATEGORIES } from './constants';
import type { Tool } from './types';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import MyStack from './components/MyStack';
import ToolCard from './components/ToolCard';
import ToolDetailsModal from './components/ToolDetailsModal';
import GeminiToolSuggester from './components/GeminiToolSuggester';
import MVPBuilderPage from './components/MVPBuilderPage';
import { Search, SortAsc, SortDesc } from 'lucide-react';

const ToolFinderView: React.FC = () => {
    const { activeSubCategory, searchQuery, setSearchQuery, sortOrder, toggleSortOrder } = useStore();

    const allToolsWithCategory = React.useMemo(() => {
        return CATEGORIES.flatMap(category => 
            category.subCategories.flatMap(sub => 
                sub.tools.map(tool => ({ ...tool, categoryIcon: category.icon, subCategoryName: sub.name }))
            )
        );
    }, []);

    const filteredAndSortedTools = React.useMemo(() => {
        let tools = allToolsWithCategory;

        if (activeSubCategory) {
            tools = tools.filter(tool => tool.subCategoryName === activeSubCategory);
        }

        if (searchQuery) {
            tools = tools.filter(tool => 
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                tool.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        tools.sort((a, b) => {
            if (sortOrder === 'A-Z') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        return tools;
    }, [allToolsWithCategory, activeSubCategory, searchQuery, sortOrder]);

    return (
        <div className="flex-grow flex flex-col min-h-0">
             <div className="sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10 p-4 border-b border-slate-700">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-md pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <button onClick={toggleSortOrder} className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white hover:bg-slate-700">
                        {sortOrder === 'A-Z' ? <SortAsc size={20} /> : <SortDesc size={20} />}
                        Sort: {sortOrder}
                    </button>
                </div>
            </div>
            <main className="flex-grow p-4 md:p-6 overflow-y-auto">
                {filteredAndSortedTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredAndSortedTools.map(tool => (
                            <ToolCard key={tool.name} tool={tool} categoryIcon={tool.categoryIcon} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <p className="text-xl font-semibold">No tools found</p>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}

                 {!activeSubCategory && !searchQuery && (
                    <div className="text-center text-slate-400 mt-10 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
                         <h2 className="text-2xl font-bold text-white mb-2">Welcome to the AI Tool Directory!</h2>
                         <p>Select a category on the left or use the search bar to find the perfect tool for your needs.</p>
                     </div>
                 )}
            </main>
        </div>
    );
};


const AppContent: React.FC = () => {
    const { activeView } = useStore();

    return (
        <div className="h-screen w-screen bg-slate-900 text-slate-200 flex flex-col">
            <ToolDetailsModal />
            <GeminiToolSuggester />
            <Header />
            <div className="flex-grow flex min-h-0">
                {activeView === 'finder' && <div className="hidden md:block"><CategorySidebar /></div>}
                <div className="flex-grow overflow-y-auto">
                    {activeView === 'finder' ? <ToolFinderView /> : <MVPBuilderPage />}
                </div>
                {activeView === 'finder' && <div className="hidden lg:block"><MyStack /></div>}
            </div>
        </div>
    );
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
