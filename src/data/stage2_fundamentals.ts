import { Section } from '../types/curriculum';

export const stage2Section: Section = {
  id: 'stage-2-fundamentals',
  number: 2,
  title: 'Stage 2 — Python Fundamentals',
  badge: 'Core Concepts',
  description: 'Master the fundamental building blocks of computation: variables as object references, the type system and memory mutability, operators and expression evaluation, and strings as immutable character sequences.',
  lessons: [
    {
      id: 'variables',
      sectionId: 'stage-2-fundamentals',
      title: 'Variables: Names, Values, & Object References',
      subtitle: 'Understanding Python\'s reference model and name binding',
      readingTimeMinutes: 12,
      definition: 'In Python, a variable is a human-readable identifier (a symbolic name) that serves as a reference or pointer bound to an object residing in computer memory (heap memory).',
      inSimpleTerms: 'Many introductory tutorials tell you that a variable is "a box that holds a value". In Python, that box metaphor is technically misleading! In Python, values (like numbers, words, and lists) exist as independent physical objects floating in computer memory. A variable is not the box itself; a variable is a sticky nametag attached to that object by a piece of string. When you assign a variable, you are attaching a nametag to an object. When you reassign it, you peel the nametag off and stick it onto a different object.',
      whyDoesItExist: 'Computer memory stores information at physical electrical hardware addresses (such as 0x7ffd5e39b4a0). Humans cannot write software by memorizing millions of 16-digit hexadecimal memory numbers. Variables exist so humans can give meaningful, logical names (like "user_email", "total_price", or "login_attempts") to dynamic values in memory, allowing code to manipulate data over time without needing to know physical hardware addresses.',
      howDoesItWork: 'When Python encounters the assignment statement "x = 10":\n1. It evaluates the right-hand side first: Python allocates an integer object with value 10 in memory.\n2. It inspects the left-hand side identifier "x".\n3. It registers the name "x" in the current namespace (a symbol table dictionary).\n4. It binds the name "x" to point to the memory address of the integer object 10.\n5. The object\'s internal reference counter is incremented by 1.\n\nPython Naming Rules (Enforced strictly by the syntax parser):\n- Must begin with a letter (a-z, A-Z) or an underscore (_).\n- Cannot begin with a number (e.g., 2user is a SyntaxError; user2 is valid).\n- Can only contain alphanumeric characters and underscores (a-z, A-Z, 0-9, and _).\n- Cannot contain spaces, hyphens, or punctuation symbols (user-name and user name are invalid).\n- Cannot use Python reserved keywords (like if, for, class, def, return, while, import).\n- Python is case-sensitive: "score", "Score", and "SCORE" are three completely different variables.\n\nPython Naming Conventions (PEP 8 standard adopted across the software industry):\n- Variables and functions: snake_case (lowercase words joined by underscores: item_count, max_retries).\n- Constants (values that never change): UPPER_CASE_WITH_UNDERSCORES (e.g., MAX_CONNECTIONS, TAX_RATE).\n- Classes: PascalCase (e.g., UserProfile, DatabaseConnection).\n- Internal/Private variables: prefix with single underscore (e.g., _internal_cache).',
      syntaxDescription: 'identifier = expression\nThe "=" symbol is the assignment operator. It does NOT mean mathematical equality (which is ==). It assigns the evaluated result of the right side to the name on the left.',
      exampleCode: '# 1. Name binding and assignment\naccount_balance = 1000\nmonthly_interest_rate = 0.05\n\n# 2. Reassignment\ninterest_earned = account_balance * monthly_interest_rate\naccount_balance = account_balance + interest_earned\n\n# 3. Multiple variable assignment\nx, y, z = 10, 20, 30\n\n# 4. Shared reference demonstration\nfirst_name = "Alice"\nsecond_name = first_name\n\nprint(f"Final Balance: ${account_balance:.2f}")\nprint(f"Coordinates: x={x}, y={y}, z={z}")\nprint(f"Names: first={first_name}, second={second_name}")',
      codeExplanation: [
        'Line 2 creates an integer object 1000 and binds the name "account_balance" to it.',
        'Line 3 creates a float object 0.05 and binds "monthly_interest_rate" to it.',
        'Line 6 calculates the product (50.0) and binds the new float object to "interest_earned".',
        'Line 7 evaluates the right-hand side first (1000 + 50.0 = 1050.0), creates a new float object 1050.0, and rebinds the existing name "account_balance" to this new object. The old object 1000 loses this reference.',
        'Line 10 demonstrates tuple unpacking: assigning 10 to x, 20 to y, and 30 to z in a single atomic line.',
        'Line 13 binds the name "first_name" to the string object "Alice".',
        'Line 14 binds the name "second_name" to the exact same string object "Alice" in memory. Both variables now refer to the same object address.',
        'Lines 16-18 print the formatted results to stdout.'
      ],
      expectedOutput: 'Final Balance: $1050.00\nCoordinates: x=10, y=20, z=30\nNames: first=Alice, second=Alice',
      commonMistakes: [
        {
          mistake: 'Confusing the single equals sign (=) with double equals (==).',
          consequence: 'SyntaxError or unintended variable mutation when trying to test equality in conditional logic.',
          correction: 'Use single = strictly for variable assignment; use double == strictly for checking equality.'
        },
        {
          mistake: 'Using a Python reserved keyword as a variable name (e.g., class = "Math").',
          consequence: 'SyntaxError: invalid syntax.',
          correction: 'Never name variables using Python keywords. Use course_class or subject_name instead.'
        },
        {
          mistake: 'Attempting to use a variable before it has been assigned (e.g., print(total) before total = 0).',
          consequence: 'NameError: name \'total\' is not defined.',
          correction: 'Always initialize and assign a variable above the line where it is first read.'
        }
      ],
      importantPoints: [
        'Variables in Python are references (nametags) pointing to objects in heap memory.',
        'Python is dynamically typed: you do not declare variable types; names take on the type of whatever object they point to.',
        'Follow PEP 8: use snake_case for variable names (e.g., user_account_balance).',
        'Variable scope: variables declared inside a function are local to that function and cannot be accessed from the outside.'
      ],
      relatedConcepts: [
        { name: 'Data Types', targetId: 'data-types', note: 'The types of objects variables point to.' },
        { name: 'Scope & LEGB Rule', targetId: 'functions', note: 'How Python searches namespaces for variable names.' },
        { name: 'Memory References & GC', targetId: 'advanced-python', note: 'Reference counting and garbage collection.' }
      ],
      knowledgeCheck: {
        question: 'When you write "a = 5" followed by "b = a", what happens in Python memory?',
        options: [
          'Python creates two separate copies of the number 5 on the hard drive',
          'Both names "a" and "b" now refer to the exact same integer object 5 in memory',
          'Variable "a" is deleted and replaced by "b"',
          'Python converts the number 5 into text'
        ],
        correctIndex: 1,
        explanation: 'In Python, assignment binds names to objects. "b = a" attaches the name "b" to the exact same object currently bound to "a".'
      },
      endOfTopicQuestions: {
        easy: 'Which of the following is a valid Python variable name: "2nd_player", "second-player", or "second_player"? Explain why.',
        medium: 'Explain why the "box" analogy for variables can cause serious confusion when dealing with mutable data structures like lists.',
        hard: 'Use the id() function concept to explain what happens to memory references when you reassign an integer variable.'
      },
      memoryDiagram: {
        title: 'Python Name-to-Object Reference Binding',
        description: 'Variables are not storage bins; they are pointers in the namespace table pointing to heap objects.',
        bindings: [
          { name: 'account_balance', pointsTo: 'Float Object', type: 'float', memoryId: '0x104b28d70', value: '1050.0' },
          { name: 'first_name', pointsTo: 'String Object', type: 'str', memoryId: '0x104b321a0', value: '"Alice"' },
          { name: 'second_name', pointsTo: 'String Object', type: 'str', memoryId: '0x104b321a0', value: '"Alice"' }
        ]
      }
    },
    {
      id: 'data-types',
      sectionId: 'stage-2-fundamentals',
      title: 'Data Types: The Python Type System & Mutability',
      subtitle: 'Integers, floats, booleans, strings, None, collections, and mutability rules',
      readingTimeMinutes: 12,
      definition: 'A data type is a formal classification in a programming language that specifies the category of value an object holds, the set of permissible operations that can be performed on it, and how the value is represented in memory.',
      inSimpleTerms: 'In real life, you cannot treat a word the same way you treat a number: you can multiply 5 by 4, but you cannot multiply "elephant" by "sunshine". Similarly, computers must know whether a piece of data is a number to calculate, a sentence to read, a true/false decision switch, or a list of items to organize. Data types define these fundamental rules of reality for data.',
      whyDoesItExist: 'Programming languages use types to prevent nonsensical operations (like attempting to divide a photograph by a date), allocate appropriate memory in physical hardware, and allow the compiler/interpreter to optimize mathematical and logical operations.',
      howDoesItWork: 'Python is dynamically and strongly typed:\n- "Dynamically typed" means variables do not have fixed types; objects do. A variable can point to an integer at one moment and a string the next.\n- "Strongly typed" means Python never quietly coerces types in dangerous ways: adding the string "5" to the number 5 raises a TypeError rather than quietly producing 10 or "55" (unlike JavaScript).\n\nThe Python Core Types Breakdown:\n1. int (Integer): Whole numbers of arbitrary precision (e.g., -42, 0, 1000000000000). Python automatically expands memory to hold arbitrarily large integers.\n2. float (Floating-Point Number): Numbers with fractional decimal points (e.g., 3.14159, -0.001, 2.0). Implemented as double-precision 64-bit IEEE 754 floats.\n3. bool (Boolean): Binary truth values: either True or False. Subclass of integer (True == 1, False == 0).\n4. str (String): Immutable ordered sequences of Unicode characters (e.g., "Hello, World!").\n5. NoneType (None): Python\'s singleton object representing the intentional absence of a value or a null state.\n6. list: Mutable ordered sequence of arbitrary objects ([1, "apple", True]).\n7. tuple: Immutable ordered sequence of arbitrary objects ((1, 2, 3)).\n8. set: Mutable unordered collection of unique, hashable elements ({1, 2, 3}).\n9. dict: Mutable mapping of key-value pairs ({"name": "Alice", "age": 30}).\n\nMutable versus Immutable Types:\n- Immutable types: Once created in memory, their contents CANNOT be altered in-place. If you modify them, Python creates a brand-new object. (int, float, bool, str, tuple, frozenset).\n- Mutable types: Their internal contents CAN be changed in-place without altering their memory address. (list, dict, set).',
      syntaxDescription: 'Inspect types using type(obj). Check types safely using isinstance(obj, ClassName). Convert types using int(x), float(x), str(x), bool(x).',
      exampleCode: '# Inspecting and verifying types\ncount = 42\nratio = 3.14159\nis_active = True\nlabel = "Production"\nempty_state = None\n\nprint(f"count is {type(count).__name__}: {count}")\nprint(f"ratio is {type(ratio).__name__}: {ratio}")\nprint(f"is_active is {type(is_active).__name__}: {is_active}")\nprint(f"empty_state is {type(empty_state).__name__}: {empty_state}")\n\n# Type checking with isinstance\nif isinstance(count, int):\n    print("count is verified as an integer.")\n\n# Type conversion (casting)\nraw_input = "250"\nconverted_number = int(raw_input)\nprint(f"Converted string \'{raw_input}\' to number: {converted_number + 50}")',
      codeExplanation: [
        'Lines 2-6 declare variables across the core primitive types.',
        'Lines 8-11 use the built-in type() function to inspect each object\'s runtime class.',
        'Lines 14-15 demonstrate isinstance(): the industry standard for safe type verification in production code.',
        'Lines 18-20 demonstrate explicit type casting: converting the string "250" into an integer 250 so mathematical addition (250 + 50 = 300) can proceed.'
      ],
      expectedOutput: 'count is int: 42\nratio is float: 3.14159\nis_active is bool: True\nempty_state is NoneType: None\ncount is verified as an integer.\nConverted string \'250\' to number: 300',
      commonMistakes: [
        {
          mistake: 'Using type(x) == int instead of isinstance(x, int).',
          consequence: 'Fails when checking subclasses (e.g., bool is a subclass of int, but type equality checks miss inheritance hierarchy).',
          correction: 'Always prefer isinstance(x, (int, float)) for type verification.'
        },
        {
          mistake: 'Attempting to mutate an immutable string in-place: name = "Alice"; name[0] = "E".',
          consequence: 'TypeError: \'str\' object does not support item assignment.',
          correction: 'Strings cannot be mutated in place. Create a new string: name = "E" + name[1:].'
        }
      ],
      importantPoints: [
        'Everything in Python is an object, including integers, functions, and modules.',
        'Python is strongly typed: it will never silently convert incompatible types behind your back.',
        'Know the difference between mutable (list, dict, set) and immutable (int, float, str, tuple).'
      ],
      relatedConcepts: [
        { name: 'Operators', targetId: 'operators', note: 'Operations allowed on each data type.' },
        { name: 'Data Structures', targetId: 'data-structures-overview', note: 'Deep dive into collection types.' }
      ],
      knowledgeCheck: {
        question: 'Which of the following data types in Python is MUTABLE?',
        options: [
          'tuple',
          'str',
          'int',
          'list'
        ],
        correctIndex: 3,
        explanation: 'Lists are mutable: you can append, remove, or modify items in-place. Tuples, strings, and integers are strictly immutable.'
      },
      endOfTopicQuestions: {
        easy: 'What built-in Python function returns the data type of an object?',
        medium: 'Why is Python classified as both "dynamically typed" and "strongly typed"? Give an example showing each.',
        hard: 'Explain why floating-point numbers cannot represent decimal values like 0.1 + 0.2 with exact mathematical precision in computer hardware.'
      }
    },
    {
      id: 'operators',
      sectionId: 'stage-2-fundamentals',
      title: 'Operators: Expressions, Precedence, & Evaluation',
      subtitle: 'Arithmetic, comparison, assignment, logical, membership, and identity operators',
      readingTimeMinutes: 10,
      definition: 'An operator is a special symbol or keyword in a programming language that instructs the interpreter to perform a specific mathematical, relational, or logical computation on one or more operands.',
      inSimpleTerms: 'If values and variables are the nouns of programming, operators are the verbs. Operators do the active work: they add numbers, compare whether two values are equal, test whether a condition is true, or check whether a word exists inside a sentence.',
      whyDoesItExist: 'Computers are fundamentally calculation engines. Operators provide concise, universal mathematical notation to perform computations, evaluate logical conditions, and control execution paths.',
      howDoesItWork: 'An expression is any legal combination of literals, variables, and operators that evaluates down to a single value. When Python evaluates an expression with multiple operators, it resolves them according to strict Operator Precedence rules:\n1. Parentheses ( ): Highest precedence. Expressions inside are evaluated first.\n2. Exponentiation **: Evaluated right-to-left.\n3. Unary signs: +x, -x, ~x.\n4. Multiplication, Division, Floor Division, Modulus: *, /, //, %.\n5. Addition and Subtraction: +, -.\n6. Comparison, Membership, Identity: <, <=, >, >=, ==, !=, in, not in, is, is not.\n7. Boolean NOT: not.\n8. Boolean AND: and.\n9. Boolean OR: Lowest precedence: or.\n\nOperator Categories Defined:\n- Arithmetic: + (add), - (subtract), * (multiply), / (float divide), // (floor integer divide), % (modulo/remainder), ** (power).\n- Comparison: == (equal value), != (not equal), <, <=, >, >= (relational).\n- Logical: and (both must be true), or (at least one must be true), not (inverts boolean).\n- Membership: in (element exists in collection), not in (element does not exist).\n- Identity: is (tests if two variables point to the EXACT same memory address), is not.\n\nCRITICAL DISTINCTION: == versus is:\n- "==" checks value equality: Do both objects represent the same data?\n- "is" checks object identity: Do both variables point to the exact same physical memory address in RAM?',
      syntaxDescription: 'operand operator operand (binary) or operator operand (unary).',
      exampleCode: '# Arithmetic operations\nsubtotal = 100\ndiscount = subtotal * 0.10      # Multiplication\ntax = (subtotal - discount) * 0.08 # Parentheses enforce precedence\nfinal_total = (subtotal - discount) + tax\n\n# Modulo and Floor Division\nitems = 14\nbox_capacity = 4\nfull_boxes = items // box_capacity  # Floor division: 3\nleftover_items = items % box_capacity # Modulo remainder: 2\n\n# Comparison and Logical\nis_bulk = items > 10\nqualifies_for_shipping = is_bulk and final_total > 50\n\n# == vs is\nlist_a = [1, 2, 3]\nlist_b = [1, 2, 3]\nprint(f"Values equal (==): {list_a == list_b}")\nprint(f"Same identity (is): {list_a is list_b}")',
      codeExplanation: [
        'Line 3 uses multiplication (*) to calculate discount.',
        'Line 4 uses parentheses to guarantee that subtraction occurs before multiplying by tax rate.',
        'Lines 9-10 demonstrate floor division (// returns whole integer 3) and modulo (% returns leftover remainder 2).',
        'Line 14 combines comparison (>) and logical "and" to produce a boolean result.',
        'Lines 17-20 show the crucial difference between equality and identity: list_a and list_b have identical values (== is True), but they are two distinct list objects in memory (is is False).'
      ],
      expectedOutput: 'Values equal (==): True\nSame identity (is): False',
      commonMistakes: [
        {
          mistake: 'Using "is" instead of "==" to compare numbers or strings (e.g., if status is "success").',
          consequence: 'May appear to work due to CPython string interning optimizations, but catastrophically fails with dynamic or large values.',
          correction: 'Always use "==" for checking value equality; reserve "is" strictly for singletons like "if var is None".'
        },
        {
          mistake: 'Assuming single slash / produces an integer like in older C or Python 2.',
          consequence: 'Accidentally producing floats (e.g., 4 / 2 returns float 2.0, not integer 2).',
          correction: 'Use // if you explicitly require an integer result.'
        }
      ],
      importantPoints: [
        'When in doubt about precedence, use parentheses () to make your mathematical and logical intent explicit.',
        'Logical operators in Python use short-circuit evaluation: if the left side of "and" is False, the right side is never evaluated.',
        'Use "is None" and "is not None" when testing for NoneType.'
      ],
      relatedConcepts: [
        { name: 'Control Flow', targetId: 'control-flow-overview', note: 'Using boolean operators in if/else decisions.' }
      ],
      knowledgeCheck: {
        question: 'What is the evaluated result of the expression: 2 + 3 * 4 ?',
        options: [
          '20',
          '14',
          '24',
          '9'
        ],
        correctIndex: 1,
        explanation: 'Multiplication (*) has higher precedence than addition (+). Python evaluates 3 * 4 = 12 first, then 2 + 12 = 14.'
      },
      endOfTopicQuestions: {
        easy: 'What is the difference between standard division (/) and floor division (//)?',
        medium: 'Explain the difference between the equality operator (==) and the identity operator (is) with a code example.',
        hard: 'What is short-circuit evaluation, and how can it be used defensively to prevent division by zero or NoneType attribute errors?'
      }
    },
    {
      id: 'strings',
      sectionId: 'stage-2-fundamentals',
      title: 'Strings: Sequences, Slicing, & Text Manipulation',
      subtitle: 'Unicode character sequences, indexing, immutability, methods, and f-strings',
      readingTimeMinutes: 11,
      definition: 'A string (str) in Python is an immutable, ordered sequence of Unicode code-point characters used to store, manipulate, and represent text.',
      inSimpleTerms: 'Text in computer programming is called a "string" because you can picture it as a necklace made of individual character beads strung together in order. Because it is ordered, every character has an exact position number (index). Because it is immutable, you cannot reach into an existing string and swap out a single bead; to change it, you must forge a new necklace.',
      whyDoesItExist: 'Human interaction with computers happens through written language: usernames, messages, document contents, file paths, web pages, and API responses. Strings provide rich methods to search, clean, split, join, and format text.',
      howDoesItWork: 'Indexing and Slicing:\n- Python uses 0-based indexing: the first character is at index 0, the second at 1, and so forth.\n- Negative indexing counts backward from the end: -1 is the last character, -2 is the second to last.\n- Slicing extracts a substring using the formula: sequence[start:stop:step]\n  - start: the inclusive beginning index (defaults to 0).\n  - stop: the exclusive ending index (Python stops BEFORE this position).\n  - step: the stride or stride direction (defaults to 1; -1 reverses the string).\n\nString Immutability:\nStrings cannot be mutated in place. Methods like .upper(), .strip(), and .replace() do NOT modify the original string; they return a brand-new string object in memory.\n\nFormatting Evolution:\nModern Python uses f-strings (formatted string literals, introduced in Python 3.6), written with an f prefix: f"Hello, {name}!". Expressions inside curly braces { } are evaluated at runtime.',
      syntaxDescription: 'Literals in single quotes \'...\', double quotes "...", or triple quotes """...""" for multi-line blocks. Slicing: s[start:stop:step].',
      exampleCode: 'raw_text = "   Python Programming Language   "\n\n# 1. Stripping whitespace and changing case\ncleaned = raw_text.strip()           # Removes leading/trailing spaces\nuppercase_title = cleaned.upper()     # Creates new uppercase string\n\n# 2. Indexing and Slicing\nfirst_char = cleaned[0]               # \'P\'\nlast_char = cleaned[-1]               # \'e\'\nfirst_word = cleaned[0:6]             # \'Python\' (indices 0,1,2,3,4,5)\nreversed_str = cleaned[::-1]          # Reverse using step -1\n\n# 3. Modern f-string formatting\nversion = 3.12\nfeatures_count = 142\nsummary = f"Language: {cleaned} | Version: {version:.1f} | Features: {features_count:,}"\n\nprint(f"Cleaned: \'{cleaned}\'")\nprint(f"First word slice: \'{first_word}\'")\nprint(f"Reversed: \'{reversed_str[:10]}...\'")\nprint(summary)',
      codeExplanation: [
        'Line 4 uses .strip() to trim exterior whitespace. raw_text is unchanged in memory.',
        'Line 8 accesses index 0 to get the first character "P".',
        'Line 9 accesses negative index -1 to get the final character "e".',
        'Line 10 slices from index 0 up to (but not including) index 6, yielding "Python".',
        'Line 11 uses a step of -1 to reverse the entire character sequence.',
        'Line 16 uses f-string format specifiers: .1f formats float to 1 decimal place; :, adds thousand separators to numbers.'
      ],
      expectedOutput: 'Cleaned: \'Python Programming Language\'\nFirst word slice: \'Python\'\nReversed: \'egaugnaL g...\'\nLanguage: Python Programming Language | Version: 3.12 | Features: 142',
      commonMistakes: [
        {
          mistake: 'Forgetting that slice stop indices are exclusive, expecting string[0:3] to return 4 characters.',
          consequence: 'Off-by-one error; only 3 characters (indices 0, 1, 2) are returned.',
          correction: 'Remember: length of slice [start:stop] is always equal to (stop - start).'
        },
        {
          mistake: 'Assuming calling a string method alters the variable: text.strip(); print(text).',
          consequence: 'The printed text still contains all the whitespace.',
          correction: 'Strings are immutable. Always reassign the returned object: text = text.strip().'
        }
      ],
      importantPoints: [
        'Strings are immutable: no method ever changes a string in place.',
        'Python indices are 0-based; slice stop indices are exclusive.',
        'f-strings are the fastest and most readable string formatting technique in Python.'
      ],
      relatedConcepts: [
        { name: 'Data Types', targetId: 'data-types', note: 'Strings as primitive sequence types.' },
        { name: 'Regular Expressions', targetId: 'files-and-data', note: 'Advanced pattern matching on strings.' }
      ],
      knowledgeCheck: {
        question: 'Given word = "COMPUTER", what does the slice word[1:4] evaluate to?',
        options: [
          '"COM"',
          '"OMP"',
          '"COMP"',
          '"MPU"'
        ],
        correctIndex: 1,
        explanation: 'Index 1 is "O", index 2 is "M", and index 3 is "P". Stop index 4 is exclusive, so it stops before index 4 ("U"), producing "OMP".'
      },
      endOfTopicQuestions: {
        easy: 'What character is at index -1 in the string "PYTHON"?',
        medium: 'Explain why the operation text = "Hello"; text[0] = "h" raises a TypeError.',
        hard: 'How do f-strings achieve faster runtime execution performance compared to older %-formatting or .format() methods?'
      }
    }
  ]
};
