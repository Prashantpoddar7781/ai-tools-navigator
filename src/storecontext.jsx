import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // -------------------- State --------------------
  const [activeCategory, setActiveCategory] = useState("Marketing");
  const [stack, setStack] = useState(() => {
    try {
      const savedStack = localStorage.getItem("myStack");
      return savedStack ? JSON.parse(savedStack) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAll, setSearchAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [selectedTool, setSelectedTool] = useState(null);

  // -------------------- Auth State --------------------
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // -------------------- Auth Handlers --------------------
  const login = (username) => {
    const loggedInUser = { username };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // -------------------- Stack Handlers --------------------
  const addToStack = (tool) => {
    if (!stack.some((t) => t.name === tool.name)) {
      const updated = [...stack, tool];
      setStack(updated);
      localStorage.setItem("myStack", JSON.stringify(updated));
    }
  };

  const removeFromStack = (tool) => {
    const updated = stack.filter((t) => t.name !== tool.name);
    setStack(updated);
    localStorage.setItem("myStack", JSON.stringify(updated));
  };

  const clearStack = () => {
    setStack([]);
    localStorage.removeItem("myStack");
  };

  // -------------------- Context Value --------------------
  const value = {
    activeCategory,
    setActiveCategory,
    stack,
    addToStack,
    removeFromStack,
    clearStack,
    searchQuery,
    setSearchQuery,
    searchAll,
    setSearchAll,
    sortOrder,
    setSortOrder,
    selectedTool,
    setSelectedTool,

    // Auth
    user,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook for easy access
export function useStore() {
  return useContext(StoreContext);
}
