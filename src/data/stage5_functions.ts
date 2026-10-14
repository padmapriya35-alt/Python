import { Section } from '../types/curriculum';

export const stage5Section: Section = {
  id: 'stage-5-functions',
  number: 5,
  title: 'Stage 5 — Functions & Scope',
  badge: 'Modularity',
  description: 'Master modular code design: the rigorous distinction between parameters and arguments, execution frames, the LEGB scope hierarchy, variable arguments (*args, **kwargs), closures, and function decorators.',
  lessons: [
    {
      id: 'functions-overview',
      sectionId: 'stage-5-functions',
      title: 'Functions: Parameters, Arguments, & Scope',
      subtitle: 'Decomposition, the call stack, return contracts, and LEGB variable resolution',
      readingTimeMinutes: 13,
      definition: 'A function in Python is a named, reusable, self-contained block of organized code statements designed to perform a single cohesive task, accepting inputs, executing internal logic, and returning an output value to the caller.',
      inSimpleTerms: 'Think of a function like a specialized kitchen appliance, such as a blender. The blender has a clear name ("blend"). It has an input slot where you drop ingredients (the inputs), a mechanical process inside that does the work, and a spout where the finished smoothie pours out (the return value). Once you build the blender, anyone in your kitchen can use it over and over again simply by calling its name, without needing to know how the electric motor is wired inside.',
      whyDoesItExist: 'Without functions, software would be an unmaintainable monolith of tens of thousands of continuous lines. If you need to calculate taxes in 20 different places in your system, copying and pasting the tax math 20 times means that whenever tax law changes, you must hunt down and edit 20 separate files (and you will inevitably miss one). Functions allow you to write the logic once, test it once, and reuse it everywhere.',
      howDoesItWork: 'CRITICAL DISTINCTION: PARAMETERS VERSUS ARGUMENTS\nThese two words are frequently conflated by beginners, but in computer science they have precise, distinct definitions:\n\n1. PARAMETER:\n- A parameter is the named variable listed inside the parentheses of the function DEFINITION header.\n- It acts as an empty placeholder or formal variable waiting to receive data when the function is eventually called.\n- Example: In "def calculate_tax(amount, rate):", amount and rate are PARAMETERS.\n\n2. ARGUMENT:\n- An argument is the actual, concrete data value or object reference passed into the function when it is INVOKED (called) at runtime.\n- Example: In "calculate_tax(100.0, 0.08)", the concrete values 100.0 and 0.08 are ARGUMENTS.\n\nFunction Mechanics & Return Values:\n- Every Python function returns a value. If you do not include an explicit "return" statement, Python automatically returns the singleton object "None".\n- When "return" executes, the function immediately terminates, pops its frame off the call stack, and hands the return object back to the caller.\n\nVariable Scope and the LEGB Rule:\nPython resolves variable names using the strict LEGB hierarchy:\n1. L (Local): Names assigned inside the current function body.\n2. E (Enclosing): Names in the local scope of any enclosing/outer functions (closures).\n3. G (Global): Names assigned at the top-level of the current module file.\n4. B (Built-in): Python\'s pre-loaded names (like len, print, range, int).\n\nPositional vs Keyword Arguments, *args, and **kwargs:\n- Positional arguments are matched to parameters by their order/position.\n- Keyword arguments are matched by explicitly specifying parameter names (e.g., rate=0.08).\n- *args: Collects arbitrary extra positional arguments into a tuple.\n- **kwargs: Collects arbitrary extra keyword arguments into a dictionary.',
      syntaxDescription: 'def function_name(param1, param2=default, *args, **kwargs):\n    <indented_body>\n    return result',
      exampleCode: '# 1. Defining a function with parameters, defaults, and type annotations\ndef generate_invoice(customer_name: str, subtotal: float, tax_rate: float = 0.05, *items, **metadata):\n    tax_amount = subtotal * tax_rate       # Local variable\n    grand_total = subtotal + tax_amount\n    \n    print(f"--- Invoice for {customer_name} ---")\n    print(f"Items included ({len(items)}): {list(items)}")\n    print(f"Subtotal: ${subtotal:.2f} | Tax: ${tax_amount:.2f}")\n    print(f"Grand Total: ${grand_total:.2f}")\n    \n    if metadata:\n        print(f"Metadata tags: {metadata}")\n    \n    return grand_total\n\n# 2. Calling the function with concrete arguments\n# "Acme Corp" and 250.0 are positional arguments;\n# "Notebook", "Pen" are collected by *items;\n# order_id and priority are collected by **metadata.\nfinal_bill = generate_invoice(\n    "Acme Corp",\n    250.0,\n    0.08,\n    "Notebook", "Pen", "Eraser",\n    order_id=9841,\n    priority="High"\n)',
      codeExplanation: [
        'Line 2 defines "generate_invoice". customer_name, subtotal, and tax_rate are PARAMETERS. tax_rate has a default value (0.05). *items collects extra positional arguments into a tuple; **metadata collects extra keyword arguments into a dictionary.',
        'Lines 3-4 create local variables (tax_amount, grand_total). They only exist during this function call and are garbage collected afterward.',
        'Line 14 uses an explicit "return grand_total" statement to send the number back to the caller.',
        'Lines 20-27 INVOKE the function with concrete ARGUMENTS ("Acme Corp", 250.0, 0.08, etc.) and bind the returned value to "final_bill".'
      ],
      expectedOutput: '--- Invoice for Acme Corp ---\nItems included (3): [\'Notebook\', \'Pen\', \'Eraser\']\nSubtotal: $250.00 | Tax: $20.00\nGrand Total: $270.00\nMetadata tags: {\'order_id\': 9841, \'priority\': \'High\'}',
      commonMistakes: [
        {
          mistake: 'Using a mutable object (like a list or dict) as a default parameter: def add_item(item, items=[]):.',
          consequence: 'The default list is created ONCE when Python parses the function definition. Every subsequent call without arguments mutates the SAME shared list in memory!',
          correction: 'Always use None as default: def add_item(item, items=None): if items is None: items = [].'
        },
        {
          mistake: 'Confusing "print()" with "return".',
          consequence: 'Thinking a function that prints a number has returned it; trying to assign result = my_func() results in result being None.',
          correction: 'Use "print()" to display text on screen for humans; use "return" to send calculated data to other parts of your code.'
        }
      ],
      importantPoints: [
        'Parameters are in the definition header; arguments are the values supplied when calling.',
        'Variables created inside a function are local and cannot be seen from outer scopes.',
        'Never use mutable default arguments (always use None).',
        'Python resolves names using the LEGB order: Local -> Enclosing -> Global -> Built-in.'
      ],
      relatedConcepts: [
        { name: 'Advanced Functions & Decorators', targetId: 'advanced-functions-decorators', note: 'Higher-order functions, closures, and decorators.' }
      ],
      knowledgeCheck: {
        question: 'What is the fundamental difference between a parameter and an argument?',
        options: [
          'Parameters are numbers; arguments are text strings',
          'A parameter is the placeholder variable in the function definition header; an argument is the concrete value passed in when calling the function',
          'Arguments are only used in math; parameters are used in web development',
          'There is no difference; they are exact synonyms in every language'
        ],
        correctIndex: 1,
        explanation: 'Parameters are the formal names defined in the function signature. Arguments are the actual runtime values supplied when invoking the function.'
      },
      endOfTopicQuestions: {
        easy: 'What value does a Python function return if it contains no "return" statement?',
        medium: 'Explain the "mutable default argument trap" in Python with a code example showing how state leaks across calls.',
        hard: 'Explain how Python manages activation records (frames) on the call stack during deep recursive function calls, and what causes a RecursionError.'
      }
    },
    {
      id: 'advanced-functions-decorators',
      sectionId: 'stage-5-functions',
      title: 'Advanced Functions: Closures & Decorators',
      subtitle: 'First-class citizens, higher-order functions, lexical scoping, and the @decorator syntax',
      readingTimeMinutes: 12,
      definition: 'A decorator in Python is a design pattern and syntactic feature (@decorator_name) that allows you to dynamically extend, wrap, or modify the behavior of a function or method without altering its original source code.',
      inSimpleTerms: 'Imagine you have a plain gift box (your function). A decorator is like wrapping the box in festive wrapping paper and adding a ribbon (extra behavior, like logging or access control) around the outside. The gift inside remains completely unchanged, but anyone receiving the box experiences the beautiful wrapper first before opening the gift.',
      whyDoesItExist: 'In large applications, certain chores must happen across dozens of different functions: logging execution time, verifying authentication tokens, catching database timeouts, or caching query results. Writing that identical wrapper code inside every single function pollutes your business logic. Decorators encapsulate cross-cutting concerns into clean, reusable annotations.',
      howDoesItWork: '1. First-Class Functions: In Python, functions are first-class citizens. You can assign functions to variables, pass them as arguments into other functions, and return them from functions.\n2. Higher-Order Function: Any function that accepts another function as an argument, or returns a function as its result.\n3. Lexical Closure: When an inner function references a variable from its outer enclosing scope, and that inner function is returned, it "closes over" and bundles those enclosing variables with it in memory (__closure__ attribute).\n4. The @ Syntax: Writing @my_decorator above "def func():" is pure syntactic sugar for: func = my_decorator(func).',
      syntaxDescription: 'def decorator(func):\n    def wrapper(*args, **kwargs):\n        # before actions\n        result = func(*args, **kwargs)\n        # after actions\n        return result\n    return wrapper\n\n@decorator\ndef target(): ...',
      exampleCode: 'import time\nfrom functools import wraps\n\n# 1. Defining a performance monitoring decorator\ndef time_execution(func):\n    @wraps(func)  # Preserves original function name and docstring\n    def wrapper(*args, **kwargs):\n        start_time = time.perf_counter()\n        result = func(*args, **kwargs)    # Execute the wrapped function\n        end_time = time.perf_counter()\n        duration_ms = (end_time - start_time) * 1000\n        print(f"[METRICS] \'{func.__name__}\' executed in {duration_ms:.3f} ms")\n        return result\n    return wrapper\n\n# 2. Applying the decorator using @ syntax\n@time_execution\ndef process_batch(items_count: int):\n    total = sum(x**2 for x in range(items_count))\n    return total\n\n# 3. Invoking the decorated function\noutcome = process_batch(50000)\nprint(f"Calculation outcome: {outcome}")',
      codeExplanation: [
        'Lines 5-14 define "time_execution". It accepts a target function (func) and defines an inner "wrapper" that measures execution time.',
        'Line 6 uses @wraps(func) from functools: this critical utility copies the original function\'s name, docstring, and metadata onto the wrapper.',
        'Line 9 executes the original function passing all arbitrary *args and **kwargs.',
        'Line 17 uses the @time_execution decorator. This is identical to writing: process_batch = time_execution(process_batch).',
        'Line 24 calls process_batch(): the wrapper runs first, times the execution, prints the log, and returns the result.'
      ],
      expectedOutput: '[METRICS] \'process_batch\' executed in 4.821 ms\nCalculation outcome: 41665416675000',
      commonMistakes: [
        {
          mistake: 'Forgetting to use @functools.wraps(func) inside custom decorators.',
          consequence: 'The decorated function loses its identity: func.__name__ becomes "wrapper" and docstrings are erased, breaking debuggers and documentation tools.',
          correction: 'Always decorate the inner wrapper function with @wraps(func).'
        },
        {
          mistake: 'Forgetting to return the result of the wrapped function inside the wrapper.',
          consequence: 'The decorated function silently returns None instead of its actual computed value.',
          correction: 'Always capture: result = func(*args, **kwargs) and write: return result at the end of the wrapper.'
        }
      ],
      importantPoints: [
        'Functions in Python are first-class objects: they can be passed as values and returned from other functions.',
        'A closure remembers the variables from its enclosing lexical scope even after the outer function has finished executing.',
        '@decorator is syntactic sugar for func = decorator(func).',
        'Always use functools.wraps to preserve function metadata.'
      ],
      relatedConcepts: [
        { name: 'Modules and Packages', targetId: 'modules-packages', note: 'Organizing reusable functions across files.' },
        { name: 'OOP and Methods', targetId: 'oop-concepts', note: 'Built-in decorators like @property, @classmethod, and @staticmethod.' }
      ],
      knowledgeCheck: {
        question: 'What is the syntax "@my_decorator" shorthand for in Python?',
        options: [
          'import my_decorator',
          'func = my_decorator(func)',
          'delete func if my_decorator',
          'run func in the cloud'
        ],
        correctIndex: 1,
        explanation: 'The "@" decorator syntax is syntactic sugar that passes the declared function into the decorator and rebinds the original function name to the returned wrapper.'
      },
      endOfTopicQuestions: {
        easy: 'What built-in standard library decorator should always be used to preserve a function\'s original name and docstring inside a wrapper?',
        medium: 'Explain what a lexical closure is in Python, and describe how variables are stored in its __closure__ cell attributes.',
        hard: 'Write the architectural design for a decorator that accepts configuration arguments, such as @rate_limit(max_requests_per_minute=60).'
      }
    }
  ]
};
