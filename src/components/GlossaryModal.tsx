import React, { useState } from 'react';
import { glossaryTerms } from '../data/glossary';
import { X, Search, BookMarked, Filter } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))];

  const filteredTerms = glossaryTerms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.simpleExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Concept & Terminology Glossary</h2>
              <p className="text-xs text-slate-500">Every technical term explicitly defined in plain English</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-slate-200 bg-white space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms, definitions, and concepts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-700/40"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap mr-1">Categories:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching terminology found for "{searchTerm}".
            </div>
          ) : (
            filteredTerms.map(t => (
              <div key={t.term} className="pt-4 first:pt-0">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-base font-bold text-slate-900">{t.term}</h3>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                </div>

                <div className="text-xs text-slate-800 font-medium mb-1.5 bg-amber-50/70 p-2 rounded border border-amber-200/50">
                  <span className="font-semibold text-amber-900">Formal Definition: </span>
                  {t.definition}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  <span className="font-semibold text-slate-700">In simple terms: </span>
                  {t.simpleExplanation}
                </p>

                {t.exampleSnippet && (
                  <div className="mt-2 bg-slate-950 p-2.5 rounded font-mono text-[11px] text-amber-300 overflow-x-auto">
                    <pre className="whitespace-pre">{t.exampleSnippet}</pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
