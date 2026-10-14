import { Section } from '../types/curriculum';

export const stage7Section: Section = {
  id: 'stage-7-files-data',
  number: 7,
  title: 'Stage 7 — Files & Data Persistence',
  badge: 'Storage',
  description: 'Persisting data beyond execution memory: file handles and operating system file descriptors, the "with" context manager protocol, text versus binary data, JSON and CSV parsing and serialization, dates and times, and regular expressions.',
  lessons: [
    {
      id: 'files-and-io',
      sectionId: 'stage-7-files-data',
      title: 'File I/O: Paths, Context Managers, & Serialization',
      subtitle: 'The "with" statement, file descriptors, text vs binary modes, and structured data formats',
      readingTimeMinutes: 13,
      definition: 'File I/O (Input/Output) is the process by which a computer program interacts with an operating system file system to read persisted byte data from non-volatile storage (SSD/HDD) into Random Access Memory (RAM), or write modified memory objects back to disk.',
      inSimpleTerms: 'Whenever your Python program finishes running or your computer restarts, all variables floating in RAM vanish into thin air. If you want your program to remember customer records, save game progress, or read an analytics report tomorrow, you must store that data in a file on your hard drive. File I/O gives your program hands to open files, read the text inside, write new notes, and close the file neatly.',
      whyDoesItExist: 'Operating systems manage access to physical storage drives through strict handles called "file descriptors". A computer has a limited number of file descriptors available (often 1024 per process). If a program opens files but forgets to close them, the operating system eventually runs out of descriptors (a file descriptor leak), causing the program and other applications to crash. Python\'s context managers ("with" statement) were invented to eliminate this hazard forever.',
      howDoesItWork: '1. The "with" Statement (Context Manager Protocol):\nWhen you write "with open(path, mode) as f:", Python calls the object\'s __enter__() method before your block runs, assigning the open file handle to f. When your block exits—even if an unexpected crash or exception occurs inside—Python GUARANTEES that the object\'s __exit__() method is called, closing the file handle automatically and flushing buffers to disk.\n2. File Open Modes:\n- "r": Read only (file must exist; raises FileNotFoundError if absent).\n- "w": Write only (truncates and wipes existing file to 0 bytes, or creates new file).\n- "a": Append (keeps existing content intact and writes new data strictly to the end).\n- "b": Binary mode (appended to mode, e.g., "rb" or "wb", for images, PDFs, audio).\n3. Text vs Binary Files:\n- Text files ("r", "w"): Bytes are automatically decoded into human-readable Unicode strings using a character encoding (always explicitly specify encoding="utf-8").\n- Binary files ("rb", "wb"): Raw bytes objects (bytes) are read or written with zero encoding transformation.\n4. Structured Data Formats:\n- JSON (JavaScript Object Notation): Lightweight text format mapping directly to Python dicts, lists, strings, numbers, booleans, and None. Use json.dumps() to serialize (Python -> JSON string) and json.loads() to parse (JSON string -> Python object).\n- CSV (Comma-Separated Values): Tabular text format using commas to delimit columns. Managed cleanly via Python\'s standard "csv" module.',
      syntaxDescription: 'with open("filename.txt", "r", encoding="utf-8") as file_handle:\n    content = file_handle.read()',
      exampleCode: 'import json\nimport csv\nfrom pathlib import Path\nimport tempfile\n\n# Using tempfile to create a clean isolated demonstration environment\nwith tempfile.TemporaryDirectory() as temp_dir:\n    base_path = Path(temp_dir)\n    \n    # 1. Writing and Reading Text with Context Manager\n    notes_file = base_path / "notes.txt"\n    with open(notes_file, "w", encoding="utf-8") as f:\n        f.write("Line 1: System initialized.\\n")\n        f.write("Line 2: Operations nominal.\\n")\n    \n    # Appending to existing file\n    with open(notes_file, "a", encoding="utf-8") as f:\n        f.write("Line 3: Audit log appended.\\n")\n    \n    # 2. JSON Serialization and Parsing\n    config_data = {\n        "environment": "production",\n        "database_port": 5432,\n        "features": ["caching", "rate-limiting"],\n        "is_active": True\n    }\n    \n    json_file = base_path / "config.json"\n    # Serialize Python dictionary to formatted JSON text on disk:\n    with open(json_file, "w", encoding="utf-8") as jf:\n        json.dump(config_data, jf, indent=2)\n        \n    # Parse JSON text back into a native Python dictionary:\n    with open(json_file, "r", encoding="utf-8") as jf:\n        loaded_config = json.load(jf)\n        \n    print(f"Notes file length: {notes_file.stat().st_size} bytes.")\n    print(f"Loaded JSON environment: {loaded_config[\'environment\']}")\n    print(f"Loaded JSON features list: {loaded_config[\'features\']}")',
      codeExplanation: [
        'Line 8 uses pathlib.Path: the modern, object-oriented, cross-platform path library.',
        'Lines 12-14 use "with open(..., \'w\', encoding=\'utf-8\')" to safely open, write, and automatically close the text file.',
        'Lines 17-18 open in append mode ("a") to add a third line without destroying the previous two lines.',
        'Lines 28-30 use json.dump() to serialize a Python dictionary directly into a formatted JSON file on disk.',
        'Lines 33-34 use json.load() to parse the JSON file back into a live Python dictionary in RAM.'
      ],
      expectedOutput: 'Notes file length: 82 bytes.\nLoaded JSON environment: production\nLoaded JSON features list: [\'caching\', \'rate-limiting\']',
      commonMistakes: [
        {
          mistake: 'Opening a file using f = open("file.txt") without using a "with" context manager.',
          consequence: 'If an error occurs before f.close(), the operating system file handle remains locked open in memory, leaking system resources.',
          correction: 'Always open files using the "with open(...) as f:" pattern.'
        },
        {
          mistake: 'Omitting encoding="utf-8" when opening text files on Windows.',
          consequence: 'Windows defaults to legacy Windows-1252 (ANSI) encoding, causing UnicodeDecodeError when encountering emojis or international characters.',
          correction: 'Always explicitly declare encoding="utf-8" in every open() call.'
        }
      ],
      importantPoints: [
        'Always use "with open(...) as f" to guarantee file handles close properly under all conditions.',
        'Always specify encoding="utf-8" for text files.',
        'Use the modern "pathlib.Path" module for cross-platform path manipulation instead of manual string concatenation.',
        'json.dumps()/loads() work on memory strings; json.dump()/load() read/write file streams directly.'
      ],
      relatedConcepts: [
        { name: 'Errors and Debugging', targetId: 'errors-and-debugging', note: 'Handling FileNotFoundError and PermissionError exceptions.' },
        { name: 'Regular Expressions & Parsing', targetId: 'regex-datetime', note: 'Parsing unstructured text files.' }
      ],
      knowledgeCheck: {
        question: 'What happens to a file handle opened with "with open(...) as f:" if an exception is raised inside the block?',
        options: [
          'The file handle remains permanently open and corrupts the disk',
          'Python guarantees the file is cleanly closed via the context manager\'s __exit__ protocol before propagating the exception',
          'The entire hard drive is formatted',
          'The exception is silently swallowed and hidden'
        ],
        correctIndex: 1,
        explanation: 'The context manager protocol ensures that the file object\'s __exit__() method is invoked during unwinding, closing the OS descriptor safely.'
      },
      endOfTopicQuestions: {
        easy: 'What file open mode opens a file for writing without erasing existing content?',
        medium: 'Explain the difference between json.dumps() and json.dump().',
        hard: 'Explain what an OS file descriptor is, how the ulimit file limit affects production servers, and how the Python garbage collector interacts with unclosed file objects.'
      }
    },
    {
      id: 'regex-datetime',
      sectionId: 'stage-7-files-data',
      title: 'Dates, Times, & Regular Expressions',
      subtitle: 'Temporal data with datetime/zoneinfo and text pattern matching with re',
      readingTimeMinutes: 11,
      definition: 'Temporal computing involves managing timestamps, intervals, and timezones using Python\'s datetime module, while regular expressions (regex via the "re" module) provide a formal domain-specific language for searching, matching, and validating complex string patterns.',
      inSimpleTerms: 'Time is notoriously complicated: leap years, timezones, daylight saving shifts, and varying international formats make storing dates tricky. Python\'s datetime tools handle this math for you. Meanwhile, regular expressions are like super-powered search engines for text: instead of searching for an exact word, you search for a pattern (e.g., "find any string that looks like a valid email address" or "find all 10-digit phone numbers").',
      whyDoesItExist: 'Applications store timestamps for audit logs, calculate subscription billing cycles, and validate user input formats (like emails, phone numbers, and security tokens). Dedicated tools are required to handle time arithmetic and string pattern validation without writing hundreds of manual if-statements.',
      howDoesItWork: '1. Datetime Module (datetime, timedelta, zoneinfo):\n- datetime.datetime: Represents a specific point in time (year, month, day, hour, minute, second, microsecond).\n- Aware vs Naive datetimes: A "naive" datetime has no timezone attached (ambiguous). An "aware" datetime includes timezone metadata (e.g., UTC). Production code should ALWAYS use timezone-aware UTC datetimes.\n- timedelta: Represents a duration of time (e.g., 7 days, 4 hours). Allows direct arithmetic: next_week = now + timedelta(days=7).\n2. Regular Expressions (re module):\n- re.compile(pattern): Compiles a regex string into a high-performance pattern object.\n- Metacharacters: \\d (digit), \\w (word character), \\s (whitespace), + (1 or more), * (0 or more), ? (optional), ^ (start of string), $ (end of string).\n- Raw Strings (r"..."): Always write regex patterns using raw string literals r"\\d+" so Python doesn\'t treat backslashes as string escape sequences.',
      syntaxDescription: 'import re, datetime\npattern = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")',
      exampleCode: 'import re\nfrom datetime import datetime, timezone, timedelta\n\n# 1. Timezone-aware timestamp arithmetic\nnow_utc = datetime.now(timezone.utc)\nsubscription_duration = timedelta(days=30, hours=12)\nexpiration_date = now_utc + subscription_duration\n\nprint(f"Current UTC:    {now_utc.strftime(\'%Y-%m-%d %H:%M:%S %Z\')}")\nprint(f"Expires UTC:    {expiration_date.strftime(\'%Y-%m-%d %H:%M:%S %Z\')}")\n\n# 2. Regular Expression pattern matching\nlog_entry = "2026-10-14 10:15:32 [ERROR] User ID: 4092 - Connection timed out to 192.168.1.55:8080"\n\n# Extract IP address and port using regex groups\nip_port_pattern = re.compile(r"(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3}):(?P<port>\\d{2,5})")\nmatch = ip_port_pattern.search(log_entry)\n\nif match:\n    extracted_ip = match.group("ip")\n    extracted_port = match.group("port")\n    print(f"Regex match detected -> IP: {extracted_ip} | Port: {extracted_port}")',
      codeExplanation: [
        'Line 5 generates a timezone-aware current UTC datetime object.',
        'Line 6 creates a timedelta duration of 30.5 days.',
        'Line 7 adds the duration directly to the timestamp to compute the exact expiration moment.',
        'Lines 9-10 format the datetime objects using standard strftime format specifiers (%Y, %m, %d, %H, etc.).',
        'Line 16 compiles a regex pattern with named capture groups (?P<ip>...) and (?P<port>...).',
        'Line 17 searches the log string for the pattern, and lines 19-22 extract the parsed values.'
      ],
      expectedOutput: 'Current UTC:    2026-10-14 10:15:32 UTC\nExpires UTC:    2026-11-13 22:15:32 UTC\nRegex match detected -> IP: 192.168.1.55 | Port: 8080',
      commonMistakes: [
        {
          mistake: 'Using datetime.now() without passing timezone.utc, producing "naive" local timestamps.',
          consequence: 'Bizarre bugs during Daylight Saving Time switches, or incorrect intervals when servers and users are in different continents.',
          correction: 'Always use timezone-aware timestamps: datetime.now(timezone.utc).'
        },
        {
          mistake: 'Forgetting to use raw string prefix r"" when writing regular expressions with backslashes.',
          consequence: 'Python attempts to interpret \\d or \\b as escape characters, leading to regex compilation syntax errors.',
          correction: 'Always prefix regex string literals with "r" (e.g., r"\\b[A-Z]+\\b").'
        }
      ],
      importantPoints: [
        'Always store and transmit timestamps in UTC; convert to local user timezones only at the UI display layer.',
        'Use raw strings r"..." for all regex patterns.',
        'Compile regex patterns with re.compile() if they are going to be executed repeatedly in loops.'
      ],
      relatedConcepts: [
        { name: 'Strings', targetId: 'strings', note: 'String methods vs regex.' }
      ],
      knowledgeCheck: {
        question: 'Why should you always prefix regular expression strings with the letter "r" (e.g., r"\\d+") in Python?',
        options: [
          'Because "r" stands for "rapid" and makes the computer faster',
          'Because raw strings prevent Python from interpreting backslashes as string escape sequences before regex gets them',
          'Because regex only works on files starting with R',
          'Because without "r", regex cannot match numbers'
        ],
        correctIndex: 1,
        explanation: 'Raw strings treat backslashes as literal characters, preventing Python\'s string parser from mangling regex escape tokens like \\d, \\s, and \\b.'
      },
      endOfTopicQuestions: {
        easy: 'What Python object represents the difference between two datetime instances?',
        medium: 'Explain the difference between re.search() and re.match() in the standard library.',
        hard: 'Explain catastrophic backtracking in regular expressions (ReDoS) and how regex engines handle nested quantifiers.'
      }
    }
  ]
};
