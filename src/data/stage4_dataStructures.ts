import { Section } from '../types/curriculum';

export const stage4Section: Section = {
  id: 'stage-4-data-structures',
  number: 4,
  title: 'Stage 4 — Data Structures',
  badge: 'Collections',
  description: 'Master Python\'s four fundamental built-in data structures: Lists, Tuples, Sets, and Dictionaries. Learn how each organizes memory, their mutability, performance profiles (Big-O), and when to select each structure.',
  lessons: [
    {
      id: 'lists',
      sectionId: 'stage-4-data-structures',
      title: 'Lists: Ordered, Mutable Dynamic Arrays',
      subtitle: 'Dynamic resizing, continuous memory pointers, and sequence operations',
      readingTimeMinutes: 12,
      definition: 'A list in Python is an ordered, mutable sequence of heterogeneous object references, implemented internally as a dynamic array of pointers.',
      inSimpleTerms: 'A list is like a digital notebook where you can jot down items in a numbered order. You can add new items to the bottom, cross items out, replace an item in the middle, or reorder the pages. Furthermore, your notebook doesn\'t care what you write: line 1 can be a number, line 2 can be a person\'s name, and line 3 can be another mini-list.',
      whyDoesItExist: 'Single variables can only refer to one object at a time. To manage collections of items—such as a list of registered users, high scores in a game, or data points collected by a sensor—programs need an ordered container that can expand and shrink dynamically at runtime.',
      howDoesItWork: '1. Memory Organization: Internally, CPython represents a list as an array of pointers to objects in memory. It allocates a continuous block of memory slots holding the memory addresses (pointers) of its elements.\n2. Over-Allocation: When you append elements, Python does not reallocate memory on every single append. Instead, it "over-allocates" memory geometrically (roughly doubling capacity when full). This gives list.append() an amortized constant time complexity O(1).\n3. 0-based Indexing: Direct index access list[i] is immediate O(1) time because the memory address is calculated instantly by basic pointer arithmetic: base_address + (i * pointer_size).\n4. Inserting or Deleting at Beginning/Middle: list.insert(0, item) or list.pop(0) is slow O(n) because every subsequent pointer in the array must be physically shifted over one slot in memory.',
      syntaxDescription: 'Created using square brackets: [item1, item2, item3] or the list() constructor. Access via index: list[index].',
      exampleCode: '# 1. Initialization and mutation\ninventory = ["Sword", "Shield", "Health Potion"]\ninventory.append("Magic Ring")      # Add to end: O(1)\ninventory.insert(1, "Bow")          # Insert at index 1: O(n)\n\n# 2. Modifying an element in-place\ninventory[0] = "Flame Sword"\n\n# 3. Removing elements\nremoved_item = inventory.pop()     # Removes and returns last element: "Magic Ring"\n\n# 4. Slicing and length\nprint(f"Current inventory ({len(inventory)} items): {inventory}")\nprint(f"First two items: {inventory[:2]}")\nprint(f"Removed item: {removed_item}")',
      codeExplanation: [
        'Line 2 initializes a list of three strings.',
        'Line 3 appends "Magic Ring" to the tail. Python utilizes over-allocated capacity (O(1) time).',
        'Line 4 inserts "Bow" at index 1. All subsequent elements ("Shield", "Health Potion", "Magic Ring") are shifted right by one position.',
        'Line 7 mutates the element at index 0 in-place: the pointer now references "Flame Sword".',
        'Line 10 calls .pop() without arguments to remove the final element in O(1) time.',
        'Lines 13-15 display the final state and slices.'
      ],
      expectedOutput: 'Current inventory (4 items): [\'Flame Sword\', \'Bow\', \'Shield\', \'Health Potion\']\nFirst two items: [\'Flame Sword\', \'Bow\']\nRemoved item: Magic Ring',
      commonMistakes: [
        {
          mistake: 'Modifying a list while actively iterating over it with a for loop: for x in my_list: my_list.remove(x).',
          consequence: 'Items are skipped silently because internal index pointers shift during iteration, leaving bugs.',
          correction: 'Iterate over a copy: for x in my_list.copy(): or use a list comprehension to filter items.'
        },
        {
          mistake: 'Using list multiplication to create a 2D matrix: grid = [[0] * 3] * 3.',
          consequence: 'All 3 rows share the exact same list object reference in memory! Modifying grid[0][0] alters all three rows simultaneously.',
          correction: 'Use a list comprehension to ensure distinct objects: grid = [[0 for _ in range(3)] for _ in range(3)].'
        }
      ],
      importantPoints: [
        'Lists are ordered (maintain insertion sequence) and mutable (can be changed in-place).',
        'Direct index access my_list[i] and appending to the end my_list.append() are ultra-fast O(1).',
        'Inserting or deleting at the front is O(n) because all subsequent elements must shift.',
        'Lists permit duplicate values: [1, 1, 2, 2] is completely valid.'
      ],
      relatedConcepts: [
        { name: 'Tuples', targetId: 'tuples', note: 'Immutable cousin of the list.' },
        { name: 'Data Structure Matrix', targetId: 'ds-comparison-table', note: 'Full side-by-side comparison.' }
      ],
      knowledgeCheck: {
        question: 'Why is list.insert(0, "item") significantly slower than list.append("item") for large lists?',
        options: [
          'Because Python charges money to insert at the beginning',
          'Because every existing pointer in the underlying dynamic array must be shifted one position to the right in memory',
          'Because the beginning of a list is stored on the hard drive',
          'Because strings cannot be stored at index 0'
        ],
        correctIndex: 1,
        explanation: 'In a dynamic array, memory is contiguous. Inserting at index 0 requires shifting every one of the N existing elements forward by one slot, taking O(N) time.'
      },
      endOfTopicQuestions: {
        easy: 'What built-in list method removes and returns the last element of a list?',
        medium: 'Explain the geometric over-allocation strategy Python uses for list capacity, and why it makes list.append() O(1) amortized.',
        hard: 'Demonstrate with a code example why shallow copying a list of lists creates aliased sub-lists that mutate unexpectedly.'
      }
    },
    {
      id: 'tuples',
      sectionId: 'stage-4-data-structures',
      title: 'Tuples: Immutable, Ordered Records',
      subtitle: 'Data integrity, fixed records, hashability, and memory optimization',
      readingTimeMinutes: 11,
      definition: 'A tuple in Python is an immutable, ordered sequence of heterogeneous object references, typically used to represent fixed collections of related fields or structured records.',
      inSimpleTerms: 'A tuple is like a stone engraving: once you carve items into a tuple, they are permanently set. You cannot add new items, delete items, or swap items out. If you need to change anything, you must carve an entirely new stone engraving.',
      whyDoesItExist: 'Programmers need data structures that guarantee data integrity. If a function returns a geographic coordinate (latitude, longitude) or database credentials (host, port), that data should never be accidentally modified by another part of the program. Furthermore, because tuples are immutable, Python optimizes their memory allocation, and tuples containing hashable elements can be used as keys in dictionaries.',
      howDoesItWork: '1. Memory Optimization: Because tuples have a fixed size defined at creation, Python does not need to over-allocate spare memory. A tuple occupies less memory in RAM than a list containing the same elements.\n2. Caching: CPython caches small, deallocated tuples (up to length 20) in a free list for immediate reuse, speeding up creation performance.\n3. Hashability: If a tuple contains only immutable objects (strings, numbers, other tuples), the tuple is hashable. This means it has a fixed hash value and can serve as a key in a dictionary or an element in a set.\n4. Tuple Unpacking: Tuples allow effortless parallel assignment: x, y, z = (10, 20, 30).',
      syntaxDescription: 'Created using parentheses: (item1, item2) or simply comma-separated values: item1, item2. A single-item tuple MUST include a trailing comma: (item,).',
      exampleCode: '# 1. Defining a fixed coordinate record\nserver_endpoint = ("api.production.internal", 8443, "https")\n\n# 2. Accessing by index\nhost = server_endpoint[0]\nport = server_endpoint[1]\n\n# 3. Tuple unpacking (idiomatic Python)\nhostname, port_number, protocol = server_endpoint\n\n# 4. Using tuples as dictionary keys (impossible with lists!)\nroute_cache = {\n    ("US-East", "checkout"): 45.2,\n    ("EU-Central", "checkout"): 78.6\n}\n\nprint(f"Host: {hostname}:{port_number} via {protocol}")\nprint(f"Latency cache: {route_cache[(\'US-East\', \'checkout\')]}ms")\n\n# 5. Demonstrating immutability protection\ntry:\n    server_endpoint[1] = 9000  # Attempting to mutate\nexcept TypeError as err:\n    print(f"Immutability enforced: {err}")',
      codeExplanation: [
        'Line 2 creates an immutable 3-element tuple.',
        'Lines 5-6 access elements by 0-based index.',
        'Line 9 demonstrates clean tuple unpacking: decomposing the tuple into three distinct variables in one readable line.',
        'Lines 12-15 show a key power of tuples: because they are immutable, they can serve as composite dictionary keys.',
        'Lines 20-24 catch the TypeError that occurs if code attempts to reassign a tuple element in place.'
      ],
      expectedOutput: 'Host: api.production.internal:8443 via https\nLatency cache: 45.2ms\nImmutability enforced: \'tuple\' object does not support item assignment',
      commonMistakes: [
        {
          mistake: 'Writing single = (5) and expecting a tuple.',
          consequence: 'Python treats parentheses as regular grouping syntax; type(single) is int, not tuple.',
          correction: 'Always include a trailing comma for single-item tuples: single = (5,).'
        },
        {
          mistake: 'Placing a mutable list inside a tuple and expecting the whole structure to be hashable.',
          consequence: 'A tuple containing a list cannot be hashed, failing with "TypeError: unhashable type: \'list\'".',
          correction: 'Ensure all nested elements inside a tuple are themselves immutable if you intend to use it as a dictionary key or set element.'
        }
      ],
      importantPoints: [
        'Tuples are immutable: their elements cannot be changed, added, or removed after creation.',
        'Tuples consume less memory and create faster than lists.',
        'Use tuples for heterogeneous records (e.g., name, age, city); use lists for homogeneous collections (e.g., list of prices).',
        'Tuples can be dictionary keys; lists cannot.'
      ],
      relatedConcepts: [
        { name: 'Lists', targetId: 'lists', note: 'Mutable counterpart.' },
        { name: 'Dictionaries', targetId: 'dictionaries', note: 'Using tuples as composite keys.' }
      ],
      knowledgeCheck: {
        question: 'How do you create a tuple with exactly ONE element in Python?',
        options: [
          't = (1)',
          't = [1]',
          't = (1,)',
          't = tuple.single(1)'
        ],
        correctIndex: 2,
        explanation: 'In Python, the comma creates the tuple, not the parentheses. A single-item tuple must be written with a trailing comma: (1,).'
      },
      endOfTopicQuestions: {
        easy: 'Can you append a new element to an existing tuple in Python?',
        medium: 'Explain why a tuple can be used as a key in a dictionary, whereas a list cannot.',
        hard: 'Explain what happens when a tuple contains a mutable object (like a list) and that nested list is modified. Does the tuple\'s id change?'
      }
    },
    {
      id: 'sets',
      sectionId: 'stage-4-data-structures',
      title: 'Sets: Unordered Collections of Unique Elements',
      subtitle: 'Hash tables, uniqueness guarantees, mathematical set operations, and O(1) membership testing',
      readingTimeMinutes: 11,
      definition: 'A set in Python is an unordered, mutable collection of unique, hashable objects implemented internally as a hash table with dummy values.',
      inSimpleTerms: 'A set is like a VIP guest list at an event. Two rules govern this guest list: First, every person\'s name can appear only once—if someone tries to write the same name twice, the duplicate is simply ignored. Second, there is no ranking or order—the names are scattered across a board. When someone arrives at the door, the bouncer can verify whether their name is on the list almost instantaneously, regardless of whether there are 10 guests or 10 million guests.',
      whyDoesItExist: 'Programmers frequently need to eliminate duplicates from collections and check whether an item exists at lightning speed. Searching for an item in a list with 1 million elements requires checking each item one by one (O(n) time). Checking membership in a set takes instantaneous O(1) time using hashing.',
      howDoesItWork: '1. Hash Table Mechanism: When you add an element to a set, Python passes the object to its built-in hash() function, which converts the object into a large integer. Python uses this hash value to calculate an index into an internal array of buckets.\n2. Instant Lookup O(1): When you test "x in my_set", Python computes hash(x), jumps directly to that memory bucket, and verifies if the object is there. It does NOT scan the collection sequentially.\n3. Uniqueness Enforcement: If two objects produce the same hash and evaluate as equal (==), the new element overwrites or discards the duplicate.\n4. Hashable Requirement: Any object stored in a set MUST be immutable and hashable (integers, floats, strings, tuples). You cannot put a list or dictionary inside a set.',
      syntaxDescription: 'Created using curly braces: {item1, item2} or the set() constructor. An empty set MUST be created using set(), NOT {} (which creates an empty dictionary!).',
      exampleCode: '# 1. Automatic deduplication\nraw_tags = ["python", "coding", "web", "python", "backend", "web"]\nunique_tags = set(raw_tags)\nprint(f"Deduplicated tags: {unique_tags}")\n\n# 2. Lightning-fast membership testing O(1)\nactive_session_tokens = {"tok_abc123", "tok_def456", "tok_ghi789"}\ncurrent_token = "tok_def456"\nif current_token in active_session_tokens:\n    print(f"Session {current_token} verified in O(1) time.")\n\n# 3. Mathematical Set Operations\npython_devs = {"Alice", "Bob", "Charlie", "Diana"}\ncloud_devs = {"Charlie", "Diana", "Evan", "Frank"}\n\n# Intersection (both skills)\nfull_stack = python_devs & cloud_devs\n# Union (either skill)\nall_engineers = python_devs | cloud_devs\n# Difference (Python devs who do NOT know cloud)\npure_python = python_devs - cloud_devs\n\nprint(f"Both skills (Intersection): {full_stack}")\nprint(f"Total workforce (Union): {all_engineers}")\nprint(f"Python only (Difference): {pure_python}")',
      codeExplanation: [
        'Line 3 passes a list with duplicates into set(). Duplicates ("python", "web") are eliminated instantly.',
        'Line 9 tests membership using the "in" operator in O(1) time.',
        'Lines 17-21 demonstrate mathematical set operations using native operator syntax: & for intersection, | for union, and - for difference.'
      ],
      expectedOutput: 'Deduplicated tags: {\'python\', \'web\', \'coding\', \'backend\'}\nSession tok_def456 verified in O(1) time.\nBoth skills (Intersection): {\'Charlie\', \'Diana\'}\nTotal workforce (Union): {\'Alice\', \'Bob\', \'Charlie\', \'Diana\', \'Evan\', \'Frank\'}\nPython only (Difference): {\'Alice\', \'Bob\'}',
      commonMistakes: [
        {
          mistake: 'Writing empty_set = {} expecting an empty set.',
          consequence: 'Python creates an empty dictionary (dict), NOT a set.',
          correction: 'Always create an empty set using the functional constructor: empty_set = set().'
        },
        {
          mistake: 'Trying to access set elements by index: my_set[0].',
          consequence: 'TypeError: \'set\' object is not subscriptable.',
          correction: 'Sets are unordered and do not support indexing. Convert to a list if positional ordering is needed: list(my_set)[0].'
        }
      ],
      importantPoints: [
        'Sets contain only unique elements; all duplicates are eliminated automatically.',
        'Sets are unordered: elements have no index positions.',
        'Membership testing "x in set" is O(1) average time, making sets vastly faster than lists for searching.',
        'Elements stored in a set must be immutable and hashable.'
      ],
      relatedConcepts: [
        { name: 'Dictionaries', targetId: 'dictionaries', note: 'Sets share the exact same underlying hash table architecture as dictionary keys.' },
        { name: 'Data Structure Matrix', targetId: 'ds-comparison-table', note: 'Comparative tradeoffs.' }
      ],
      knowledgeCheck: {
        question: 'What happens if you run: empty = {} in Python?',
        options: [
          'It creates an empty set',
          'It creates an empty dictionary',
          'It raises a SyntaxError',
          'It deletes all variables in memory'
        ],
        correctIndex: 1,
        explanation: 'Because dictionaries were introduced into Python before sets and are used constantly, the {} literal is reserved for empty dictionaries. Empty sets must be created with set().'
      },
      endOfTopicQuestions: {
        easy: 'What mathematical set operator represents the intersection (items common to both sets)?',
        medium: 'Why is checking "item in huge_set" O(1) time, while checking "item in huge_list" is O(n) time?',
        hard: 'Explain how hash collisions are resolved internally in CPython\'s set and dictionary implementation (open addressing with quadratic/pseudo-random probing).'
      }
    },
    {
      id: 'dictionaries',
      sectionId: 'stage-4-data-structures',
      title: 'Dictionaries: Key-Value Hash Maps',
      subtitle: 'Associative arrays, hashing, compact dict layout, and O(1) lookup',
      readingTimeMinutes: 13,
      definition: 'A dictionary (dict) in Python is an ordered, mutable mapping data structure that associates unique, hashable keys with arbitrary value objects, implemented as a high-performance hash table.',
      inSimpleTerms: 'A dictionary is like a real-world telephone directory or an encyclopedia. In a list, you look up items by their numerical position (give me item #0, item #1). In a dictionary, you look up values by a descriptive label called a "key" (give me "alice@example.com", give me "total_revenue"). You hand it the key, and it instantly retrieves the corresponding value.',
      whyDoesItExist: 'Real-world data is naturally relational and associative. A customer profile is not just a loose list of strings and numbers; it is a structured association: name is "Sarah", email is "sarah@domain.com", tier is "Gold". Dictionaries provide intuitive, blazing-fast key-based data modeling.',
      howDoesItWork: '1. Hash Table Architecture: When you write dict[key] = value, Python runs hash(key) to generate a numeric hash, which indexes into a compact hash table.\n2. Preserved Insertion Order: Since Python 3.7, Python dictionaries are officially guaranteed to preserve insertion order! CPython achieves this using a split-table design: a compact array of keys and values in insertion order, and an index hash table pointing to those entries.\n3. Keys Must Be Hashable: Dictionary keys must be immutable and hashable (strings, numbers, tuples). Values can be any Python object whatsoever (lists, nested dicts, functions, classes).\n4. O(1) Average Complexity: Reading, inserting, updating, and deleting keys is O(1) average time complexity.',
      syntaxDescription: '{key1: value1, key2: value2} or dict(key1=val1, key2=val2). Access via dict[key] or dict.get(key, default).',
      exampleCode: '# 1. Defining a structured dictionary\nuser_profile = {\n    "user_id": 10842,\n    "username": "sarah_dev",\n    "is_premium": True,\n    "roles": ["developer", "reviewer"],\n    "stats": {"commits": 340, "stars": 89}\n}\n\n# 2. Accessing values safely using .get()\nlogin_name = user_profile["username"]\n# Safe access with a default fallback (prevents KeyError):\nphone = user_profile.get("phone_number", "Not Provided")\n\n# 3. Adding and modifying keys in-place\nuser_profile["last_login"] = "2026-10-14"\nuser_profile["is_premium"] = False\n\n# 4. Iterating over keys, values, and items\nprint(f"User: {login_name} (Phone: {phone})")\nprint("Top-level attributes:")\nfor key, val in user_profile.items():\n    if key != "stats" and key != "roles":\n        print(f"  {key}: {val}")',
      codeExplanation: [
        'Lines 2-8 define a dictionary containing diverse value types, including a nested list and a nested dictionary.',
        'Line 11 accesses "username" via bracket syntax.',
        'Line 13 uses .get(): if "phone_number" does not exist in the dictionary, it returns "Not Provided" instead of crashing with a KeyError.',
        'Lines 16-17 demonstrate in-place mutation: updating an existing key and adding a new key.',
        'Lines 21-23 iterate over .items() unpacking both key and value simultaneously.'
      ],
      expectedOutput: 'User: sarah_dev (Phone: Not Provided)\nTop-level attributes:\n  user_id: 10842\n  username: sarah_dev\n  is_premium: False\n  last_login: 2026-10-14',
      commonMistakes: [
        {
          mistake: 'Using bracket syntax user_data["optional_field"] on missing keys without checking.',
          consequence: 'KeyError: \'optional_field\' crashes the program.',
          correction: 'Use user_data.get("optional_field", default_value) to safely retrieve optional keys.'
        },
        {
          mistake: 'Using a mutable list as a dictionary key: my_dict[[1, 2]] = "value".',
          consequence: 'TypeError: unhashable type: \'list\'.',
          correction: 'Convert the list to an immutable tuple before using it as a key: my_dict[(1, 2)] = "value".'
        }
      ],
      importantPoints: [
        'Keys must be unique and hashable (immutable); values can be anything and can contain duplicates.',
        'Dictionaries maintain insertion order (standardized in Python 3.7+).',
        'Lookups, insertions, and deletions are O(1) average time.',
        'Always use .get() or "in" keyword to avoid KeyErrors on uncertain keys.'
      ],
      relatedConcepts: [
        { name: 'Sets', targetId: 'sets', note: 'Sets share the exact same hash table architecture without values.' },
        { name: 'Comparison Matrix', targetId: 'ds-comparison-table', note: 'Side-by-side architectural comparison.' }
      ],
      knowledgeCheck: {
        question: 'What is the primary difference between my_dict["key"] and my_dict.get("key")?',
        options: [
          'my_dict["key"] is slower than .get()',
          'my_dict["key"] crashes with a KeyError if the key is missing, while .get() returns None (or a specified default value)',
          '.get() permanently deletes the key after reading it',
          '.get() only works on numbers'
        ],
        correctIndex: 1,
        explanation: 'Bracket access raises a fatal KeyError if the requested key does not exist. The .get() method safely returns None or a custom fallback default.'
      },
      endOfTopicQuestions: {
        easy: 'What method returns a view of all key-value pairs in a dictionary as tuples?',
        medium: 'Explain why lists cannot be used as dictionary keys, but tuples can.',
        hard: 'How did Raymond Hettinger\'s compact dictionary design (introduced in Python 3.6) reduce dictionary memory consumption by 20% to 25% while preserving insertion order?'
      }
    },
    {
      id: 'ds-comparison-table',
      sectionId: 'stage-4-data-structures',
      title: 'Dedicated Comparison: List vs Tuple vs Set vs Dictionary',
      subtitle: 'Complete architectural matrix of memory, mutability, performance, and use cases',
      readingTimeMinutes: 10,
      definition: 'A systematic architectural comparison contrasting Python\'s four primary data structures across mutability, ordering, uniqueness, underlying internal memory model, indexability, and Big-O computational time complexity.',
      inSimpleTerms: 'Choosing the wrong data structure can make your program 10,000 times slower or cause subtle data corruption bugs. This comparison matrix provides a clear reference guide to select the exact right container for your specific engineering challenge.',
      whyDoesItExist: 'Senior software engineering requires making deliberate tradeoffs. If you need fast lookups across 5 million items, choosing a list instead of a set or dictionary turns a sub-millisecond query into a 30-second delay. Understanding these tradeoffs is essential.',
      howDoesItWork: 'The four structures compared:\n\n1. List ([]):\n- Ordered? YES (preserves insertion order).\n- Mutable? YES.\n- Allows Duplicates? YES.\n- Access by: 0-based integer index.\n- Underlying implementation: Dynamic array of contiguous pointers.\n- Lookup by index: O(1).\n- Search by value (x in list): O(n) linear scan.\n- Best for: Ordered collections that need to be sorted, appended, modified, or contain duplicates.\n\n2. Tuple (()):\n- Ordered? YES.\n- Mutable? NO (strictly immutable).\n- Allows Duplicates? YES.\n- Access by: 0-based integer index or unpacking.\n- Underlying implementation: Fixed-size contiguous array of pointers.\n- Lookup by index: O(1).\n- Search by value: O(n).\n- Best for: Fixed records, coordinates, function return values, and hashable composite dictionary keys.\n\n3. Set ({}):\n- Ordered? NO (unordered collection).\n- Mutable? YES.\n- Allows Duplicates? NO (strictly unique elements).\n- Access by: Value membership test (x in set).\n- Underlying implementation: Hash table.\n- Search by value: O(1) average time.\n- Best for: Fast deduplication, membership testing, and mathematical set operations.\n\n4. Dictionary ({k: v}):\n- Ordered? YES (preserves key insertion order since Python 3.7).\n- Mutable? YES.\n- Keys Unique? YES (values can have duplicates).\n- Access by: Hashable key object.\n- Underlying implementation: Combined compact array + sparse hash table.\n- Lookup by key: O(1) average time.\n- Best for: Associative records, database rows, configurations, and fast lookup tables.',
      syntaxDescription: 'List: [1, 2] | Tuple: (1, 2) | Set: {1, 2} | Dict: {"key": 2}',
      exampleCode: '# Choosing the right data structure for the job:\n\n# Scenario 1: Ordered sequence of temperatures (List)\nweekly_temps = [72.5, 75.0, 71.2, 68.9, 74.1]\n\n# Scenario 2: Immutable GPS location of a server (Tuple)\ndatacenter_gps = (37.7749, -122.4194)\n\n# Scenario 3: Banned IP addresses to block in O(1) time (Set)\nblocked_ips = {"192.168.1.100", "10.0.0.45", "172.16.0.8"}\n\n# Scenario 4: User account settings mapping (Dictionary)\nuser_preferences = {\n    "theme": "dark",\n    "notifications": True,\n    "language": "en-US"\n}\n\nprint(f"List length: {len(weekly_temps)}")\nprint(f"Tuple coordinate: {datacenter_gps}")\nprint(f"Is IP blocked: {\'10.0.0.45\' in blocked_ips}")\nprint(f"Theme preference: {user_preferences[\'theme\']}")',
      codeExplanation: [
        'Line 4 uses a List because temperature readings arrive in chronological order and can contain duplicate values.',
        'Line 7 uses a Tuple because geographic coordinates are a fixed pair of values that should never be mutated independently.',
        'Line 10 uses a Set because security firewalls need instantaneous O(1) verification when incoming network packets arrive.',
        'Lines 13-17 use a Dictionary because application preferences represent named key-value mappings.'
      ],
      expectedOutput: 'List length: 5\nTuple coordinate: (37.7749, -122.4194)\nIs IP blocked: True\nTheme preference: dark',
      commonMistakes: [
        {
          mistake: 'Using a List to check membership across millions of records: if user_id in user_list:.',
          consequence: 'Catastrophic performance degradation (O(n) time per query).',
          correction: 'Convert the collection to a Set or Dictionary: user_set = set(user_list) for O(1) lookups.'
        }
      ],
      importantPoints: [
        'Always ask: Do I need order? Do I need mutability? Do I need uniqueness? Do I need key-based lookup?',
        'Lists = dynamic ordered sequence.',
        'Tuples = immutable fixed record.',
        'Sets = unique collection with O(1) lookup.',
        'Dictionaries = key-value mapping with O(1) lookup.'
      ],
      relatedConcepts: [
        { name: 'Functions', targetId: 'functions-overview', note: 'Passing data structures as arguments to functions.' }
      ],
      knowledgeCheck: {
        question: 'You need to store 5,000,000 unique credit card blacklist tokens and check incoming transactions in less than 1 millisecond. Which data structure MUST you choose?',
        options: [
          'A List',
          'A Set',
          'A Tuple',
          'A String'
        ],
        correctIndex: 1,
        explanation: 'A Set uses a hash table to perform membership testing in O(1) constant time, making lookups nearly instantaneous regardless of whether there are 5 elements or 5,000,000 elements.'
      },
      endOfTopicQuestions: {
        easy: 'Which of the four primary structures is strictly immutable?',
        medium: 'Construct a scenario where using a Dictionary is vastly superior to using a List of two-element Tuples.',
        hard: 'Analyze the memory footprint and CPU cache locality differences between Python\'s list of pointer references versus a contiguous C-style NumPy array.'
      }
    }
  ]
};
