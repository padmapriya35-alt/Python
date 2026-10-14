import React, { useState } from 'react';
import { Terminal, AlertCircle, ArrowUp, Info, CheckCircle2 } from 'lucide-react';

interface ErrorScenario {
  id: string;
  name: string;
  exceptionType: string;
  description: string;
  tracebackLines: {
    lineText: string;
    type: 'header' | 'frame' | 'code' | 'error';
    stepNumber?: number;
    explanation: string;
  }[];
}

const scenarios: ErrorScenario[] = [
  {
    id: 'key-error',
    name: 'KeyError: Missing Dictionary Key',
    exceptionType: 'KeyError',
    description: 'Occurs when accessing a dictionary using bracket syntax [key] with a key that does not exist.',
    tracebackLines: [
      {
        lineText: 'Traceback (most recent call last):',
        type: 'header',
        explanation: 'Header: Informs you that the call stack is printed in chronological order, with the oldest call at the top and the fatal failure at the bottom.'
      },
      {
        lineText: '  File "/app/services/checkout.py", line 42, in process_order',
        type: 'frame',
        explanation: 'Frame 1: In file checkout.py, line 42 inside process_order(), the code invoked calculate_tax().'
      },
      {
        lineText: '    tax_total = calculate_tax(customer_profile, cart_items)',
        type: 'code',
        explanation: 'Code in Frame 1 that initiated the call.'
      },
      {
        lineText: '  File "/app/finance/tax.py", line 18, in calculate_tax',
        type: 'frame',
        stepNumber: 2,
        explanation: 'STEP 2 TO READ: The exact location where execution failed! Look at line 18 inside tax.py.'
      },
      {
        lineText: '    rate = STATE_TAX_RATES[customer_profile["state"]]',
        type: 'code',
        stepNumber: 3,
        explanation: 'STEP 3 TO READ: The exact line of code that triggered the failure. Here, customer_profile["state"] was evaluated.'
      },
      {
        lineText: "KeyError: 'state'",
        type: 'error',
        stepNumber: 1,
        explanation: 'STEP 1 TO READ (ALWAYS LOOK AT THE VERY BOTTOM FIRST!): The exception class is KeyError, and the missing key was \'state\'. The dictionary did not contain a \'state\' attribute.'
      }
    ]
  },
  {
    id: 'zero-div',
    name: 'ZeroDivisionError: Division by Zero',
    exceptionType: 'ZeroDivisionError',
    description: 'Occurs when dividing a number by 0 or 0.0 in arithmetic operations.',
    tracebackLines: [
      {
        lineText: 'Traceback (most recent call last):',
        type: 'header',
        explanation: 'Header: Chronological stack trace.'
      },
      {
        lineText: '  File "analytics.py", line 85, in compute_averages',
        type: 'frame',
        stepNumber: 2,
        explanation: 'STEP 2: The failure happened in analytics.py at line 85 inside compute_averages.'
      },
      {
        lineText: '    average_score = total_score / student_count',
        type: 'code',
        stepNumber: 3,
        explanation: 'STEP 3: The division expression: total_score / student_count.'
      },
      {
        lineText: 'ZeroDivisionError: division by zero',
        type: 'error',
        stepNumber: 1,
        explanation: 'STEP 1: The exception type and message. "student_count" was evaluated to 0, which is mathematically impossible to divide by.'
      }
    ]
  },
  {
    id: 'type-error',
    name: 'TypeError: Unsupported Operand Types',
    exceptionType: 'TypeError',
    description: 'Occurs when attempting an operation on incompatible data types, like adding a string to an integer.',
    tracebackLines: [
      {
        lineText: 'Traceback (most recent call last):',
        type: 'header',
        explanation: 'Header: Chronological stack trace.'
      },
      {
        lineText: '  File "calculator.py", line 12, in <module>',
        type: 'frame',
        stepNumber: 2,
        explanation: 'STEP 2: Failed at the top-level script in calculator.py on line 12.'
      },
      {
        lineText: '    final_score = base_score + bonus_input',
        type: 'code',
        stepNumber: 3,
        explanation: 'STEP 3: Attempted addition between base_score and bonus_input.'
      },
      {
        lineText: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
        type: 'error',
        stepNumber: 1,
        explanation: 'STEP 1: TypeError! Python is strongly typed and refuses to silently guess whether you wanted text or math when adding an int and a str. Convert using int(bonus_input).'
      }
    ]
  }
];

export const TracebackExplorer: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('key-error');
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(5);

  const scenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="my-8 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-1">
          <AlertCircle className="w-4 h-4" />
          <span>Interactive Diagnostic Visualizer</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          How to Read a Python Traceback (From Bottom to Top)
        </h3>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Beginners often read tracebacks from the top and get overwhelmed by framework files. In Python, <strong>always start at the very last line</strong> to discover WHAT went wrong, then look at the line directly above to discover WHERE it failed.
        </p>

        {/* Scenario Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setSelectedLineIndex(sc.tracebackLines.length - 1);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeScenarioId === sc.id
                  ? 'bg-rose-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Traceback Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Side: Clickable Traceback Terminal */}
        <div className="lg:col-span-7 p-4 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
            <span>Terminal Output / Stderr</span>
            <span className="text-amber-400">Click any line below to inspect</span>
          </div>

          <div className="space-y-1">
            {scenario.tracebackLines.map((line, idx) => {
              const isSelected = selectedLineIndex === idx;
              let bgClass = 'hover:bg-slate-900 cursor-pointer p-1.5 rounded transition-colors';
              let textClass = 'text-slate-300';

              if (line.type === 'error') {
                textClass = 'text-rose-400 font-bold';
              } else if (line.type === 'frame') {
                textClass = 'text-cyan-300';
              } else if (line.type === 'code') {
                textClass = 'text-amber-200 pl-6';
              }

              if (isSelected) {
                bgClass = 'bg-slate-800 ring-1 ring-amber-500/70 p-1.5 rounded';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedLineIndex(idx)}
                  className={`flex items-start justify-between gap-2 ${bgClass}`}
                >
                  <pre className={`whitespace-pre-wrap ${textClass}`}>
                    {line.lineText}
                  </pre>
                  {line.stepNumber && (
                    <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-sans font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Step #{line.stepNumber}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
            <ArrowUp className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
            <span>Read direction: Begin at bottom line, read upward to locate error line.</span>
          </div>
        </div>

        {/* Right Side: Plain English Explanation of Selected Component */}
        <div className="lg:col-span-5 p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Diagnostic Inspector</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-4">
              <div className="text-xs font-mono text-slate-600 break-all">
                {scenario.tracebackLines[selectedLineIndex]?.lineText}
              </div>
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-2">
              {scenario.tracebackLines[selectedLineIndex]?.type === 'error' && 'Step 1: Identify Exception & Reason'}
              {scenario.tracebackLines[selectedLineIndex]?.type === 'frame' && 'Step 2: Identify File & Line Number'}
              {scenario.tracebackLines[selectedLineIndex]?.type === 'code' && 'Step 3: Analyze the Failed Expression'}
              {scenario.tracebackLines[selectedLineIndex]?.type === 'header' && 'Traceback Header Information'}
            </h4>

            <p className="text-sm text-slate-700 leading-relaxed">
              {scenario.tracebackLines[selectedLineIndex]?.explanation}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/50 p-3 rounded-md text-xs text-amber-900">
            <span className="font-bold">Golden Rule: </span>
            When you see red error text, never panic! Look at the last line: it tells you <em>what</em> failed. Look at the file directly above: it tells you <em>where</em>.
          </div>
        </div>
      </div>
    </div>
  );
};
