import React, { useState, useEffect } from 'react';
import { allLessons, allCurriculumSections } from '../data/allCurriculum';
import { Search, X, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = allLessons.filter(lesson => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(q) ||
      (lesson.subtitle && lesson.subtitle.toLowerCase().includes(q)) ||
      lesson.definition.toLowerCase().includes(q) ||
      lesson.inSimpleTerms.toLowerCase().includes(q)
    );
  }).slice(0, 10);

  const handleSelect = (lessonId: string) => {
    onSelectLesson(lessonId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search lessons, concepts, topics (e.g. variables, decorator, async, SQL)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No lessons found matching "{query}".
            </div>
          ) : (
            results.map((lesson, idx) => {
              const parentSection = allCurriculumSections.find(s => s.id === lesson.sectionId);

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelect(lesson.id)}
                  className="w-full p-3 text-left hover:bg-slate-50 rounded-lg transition-colors flex items-start justify-between gap-3 group cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold mb-0.5">
                      <span>{parentSection?.title}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 font-normal">{lesson.readingTimeMinutes} min read</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-amber-900">
                      {lesson.title}
                    </div>
                    {lesson.subtitle && (
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lesson.subtitle}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigation: Click to jump</span>
            <span aria-hidden="true">·</span>
            <span>Esc to close</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">ESC</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
