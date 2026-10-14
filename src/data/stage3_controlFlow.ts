import { Section } from '../types/curriculum';

export const stage3Section: Section = {
  id: 'stage-3-control-flow',
  number: 3,
  title: 'Stage 3 — Control Flow',
  badge: 'Decision Logic',
  description: 'Control how programs make decisions and repeat actions: branching with if/elif/else, looping with for and while, iteration protocols, loop control keywords, and avoiding logical edge-case bugs.',
  lessons: [
    {
      id: 'control-flow-overview',
      sectionId: 'stage-3-control-flow',
      title: 'Conditional Branching: if, elif, else',
      subtitle: 'Boolean expressions, truthiness, and branch decisions',
      readingTimeMinutes: 10,
      definition: 'Control flow refers to the order in which individual statements, instructions, or function calls in an imperative program are executed or evaluated. Conditional branching redirects the flow of execution along different code paths based on whether a boolean expression evaluates to True or False.',
      inSimpleTerms: 'By default, a computer executes code strictly from top to bottom like water flowing down a pipe. But software is only useful if it can make choices: "If the user entered the correct password, let them into the dashboard; else, show an error message." Conditional statements act like railway track switches, steering execution down different tracks depending on conditions.',
      whyDoesItExist: 'Static, linear programs that execute the exact same steps regardless of user input or sensor data cannot handle real-world complexity. Branching enables dynamic, intelligent decision-making.',
      howDoesItWork: '1. The interpreter evaluates the condition expression following the "if" keyword.\n2. If the condition evaluates to True (or a "truthy" value), the indented block underneath runs, and all subsequent elif/else branches are completely skipped.\n3. If False, Python skips the block and evaluates the next "elif" (short for "else if") condition.\n4. If all preceding if and elif tests evaluate to False, the final "else" block executes as a fallback default.\n\nTruthiness and Falsiness in Python:\nIn Python, any object can be tested for truth value. The following are inherently "Falsy" (evaluate to False in an if statement):\n- False and None\n- Numeric zero: 0, 0.0, 0j\n- Empty sequences and collections: "", (), [], {}, set(), range(0)\nEverything else in Python evaluates to "Truthy" (evaluates to True).',
      syntaxDescription: 'if <condition>:\n    <indented_block>\nelif <alternative_condition>:\n    <indented_block>\nelse:\n    <default_block>',
      exampleCode: 'user_role = "editor"\naccount_verified = True\narticles_published = 12\n\n# Multi-branch conditional decision with truthiness check\nif not account_verified:\n    print("Access Denied: Please verify your email address.")\nelif user_role == "admin":\n    print("Access Granted: Administrator privileges active.")\nelif user_role == "editor" and articles_published >= 10:\n    print("Access Granted: Senior Editor publishing rights enabled.")\nelif user_role == "editor":\n    print("Access Granted: Standard Editor review rights enabled.")\nelse:\n    print("Access Granted: Read-only viewer mode.")',
      codeExplanation: [
        'Line 6 evaluates "not account_verified". Since account_verified is True, "not True" is False, so this branch is bypassed.',
        'Line 8 tests if user_role is "admin". It is not, so this branch is bypassed.',
        'Line 10 tests both that user_role is "editor" (True) AND articles_published >= 10 (12 >= 10 is True). Since both are True, this block executes.',
        'Lines 12 and 14 are completely skipped because a matching branch was already executed.'
      ],
      expectedOutput: 'Access Granted: Senior Editor publishing rights enabled.',
      commonMistakes: [
        {
          mistake: 'Using multiple independent "if" statements instead of "if...elif...else".',
          consequence: 'Multiple branches execute when only one should have, or contradictory actions overwrite each other.',
          correction: 'Use "elif" when conditions are mutually exclusive alternatives; use independent "if" statements only when conditions should be checked independently.'
        },
        {
          mistake: 'Writing "if items == True:" when testing a list.',
          consequence: 'Fails because a non-empty list [1, 2] is truthy, but it is not equal to the boolean literal True.',
          correction: 'Leverage Python\'s natural truthiness: simply write "if items:" (which evaluates to True if the collection is non-empty).'
        }
      ],
      importantPoints: [
        'Python uses indentation (4 spaces) to define code blocks; there are no { } braces.',
        'Once any condition in an if-elif chain evaluates to True, its block runs and all subsequent elif/else blocks are skipped.',
        'Python supports the ternary conditional expression: value_if_true if condition else value_if_false.'
      ],
      relatedConcepts: [
        { name: 'Operators', targetId: 'operators', note: 'Comparison and logical operators used in conditions.' },
        { name: 'Loops and Iteration', targetId: 'loops-iteration', note: 'Repeating actions under conditional control.' }
      ],
      knowledgeCheck: {
        question: 'What does the expression bool([]) evaluate to in Python?',
        options: [
          'True',
          'False',
          'None',
          'Error'
        ],
        correctIndex: 1,
        explanation: 'In Python, empty collections (like an empty list []) are inherently falsy and evaluate to False in boolean contexts.'
      },
      endOfTopicQuestions: {
        easy: 'What keyword represents "else if" in Python syntax?',
        medium: 'Explain the difference between writing three separate "if" statements versus an "if...elif...else" chain.',
        hard: 'How does Python evaluate conditional expressions containing custom classes that implement the __bool__() or __len__() dunder methods?'
      }
    },
    {
      id: 'loops-iteration',
      sectionId: 'stage-3-control-flow',
      title: 'Loops: for, while, Iteration, & Control Keywords',
      subtitle: 'Definite vs indefinite loops, range(), break, continue, pass, and off-by-one errors',
      readingTimeMinutes: 11,
      definition: 'A loop is a control structure that repeatedly executes a designated block of code either for every element in an iterable collection (definite iteration via the "for" loop) or as long as a specified boolean condition remains True (indefinite iteration via the "while" loop).',
      inSimpleTerms: 'Computers never get bored or tired. If you need to send 10,000 emails, resize 500 images, or calculate payroll for 2,000 employees, you do not write the code 2,000 times. You write the instructions once inside a loop, and tell the computer: "Repeat this action for every single item on this list."',
      whyDoesItExist: 'Repetitive manual code violates the foundational software principle DRY (Don\'t Repeat Yourself). Loops allow a concise, 3-line block of code to process millions of items systematically.',
      howDoesItWork: '1. for loop (Definite Iteration): Operates on "iterables" (lists, tuples, strings, dictionaries, ranges). Python requests an iterator from the object and calls its next() method on every cycle until the collection is exhausted.\n2. while loop (Indefinite Iteration): Evaluates a condition before every cycle. As long as the condition evaluates to True, the block executes. The programmer must ensure the condition eventually becomes False, or an "infinite loop" occurs.\n3. range(start, stop, step): Built-in generator of immutable arithmetic sequences. Stop is exclusive.\n\nLoop Control Keywords:\n- break: Immediately terminates the entire loop and jumps execution to the first statement outside the loop.\n- continue: Immediately skips the remainder of the current iteration and jumps to the next cycle.\n- pass: A null statement that serves as a syntactic placeholder when Python syntax requires a block but no action is needed.\n- else on loops: Python loops support an optional "else" clause! The else block executes ONLY if the loop completed naturally without hitting a "break" statement.',
      syntaxDescription: 'for item in iterable:\n    <block>\nwhile condition:\n    <block>',
      exampleCode: '# 1. Definite iteration using range and continue\nprint("Even numbers under 10:")\nfor n in range(1, 10):\n    if n % 2 != 0:       # If odd, skip this iteration\n        continue\n    print(f"-> {n}")\n\n# 2. Searching with while, break, and loop-else\ntarget = 42\nnumbers = [10, 25, 33, 42, 58, 90]\nindex = 0\n\nwhile index < len(numbers):\n    current = numbers[index]\n    if current == target:\n        print(f"Found target {target} at index {index}!")\n        break\n    index += 1\nelse:\n    print("Target not found in sequence.")',
      codeExplanation: [
        'Line 3 creates a sequence from 1 to 9 (10 is exclusive).',
        'Line 4 tests if the number is odd. If so, Line 5 calls "continue", which immediately skips Line 6 and proceeds to the next number.',
        'Lines 13-19 demonstrate a while loop searching for a target.',
        'Line 18 calls "break" when found, immediately exiting the while loop.',
        'Line 20 contains the loop "else" clause. Because "break" was hit on Line 18, this else block is safely skipped.'
      ],
      expectedOutput: 'Even numbers under 10:\n-> 2\n-> 4\n-> 6\n-> 8\nFound target 42 at index 3!',
      commonMistakes: [
        {
          mistake: 'Forgetting to increment the loop counter inside a while loop.',
          consequence: 'Infinite loop: the condition never becomes False, freezing your program and consuming 100% CPU.',
          correction: 'Always ensure the while loop body modifies the variable that the condition depends upon.'
        },
        {
          mistake: 'Off-by-one error: writing range(0, 10) expecting 10 iterations including the number 10.',
          consequence: 'The loop executes for numbers 0 through 9, omitting 10 entirely.',
          correction: 'Remember that the stop parameter in range(start, stop) is strictly exclusive. To include 10, write range(0, 11).'
        }
      ],
      importantPoints: [
        'Prefer "for item in collection:" over index-based looping "for i in range(len(collection)):".',
        'Use the built-in enumerate(collection) function when you need both the element and its index position.',
        'The loop else block only executes if the loop completed without encountering a break statement.'
      ],
      relatedConcepts: [
        { name: 'Data Structures', targetId: 'data-structures-overview', note: 'Iterating over lists, tuples, sets, and dicts.' },
        { name: 'Iterators & Generators', targetId: 'advanced-python', note: 'How Python\'s iteration protocol functions under the hood.' }
      ],
      knowledgeCheck: {
        question: 'Under what specific condition does a Python loop\'s optional "else" clause execute?',
        options: [
          'Whenever the loop throws an unhandled exception',
          'Only when the loop encounters a break statement',
          'Only when the loop finishes all iterations naturally WITHOUT encountering a break statement',
          'Only if the loop iterable was completely empty from the start'
        ],
        correctIndex: 2,
        explanation: 'In Python, a loop else block runs when the loop terminates naturally (exhausts the iterable or while condition becomes False). If terminated by break, else is skipped.'
      },
      endOfTopicQuestions: {
        easy: 'What numbers are generated by range(2, 8, 2)?',
        medium: 'Explain the difference in execution behavior between the "break" and "continue" keywords.',
        hard: 'Explain what an off-by-one fencepost error is and how Python\'s half-open intervals [start, stop) help avoid it in data slicing.'
      }
    }
  ]
};
