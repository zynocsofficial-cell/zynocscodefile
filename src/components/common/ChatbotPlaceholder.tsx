import React, { useState } from 'react';
import { Bot, MessageSquare, X, Sparkles } from 'lucide-react';

export const ChatbotPlaceholder: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Placeholder Modal Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-card rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Zynocs AI Assistant</h4>
                <p className="text-[11px] text-brand-100 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span>
                  System Ready
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Placeholder Content */}
          <div className="p-6 bg-slate-900/90 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400">
              <Sparkles className="h-7 w-7" />
            </div>
            <h5 className="text-white font-bold text-base mb-2">Next-Gen AI Consultant</h5>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Our intelligent enterprise assistant is currently being configured with updated architecture models. Full capabilities launching soon!
            </p>
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-mono">
              STATUS: READY FOR LOGIC INTEGRATION
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-14 w-14 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none ring-2 ring-transparent hover:ring-brand-400/50"
        aria-label="Toggle AI Chat"
      >
        <span className="relative flex items-center justify-center">
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />}
        </span>

        {/* Indicator */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3 -mt-0.5 -mr-0.5">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        )}
      </button>
    </div>
  );
};
