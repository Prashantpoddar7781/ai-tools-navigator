
import React, { useState } from 'react';
import { Gem, LayoutGrid, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { useStore } from '../hooks/useStore';

const CategorySidebar: React.FC = () => {
  const { activeSubCategory, setActiveSubCategory } = useStore();
  const [openCategories, setOpenCategories] = useState<string[]>(CATEGORIES.map(c => c.name));

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  const activeClass = "bg-slate-700 text-cyan-400";
  const inactiveClass = "text-slate-400 hover:bg-slate-700 hover:text-slate-200";

  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700 p-4 flex-shrink-0">
      <div className="flex items-center gap-2 text-white font-bold mb-4">
        <Gem size={20} />
        <h2>Categories</h2>
      </div>
      <nav className="space-y-2">
        <button
          onClick={() => setActiveSubCategory(null)}
          className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${!activeSubCategory ? activeClass : inactiveClass}`}
        >
          <LayoutGrid size={16} />
          All Tools
        </button>

        {CATEGORIES.map(category => (
          <div key={category.name}>
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full text-left flex items-center justify-between gap-2 px-3 py-2 rounded-md text-white font-semibold text-sm transition-colors duration-200 hover:bg-slate-700"
            >
              <div className="flex items-center gap-2">
                <category.icon size={16} />
                <span>{category.name}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${openCategories.includes(category.name) ? 'rotate-180' : ''}`} />
            </button>
            {openCategories.includes(category.name) && (
              <div className="pl-6 pt-2 space-y-1">
                {category.subCategories.map(sub => (
                  <button
                    key={sub.name}
                    onClick={() => setActiveSubCategory(sub.name)}
                    className={`w-full text-left block px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${activeSubCategory === sub.name ? activeClass : inactiveClass}`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
