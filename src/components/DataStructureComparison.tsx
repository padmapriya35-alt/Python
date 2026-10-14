import React, { useState } from 'react';
import { Layers, Check, X, HelpCircle, ArrowRight } from 'lucide-react';

export const DataStructureComparison: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('all');

  const rows = [
    {
      feature: 'Ordering',
      list: 'Ordered (Insertion sequence guaranteed)',
      tuple: 'Ordered (Insertion sequence guaranteed)',
      set: 'Unordered (No guaranteed position)',
      dict: 'Ordered (Keys preserve insertion order since Python 3.7)'
    },
    {
      feature: 'Mutability',
      list: 'Mutable (Modify, append, remove in-place)',
      tuple: 'Immutable (Cannot change after creation)',
      set: 'Mutable (Add or remove unique items)',
      dict: 'Mutable (Add, edit, remove key-value pairs)'
    },
    {
      feature: 'Duplicate Elements',
      list: 'Allowed (Multiple identical elements)',
      tuple: 'Allowed (Multiple identical elements)',
      set: 'Forbidden (Duplicates silently discarded)',
      dict: 'Keys: Unique only | Values: Duplicates allowed'
    },
    {
      feature: 'Access Mechanism',
      list: '0-based integer index: my_list[0]',
      tuple: '0-based integer index: my_tuple[0]',
      set: 'Membership test: "item" in my_set',
      dict: 'Hashable key object: my_dict["key"]'
    },
    {
      feature: 'Underlying Implementation',
      list: 'Dynamic contiguous array of pointers',
      tuple: 'Fixed-size array of pointers in memory',
      set: 'Hash table with empty value slots',
      dict: 'Compact array + sparse hash table'
    },
    {
      feature: 'Lookup by Index',
      list: 'O(1) Constant Time',
      tuple: 'O(1) Constant Time',
      set: 'N/A (Not subscriptable)',
      dict: 'N/A (Key lookup is O(1))'
    },
    {
      feature: 'Search by Value ("x in col")',
      list: 'O(n) Linear scan (Slow for millions)',
      tuple: 'O(n) Linear scan (Slow for millions)',
      set: 'O(1) Average time (Blazing fast)',
      dict: 'Keys: O(1) | Values: O(n)'
    },
    {
      feature: 'Hashable as Dict Key?',
      list: 'NO (TypeError: unhashable type)',
      tuple: 'YES (If all nested items are immutable)',
      set: 'NO (Use frozenset instead)',
      dict: 'NO'
    },
    {
      feature: 'Syntax Literal',
      list: '[1, 2, 3]',
      tuple: '(1, 2, 3) or (1,)',
      set: '{1, 2, 3} (Empty: set())',
      dict: '{"key": "value"} (Empty: {})'
    },
    {
      feature: 'Primary Ideal Use Case',
      list: 'Collections that grow, shrink, require sorting, or contain duplicates',
      tuple: 'Fixed records, coordinates, immutable function returns, composite dict keys',
      set: 'Fast deduplication, O(1) membership checks, mathematical set algebra',
      dict: 'Associative data, JSON records, database rows, key-based lookup caches'
    }
  ];

  return (
    <div className="my-8 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Architectural Comparison Table</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          List vs Tuple vs Set vs Dictionary
        </h3>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Side-by-side evaluation of Python's four primary built-in data structures. Review mutability, computational time complexity (Big-O), duplicate handling, and underlying memory architecture.
        </p>

        {/* Quick Decision Scenario Chips */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Filter by scenario:</span>
          <button
            onClick={() => setSelectedScenario('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              selectedScenario === 'all'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Attributes
          </button>
          <button
            onClick={() => setSelectedScenario('speed')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              selectedScenario === 'speed'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Performance & Big-O
          </button>
          <button
            onClick={() => setSelectedScenario('immutability')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              selectedScenario === 'immutability'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Mutability & Integrity
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
              <th className="p-3.5 sm:p-4 w-1/5 min-w-[140px]">Feature / Attribute</th>
              <th className="p-3.5 sm:p-4 w-1/5 min-w-[170px] bg-amber-50/40 text-amber-950 font-bold border-x border-slate-200/60">
                List (list)
              </th>
              <th className="p-3.5 sm:p-4 w-1/5 min-w-[170px]">
                Tuple (tuple)
              </th>
              <th className="p-3.5 sm:p-4 w-1/5 min-w-[170px] bg-cyan-50/30 text-cyan-950">
                Set (set)
              </th>
              <th className="p-3.5 sm:p-4 w-1/5 min-w-[180px] bg-emerald-50/30 text-emerald-950">
                Dictionary (dict)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {rows.map((row, idx) => {
              if (selectedScenario === 'speed' && !['Lookup by Index', 'Search by Value ("x in col")', 'Underlying Implementation'].includes(row.feature)) {
                return null;
              }
              if (selectedScenario === 'immutability' && !['Mutability', 'Duplicate Elements', 'Hashable as Dict Key?'].includes(row.feature)) {
                return null;
              }

              return (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900 bg-slate-50/50">
                    {row.feature}
                  </td>
                  <td className="p-3.5 sm:p-4 border-x border-slate-200/60 text-slate-700 leading-relaxed">
                    {row.list}
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-700 leading-relaxed">
                    {row.tuple}
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-700 leading-relaxed bg-cyan-50/10">
                    {row.set}
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-700 leading-relaxed bg-emerald-50/10">
                    {row.dict}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Decision Guide Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        <span className="font-semibold text-slate-900">Engineering Rule of Thumb: </span>
        Need to look up items by custom IDs? Use a <strong className="text-emerald-700">Dictionary</strong>. Need lightning-fast uniqueness testing across 1,000,000 values? Use a <strong className="text-cyan-700">Set</strong>. Need a fixed immutable record that can never be corrupted? Use a <strong className="text-slate-900">Tuple</strong>. Need an ordered sequence to append, sort, and process? Use a <strong className="text-amber-800">List</strong>.
      </div>
    </div>
  );
};
