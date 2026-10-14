import { Section } from '../types/curriculum';

export const stage10Section: Section = {
  id: 'stage-10-advanced',
  number: 10,
  title: 'Stage 10 — Advanced Python Internals',
  badge: 'Internals',
  description: 'Master advanced Python execution mechanics: the iterator and generator protocols (yield), memory management (reference counts and cyclic garbage collection), asynchronous I/O (async/await and the event loop), threading versus multiprocessing, and profiling.',
  lessons: [
    {
      id: 'advanced-python',
      sectionId: 'stage-10-advanced',
      title: 'Generators, Iterators, & Memory Streaming',
      subtitle: 'The __iter__ and __next__ protocol, lazy evaluation, and the "yield" keyword',
      readingTimeMinutes: 13,
      definition: 'An iterator is an object representing a stream of data that implements the Iterator Protocol via the __next__() and __iter__() methods. A generator is a specialized function that pauses execution and yields values one at a time using the "yield" keyword, maintaining local execution frame state between iterations with near-zero memory footprint.',
      inSimpleTerms: 'Imagine you have a warehouse with 10 million books. A standard list is like ordering a fleet of 500 trucks to load all 10 million books into your living room at once: your living room (your RAM) will overflow and collapse. A generator is like a librarian standing at a desk: whenever you ask for the next book, she fetches just that one book, hands it to you, and pauses. It consumes almost zero memory regardless of whether there are 10 books or 10 billion books.',
      whyDoesItExist: 'Processing huge files, streaming video, or analyzing terabytes of database records cannot fit in computer memory simultaneously. Generators allow programs to process infinitely large streams of data efficiently using "lazy evaluation" (computing values only when requested).',
      howDoesItWork: '1. The Iterator Protocol:\n- An "Iterable" is any object with an __iter__() method that returns an iterator (e.g., list, dict, str).\n- An "Iterator" has a __next__() method. Each call to next(it) returns the subsequent element.\n- When elements are exhausted, __next__() raises the "StopIteration" exception, cleanly signaling loops to terminate.\n2. The "yield" Keyword:\n- When a function contains the "yield" keyword, Python transforms it into a generator factory.\n- Calling the function does NOT run the code; it returns a generator object.\n- When next() is called on the generator, code runs until it hits "yield <value>".\n- Python captures the value, freezes the function\'s local stack frame (all local variables and instruction pointers remain frozen in memory), and yields control back to the caller.\n- On the next call, execution resumes seamlessly from the exact instruction following the yield.\n3. Memory Comparison:\n- [x for x in range(10_000_000)] allocates ~400 megabytes of RAM.\n- (x for x in range(10_000_000)) allocates roughly 200 bytes of RAM.',
      syntaxDescription: 'def generator_function():\n    for item in source:\n        yield transform(item)\n\n# Generator expression:\ngen_exp = (x**2 for x in huge_sequence)',
      exampleCode: 'import sys\nfrom typing import Generator\n\n# 1. Memory comparison: List comprehension vs Generator expression\nlist_comp = [n for n in range(100_000)]\ngen_exp = (n for n in range(100_000))\n\nprint(f"List size in RAM:      {sys.getsizeof(list_comp):,} bytes")\nprint(f"Generator size in RAM: {sys.getsizeof(gen_exp):,} bytes")\n\n# 2. Generator function with yield: Streaming simulated large log records\ndef read_large_audit_log(total_records: int) -> Generator[str, None, None]:\n    for record_id in range(1, total_records + 1):\n        # Emitting one record at a time without loading all into memory:\n        yield f"LOG_RECORD_{record_id:06d}: Status OK"\n\n# Consuming the generator stream via iteration\nprint("\\nProcessing stream:")\naudit_stream = read_large_audit_log(10)\nfor count, line in enumerate(audit_stream, start=1):\n    if count > 3:\n        print(f"  ... ({10 - 3} more records remaining in stream)")\n        break\n    print(f"  Processed: {line}")',
      codeExplanation: [
        'Lines 5-6 construct a list comprehension (allocating full memory immediately) versus a generator expression (allocating zero element memory).',
        'Lines 8-9 display the dramatic memory difference using sys.getsizeof().',
        'Lines 12-16 define a generator function. The "yield" keyword produces items on demand.',
        'Line 20 instantiates the generator object.',
        'Lines 21-26 iterate over the stream: each iteration calls next() under the hood, resuming and pausing the generator.'
      ],
      expectedOutput: 'List size in RAM:      800,984 bytes\nGenerator size in RAM: 200 bytes\n\nProcessing stream:\n  Processed: LOG_RECORD_000001: Status OK\n  Processed: LOG_RECORD_000002: Status OK\n  Processed: LOG_RECORD_000003: Status OK\n  ... (7 more records remaining in stream)',
      commonMistakes: [
        {
          mistake: 'Attempting to iterate over a generator a second time after it has already been exhausted.',
          consequence: 'Generators are single-use streams! The second loop executes 0 times because the generator is permanently exhausted.',
          correction: 'If you must iterate over the data multiple times, convert it to a list: data = list(gen) or call the generator function again to obtain a fresh stream.'
        },
        {
          mistake: 'Using len() on a generator: len(my_generator).',
          consequence: 'TypeError: object of type \'generator\' has no len().',
          correction: 'Generators compute values lazily; they do not know how many elements exist until they are generated.'
        }
      ],
      importantPoints: [
        'Generators provide lazy evaluation: items are calculated only when requested.',
        'Generators consume constant O(1) memory regardless of dataset size.',
        'Generators are single-use iterables: once exhausted, they cannot be rewound.',
        'Generator expressions use parentheses (x for x in data) instead of brackets [].'
      ],
      relatedConcepts: [
        { name: 'Async & Concurrency', targetId: 'async-concurrency', note: 'How generators laid the conceptual groundwork for async coroutines.' }
      ],
      knowledgeCheck: {
        question: 'What happens to the local variables inside a generator function when it reaches a "yield" statement?',
        options: [
          'They are deleted from RAM',
          'Their state and execution position are frozen in memory, ready to resume on the next call to next()',
          'They are converted into global variables',
          'They are saved to a temporary text file on disk'
        ],
        correctIndex: 1,
        explanation: 'The Python Virtual Machine suspends the generator\'s frame, preserving all local variables and instruction pointers in memory until the caller requests the next item.'
      },
      endOfTopicQuestions: {
        easy: 'What keyword turns a standard Python function into a generator?',
        medium: 'Explain the internal difference between an Iterable and an Iterator.',
        hard: 'Explain how the yield from syntax delegates generator iteration and enables bidirectional communication via the .send() and .throw() coroutine methods.'
      }
    },
    {
      id: 'async-concurrency',
      sectionId: 'stage-10-advanced',
      title: 'Async/Await, Concurrency, & Memory Internals',
      subtitle: 'The asyncio event loop, threads vs processes, the GIL, and reference counting GC',
      readingTimeMinutes: 14,
      definition: 'Asynchronous programming is a concurrent execution model wherein a single thread manages multiple cooperative tasks (coroutines) using a non-blocking event loop, pausing operations during I/O waits (network, disk, database) to execute other tasks.',
      inSimpleTerms: 'Imagine a waiter working in a busy restaurant. In a synchronous blocking model, the waiter takes Order 1 to the kitchen and stands in front of the oven for 20 minutes waiting for the pizza to bake before he is willing to talk to Customer 2. That restaurant would fail! In an asynchronous model (like asyncio), the waiter puts the pizza in the oven, immediately returns to the dining room to take Orders 2, 3, and 4, and only returns to the kitchen when the pizza timer dings. A single waiter can serve 50 tables effortlessly as long as he isn\'t stuck waiting idle.',
      whyDoesItExist: 'Web backends and network microservices spend 99% of their time waiting for database queries, external API calls, and client network packets to arrive over cables. Blocking the whole CPU thread during every network wait requires spinning up thousands of heavy OS threads, which consumes massive RAM. Async allows a single lightweight thread to handle 100,000 concurrent network connections.',
      howDoesItWork: '1. Threads vs Processes vs Async:\n- Multiprocessing: Spawns completely separate OS processes, each with its own memory space and Python interpreter. Bypasses the Global Interpreter Lock (GIL). Ideal for heavy CPU-bound math.\n- Multithreading: Spawns OS threads sharing a single memory space. Limited by the GIL to running one bytecode instruction at a time, but useful for threaded blocking I/O.\n- Asynchronous (async/await): Cooperative multitasking inside ONE thread. Zero OS thread context-switching overhead. Ideal for high-concurrency I/O-bound web servers.\n2. CPython Memory Management & Garbage Collection:\n- Reference Counting: Every object in Python has an internal counter (ob_refcnt). When a name points to it, refcnt increases. When names go out of scope or are deleted, refcnt decreases. When refcnt hits 0, memory is freed immediately.\n- Cyclic Garbage Collector: Reference counting alone cannot handle circular references (e.g., Object A points to B, and B points back to A; both refcounts stay at 1 even when disconnected from the program). Python runs a generational garbage collector (Generations 0, 1, 2) to detect and reclaim isolated circular islands.',
      syntaxDescription: 'async def fetch_data():\n    await asyncio.sleep(1)\n    return "done"',
      exampleCode: 'import asyncio\nimport time\n\n# 1. Defining an asynchronous coroutine\nasync def simulate_api_call(service_name: str, delay_seconds: float) -> dict:\n    print(f"[{service_name}] Request sent... waiting for response.")\n    # await yields control back to the event loop non-blockingly:\n    await asyncio.sleep(delay_seconds)\n    print(f"[{service_name}] Response received after {delay_seconds}s!")\n    return {"service": service_name, "status": 200}\n\n# 2. Running multiple concurrent I/O operations simultaneously\nasync def main():\n    start = time.perf_counter()\n    \n    # Launch all 3 network tasks concurrently:\n    results = await asyncio.gather(\n        simulate_api_call("AuthService", 0.3),\n        simulate_api_call("PaymentService", 0.5),\n        simulate_api_call("InventoryService", 0.2)\n    )\n    \n    elapsed = time.perf_counter() - start\n    print(f"\\nAll services responded in {elapsed:.2f} seconds total!")\n    print(f"Results gathered: {len(results)} payload objects.")\n\n# Execute the async event loop\nasyncio.run(main())',
      codeExplanation: [
        'Line 5 declares an asynchronous coroutine using the "async def" keyword.',
        'Line 8 uses "await asyncio.sleep()": instead of blocking the thread like time.sleep(), it voluntarily yields control back to the asyncio event loop.',
        'Line 17 uses asyncio.gather() to fire all three tasks concurrently onto the event loop.',
        'Instead of taking 0.3 + 0.5 + 0.2 = 1.0 seconds sequentially, all three run concurrently, completing in ~0.5 seconds (the duration of the single slowest call)!',
        'Line 28 calls asyncio.run(main()) to initialize the event loop and drive the coroutines to completion.'
      ],
      expectedOutput: '[AuthService] Request sent... waiting for response.\n[PaymentService] Request sent... waiting for response.\n[InventoryService] Request sent... waiting for response.\n[InventoryService] Response received after 0.2s!\n[AuthService] Response received after 0.3s!\n[PaymentService] Response received after 0.5s!\n\nAll services responded in 0.50 seconds total!\nResults gathered: 3 payload objects.',
      commonMistakes: [
        {
          mistake: 'Calling a blocking synchronous function (like time.sleep() or requests.get()) inside an async coroutine.',
          consequence: 'Freezes the entire single-threaded event loop, blocking all other concurrent coroutines from executing.',
          correction: 'Always use non-blocking async equivalents (e.g., await asyncio.sleep() and httpx/aiohttp instead of requests).'
        },
        {
          mistake: 'Calling a coroutine function without the "await" keyword (e.g., result = fetch_data()).',
          consequence: 'Returns an un-awaited <coroutine object> without executing its internal logic, producing RuntimeWarning: coroutine was never awaited.',
          correction: 'Always prefix coroutine invocations with "await" inside async functions.'
        }
      ],
      importantPoints: [
        'Use asyncio for I/O-bound concurrency (network, web scraping, microservices).',
        'Use multiprocessing for CPU-bound parallelism (data crunching, video processing, AI training) to bypass the GIL.',
        'Python uses Reference Counting as its primary memory management mechanism, backed by a generational Cyclic Garbage Collector.',
        'Never call blocking synchronous code on the async event loop.'
      ],
      relatedConcepts: [
        { name: 'FastAPI Backend', targetId: 'fastapi-tutorial', note: 'Building high-performance async REST backends.' }
      ],
      knowledgeCheck: {
        question: 'Why does Python need a cyclic garbage collector in addition to standard reference counting?',
        options: [
          'Because reference counting is too fast',
          'Because reference counting cannot detect circular references where two disconnected objects reference each other with non-zero counts',
          'Because hard drives need periodic defragmentation',
          'Because integers require manual destruction'
        ],
        correctIndex: 1,
        explanation: 'When Object A references Object B and Object B references Object A, their reference counts never reach zero even if the program loses all external access to them. The cyclic GC detects and collects these cyclic islands.'
      },
      endOfTopicQuestions: {
        easy: 'What keyword pauses an async coroutine while waiting for another non-blocking task to complete?',
        medium: 'Contrast multithreading versus multiprocessing in Python in the context of the Global Interpreter Lock (GIL).',
        hard: 'Explain how the Python 3.13 free-threaded build (PEP 703) removes the GIL and what thread-safety mechanisms replace it in the C runtime.'
      }
    }
  ]
};
