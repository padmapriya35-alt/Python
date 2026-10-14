import React, { useState } from 'react';
import { Lesson, Section } from '../types/curriculum';
import { InteractiveCodeVisualizer } from './InteractiveCodeVisualizer';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  ListOrdered,
  FileCode2,
  Cpu,
  Layers,
  Sparkles,
  Share2,
  Printer,
  Download,
  Check
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  section: Section;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (lessonId: string) => void;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  onNavigateLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  section,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  prevLesson,
  nextLesson,
  onNavigateLesson
}) => {
  // Knowledge check state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  const [hasCopiedShareLink, setHasCopiedShareLink] = useState(false);

  // Reset quiz state when lesson changes
  React.useEffect(() => {
    setSelectedOption(null);
    setHasSubmittedQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname + '#' + lesson.id;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${lesson.title} — Python Knowledge Base`,
          text: lesson.definition,
          url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setHasCopiedShareLink(true);
    setTimeout(() => setHasCopiedShareLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${lesson.title}
${lesson.subtitle ? `> ${lesson.subtitle}\n` : ''}
## Definition
${lesson.definition}

## In Simple Terms
${lesson.inSimpleTerms}

## Why Does It Exist?
${lesson.whyDoesItExist}

## How Does It Work?
${lesson.howDoesItWork}

## Syntax
${lesson.syntaxDescription}

## Example Code
\`\`\`python
${lesson.exampleCode}
\`\`\`

## Code Explanation
${lesson.codeExplanation.map((line, i) => `${i + 1}. ${line}`).join('\n')}

## Expected Output
\`\`\`text
${lesson.expectedOutput}
\`\`\`

## Common Mistakes & Corrections
${lesson.commonMistakes.map(cm => `### Mistake: ${cm.mistake}\n- Consequence: ${cm.consequence}\n- Correction: ${cm.correction}`).join('\n\n')}

## Important Points
${lesson.importantPoints.map(p => `- ${p}`).join('\n')}

## End-of-Topic Questions
- Easy: ${lesson.endOfTopicQuestions.easy}
- Medium: ${lesson.endOfTopicQuestions.medium}
- Hard: ${lesson.endOfTopicQuestions.hard}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${lesson.id}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tocItems = [
    { id: 'definition', label: 'Definition' },
    { id: 'simple-terms', label: 'In Simple Terms' },
    { id: 'why-exists', label: 'Why Does It Exist?' },
    { id: 'how-it-works', label: 'How Does It Work?' },
    { id: 'syntax', label: 'Syntax' },
    { id: 'example', label: 'Example & Code Visualizer' },
    { id: 'code-explanation', label: 'Code Explanation' },
    { id: 'output', label: 'Expected Output' },
    { id: 'common-mistakes', label: 'Common Mistakes' },
    { id: 'important-points', label: 'Important Points' },
    { id: 'related-concepts', label: 'Related Concepts' },
    { id: 'knowledge-check', label: 'Knowledge Check' },
    { id: 'end-of-topic', label: 'End-of-Topic Questions' }
  ];

  return (
    <div className="flex-1 min-w-0 max-w-5xl mx-auto px-4 sm:px-8 py-8">
      {/* Breadcrumb & Section Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs text-slate-500 border-b border-slate-200/80 pb-3 no-print">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-900">{section.title}</span>
          <span aria-hidden="true">·</span>
          <span>Chapter {lesson.title.split('.')[0]}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {lesson.readingTimeMinutes} min read
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1 rounded hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Share or copy direct link"
          >
            {hasCopiedShareLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1 rounded hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="hidden md:flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1 rounded hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Download chapter as Markdown (.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .md</span>
          </button>

          <button
            onClick={() => setFontSize(fontSize === 'standard' ? 'large' : 'standard')}
            className="text-slate-600 hover:text-slate-900 text-xs px-2 py-1 rounded hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Toggle comfortable font scale"
          >
            {fontSize === 'standard' ? 'Font: A+' : 'Font: A-'}
          </button>

          <button
            onClick={() => onToggleBookmark(lesson.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
              isBookmarked
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-medium'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>Bookmarked</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmark</span>
              </>
            )}
          </button>

          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-900 font-medium'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-700' : 'text-slate-300'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Chapter Title & Headline */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          {lesson.title}
        </h1>
        {lesson.subtitle && (
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {lesson.subtitle}
          </p>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Textbook Body (Col 9) */}
        <div className={`lg:col-span-9 space-y-10 ${fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>

          {/* 1. DEFINITION */}
          <section id="definition" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-amber-700 inline-block"></span>
              Definition
            </h2>
            <div className="p-4 sm:p-5 bg-amber-50/60 border border-amber-200/70 rounded-lg text-slate-900 leading-relaxed font-serif text-base sm:text-lg shadow-2xs">
              {lesson.definition}
            </div>
          </section>

          {/* 2. IN SIMPLE TERMS */}
          <section id="simple-terms" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              In Simple Terms
            </h2>
            <div className="text-slate-700 leading-relaxed space-y-3">
              {lesson.inSimpleTerms.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 3. WHY DOES IT EXIST? */}
          <section id="why-exists" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Why Does It Exist?
            </h2>
            <div className="text-slate-700 leading-relaxed space-y-3">
              {lesson.whyDoesItExist.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 4. HOW DOES IT WORK? */}
          <section id="how-it-works" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              How Does It Work?
            </h2>
            <div className="text-slate-700 leading-relaxed space-y-3 bg-slate-50/80 p-5 rounded-lg border border-slate-200/80">
              {lesson.howDoesItWork.split('\n\n').map((sectionText, idx) => (
                <div key={idx} className="whitespace-pre-line leading-relaxed">
                  {sectionText}
                </div>
              ))}
            </div>
          </section>

          {/* 5. SYNTAX */}
          <section id="syntax" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Syntax
            </h2>
            <div className="text-slate-700 leading-relaxed mb-3">
              <p>{lesson.syntaxDescription}</p>
            </div>
          </section>

          {/* 6. EXAMPLE (CODE VISUALIZER & RUNNER) */}
          <section id="example" className="scroll-mt-20">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Example
              </h2>
              <span className="text-xs text-slate-500 font-mono">Python 3.12+ compliant</span>
            </div>

            <InteractiveCodeVisualizer
              code={lesson.exampleCode}
              expectedOutput={lesson.expectedOutput}
              memoryDiagram={lesson.memoryDiagram}
            />
          </section>

          {/* 7. CODE EXPLANATION (OUTSIDE CODE BLOCK) */}
          <section id="code-explanation" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Code Explanation
            </h2>
            <p className="text-xs text-slate-500 mb-3 italic">
              Line-by-line mechanical breakdown outside the code block:
            </p>
            <div className="space-y-2.5">
              {lesson.codeExplanation.map((explanation, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-mono font-semibold shrink-0 mt-0.5 border border-slate-200">
                    {idx + 1}
                  </span>
                  <span>{explanation}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 8. OUTPUT */}
          <section id="output" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Expected Output
            </h2>
            <div className="p-3.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              {lesson.expectedOutput}
            </div>
          </section>

          {/* 9. COMMON MISTAKES */}
          <section id="common-mistakes" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Common Mistakes & Pitfalls
            </h2>

            <div className="space-y-4">
              {lesson.commonMistakes.map((cm, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-rose-50/50 border border-rose-200/70 text-xs sm:text-sm space-y-2">
                  <div className="font-semibold text-rose-950">
                    Mistake: <span className="font-normal text-rose-900">{cm.mistake}</span>
                  </div>
                  <div className="text-rose-800">
                    <span className="font-medium">Consequence:</span> {cm.consequence}
                  </div>
                  <div className="text-emerald-900 bg-emerald-50/80 p-2.5 rounded border border-emerald-200/60 font-medium">
                    <span className="font-bold text-emerald-950">Correction: </span>
                    {cm.correction}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. IMPORTANT POINTS */}
          <section id="important-points" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Important Points Summary
            </h2>
            <div className="space-y-2">
              {lesson.importantPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 11. RELATED CONCEPTS */}
          <section id="related-concepts" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Related Concepts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.relatedConcepts.map((rc, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900 mb-0.5">{rc.name}</div>
                  <div className="text-slate-600">{rc.note}</div>
                  {rc.targetId && (
                    <button
                      onClick={() => onNavigateLesson(rc.targetId!)}
                      className="mt-2 text-amber-800 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Jump to chapter</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 12. OPTIONAL KNOWLEDGE CHECK */}
          {lesson.knowledgeCheck && (
            <section id="knowledge-check" className="scroll-mt-20 p-5 bg-amber-50/40 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Knowledge Check</span>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                {lesson.knowledgeCheck.question}
              </h3>

              <div className="space-y-2 mb-4">
                {lesson.knowledgeCheck.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === lesson.knowledgeCheck?.correctIndex;
                  
                  let optionClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                  if (hasSubmittedQuiz) {
                    if (isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isChosen && !isCorrect) {
                      optionClass = 'border-rose-400 bg-rose-50 text-rose-950';
                    }
                  } else if (isChosen) {
                    optionClass = 'border-amber-600 bg-amber-50 text-amber-950 font-medium ring-1 ring-amber-600';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmittedQuiz}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!hasSubmittedQuiz ? (
                <button
                  disabled={selectedOption === null}
                  onClick={() => setHasSubmittedQuiz(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Verify Answer
                </button>
              ) : (
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm">
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOption === lesson.knowledgeCheck.correctIndex ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct!
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-rose-600" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {lesson.knowledgeCheck.explanation}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 13. END-OF-TOPIC QUESTIONS */}
          <section id="end-of-topic" className="scroll-mt-20 p-5 bg-slate-100/70 rounded-xl border border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-slate-500" />
              End-of-Topic Mastery Questions
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-md border border-slate-200">
                <span className="font-semibold text-emerald-800">Easy (Recall): </span>
                <span className="text-slate-800">{lesson.endOfTopicQuestions.easy}</span>
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200">
                <span className="font-semibold text-amber-800">Medium (Conceptual): </span>
                <span className="text-slate-800">{lesson.endOfTopicQuestions.medium}</span>
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200">
                <span className="font-semibold text-rose-800">Hard (Architectural / Internals): </span>
                <span className="text-slate-800">{lesson.endOfTopicQuestions.hard}</span>
              </div>
            </div>
          </section>

          {/* Next / Previous Navigation Links */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => onNavigateLesson(prevLesson.id)}
                className="w-full sm:w-auto p-3 text-left border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-white transition-all cursor-pointer group"
              >
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous Chapter</span>
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900 line-clamp-1">
                  {prevLesson.title}
                </div>
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => onNavigateLesson(nextLesson.id)}
                className="w-full sm:w-auto p-3 text-right border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-white transition-all cursor-pointer group ml-auto"
              >
                <div className="text-[11px] text-slate-400 font-medium flex items-center justify-end gap-1 mb-1">
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900 line-clamp-1">
                  {nextLesson.title}
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Right Sticky TOC (Col 3) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-slate-100">
              On This Page
            </div>
            <nav className="space-y-1.5">
              {tocItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-slate-600 hover:text-amber-900 hover:underline transition-colors leading-snug py-0.5 truncate"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onToggleComplete(lesson.id)}
                className={`w-full py-1.5 px-2.5 rounded font-medium text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCompleted ? 'Marked Complete' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
