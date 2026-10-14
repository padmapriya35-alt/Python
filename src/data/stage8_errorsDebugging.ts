import { Section } from '../types/curriculum';

export const stage8Section: Section = {
  id: 'stage-8-errors-debugging',
  number: 8,
  title: 'Stage 8 — Errors, Exceptions, & Debugging',
  badge: 'Reliability',
  description: 'Master defensive software engineering: categorizing errors (syntax, runtime, logic), the exact anatomy of tracebacks, exception handling (try/except/else/finally), creating custom domain exceptions, structured logging, and interactive debugging.',
  lessons: [
    {
      id: 'errors-and-debugging',
      sectionId: 'stage-8-errors-debugging',
      title: 'Exception Handling: try, except, else, & finally',
      subtitle: 'The three error categories, reading tracebacks, and resilient control flow',
      readingTimeMinutes: 13,
      definition: 'An exception in Python is a specialized runtime event or object that interrupts the normal sequential execution of instructions when an unexpected condition or error occurs. Exception handling is the structured mechanism used to intercept, handle, and recover from these errors gracefully.',
      inSimpleTerms: 'In the real world, things go wrong outside your control: a website goes offline, a user types a word when asked for their age, or a hard drive fills up. If an airplane encounters a crosswind, it does not immediately drop out of the sky; its autopilot detects the wind and adjusts the flaps. Exception handling is the software equivalent of that autopilot: instead of letting an unexpected glitch crash the entire application for all users, your code catches the problem, logs what happened, and continues running smoothly.',
      whyDoesItExist: 'Without exception handling, any minor glitch—such as an invalid character entered by one user on a web server—would crash the entire server process, booting all thousands of active customers off the platform.',
      howDoesItWork: 'The Three Categories of Programming Errors:\n1. Syntax Errors: Grammatical mistakes detected during the parsing phase BEFORE any code runs (e.g., missing colon, unclosed parenthesis, invalid keyword). The program refuses to start.\n2. Runtime Errors (Exceptions): Syntactically valid code that encounters an impossible condition while actively running (e.g., dividing by zero, opening a non-existent file, indexing out of bounds).\n3. Logic Errors: The program runs without crashing and has zero syntax errors, but produces the wrong answer because the programmer\'s mathematical formula or logic was flawed (e.g., adding taxes instead of subtracting them).\n\nHOW TO READ A PYTHON TRACEBACK (STEP BY STEP):\nAlways read a Python traceback FROM THE VERY BOTTOM UP!\n- Step 1: The Last Line. Look at the final line of the traceback first. It states the Exception Class and Diagnostic Message: e.g., "ZeroDivisionError: division by zero" or "KeyError: \'email\'". This tells you WHAT went wrong.\n- Step 2: The Line Directly Above It. This displays the exact file path, the exact line number, and the snippet of code that triggered the exception. This tells you WHERE it happened.\n- Step 3: Upward Stack Trace. If the error happened inside several nested function calls, each frame above shows the calling function that triggered the previous frame, tracing back to the top-level script.\n\nThe Complete Four-Part Exception Architecture:\n- try: Place code that might fail inside this block.\n- except SpecificError as e: Intercepts that specific error class and runs recovery logic.\n- else: Executes ONLY if the try block succeeded completely with ZERO exceptions!\n- finally: GUARANTEED to execute under ALL circumstances (whether an exception occurred, was handled, or unhandled), making it the ideal location to close network sockets or database connections.',
      syntaxDescription: 'try:\n    <risky_code>\nexcept SpecificError as err:\n    <recovery_code>\nelse:\n    <runs_only_if_no_exception>\nfinally:\n    <runs_always_no_matter_what>',
      exampleCode: 'import logging\n\n# Configure structured logging instead of raw print statements\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")\n\ndef divide_funds(total_capital: float, department_count: int) -> float:\n    """Safely calculates budget allocation per department."""\n    try:\n        logging.info("Initiating fund division calculation...")\n        allocation = total_capital / department_count\n    except ZeroDivisionError as err:\n        logging.error(f"Cannot divide capital among 0 departments: {err}")\n        # Fallback recovery strategy:\n        allocation = 0.0\n    except TypeError as err:\n        logging.error(f"Invalid input type received: {err}")\n        raise  # Re-raise to caller if unrecoverable\n    else:\n        logging.info("Calculation completed with zero errors.")\n    finally:\n        logging.info("Allocation audit trail recorded.")\n        \n    return allocation\n\n# Safe run with 0 departments\nresult = divide_funds(100000.0, 0)\nprint(f"Allocated per department: ${result:.2f}")',
      codeExplanation: [
        'Lines 3-4 configure Python\'s built-in "logging" module for structured observability.',
        'Lines 8-10 enclose the division in a "try" block.',
        'Lines 11-14 catch a specific "ZeroDivisionError", log the diagnostic error cleanly, and provide a safe fallback value (0.0).',
        'Lines 15-17 catch a "TypeError" and use "raise" to re-raise it if improper types are passed.',
        'Lines 18-19 contain the "else" block, which executes only if division succeeds.',
        'Lines 20-21 contain the "finally" block, which executes unconditionally to record the audit log.'
      ],
      expectedOutput: '2026-10-14 10:18:22 [INFO] Initiating fund division calculation...\n2026-10-14 10:18:22 [ERROR] Cannot divide capital among 0 departments: division by zero\n2026-10-14 10:18:22 [INFO] Allocation audit trail recorded.\nAllocated per department: $0.00',
      commonMistakes: [
        {
          mistake: 'Using bare except: try: ... except: pass.',
          consequence: 'This silently catches and swallows EVERYTHING, including KeyboardInterrupt (preventing you from stopping the program with Ctrl+C), SystemExit, and typos in variable names, making bugs completely invisible.',
          correction: 'Always catch specific exception types (e.g., except (ValueError, KeyError):) and never pass silently without logging.'
        },
        {
          mistake: 'Wrapping your entire 500-line application in one giant try/except block.',
          consequence: 'Obscures where errors originate and makes targeted recovery impossible.',
          correction: 'Keep try blocks tight and focused around the specific lines that perform risky I/O or type conversions.'
        }
      ],
      importantPoints: [
        'Always read tracebacks from the bottom line upward.',
        'Never use bare "except: pass"; always catch explicit exception types.',
        'Use "else" for code that should run only if the try block succeeded.',
        'Use "finally" for guaranteed cleanup (closing connections, releasing locks).',
        'Use structured logging (logging module) instead of print statements in production.'
      ],
      relatedConcepts: [
        { name: 'Custom Exceptions', targetId: 'custom-exceptions', note: 'Creating domain-specific exceptions for business rules.' }
      ],
      knowledgeCheck: {
        question: 'Under what circumstance does the "else" block of a try-except statement execute?',
        options: [
          'Whenever an exception occurs in the try block',
          'Only when the try block executes completely WITHOUT raising any exceptions',
          'Every time the program exits',
          'Only if the finally block is omitted'
        ],
        correctIndex: 1,
        explanation: 'In Python, the try statement\'s else clause runs strictly when no exceptions were raised during the execution of the try block.'
      },
      endOfTopicQuestions: {
        easy: 'What is the very first line you should look at when reading a Python traceback?',
        medium: 'Explain the distinct purposes of the "except", "else", and "finally" blocks in an exception handler.',
        hard: 'Explain exception chaining in Python 3 (raise NewException from OriginalException) and how it preserves the root-cause __cause__ and __context__ traceback trees.'
      }
    },
    {
      id: 'custom-exceptions',
      sectionId: 'stage-8-errors-debugging',
      title: 'Custom Exceptions & Defensive Debugging',
      subtitle: 'Domain exception hierarchies, assertions, breakpoints, and pdb/VS Code debugging',
      readingTimeMinutes: 11,
      definition: 'A custom exception is a user-defined exception class that inherits from Python\'s built-in Exception class, designed to represent specific business logic or domain-specific failure conditions in an application.',
      inSimpleTerms: 'Python arrives with built-in errors for computer problems, like FileNotFoundError or ZeroDivisionError. But Python doesn\'t know what your business rules are. It doesn\'t know that an e-commerce shopping cart cannot have a negative balance, or that an employee cannot be their own supervisor. By creating your own custom exceptions (like "InsufficientFundsError" or "CircularManagerAssignmentError"), you give your application a clear, professional vocabulary to describe business failures.',
      whyDoesItExist: 'Catching generic ValueError or Exception everywhere makes code ambiguous: if a function raises ValueError, did it fail because a string wasn\'t a number, or because a bank account was overdrawn? Custom exceptions allow calling code to catch and handle distinct domain failures with surgical clarity.',
      howDoesItWork: '1. Defining Custom Exceptions: Subclass the base "Exception" class (never subclass BaseException directly, as BaseException includes SystemExit and KeyboardInterrupt).\n2. Exception Hierarchies: Group related business errors under a common application base exception (e.g., PaymentError -> [CardExpiredError, InsufficientFundsError]).\n3. Assertions (assert condition, message): Development tools used to test internal invariants that should NEVER be false unless there is a bug in the code. Can be disabled globally with the -O (optimize) flag, so never use them for user input validation.\n4. Modern Debugging (breakpoint() / pdb): Inserting the built-in function breakpoint() pauses program execution and drops you into an interactive debugger right in your terminal, allowing you to inspect variables (p), step forward (n), step into functions (s), and continue (c).',
      syntaxDescription: 'class DomainError(Exception):\n    """Base domain exception."""\n    pass\n\nraise DomainError("Descriptive message")',
      exampleCode: '# 1. Defining a domain exception hierarchy\nclass BankingApplicationError(Exception):\n    """Base exception for all banking application errors."""\n    pass\n\nclass InsufficientFundsError(BankingApplicationError):\n    """Raised when an account withdrawal exceeds available balance."""\n    def __init__(self, account_id: str, balance: float, attempted_amount: float):\n        self.account_id = account_id\n        self.balance = balance\n        self.attempted_amount = attempted_amount\n        message = f"Account {account_id} balance (${balance:.2f}) insufficient for withdrawal of ${attempted_amount:.2f}."\n        super().__init__(message)\n\n# 2. Enforcing business rules with custom exceptions\ndef withdraw(account_id: str, current_balance: float, amount: float) -> float:\n    if amount <= 0:\n        raise ValueError("Withdrawal amount must be greater than zero.")\n    if amount > current_balance:\n        raise InsufficientFundsError(account_id, current_balance, amount)\n    return current_balance - amount\n\n# 3. Handling the domain exception cleanly\ntry:\n    new_balance = withdraw("ACC-9041", 500.0, 750.0)\nexcept InsufficientFundsError as err:\n    print(f"Transaction Rejected: {err}")\n    print(f"Diagnostic attributes -> Shortfall: ${err.attempted_amount - err.balance:.2f}")',
      codeExplanation: [
        'Lines 2-4 create the parent "BankingApplicationError" inheriting from Exception.',
        'Lines 6-13 create the specific "InsufficientFundsError" subclass, storing structured metadata attributes (account_id, balance, attempted_amount) directly on the error object.',
        'Lines 16-21 enforce the business rules and raise the custom exception when invariant is breached.',
        'Lines 24-28 catch the specific domain error and access its custom diagnostic attributes directly.'
      ],
      expectedOutput: 'Transaction Rejected: Account ACC-9041 balance ($500.00) insufficient for withdrawal of $750.00.\nDiagnostic attributes -> Shortfall: $250.00',
      commonMistakes: [
        {
          mistake: 'Using "assert" statements for user input validation or security authorization checks in production.',
          consequence: 'Running Python with the -O (optimize) flag strips out all assert statements completely, leaving security gates wide open!',
          correction: 'Use explicit if statements and raise custom exceptions for validation; reserve assert strictly for internal developer invariant checks.'
        },
        {
          mistake: 'Inheriting custom exceptions directly from BaseException instead of Exception.',
          consequence: 'Bypasses standard "except Exception:" blocks and prevents clean shutdown handling.',
          correction: 'Always subclass from Exception.'
        }
      ],
      importantPoints: [
        'Always inherit custom exceptions from Exception (or a subclass of Exception).',
        'Create an application-wide base exception for your library or package.',
        'Never use "assert" for user validation or security; use custom exceptions.',
        'Use breakpoint() to pause execution and enter the interactive debugger.'
      ],
      relatedConcepts: [
        { name: 'Exception Handling', targetId: 'errors-and-debugging', note: 'Core try/except/else/finally mechanics.' },
        { name: 'Object-Oriented Programming', targetId: 'oop-concepts', note: 'Inheritance and class hierarchies.' }
      ],
      knowledgeCheck: {
        question: 'Why should you NOT use Python "assert" statements to validate user input on a web server?',
        options: [
          'Because assert statements crash the physical hard drive',
          'Because assert statements are completely stripped out and ignored when Python runs with optimization flags (-O)',
          'Because assert only works on numbers, not text',
          'Because assert statements require a paid license'
        ],
        correctIndex: 1,
        explanation: 'The Python interpreter disables and strips all assert statements when run in optimized mode (-O). Critical security and user checks must use standard conditionals and exceptions.'
      },
      endOfTopicQuestions: {
        easy: 'What base class should all custom domain exceptions inherit from?',
        medium: 'What built-in function pauses program execution and enters the Python debugger (pdb)?',
        hard: 'Design an exception hierarchy for an enterprise microservice client that distinguishes between transient network retries (e.g., 503) and permanent client errors (e.g., 400).'
      }
    }
  ]
};
