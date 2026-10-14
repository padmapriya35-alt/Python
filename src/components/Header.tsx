import React from 'react';
import { Search, BookOpen, Layers, Terminal, BookMarked, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
  onOpenTracebackTool: () => void;
  onOpenDataStructuresMatrix: () => void;
  onSelectStage: (stageId: string) => void;
  completedCount: number;
  totalLessons: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGlossary,
  onOpenTracebackTool,
  onOpenDataStructuresMatrix,
  onSelectStage,
  completedCount,
  totalLessons
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Single text element wordmark in display face */}
      <button 
        onClick={() => onSelectStage('stage-1-getting-started')}
        className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors text-left flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 shrink-0 inline-block"></span>
        Python Knowledge Base
      </button>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectStage('stage-1-getting-started')}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Curriculum
        </button>
        <button
          onClick={onOpenDataStructuresMatrix}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Layers className="w-4 h-4 text-slate-400" />
          Data Structures Matrix
        </button>
        <button
          onClick={onOpenTracebackTool}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Terminal className="w-4 h-4 text-slate-400" />
          Traceback Explainer
        </button>
        <button
          onClick={onOpenGlossary}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <BookMarked className="w-4 h-4 text-slate-400" />
          Glossary
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 mr-2">
          <span>{completedCount} of {totalLessons} completed</span>
          <span aria-hidden="true">·</span>
          <span>{Math.round((completedCount / (totalLessons || 1)) * 100)}%</span>
        </div>

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Search curriculum"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>Search Lessons</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
