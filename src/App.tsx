/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { allCurriculumSections, allLessons, getLessonById, getSectionByLessonId, getNextAndPrevLessons } from './data/allCurriculum';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { DataStructureComparison } from './components/DataStructureComparison';
import { TracebackExplorer } from './components/TracebackExplorer';
import { GlossaryModal } from './components/GlossaryModal';
import { SearchModal } from './components/SearchModal';
import { Menu } from 'lucide-react';

export default function App() {
  // Read hash on initial load if valid
  const getInitialLessonId = (): string => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && allLessons.some(l => l.id === hash)) {
      return hash;
    }
    return localStorage.getItem('py_kb_active_lesson') || 'what-is-programming';
  };

  // Current active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(getInitialLessonId);

  // Dedicated view overlay (none, 'matrix', 'traceback')
  const [specialView, setSpecialView] = useState<'none' | 'matrix' | 'traceback'>('none');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Progress and bookmarks stored in localStorage
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('py_kb_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set(['what-is-programming']);
    } catch {
      return new Set(['what-is-programming']);
    }
  });

  const [bookmarkedLessons, setBookmarkedLessons] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('py_kb_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Listen for browser back/forward hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash === 'matrix') {
        setSpecialView('matrix');
      } else if (hash === 'traceback') {
        setSpecialView('traceback');
      } else if (hash && allLessons.some(l => l.id === hash)) {
        setActiveLessonId(hash);
        setSpecialView('none');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save active lesson and update hash & document title
  useEffect(() => {
    localStorage.setItem('py_kb_active_lesson', activeLessonId);
    if (specialView === 'none') {
      window.history.replaceState(null, '', `#${activeLessonId}`);
      const lesson = getLessonById(activeLessonId);
      if (lesson) {
        document.title = `${lesson.title} — Python Knowledge Base`;
      }
    } else if (specialView === 'matrix') {
      window.history.replaceState(null, '', '#matrix');
      document.title = 'Data Structure Matrix — Python Knowledge Base';
    } else if (specialView === 'traceback') {
      window.history.replaceState(null, '', '#traceback');
      document.title = 'Traceback Explainer — Python Knowledge Base';
    }
  }, [activeLessonId, specialView]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('py_kb_completed', JSON.stringify(Array.from(completedLessons)));
  }, [completedLessons]);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem('py_kb_bookmarks', JSON.stringify(Array.from(bookmarkedLessons)));
  }, [bookmarkedLessons]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const handleToggleBookmark = (lessonId: string) => {
    setBookmarkedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSpecialView('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStage = (stageId: string) => {
    const stage = allCurriculumSections.find(s => s.id === stageId);
    if (stage && stage.lessons.length > 0) {
      handleSelectLesson(stage.lessons[0].id);
    }
  };

  const currentLesson = getLessonById(activeLessonId) || allLessons[0];
  const currentSection = getSectionByLessonId(currentLesson.id) || allCurriculumSections[0];
  const { prev, next } = getNextAndPrevLessons(currentLesson.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Primary Top Bar adhering to Top Bar Contract */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenTracebackTool={() => setSpecialView('traceback')}
        onOpenDataStructuresMatrix={() => setSpecialView('matrix')}
        onSelectStage={handleSelectStage}
        completedCount={completedLessons.size}
        totalLessons={allLessons.length}
      />

      {/* Mobile Bar for toggling sidebar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs no-print">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Table of Contents ({allLessons.length} chapters)</span>
        </button>

        <span className="text-slate-500 truncate max-w-[180px]">
          {currentLesson.title}
        </span>
      </div>

      <div className="flex-1 flex min-w-0">
        {/* Left Sticky Sidebar */}
        <Sidebar
          sections={allCurriculumSections}
          activeLessonId={activeLessonId}
          onSelectLesson={handleSelectLesson}
          completedLessons={completedLessons}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 lg:pl-80 pb-16">
          {specialView === 'matrix' ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
              <div className="mb-6 flex items-center justify-between no-print">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Data Structure Matrix
                  </h1>
                  <p className="text-slate-600 text-sm mt-1">
                    Systematic comparison of Lists, Tuples, Sets, and Dictionaries
                  </p>
                </div>
                <button
                  onClick={() => setSpecialView('none')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Return to Lesson
                </button>
              </div>
              <DataStructureComparison />
            </div>
          ) : specialView === 'traceback' ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
              <div className="mb-6 flex items-center justify-between no-print">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Traceback Anatomy Explainer
                  </h1>
                  <p className="text-slate-600 text-sm mt-1">
                    Learn to read Python exceptions and tracebacks from the bottom up
                  </p>
                </div>
                <button
                  onClick={() => setSpecialView('none')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Return to Lesson
                </button>
              </div>
              <TracebackExplorer />
            </div>
          ) : (
            <LessonView
              lesson={currentLesson}
              section={currentSection}
              isCompleted={completedLessons.has(currentLesson.id)}
              onToggleComplete={handleToggleComplete}
              isBookmarked={bookmarkedLessons.has(currentLesson.id)}
              onToggleBookmark={handleToggleBookmark}
              prevLesson={prev}
              nextLesson={next}
              onNavigateLesson={handleSelectLesson}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
