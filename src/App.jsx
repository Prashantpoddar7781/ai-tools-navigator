// src/App.jsx
import React from "react";
import {
  DollarSign,
  PenTool,
  Brain,
  AlertTriangle,
  Search as SearchIcon,
  Megaphone,
  Clock,
} from "lucide-react";

import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import SearchBar from "./searchbar.jsx";
import ToolCard from "./toolcard.jsx";
import ToolDetailsModal from "./ToolDetailsModal.jsx";
import ErrorBoundary from "./errorboundary.jsx";
import { useStore } from "./storecontext.jsx";
import Login from "./Login.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

function App() {
  // -------------------- Global State --------------------
  const {
    activeCategory,
    setActiveCategory,
    stack,
    addToStack,
    removeFromStack,
    clearStack,
    searchQuery,
    searchAll,
    sortOrder,
    selectedTool,
    setSelectedTool,

    // ✅ Auth
    user,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // ✅ fake loading state

  // -------------------- Fake App Loading --------------------
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // simulate load
    return () => clearTimeout(timer);
  }, []);

  // -------------------- Categories + Tools --------------------
  const categories = {
    "AI Tools": {
      icon: <Brain className="w-5 h-5 inline mr-2" aria-hidden="true" />,
      tools: [
        {
          name: "ChatGPT",
          description: "AI assistant for answering questions and generating text.",
          link: "https://chat.openai.com/",
        },
        {
          name: "MidJourney",
          description: "AI-powered image generation.",
          link: "https://www.midjourney.com/",
        },
      ],
    },
    Marketing: {
      icon: <Megaphone className="w-5 h-5 inline mr-2" aria-hidden="true" />,
      tools: [
        {
          name: "HubSpot",
          description: "Marketing automation and CRM platform.",
          link: "https://www.hubspot.com/",
        },
        {
          name: "Mailchimp",
          description: "Email marketing and automation tool.",
          link: "https://mailchimp.com/",
        },
      ],
    },
    Finance: {
      icon: <DollarSign className="w-5 h-5 inline mr-2" aria-hidden="true" />,
      tools: [
        {
          name: "QuickBooks",
          description: "Accounting software for small businesses.",
          link: "https://quickbooks.intuit.com/",
        },
        {
          name: "Stripe",
          description: "Online payment processing for internet businesses.",
          link: "https://stripe.com/",
        },
      ],
    },
    Productivity: {
      icon: <Clock className="w-5 h-5 inline mr-2" aria-hidden="true" />,
      tools: [
        {
          name: "Notion",
          description: "All-in-one workspace for notes, tasks, and projects.",
          link: "https://www.notion.so/",
        },
        {
          name: "Trello",
          description: "Project management tool with boards and tasks.",
          link: "https://trello.com/",
        },
      ],
    },
    Design: {
      icon: <PenTool className="w-5 h-5 inline mr-2" aria-hidden="true" />,
      tools: [
        {
          name: "Canva",
          description: "Graphic design tool for everyone.",
          link: "https://www.canva.com/",
        },
        {
          name: "Figma",
          description: "Collaborative interface design tool.",
          link: "https://www.figma.com/",
        },
      ],
    },
  };

  // -------------------- Filtering + Sorting --------------------
  let filteredTools = [];

  try {
    if (searchAll) {
      Object.values(categories).forEach((cat) => {
        filteredTools.push(
          ...cat.tools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tool.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
    } else {
      filteredTools =
        categories[activeCategory]?.tools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
    }

    if (sortOrder === "A-Z") {
      filteredTools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      filteredTools.sort((a, b) => b.name.localeCompare(a.name));
    }
  } catch (err) {
    console.error("Filtering/Sorting failed", err);
    setError("Something went wrong while filtering tools.");
  }

  // -------------------- Guards --------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner size={12} color="blue" />
      </div>
    );
  }

  if (!user) {
    return <Login />; // ✅ Show login until user logs in
  }

  // -------------------- Render --------------------
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Header (mobile) */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Sidebar */}
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        stack={stack}
        removeFromStack={removeFromStack}
        clearStack={clearStack}
      />

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 p-4 sm:p-6 md:p-8 md:ml-0 mt-16 md:mt-0"
        role="main"
      >
        {/* Search */}
        <SearchBar />

        {/* Error Fallback */}
        {error && (
          <div
            className="mb-6 flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg"
            role="alert"
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* ✅ Wrap tools grid in ErrorBoundary */}
        <ErrorBoundary>
          {filteredTools.length === 0 ? (
            <div
              className="p-6 text-center text-gray-600 bg-white rounded-lg shadow flex flex-col items-center justify-center"
              role="status"
            >
              <SearchIcon
                className="w-8 h-8 text-gray-400 mb-2"
                aria-hidden="true"
              />
              <p className="font-medium">
                No tools found for "{searchQuery}".
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different keyword or check another category.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              aria-label={`${activeCategory} tools`}
            >
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  tool={tool}
                  addToStack={addToStack}
                  setSelectedTool={setSelectedTool}
                />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* ✅ Wrap modal in ErrorBoundary */}
      {selectedTool && (
        <ErrorBoundary>
          <ToolDetailsModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
