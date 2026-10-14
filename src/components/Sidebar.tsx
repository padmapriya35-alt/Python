import React, { useState } from 'react';
import { Section, Lesson } from '../types/curriculum';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen, Search, Menu, X } from 'lucide-react';

interface SidebarProps {
  sections: Section[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  completedLessons: Set<string>;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeLessonId,
  onSelectLesson,
  completedLessons,
  isOpenMobile,
  onCloseMobile
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Expand the section containing the active lesson by default
    const initial: Record<string, boolean> = {};
    sections.forEach(sec => {
      const containsActive = sec.lessons.some(l => l.id === activeLessonId);
      initial[sec.id] = containsActive || sec.number === 1 || sec.number === 2;
    });
    return initial;
  });

  const [filterQuery, setFilterQuery] = useState('');

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = sections.map(section => {
    if (!filterQuery.trim()) return section;
    const q = filterQuery.toLowerCase();
    const matchingLessons = section.lessons.filter(
      l => l.title.toLowerCase().includes(q) || (l.subtitle && l.subtitle.toLowerCase().includes(q))
    );
    return {
      ...section,
      lessons: matchingLessons
    };
  }).filter(sec => sec.lessons.length > 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-[53px] bottom-0 left-0 z-40 w-80 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header & Filter */}
        <div className="sticky top-0 z-10 p-3.5 bg-white border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter topics..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-amber-700/50"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Sections List */}
        <div className="py-2">
          {filteredSections.map(section => {
            const isExpanded = !!expandedSections[section.id] || Boolean(filterQuery);
            const containsActive = section.lessons.some(l => l.id === activeLessonId);
            const completedInSection = section.lessons.filter(l => completedLessons.has(l.id)).length;

            return (
              <div key={section.id} className="border-b border-slate-100 last:border-b-0">
                {/* Section Header Button */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer ${
                    containsActive ? 'bg-amber-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {section.number}. {section.title.replace(/^Stage \d+ — /, '')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 shrink-0 tabular-nums">
                    <span>{completedInSection}/{section.lessons.length}</span>
                  </div>
                </button>

                {/* Lessons in Section */}
                {isExpanded && (
                  <div className="pl-4 pr-2 pb-1.5 pt-0.5 space-y-0.5">
                    {section.lessons.map(lesson => {
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = completedLessons.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson.id);
                            onCloseMobile();
                          }}
                          className={`w-full flex items-start gap-2.5 px-3 py-1.5 text-left rounded-md transition-colors text-xs cursor-pointer ${
                            isActive
                              ? 'bg-amber-100/70 text-amber-950 font-medium'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Circle className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-300'}`} />
                            )}
                          </span>
                          <span className="leading-snug line-clamp-2">
                            {lesson.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
