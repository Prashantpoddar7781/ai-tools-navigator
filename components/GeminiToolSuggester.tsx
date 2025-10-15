
import React, { useState, useMemo } from 'react';
import { useStore } from '../hooks/useStore';
import { Sparkles, X, Send } from 'lucide-react';
import { suggestTool } from '../services/geminiService';
import { CATEGORIES } from '../constants';
import Spinner from './Spinner';

const GeminiToolSuggester: React.FC = () => {
  const { isSuggesterOpen, setIsSuggesterOpen } = useStore();
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const allTools = useMemo(() =>
    CATEGORIES.flatMap(cat => cat.subCategories.flatMap(sub => sub.tools)),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const result = await suggestTool(task, allTools);
      setResponse(result);
    } catch (err) {
      setError('Failed to get a suggestion. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuggesterOpen(false);
    // Reset state on close after a short delay to allow fade out animation
    setTimeout(() => {
        setTask('');
        setResponse('');
        setError('');
        setIsLoading(false);
    }, 300);
  };

  if (!isSuggesterOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-cyan-400" />
            AI Tool Suggester
          </h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 flex-shrink-0">
          <label htmlFor="task-description" className="block text-slate-300 mb-2 font-medium">
            Describe the task you want to accomplish:
          </label>
          <textarea
            id="task-description"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., 'I want to create a professional marketing campaign for my new product, including social media posts, a landing page, and promotional videos.'"
            className="w-full h-24 p-2 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            disabled={isLoading}
          />
          <div className="mt-2 text-xs text-slate-400">
            💡 <strong>Examples:</strong> "Create a mobile app prototype", "Write a technical blog post", "Design a company logo", "Build an e-commerce website", "Create a video tutorial"
          </div>
          <button
            type="submit"
            disabled={isLoading || !task.trim()}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
          >
            {isLoading ? <Spinner /> : <Send size={18} />}
            {isLoading ? 'Thinking...' : 'Get Suggestion'}
          </button>
        </form>
        
        <div className="px-6 pb-6 overflow-y-auto">
            {(isLoading || response || error) && (
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                {isLoading && !response && (
                    <div className="flex items-center justify-center gap-3 text-slate-400">
                        <Spinner />
                        <span>Analyzing your task and creating a step-by-step workflow...</span>
                    </div>
                )}
                {error && <p className="text-red-400">{error}</p>}
                {response && (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <div 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: response
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>')
                            .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-3 border-b border-slate-600 pb-2">$1</h3>')
                            .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-cyan-400 mt-8 mb-4">$1</h2>')
                            .replace(/\*\*Tool:\*\* (.*)/g, '<div class="bg-slate-800 p-3 rounded-lg my-2"><strong class="text-cyan-400">Tool:</strong> <span class="text-white font-semibold">$1</span></div>')
                            .replace(/\*\*Why:\*\* (.*)/g, '<div class="text-slate-300 mb-2"><strong class="text-green-400">Why:</strong> $1</div>')
                            .replace(/\*\*Time:\*\* (.*)/g, '<div class="text-slate-300 mb-2"><strong class="text-yellow-400">Time:</strong> $1</div>')
                            .replace(/\*\*Tips:\*\* (.*)/g, '<div class="text-slate-300 mb-4"><strong class="text-purple-400">Tips:</strong> $1</div>')
                            .replace(/- (.*)/g, '<li class="text-slate-300 mb-1">$1</li>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeminiToolSuggester;
