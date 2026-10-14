import { Section } from '../types/curriculum';

export const stage14Section: Section = {
  id: 'stage-14-environment-setup',
  number: 14,
  title: 'Stage 14 — Complete Environment Setup Manual',
  badge: 'Installation',
  description: 'Exhaustive, step-by-step installation and configuration manuals for Windows, Linux, and macOS. Every guide covers what the software is, why it is required, where to obtain it, configuration, PATH environment variables, verification, first program, common errors, troubleshooting, and upgrade cycles.',
  lessons: [
    {
      id: 'setup-guide-windows',
      sectionId: 'stage-14-environment-setup',
      title: 'Windows 11 / 10 Complete Setup Guide',
      subtitle: 'Official 64-bit installer, environment PATH, PowerShell, and troubleshooting',
      readingTimeMinutes: 12,
      definition: 'The comprehensive setup manual for establishing a production-grade Python development environment on Microsoft Windows 10 and Windows 11, including the CPython runtime, the Python Launcher (py.exe), environment variable PATH integration, and VS Code.',
      inSimpleTerms: 'This guide takes you by the hand from a completely clean Windows computer to a fully verified Python development station where you can write, run, and debug Python code with complete confidence.',
      whyDoesItExist: 'Windows has historically presented unique challenges for software developers: backslash directory paths, execution policies, the 260-character MAX_PATH limit, and missing PATH environment entries. Following this explicit checklist prevents the common pitfalls that trip up 80% of Windows beginners.',
      howDoesItWork: 'Step-by-Step Windows Installation Manual:\n\n1. WHAT THE SOFTWARE IS:\n- CPython: The official interpreter executable (python.exe), standard library, and package installer (pip).\n- Python Launcher (py.exe): A lightweight Windows-specific utility that detects and switches between multiple installed Python versions.\n\n2. WHERE TO OBTAIN IT:\n- Official download URL: https://www.python.org/downloads/windows/\n- Select the latest stable 64-bit release (e.g., "Windows installer (64-bit)"). Do NOT download the 32-bit version.\n\n3. STEP-BY-STEP INSTALLATION:\n- Double-click the downloaded .exe installer (e.g., python-3.12.x-amd64.exe).\n- CRITICAL FIRST STEP: At the very bottom of the first setup screen, CHECK THE BOX: "[X] Add python.exe to PATH".\n- Click "Install Now".\n- When the installation finishes, you will see a screen saying "Setup was successful".\n- Click "Disable path length limit" (this removes the legacy 260-character Windows path ceiling, preventing errors in deeply nested web frameworks).\n- Click "Close".\n\n4. CONFIGURATION & ENVIRONMENT VARIABLES:\n- If you forgot to check "Add to PATH", press Win+S, type "Edit the system environment variables", click Environment Variables, under System variables click "Path", click Edit, and add:\n  C:\\Users\\<YourUsername>\\AppData\\Local\\Programs\\Python\\Python312\\\n  C:\\Users\\<YourUsername>\\AppData\\Local\\Programs\\Python\\Python312\\Scripts\\\n\n5. VERIFICATION:\n- Open PowerShell (Win+X, then press I).\n- Run: python --version (or py --version).\n- Run: pip --version.\n- Both should report the installed version numbers.\n\n6. YOUR FIRST PROGRAM:\n- In PowerShell, create a folder and file:\n  mkdir my_code && cd my_code\n  Set-Content -Path hello.py -Value \'print("Hello from Windows 11 Python!")\'\n  python hello.py\n\n7. COMMON ERRORS & TROUBLESHOOTING:\n- Error 1: "python : The term \'python\' is not recognized..." -> Cause: PATH checkbox was missed. Solution: Re-run installer, choose Modify, check PATH.\n- Error 2: Typing "python" opens the Microsoft Store app page -> Cause: Windows App Execution Aliases. Solution: Open Windows Settings -> Apps -> Advanced app settings -> App execution aliases -> Toggle "App Installer python.exe" to OFF.\n- Error 3: "running scripts is disabled on this system" -> Cause: PowerShell execution policy. Solution: Run PowerShell as Admin and type: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser.\n\n8. UPDATING PYTHON:\n- Download the newer minor version installer from python.org and run it. The Python launcher (py) will automatically prioritize the newest version.',
      syntaxDescription: 'PowerShell verification:\npy --version\npython --version\npip --version',
      exampleCode: '# First program verification script: check_windows.py\nimport sys\nimport platform\nimport os\n\nprint("========================================")\nprint(" WINDOWS PYTHON ENVIRONMENT VERIFICATION")\nprint("========================================")\nprint(f"Operating System: {platform.system()} {platform.release()} ({platform.version()})")\nprint(f"Architecture:     {platform.architecture()[0]}")\nprint(f"Python Version:   {sys.version.split()[0]}")\nprint(f"Executable Path:  {sys.executable}")\nprint(f"PATH variable configured correctly: {\'python\' in sys.executable.lower()}")\nprint("Status: READY FOR SOFTWARE DEVELOPMENT!")\nprint("========================================")',
      codeExplanation: [
        'Line 2 imports "platform" to inspect the host Windows build.',
        'Line 8 checks whether the running architecture is 64-bit (crucial for modern data science).',
        'Line 10 displays the physical directory path where python.exe was located on your Windows drive.',
        'Line 11 verifies that execution is running from an authentic Python binary.'
      ],
      expectedOutput: '========================================\n WINDOWS PYTHON ENVIRONMENT VERIFICATION\n========================================\nOperating System: Windows 11 (10.0.22631)\nArchitecture:     64bit\nPython Version:   3.12.3\nExecutable Path:  C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python312\\python.exe\nPATH variable configured correctly: True\nStatus: READY FOR SOFTWARE DEVELOPMENT!\n========================================',
      commonMistakes: [
        {
          mistake: 'Leaving Windows App Execution Aliases enabled, causing Windows to hijack the "python" command and open the Windows Store.',
          consequence: 'Frustration: typing "python" opens an app store window instead of the interpreter.',
          correction: 'Turn off "App execution aliases" for python.exe and python3.exe in Windows Settings.'
        }
      ],
      importantPoints: [
        'Always check "Add python.exe to PATH" during installation.',
        'Click "Disable path length limit" on the final setup screen.',
        'Use the "py" launcher command to easily manage multiple Python versions.',
        'Open project folders in VS Code rather than opening lone files.'
      ],
      relatedConcepts: [
        { name: 'Linux Setup Guide', targetId: 'setup-guide-linux', note: 'Ubuntu/Debian environment setup.' },
        { name: 'macOS Setup Guide', targetId: 'setup-guide-macos', note: 'Homebrew and Apple Silicon setup.' }
      ],
      knowledgeCheck: {
        question: 'Why does typing "python" on a fresh Windows installation sometimes open the Microsoft Store?',
        options: [
          'Because Python must be purchased with a credit card',
          'Because Windows has a built-in "App Execution Alias" redirecting python.exe to the Store stub until disabled or overridden by real Python PATH',
          'Because your motherboard is disconnected',
          'Because Python was banned by Microsoft'
        ],
        correctIndex: 1,
        explanation: 'Windows includes default App Execution Aliases that redirect "python" to the Windows Store page if real Python is not installed or not registered in PATH.'
      },
      endOfTopicQuestions: {
        easy: 'What is the recommended 64-bit installation option for Windows from python.org?',
        medium: 'How do you permanently disable PowerShell\'s script execution restriction on your personal user account?',
        hard: 'Explain how py.exe (the Python launcher for Windows) parses shebang lines (e.g., #!/usr/bin/env python3.11) to dispatch execution to specific installed interpreter versions.'
      }
    },
    {
      id: 'setup-guide-linux-macos',
      sectionId: 'stage-14-environment-setup',
      title: 'Linux & macOS Complete Setup Guides',
      subtitle: 'Apt, Deadsnakes, Homebrew, Apple Silicon, and PEP 668 compliance',
      readingTimeMinutes: 12,
      definition: 'The comprehensive setup manuals for establishing professional Python environments on Linux (Ubuntu, Debian, Fedora) and macOS (Intel & Apple Silicon M-series), focusing on package managers, avoiding system Python corruption, and virtual environment hygiene.',
      inSimpleTerms: 'Unix-based systems (Linux and macOS) are the natural habitat of Python: almost all internet servers run on Linux, and many developers write code on Macs. However, because both operating systems use Python for internal tasks, you must follow strict isolation rules so you don\'t damage system utilities.',
      whyDoesItExist: 'Many beginners blindly follow outdated tutorials and run "sudo pip install" or modify system symlinks, which can brick Ubuntu package managers or cause macOS permission locks. This guide outlines the modern, secure standard.',
      howDoesItWork: 'PART A: UBUNTU & DEBIAN LINUX SETUP\n1. What it is: Installing Python, pip, and venv via the APT package manager.\n2. Commands:\n   sudo apt update\n   sudo apt install -y python3 python3-pip python3-venv build-essential\n3. Verifying:\n   python3 --version\n4. For latest Python releases on older Ubuntu: Add the official Deadsnakes PPA:\n   sudo add-apt-repository ppa:deadsnakes/ppa\n   sudo apt update\n   sudo apt install -y python3.12 python3.12-venv\n5. PEP 668 Compliance: Modern Linux blocks global pip installs. Always work in virtual environments: python3 -m venv .venv && source .venv/bin/activate.\n\nPART B: macOS (APPLE SILICON & INTEL) SETUP\n1. Install Xcode Command Line Tools:\n   xcode-select --install\n2. Install Homebrew (brew.sh):\n   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n3. Add Homebrew to PATH (on Apple Silicon M1/M2/M3/M4):\n   echo \'eval "$(/opt/homebrew/bin/brew shellenv)"\' >> ~/.zprofile\n   eval "$(/opt/homebrew/bin/brew shellenv)"\n4. Install Python:\n   brew install python\n5. Verifying:\n   which python3   # Should output /opt/homebrew/bin/python3\n   python3 --version\n6. First Program:\n   echo \'print("Hello from macOS/Linux Python!")\' > test.py\n   python3 test.py\n\nPART C: UPDATING\n- Linux: sudo apt update && sudo apt --only-upgrade install python3\n- macOS: brew update && brew upgrade python',
      syntaxDescription: 'Terminal commands:\npython3 --version\npython3 -m venv .venv\nsource .venv/bin/activate',
      exampleCode: '# First program verification script: check_unix.py\nimport sys\nimport os\nimport platform\n\nprint("------------------------------------------")\nprint(" UNIX/LINUX/MACOS PYTHON VERIFICATION")\nprint("------------------------------------------")\nprint(f"System:      {platform.system()} ({platform.release()})")\nprint(f"Node:        {platform.node()}")\nprint(f"Machine:     {platform.machine()} (ARM64 vs x86_64)")\nprint(f"Executable:  {sys.executable}")\nprint(f"Virtual Env: {sys.prefix != sys.base_prefix} (Active: {sys.prefix})")\nprint("------------------------------------------")',
      codeExplanation: [
        'Line 8 detects whether the processor is ARM64 (Apple Silicon) or x86_64 (Intel/AMD).',
        'Line 9 outputs the active binary path (/opt/homebrew/bin/python3 or /usr/bin/python3).',
        'Line 10 verifies whether a virtual environment is actively isolated (sys.prefix != sys.base_prefix).'
      ],
      expectedOutput: '------------------------------------------\n UNIX/LINUX/MACOS PYTHON VERIFICATION\n------------------------------------------\nSystem:      Darwin (macOS 14.4.1)\nNode:        MacBook-Pro.local\nMachine:     arm64 (Apple Silicon)\nExecutable:  /opt/homebrew/bin/python3\nVirtual Env: False (Base System)\n------------------------------------------',
      commonMistakes: [
        {
          mistake: 'Using "sudo pip install <package>" on modern Linux distributions.',
          consequence: 'Triggers PEP 668 "externally-managed-environment" error or corrupts distribution Python.',
          correction: 'Always create and activate a project virtual environment (python3 -m venv .venv) before installing packages with pip.'
        }
      ],
      importantPoints: [
        'On Linux and macOS, the command is "python3", not "python".',
        'Use Homebrew for managing modern Python on macOS.',
        'Modern Linux adheres to PEP 668 to protect OS system files from pip overwrites.',
        'Check whether your Python is native ARM64 on Apple Silicon Macs.'
      ],
      relatedConcepts: [
        { name: 'Windows Setup Guide', targetId: 'setup-guide-windows', note: 'Windows installation manual.' },
        { name: 'Virtual Environments', targetId: 'virtual-environments', note: 'Creating and activating isolated environments.' }
      ],
      knowledgeCheck: {
        question: 'Why do modern Linux distributions reject global "pip install" commands with a PEP 668 error?',
        options: [
          'Because Linux does not have internet access',
          'Because global pip installs can overwrite libraries required by the operating system\'s package manager (like apt or yum)',
          'Because pip only runs on Windows',
          'Because Python was deprecated on Linux'
        ],
        correctIndex: 1,
        explanation: 'PEP 668 protects distribution-managed packages from being broken by arbitrary third-party pip upgrades.'
      },
      endOfTopicQuestions: {
        easy: 'What command invokes Python 3 in the macOS or Linux terminal?',
        medium: 'How can you verify whether your Python script is currently running inside an active virtual environment using the sys module?',
        hard: 'Explain why compiling C-extension packages like NumPy requires the python3-dev and build-essential packages on Ubuntu.'
      }
    }
  ]
};
