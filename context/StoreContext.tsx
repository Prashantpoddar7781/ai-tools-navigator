
import React, { createContext, useState, useEffect } from 'react';
import type { Tool } from '../types';

type View = 'finder' | 'mvp';
type SortOrder = 'A-Z' | 'Z-A';

interface StoreState {
  activeView: View;
  activeSubCategory: string | null;
  searchQuery: string;
  sortOrder: SortOrder;
  stack: Tool[];
  selectedTool: Tool | null;
  isSuggesterOpen: boolean;
  setActiveView: (view: View) => void;
  setActiveSubCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleSortOrder: () => void;
  addToStack: (tool: Tool) => void;
  removeFromStack: (toolName: string) => void;
  clearStack: () => void;
  setStack: (tools: Tool[]) => void;
  setSelectedTool: (tool: Tool | null) => void;
  setIsSuggesterOpen: (isOpen: boolean) => void;
}

export const StoreContext = createContext<StoreState | undefined>(undefined);

const getInitialStack = (): Tool[] => {
  try {
    const item = window.localStorage.getItem('aiToolStack');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return [];
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<View>('finder');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('A-Z');
  const [stack, setStack] = useState<Tool[]>(getInitialStack);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isSuggesterOpen, setIsSuggesterOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('aiToolStack', JSON.stringify(stack));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [stack]);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'A-Z' ? 'Z-A' : 'A-Z'));
  };

  const addToStack = (tool: Tool) => {
    if (!stack.some(t => t.name === tool.name)) {
      setStack(prev => [...prev, tool]);
    }
  };

  const removeFromStack = (toolName: string) => {
    setStack(prev => prev.filter(t => t.name !== toolName));
  };
  
  const clearStack = () => {
      setStack([]);
  }

  const value = {
    activeView,
    activeSubCategory,
    searchQuery,
    sortOrder,
    stack,
    selectedTool,
    isSuggesterOpen,
    setActiveView,
    setActiveSubCategory,
    setSearchQuery,
    toggleSortOrder,
    addToStack,
    removeFromStack,
    clearStack,
    setStack,
    setSelectedTool,
    setIsSuggesterOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
