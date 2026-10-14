import { Section } from '../types/curriculum';

export const stage6Section: Section = {
  id: 'stage-6-modules-packages',
  number: 6,
  title: 'Stage 6 — Modules, Packages, & Environments',
  badge: 'Architecture',
  description: 'Understand software packaging and isolation: modules as single files, packages as directory namespaces, standard vs third-party ecosystems, why virtual environments are mathematically necessary, and the canonical __name__ == "__main__" idiom.',
  lessons: [
    {
      id: 'modules-packages',
      sectionId: 'stage-6-modules-packages',
      title: 'Modules, Packages, & The Import System',
      subtitle: 'Code reusability, sys.path resolution, and the standard library',
      readingTimeMinutes: 11,
      definition: 'A module is a single Python source file (.py) containing executable code, function definitions, classes, and variables. A package is a directory containing multiple modules and sub-packages, structured to provide a hierarchical namespace.',
      inSimpleTerms: 'Imagine writing a massive book. If you wrote all 1,000 pages as one giant unbroken scroll with no chapters, finding anything would be impossible. A module is like a single chapter dedicated to one subject (e.g., "authentication.py" or "billing.py"). A package is a whole binder of chapters grouped under a single title (e.g., a folder named "security" containing "passwords.py", "tokens.py", and "certificates.py").',
      whyDoesItExist: 'As codebases grow past a few hundred lines, keeping everything in one file leads to naming conflicts, merge conflicts in team Git workflows, and cognitive overload. The module and package system allows large engineering teams to divide complex systems into small, independent, testable components.',
      howDoesItWork: '1. Module Import Search Path (sys.path):\nWhen you execute "import my_module", Python searches directories in this strict order:\n  a. The directory containing the script that was launched.\n  b. The directories listed in the PYTHONPATH environment variable.\n  c. The standard library directory.\n  d. The site-packages directory (where third-party libraries installed by pip live).\n2. Caching in sys.modules: When a module is imported for the first time, Python executes all top-level statements in that module and caches the resulting module object in a dictionary called sys.modules. Subsequent import statements across other files simply retrieve the cached object instantly.\n3. The __init__.py File: In older Python versions, a directory had to contain an __init__.py file to be recognized as a package. Since Python 3.3 (PEP 420), implicit namespace packages are supported, but creating an __init__.py remains the industry best practice to define public package APIs (__all__) and execute package-level setup.\n4. import module vs from module import name:\n  - "import math": Creates a reference to the whole math module; you access functions with dot notation (math.sqrt).\n  - "from math import sqrt": Extracts the specific "sqrt" function directly into your current namespace.',
      syntaxDescription: 'import module_name\nfrom package.subpackage import module_name\nfrom module_name import function_name as alias',
      exampleCode: '# Standard library imports\nimport math\nfrom datetime import datetime, timezone\nimport sys\n\n# Using imported functionality\ncurrent_time_utc = datetime.now(timezone.utc)\nradius = 5.0\ncircle_area = math.pi * (radius ** 2)\n\nprint(f"Current UTC Timestamp: {current_time_utc.isoformat()}")\nprint(f"Circle Area with radius {radius}: {circle_area:.2f}")\nprint(f"Search path directories (sys.path): {len(sys.path)} locations indexed.")',
      codeExplanation: [
        'Line 2 imports the entire standard library "math" module.',
        'Line 3 selectively imports "datetime" and "timezone" classes directly into the local namespace.',
        'Line 4 imports the system configuration module "sys".',
        'Line 7 calls datetime.now() with UTC timezone configuration.',
        'Line 9 accesses the mathematical constant "pi" from the math module.',
        'Line 13 inspects sys.path, demonstrating where Python locates modules.'
      ],
      expectedOutput: 'Current UTC Timestamp: 2026-10-14T17:11:00+00:00\nCircle Area with radius 5.0: 78.54\nSearch path directories (sys.path): 8 locations indexed.',
      commonMistakes: [
        {
          mistake: 'Using wildcard imports: from math import *.',
          consequence: 'Pollutes your namespace with hundreds of unknown names, silently overwriting your own variables and making it impossible to know where functions originated.',
          correction: 'Always import specific names explicitly: from math import sqrt, pi or import the module: import math.'
        },
        {
          mistake: 'Naming a personal script with the same name as a standard library or third-party module (e.g., naming your file "math.py" or "random.py").',
          consequence: 'Python searches the current directory first; when your code tries to import the real math library, it imports your file instead, crashing with circular import or AttributeError.',
          correction: 'Never name your personal files after standard library modules.'
        }
      ],
      importantPoints: [
        'A module is a .py file; a package is a folder of modules.',
        'The standard library is Python\'s "batteries included" collection of pre-installed modules.',
        'Never use "from module import *" in production code.',
        'Python executes the imported file once and caches it in sys.modules.'
      ],
      relatedConcepts: [
        { name: 'Virtual Environments & Pip', targetId: 'virtual-environments', note: 'Why dependency isolation is necessary.' },
        { name: '__name__ and __main__', targetId: 'name-and-main', note: 'Writing modules that can also be run as standalone scripts.' }
      ],
      knowledgeCheck: {
        question: 'What occurs when you import a Python module for the second time in another part of your application?',
        options: [
          'Python re-reads the file from disk and executes all its code again',
          'Python retrieves the previously executed module object from the sys.modules memory cache',
          'Python raises an ImportError: ModuleAlreadyLoaded',
          'Python deletes the original module'
        ],
        correctIndex: 1,
        explanation: 'CPython caches all imported modules in the sys.modules dictionary. Subsequent imports are instantaneous dictionary lookups.'
      },
      endOfTopicQuestions: {
        easy: 'What is the file extension of a Python module?',
        medium: 'Why is naming your script "email.py" or "test.py" a dangerous trap for beginners?',
        hard: 'Explain what a circular import error is, how it manifests in sys.modules, and how restructuring module architecture resolves it.'
      }
    },
    {
      id: 'virtual-environments',
      sectionId: 'stage-6-modules-packages',
      title: 'Virtual Environments: Why They Are Necessary & How venv Works',
      subtitle: 'The mathematical problem of dependency conflicts and local isolation',
      readingTimeMinutes: 12,
      definition: 'A virtual environment in Python is an isolated directory tree containing a self-contained copy or symlink of a specific Python interpreter executable along with an isolated site-packages directory dedicated to a specific project.',
      inSimpleTerms: 'Imagine you are a chef with two clients. Client A insists on a recipe that requires spicy chili pepper sauce version 1.0. Client B requires a delicate dessert that breaks if anything other than sweet syrup sauce version 2.0 is used. If you only had one single shelf in your kitchen (one global site-packages folder), you couldn\'t cook for both clients because installing sauce 2.0 would overwrite and destroy sauce 1.0. A virtual environment gives each project its own private refrigerator and shelf where its specific tools and versions live undisturbed.',
      whyDoesItExist: 'WHY VIRTUAL ENVIRONMENTS EXIST (The Mathematical Dependency Dilemma):\nSoftware developers rarely build everything from scratch; they install open-source libraries from the Python Package Index (PyPI) using "pip". However:\n- Project Alpha was built in 2024 and requires pandas==1.5.3.\n- Project Beta is built in 2026 and requires pandas==2.2.0.\n\nIf you install libraries globally on your computer, there is only ONE global site-packages folder. Upgrading pandas to 2.2 for Project Beta instantly destroys and breaks Project Alpha! Furthermore, on Linux and macOS, your operating system uses Python for internal system maintenance; installing random packages globally can corrupt your operating system.\nVirtual environments solve this cleanly by confining all installed packages inside a local project folder (typically named ".venv").',
      howDoesItWork: '1. Creation: You run "python -m venv .venv" in your project folder.\n2. Directory Layout: Python creates a ".venv" folder containing:\n  - bin/ (macOS/Linux) or Scripts/ (Windows): Contains a copy/symlink of python and pip executables.\n  - lib/python3.x/site-packages: A private folder where pip will download libraries.\n  - pyvenv.cfg: Configuration file tracking the home interpreter location.\n3. Activation: You run "source .venv/bin/activate" (macOS/Linux) or ".venv\\Scripts\\activate" (Windows).\n4. What Activation Actually Does: Activation does NOT perform magic; it simply alters your current shell\'s PATH environment variable so that ".venv/bin" comes first! When you type "python" or "pip", your computer finds the isolated local virtual environment executable instead of the global system one.',
      syntaxDescription: 'Create: python -m venv .venv\nActivate (macOS/Linux): source .venv/bin/activate\nActivate (Windows): .venv\\Scripts\\activate\nDeactivate: deactivate',
      exampleCode: '# Step-by-step terminal workflow for professional dependency management:\n\n# 1. Create a dedicated project directory\n# mkdir my_project && cd my_project\n\n# 2. Create the isolated virtual environment\n# python3 -m venv .venv\n\n# 3. Activate the virtual environment\n# source .venv/bin/activate   (or .venv\\Scripts\\activate on Windows)\n\n# 4. Install dependencies into this isolated sandbox\n# pip install fastapi uvicorn requests\n\n# 5. Freeze exact dependencies for reproducibility\n# pip freeze > requirements.txt\n\n# 6. Deactivate when finished\n# deactivate',
      codeExplanation: [
        'Step 2 creates the ".venv" folder structure on disk.',
        'Step 3 prefixes the PATH variable so the active shell executes the virtual environment\'s binaries.',
        'Step 4 downloads packages strictly into .venv/lib/python3.x/site-packages, keeping the rest of your computer 100% clean.',
        'Step 5 records the exact locked versions of every package into requirements.txt so teammates can replicate the environment with: pip install -r requirements.txt.'
      ],
      expectedOutput: 'Requirements recorded: fastapi==0.110.0, uvicorn==0.28.0, requests==2.31.0',
      commonMistakes: [
        {
          mistake: 'Committing the entire .venv directory into Git version control.',
          consequence: 'Bloating your Git repository with hundreds of megabytes of platform-specific binary files that will fail on teammates\' computers.',
          correction: 'Always add ".venv/" to your project\'s ".gitignore" file. Only commit requirements.txt or pyproject.toml.'
        },
        {
          mistake: 'Installing packages with pip without first activating the virtual environment.',
          consequence: 'Packages are either installed globally or blocked by operating system PEP 668 protections.',
          correction: 'Check your terminal prompt: verify that "(.venv)" appears at the left edge of your prompt before running pip install.'
        }
      ],
      importantPoints: [
        'Virtual environments are not optional; they are the standard professional practice for every Python project.',
        'Every project should have its own separate virtual environment (.venv).',
        'Never commit .venv folders to Git; always commit requirements.txt or pyproject.toml.',
        'Modern tooling alternatives like "uv" and "poetry" build directly on these exact principles.'
      ],
      relatedConcepts: [
        { name: 'Modules and Packages', targetId: 'modules-packages', note: 'Where imported code lives.' }
      ],
      knowledgeCheck: {
        question: 'What does "activating" a virtual environment actually do under the hood?',
        options: [
          'It downloads the internet onto your computer',
          'It prepends the virtual environment\'s bin/Scripts directory to your shell\'s PATH environment variable',
          'It deletes all your previous files',
          'It speeds up your processor clock rate'
        ],
        correctIndex: 1,
        explanation: 'Activation is simply a shell script that updates the PATH variable so that commands like "python" and "pip" point to the local .venv folder.'
      },
      endOfTopicQuestions: {
        easy: 'What standard Python command creates a virtual environment named ".venv"?',
        medium: 'Why does committing a .venv folder to a shared GitHub repository cause failures for teammates using different operating systems?',
        hard: 'Explain what happens when pip encounters an "externally-managed-environment" error under PEP 668, and why Linux distros enforce this.'
      }
    },
    {
      id: 'name-and-main',
      sectionId: 'stage-6-modules-packages',
      title: 'The __name__ and __main__ Idiom',
      subtitle: 'Understanding execution entry points and standalone dual-purpose modules',
      readingTimeMinutes: 9,
      definition: 'The __name__ == "__main__" idiom is a standard Python design pattern that inspects the special built-in variable __name__ to determine whether a Python file is being executed directly as the top-level script or imported as a module into another file.',
      inSimpleTerms: 'Imagine you invent a wonderful electric car motor. You want other car builders to be able to install your motor in their vehicles (importing it as a module). But you also want to be able to plug the motor into a test bench in your workshop and press "Run" to test if it spins (running it directly). The "__name__ == \'__main__\'" check lets your Python file do both: if someone imports your file, it quietly provides its tools; if someone runs your file directly, it executes a self-test or full program.',
      whyDoesItExist: 'When Python imports a file, it executes every statement at the top level of that file. Without this idiom, if your file contains code that runs a calculation or connects to a database, that code will unexpectedly run every time another file imports a simple helper function from it.',
      howDoesItWork: '1. Python sets a special built-in string variable called __name__ for every module.\n2. If you execute a file directly from the terminal (e.g., "python my_script.py"), Python automatically sets __name__ = "__main__".\n3. If another file imports your file (e.g., "import my_script"), Python sets __name__ = "my_script" (the actual module name).\n4. Therefore, the conditional block "if __name__ == \'__main__\':" only executes when the file is run directly.',
      syntaxDescription: 'if __name__ == "__main__":\n    <entrypoint_code>',
      exampleCode: '# File: math_toolkit.py\n\ndef calculate_factorial(n: int) -> int:\n    """Calculates n! recursively."""\n    if n <= 1:\n        return 1\n    return n * calculate_factorial(n - 1)\n\n# This block will ONLY run if someone executes this file directly:\n# (e.g. python math_toolkit.py)\n# If someone imports math_toolkit in another file, this block is SKIPPED.\nif __name__ == "__main__":\n    print("[STANDALONE EXECUTION DETECTED]")\n    test_val = 5\n    result = calculate_factorial(test_val)\n    print(f"Self-test verification: {test_val}! = {result}")',
      codeExplanation: [
        'Lines 3-7 define a reusable function "calculate_factorial". Other files can import this cleanly without any unwanted printing.',
        'Line 12 checks if __name__ is equal to "__main__".',
        'Lines 13-16 only execute when you run "python math_toolkit.py" directly in your terminal, providing a clean self-test without interfering with importers.'
      ],
      expectedOutput: '[STANDALONE EXECUTION DETECTED]\nSelf-test verification: 5! = 120',
      commonMistakes: [
        {
          mistake: 'Putting program execution logic (like starting a web server or creating database tables) at the bare top-level of a file without an if __name__ == "__main__": guard.',
          consequence: 'Running unit test runners or importing helper functions triggers the full server or wipes databases accidentally.',
          correction: 'Always wrap script execution entrypoints inside if __name__ == "__main__":.'
        }
      ],
      importantPoints: [
        '__name__ is set to "__main__" only for the root file executed directly by the Python interpreter.',
        'For imported files, __name__ matches the module\'s import name.',
        'This pattern makes files dual-purpose: reusable as modules, yet runnable as standalone programs.'
      ],
      relatedConcepts: [
        { name: 'Modules and Packages', targetId: 'modules-packages', note: 'Importing modules cleanly.' }
      ],
      knowledgeCheck: {
        question: 'What is the value of __name__ inside a file when that file is imported by another script?',
        options: [
          '"__main__"',
          'The module\'s own name (e.g., "math_toolkit")',
          'None',
          '"imported"'
        ],
        correctIndex: 1,
        explanation: 'When a file is imported, Python sets its __name__ attribute to the module name rather than "__main__".'
      },
      endOfTopicQuestions: {
        easy: 'What value is assigned to __name__ when a script is executed directly from the terminal?',
        medium: 'Why is the if __name__ == "__main__": guard critical when writing multiprocessing code on Windows?',
        hard: 'How does Python\'s runpy module and the -m command-line switch manipulate the __name__ attribute when invoking modules?'
      }
    }
  ]
};
