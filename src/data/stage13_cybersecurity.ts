import { Section } from '../types/curriculum';

export const stage13Section: Section = {
  id: 'stage-13-cybersecurity',
  number: 13,
  title: 'Stage 13 — Python Cybersecurity & Defensive Engineering',
  badge: 'Security',
  description: 'Ethical and defensive cybersecurity principles: secure coding practices, cryptographic hashing and password salting, automated log forensics and threat analysis, HTTP security headers, input sanitization, API defense, and authorized security auditing.',
  lessons: [
    {
      id: 'defensive-programming',
      sectionId: 'stage-13-cybersecurity',
      title: 'Secure Programming & Password Cryptography',
      subtitle: 'Defensive engineering, input sanitization, cryptographic salting, and constant-time comparison',
      readingTimeMinutes: 12,
      definition: 'Secure programming in Python is the discipline of designing, writing, and auditing software to be resilient against vulnerabilities, data leaks, and malicious exploitation, enforcing principles of least privilege, defense in depth, and cryptographic data integrity.',
      inSimpleTerms: 'Building software without security is like building a bank with cardboard walls and no locks on the vault. Anyone can walk in and steal the money. Defensive programming means building applications assuming that malicious actors will probe your system with malformed inputs, forged tokens, and stolen credentials. You write code that validates every single piece of data, hashes secrets irreversibly, and leaves zero doors unlocked.',
      whyDoesItExist: 'Data breaches cost organizations millions of dollars, destroy user privacy, and expose sensitive credentials. Python is widely used in enterprise backends, cloud infrastructure, and fintech; engineers must know how to store passwords safely and prevent common security flaws like injection and timing attacks.',
      howDoesItWork: '1. Password Storage Cryptography (The Salting & Hashing Protocol):\n- NEVER store passwords in plaintext or using fast reversible algorithms (like MD5 or SHA-256).\n- A cryptographic salt is a cryptographically strong, random byte sequence (e.g., 16 bytes from secrets.token_bytes) generated uniquely for every user.\n- Slow Key Derivation Functions: Industry standards (like Argon2id, bcrypt, or PBKDF2) use configurable work factors (computational memory and time cost) to intentionally slow down calculation. This makes offline brute-force and GPU rainbow table cracking computationally impossible.\n2. Timing Attacks and Constant-Time Comparison:\n- In standard string comparison ("token_a == token_b"), Python stops checking at the very first mismatched character and returns False early.\n- An attacker measuring execution time down to nanoseconds can deduce the secret character-by-character!\n- Defense: Always use hmac.compare_digest() for secret comparison, which executes in constant time regardless of where mismatches occur.\n3. Input Sanitization & Validation:\n- Strict whitelisting: Validate format, length, and allowed characters using regex or Pydantic before processing.',
      syntaxDescription: 'import hashlib, secrets, hmac\n# Use dedicated slow algorithms: hashlib.pbkdf2_hmac or bcrypt/argon2',
      exampleCode: 'import hashlib\nimport secrets\nimport hmac\n\n# 1. Cryptographically Secure Password Hashing with Salt & PBKDF2\ndef hash_user_password(password: str) -> tuple[bytes, bytes]:\n    """Generates a random cryptographic salt and hashes password using PBKDF2."""\n    salt = secrets.token_bytes(16)  # 128-bit random salt\n    # 100,000 iterations of SHA-256 to resist GPU cracking:\n    key = hashlib.pbkdf2_hmac(\n        hash_name=\'sha256\',\n        password=password.encode(\'utf-8\'),\n        salt=salt,\n        iterations=100_000\n    )\n    return salt, key\n\ndef verify_user_password(stored_salt: bytes, stored_key: bytes, candidate_password: str) -> bool:\n    """Verifies candidate password against stored salt and key in constant time."""\n    candidate_key = hashlib.pbkdf2_hmac(\n        hash_name=\'sha256\',\n        password=candidate_password.encode(\'utf-8\'),\n        salt=stored_salt,\n        iterations=100_000\n    )\n    # hmac.compare_digest prevents timing attack side-channel leaks:\n    return hmac.compare_digest(stored_key, candidate_key)\n\n# Execution Demonstration\nsalt, password_hash = hash_user_password("CorrectHorseBatteryStaple!2026")\nprint(f"Generated Salt (hex): {salt.hex()[:16]}...")\nprint(f"Stored Hash (hex):    {password_hash.hex()[:24]}...")\n\n# Verification Tests\nis_correct = verify_user_password(salt, password_hash, "CorrectHorseBatteryStaple!2026")\nis_fraudulent = verify_user_password(salt, password_hash, "WrongPassword123")\nprint(f"Valid password verification: {is_correct}")\nprint(f"Invalid password verification: {is_fraudulent}")',
      codeExplanation: [
        'Line 8 uses secrets.token_bytes(16) from Python\'s cryptographically secure random number generator (CSPRNG) to generate an unpredictable salt.',
        'Lines 10-15 use hashlib.pbkdf2_hmac with 100,000 iterations to compute a slow, secure hash.',
        'Lines 27-28 use hmac.compare_digest(): this is critical to eliminate side-channel timing attacks that could reveal secret hashes.',
        'Lines 37-38 demonstrate that the verification succeeds for the correct secret and rejects fraudulent attempts.'
      ],
      expectedOutput: 'Generated Salt (hex): a1f83c09b2e4... (example)\nStored Hash (hex):    5c9d81e014ab... (example)\nValid password verification: True\nInvalid password verification: False',
      commonMistakes: [
        {
          mistake: 'Using hashlib.md5() or hashlib.sha1() for password storage.',
          consequence: 'MD5 and SHA-1 can be cracked in milliseconds using precomputed rainbow tables or modern graphics cards.',
          correction: 'Always use slow, salted cryptographic functions: Argon2, bcrypt, or PBKDF2.'
        },
        {
          mistake: 'Using "==" to verify secret tokens or API keys: if user_token == server_token:.',
          consequence: 'Vulnerable to timing attack side-channels.',
          correction: 'Always use hmac.compare_digest(user_token, server_token).'
        }
      ],
      importantPoints: [
        'Never store passwords in plain text or using fast general-purpose hashes (MD5, SHA-256).',
        'Always combine a unique cryptographic salt with slow iterative hashing (PBKDF2, bcrypt, Argon2).',
        'Use hmac.compare_digest() for secret comparisons to prevent timing side-channel attacks.',
        'Validate all user input strictly using whitelisting.'
      ],
      relatedConcepts: [
        { name: 'Log Forensics & Network Analysis', targetId: 'log-network-analysis', note: 'Detecting security anomalies and malicious patterns.' }
      ],
      knowledgeCheck: {
        question: 'Why must you use hmac.compare_digest() instead of "==" when comparing secret authentication tokens?',
        options: [
          'Because "==" only works on numbers',
          'Because hmac.compare_digest() runs in constant time, preventing attackers from measuring CPU comparison durations to deduce the secret (timing attacks)',
          'Because hmac deletes the token after comparison',
          'Because "==" requires an internet connection'
        ],
        correctIndex: 1,
        explanation: 'Standard string equality returns early on the first non-matching byte. Measuring this tiny execution time delta allows attackers to deduce secrets character-by-character. Constant-time comparison neutralizes this attack.'
      },
      endOfTopicQuestions: {
        easy: 'What module in Python provides a cryptographically secure pseudo-random number generator (CSPRNG)?',
        medium: 'Explain why adding a unique cryptographic salt to each user password defeats precomputed rainbow table attacks.',
        hard: 'Explain how memory-hard hashing algorithms like Argon2id defend against specialized ASIC and GPU password-cracking hardware rigs.'
      }
    },
    {
      id: 'log-network-analysis',
      sectionId: 'stage-13-cybersecurity',
      title: 'Automated Log Forensics & Defensive Security Auditing',
      subtitle: 'Parsing web server access logs, brute-force detection, IP frequency analysis, and automated alerting',
      readingTimeMinutes: 12,
      definition: 'Defensive log analysis is the automated computational practice of ingesting, parsing, and correlating system and application event logs to detect suspicious anomalies, brute-force authentication attacks, and unauthorized access attempts in authorized security environments.',
      inSimpleTerms: 'A busy web server records millions of events every single day: every page loaded, every login attempt, and every error. A human security analyst cannot sit and read millions of lines of text with their eyes. Using Python, we write defensive scripts that act like automated watchtowers: scanning through thousands of log entries per second, flagging IP addresses that fail 50 logins in one minute, and automatically alerting the security team.',
      whyDoesItExist: 'Security incidents rarely announce themselves; they leave subtle breadcrumbs scattered across access logs, firewall records, and auth logs. Python\'s powerful text-processing, dictionary hashing, and regex tools make it the premier language for defensive security automation and incident response.',
      howDoesItWork: '1. Ingestion & Regex Parsing: Python streams log files line-by-line using generators to maintain a tiny memory footprint. Each line is parsed into structured fields (client IP, timestamp, HTTP method, path, status code, user agent).\n2. Frequency Analysis & Windowing: Python uses collections.defaultdict or Counter to track failed authentication attempts per IP address over sliding time windows.\n3. Threshold Alerting: When an IP exceeds a security threshold (e.g., more than 5 failed logins within 60 seconds), the script generates an incident alert or adds the IP to a defensive firewall blocklist.\n4. Authorized Defensive Testing: Python scripts can automate compliance verification (e.g., verifying that all production API endpoints return strict Content-Security-Policy and HSTS security headers).',
      syntaxDescription: 'import re\nfrom collections import Counter\npattern = re.compile(r"^(\\S+) \\S+ \\S+ \\[([^\\]]+)\\] \"(\\S+) (\\S+) \\S+\" (\\d{3})")',
      exampleCode: 'import re\nfrom collections import defaultdict\n\n# Simulated web server auth log entries\nSAMPLE_AUTH_LOGS = [\n    \'192.168.1.10 - - [14/Oct/2026:10:00:01] "POST /api/login HTTP/1.1" 401 128\',\n    \'192.168.1.10 - - [14/Oct/2026:10:00:03] "POST /api/login HTTP/1.1" 401 128\',\n    \'192.168.1.10 - - [14/Oct/2026:10:00:05] "POST /api/login HTTP/1.1" 401 128\',\n    \'192.168.1.10 - - [14/Oct/2026:10:00:08] "POST /api/login HTTP/1.1" 401 128\',\n    \'192.168.1.10 - - [14/Oct/2026:10:00:11] "POST /api/login HTTP/1.1" 401 128\',\n    \'192.168.1.10 - - [14/Oct/2026:10:00:14] "POST /api/login HTTP/1.1" 401 128\',\n    \'10.0.0.55 - - [14/Oct/2026:10:00:20] "POST /api/login HTTP/1.1" 200 512\',\n    \'172.16.0.4 - - [14/Oct/2026:10:00:25] "GET /api/dashboard HTTP/1.1" 200 4096\'\n]\n\ndef detect_credential_stuffing(logs: list[str], failure_threshold: int = 5) -> dict[str, int]:\n    """Analyzes logs for anomalous repeated authentication failures."""\n    log_regex = re.compile(r\'(?P<ip>\\S+) .*?"(?P<method>\\S+) (?P<path>\\S+) .*?" (?P<status>\\d{3})\')\n    failed_attempts = defaultdict(int)\n    flagged_threats = {}\n    \n    for line in logs:\n        match = log_regex.search(line)\n        if match:\n            ip = match.group("ip")\n            path = match.group("path")\n            status = int(match.group("status"))\n            \n            # Check for failed authentication responses\n            if path == "/api/login" and status == 401:\n                failed_attempts[ip] += 1\n                if failed_attempts[ip] >= failure_threshold:\n                    flagged_threats[ip] = failed_attempts[ip]\n                    \n    return flagged_threats\n\n# Execute automated defensive audit\nthreats = detect_credential_stuffing(SAMPLE_AUTH_LOGS, failure_threshold=5)\nprint(f"Log analysis completed across {len(SAMPLE_AUTH_LOGS)} records.")\nfor offending_ip, count in threats.items():\n    print(f"🚨 DEFENSIVE ALERT: High-frequency brute force detected from {offending_ip} ({count} failed attempts) -> Recommended Action: Quarantine IP.")',
      codeExplanation: [
        'Lines 4-13 provide sample Apache/Nginx web server access logs.',
        'Lines 17-18 compile a regular expression with named capture groups to parse IP, method, path, and HTTP status code.',
        'Lines 27-31 identify failed logins (status 401 on /api/login) and increment the failed attempt count for that specific IP.',
        'Line 32 flags the IP address once it reaches or exceeds the threshold (5 attempts).',
        'Lines 37-40 report the detected anomaly and recommend quarantine action.'
      ],
      expectedOutput: 'Log analysis completed across 8 records.\n🚨 DEFENSIVE ALERT: High-frequency brute force detected from 192.168.1.10 (6 failed attempts) -> Recommended Action: Quarantine IP.',
      commonMistakes: [
        {
          mistake: 'Loading a 50GB production server log file entirely into memory using f.readlines().',
          consequence: 'Out-Of-Memory (OOM) killer crashes the analysis script and server.',
          correction: 'Stream the file line-by-line using a generator: for line in file_handle:.'
        },
        {
          mistake: 'Conducting automated security scans or penetration tests against third-party servers without written, signed authorization.',
          consequence: 'Violates computer fraud laws (CFAA, Computer Misuse Act), resulting in legal prosecution.',
          correction: 'Only conduct automated testing against systems you own or where you possess explicit, written legal authorization.'
        }
      ],
      importantPoints: [
        'Defensive automation in Python enables real-time threat detection across server fleets.',
        'Always stream large log files line by line rather than reading into RAM at once.',
        'Security testing must always be authorized, defensive, and ethical.',
        'Automated security audits verify that HTTPS, security headers (HSTS, CSP), and least privilege are enforced.'
      ],
      relatedConcepts: [
        { name: 'Secure Programming', targetId: 'defensive-programming', note: 'Preventing vulnerabilities before they appear in logs.' }
      ],
      knowledgeCheck: {
        question: 'Why should log-analysis Python scripts stream files line-by-line rather than calling file.read() or file.readlines()?',
        options: [
          'Because text files can only be read backwards',
          'Because production log files can be tens or hundreds of gigabytes in size, and loading them all at once would crash the computer with an Out of Memory error',
          'Because line-by-line reading encrypts the log file',
          'Because Python cannot read more than 10 lines at once'
        ],
        correctIndex: 1,
        explanation: 'Streaming lines lazily keeps memory consumption constant (a few kilobytes) regardless of whether the log file is 10 megabytes or 100 gigabytes.'
      },
      endOfTopicQuestions: {
        easy: 'What HTTP status code typically indicates a failed login attempt on a REST endpoint?',
        medium: 'Explain the difference between authorization and authentication in web security.',
        hard: 'Design an automated Python log parser that uses sliding time windows (datetime delta) to differentiate between human typos and distributed botnet credential stuffing.'
      }
    }
  ]
};
