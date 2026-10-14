import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Cpu } from 'lucide-react';

interface MemoryBinding {
  name: string;
  pointsTo: string;
  type: string;
  memoryId: string;
  value: string;
}

interface InteractiveCodeVisualizerProps {
  code: string;
  expectedOutput: string;
  memoryDiagram?: {
    title: string;
    description: string;
    bindings: MemoryBinding[];
  };
}

export const InteractiveCodeVisualizer: React.FC<InteractiveCodeVisualizerProps> = ({
  code,
  expectedOutput,
  memoryDiagram
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'memory'>('output');

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(expectedOutput);
      setIsRunning(false);
    }, 250);
  };

  const handleReset = () => {
    setOutput(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-slate-200 rounded-lg overflow-hidden bg-slate-900 text-slate-100 shadow-xs">
      {/* Visualizer Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono font-medium text-slate-300">python3 execution</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>UTF-8 script block</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded hover:bg-slate-800"
            title="Copy code snippet"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
          </button>

          {output && (
            <button
              onClick={handleReset}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded hover:bg-slate-800"
              title="Clear output"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Code Text Viewer */}
      <div className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-200 bg-slate-900/90 selection:bg-amber-900 selection:text-amber-100">
        <pre className="whitespace-pre">{code}</pre>
      </div>

      {/* Output & Memory Tabs */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-1 px-4 pt-2 border-b border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('output')}
            className={`pb-2 px-2.5 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'output'
                ? 'text-amber-400 border-b-2 border-amber-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Output (stdout)</span>
          </button>

          {memoryDiagram && (
            <button
              onClick={() => setActiveTab('memory')}
              className={`pb-2 px-2.5 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'memory'
                  ? 'text-amber-400 border-b-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Heap Memory References</span>
            </button>
          )}
        </div>

        <div className="p-4">
          {activeTab === 'output' ? (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Terminal Output:
              </div>
              <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap bg-slate-900/60 p-3 rounded border border-slate-800/80 min-h-[48px]">
                {output ? output : (
                  <span className="text-slate-300 italic">Click "Run Code" above to execute this script in the interpreter.</span>
                )}
              </pre>
            </div>
          ) : (
            memoryDiagram && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-100">{memoryDiagram.title}: </span>
                  {memoryDiagram.description}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border border-slate-800">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2">Variable Identifier</th>
                        <th className="p-2">Pointer Arrow</th>
                        <th className="p-2">Heap Address</th>
                        <th className="p-2">Object Class</th>
                        <th className="p-2">Underlying Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {memoryDiagram.bindings.map((b, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-2 font-semibold text-amber-300">{b.name}</td>
                          <td className="p-2 text-slate-500">──►</td>
                          <td className="p-2 text-slate-400">{b.memoryId}</td>
                          <td className="p-2 text-cyan-300">{b.type}</td>
                          <td className="p-2 text-emerald-300">{b.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
