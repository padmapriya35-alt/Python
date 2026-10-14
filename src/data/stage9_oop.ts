import { Section } from '../types/curriculum';

export const stage9Section: Section = {
  id: 'stage-9-oop',
  number: 9,
  title: 'Stage 9 — Object-Oriented Programming (OOP)',
  badge: 'Paradigms',
  description: 'Concepts first, syntax second: learn the philosophy of OOP, class blueprints vs concrete instances, the true meaning of "self", encapsulation, inheritance, polymorphism, abstraction, composition over inheritance, and modern dataclasses.',
  lessons: [
    {
      id: 'oop-concepts',
      sectionId: 'stage-9-oop',
      title: 'OOP Philosophy: Classes, Instances, & The "self" Parameter',
      subtitle: 'The conceptual leap from procedural scripting to domain modeling',
      readingTimeMinutes: 14,
      definition: 'Object-Oriented Programming (OOP) is a software design paradigm organized around "objects"—discrete software entities that bundle state (data held in attributes) together with behavior (actions defined in methods)—rather than treating functions and data as separate entities.',
      inSimpleTerms: 'In procedural programming, you have data stored in floating variables on one side, and separate functions doing things to that data on the other side. As programs grow, it becomes chaotic keeping track of which function is allowed to touch which variable. OOP changes the mental model: instead of separating data and actions, you bundle them together into cohesive "living" entities called objects. An object represents a noun in your problem domain: a BankAccount, a UserProfile, an Airplane, or a Car.',
      whyDoesItExist: 'Complex systems model real-world domains. When building a banking system, a BankAccount doesn\'t just have a balance number; it has rules: you can only deposit positive money, you cannot withdraw more than your overdraft limit, and interest calculations belong to that specific account. Bundling data with the rules that govern it prevents unauthorized or nonsensical mutations.',
      howDoesItWork: 'Core OOP Conceptual Vocabulary Defined:\n1. CLASS: The blueprint, schematic, or factory recipe. It defines what attributes and methods all objects of this type will possess, but contains no actual personal data. (e.g., the architectural blueprint for a house).\n2. OBJECT / INSTANCE: The concrete, physical entity constructed in memory using the class blueprint. (e.g., the actual brick-and-mortar house standing on Elm Street).\n3. ATTRIBUTE: A variable attached to a specific instance object that holds its private state or characteristics (e.g., account.balance, user.email).\n4. METHOD: A function defined inside a class that operates on the instance\'s attributes.\n5. CONSTRUCTOR (__init__): The special initialization method automatically invoked by Python immediately after a new instance object is allocated in memory.\n\nTHE CRITICAL MYSTERY OF "self":\nWhy does every method in a Python class have "self" as its very first parameter?\n- When you call "account.deposit(500)", how does the deposit method know WHICH specific account\'s balance to increase? You might have 10,000 accounts in memory!\n- Under the hood, Python automatically translates "account.deposit(500)" into: BankAccount.deposit(account, 500)!\n- "self" is an explicit reference to the EXACT instance object whose method is currently being called. Without self, methods would have no way to access or modify their own instance attributes.',
      syntaxDescription: 'class ClassName:\n    def __init__(self, param1):\n        self.param1 = param1\n    def method_name(self):\n        return self.param1',
      exampleCode: 'class BankAccount:\n    """A robust bank account class demonstrating encapsulation and methods."""\n    \n    # Class attribute (shared by all instances):\n    bank_name = "Global Apex Reserve"\n    \n    def __init__(self, owner: str, initial_deposit: float = 0.0):\n        # Instance attributes (unique to this specific instance):\n        self.owner = owner\n        self._balance = initial_deposit  # Protected attribute by convention\n        self._transactions = []\n        \n    def deposit(self, amount: float) -> float:\n        """Applies business rules before mutating balance."""\n        if amount <= 0:\n            raise ValueError("Deposit amount must be strictly positive.")\n        self._balance += amount\n        self._transactions.append(f"+${amount:.2f}")\n        return self._balance\n        \n    def withdraw(self, amount: float) -> float:\n        if amount <= 0:\n            raise ValueError("Withdrawal amount must be strictly positive.")\n        if amount > self._balance:\n            raise ValueError("Insufficient balance.")\n        self._balance -= amount\n        self._transactions.append(f"-${amount:.2f}")\n        return self._balance\n        \n    @property\n    def balance(self) -> float:\n        """Read-only property getter for balance."""\n        return self._balance\n\n# Creating instances (objects) from the blueprint\nalice_acc = BankAccount("Alice Smith", 1000.0)\nbob_acc = BankAccount("Bob Jones", 250.0)\n\nalice_acc.deposit(500.0)\nbob_acc.withdraw(50.0)\n\nprint(f"Alice balance ({alice_acc.bank_name}): ${alice_acc.balance:.2f}")\nprint(f"Bob balance ({bob_acc.bank_name}): ${bob_acc.balance:.2f}")',
      codeExplanation: [
        'Line 1 defines the "BankAccount" class blueprint.',
        'Line 4 defines a class attribute (bank_name) shared by every instance.',
        'Lines 6-10 define the constructor __init__. "self" refers to the new instance being born.',
        'Lines 12-18 define the "deposit" method: it enforces business rules (must be positive) before altering self._balance.',
        'Lines 27-30 use the @property decorator to expose "balance" as a clean read-only property without exposing raw internal variables.',
        'Lines 33-34 create two distinct, independent objects in memory: alice_acc and bob_acc.',
        'Line 36 calls deposit(500.0): Python translates this to BankAccount.deposit(alice_acc, 500.0), passing alice_acc as "self".'
      ],
      expectedOutput: 'Alice balance (Global Apex Reserve): $1500.00\nBob balance (Global Apex Reserve): $200.00',
      commonMistakes: [
        {
          mistake: 'Forgetting "self." when assigning or accessing instance attributes inside methods (e.g., writing "balance = balance + amount" instead of "self._balance += amount").',
          consequence: 'Python creates a temporary local variable that vanishes the instant the method finishes, leaving the instance state unchanged.',
          correction: 'Always prefix instance attribute reads and writes with "self.".'
        },
        {
          mistake: 'Putting a mutable default object (like a list) in a class attribute definition thinking each instance gets its own copy.',
          consequence: 'All instances share the exact same list in memory! Appending to one instance mutates the list for all instances everywhere.',
          correction: 'Always initialize instance-specific collections inside the __init__ constructor attached to self.'
        }
      ],
      importantPoints: [
        'A class is the blueprint; an object is the concrete instance in memory.',
        '"self" is an explicit pointer to the specific instance whose method was invoked.',
        'Encapsulation bundles data with validation methods that protect invariants.',
        'Use @property to create clean, pythonic getters and setters.'
      ],
      relatedConcepts: [
        { name: 'Inheritance & Polymorphism', targetId: 'oop-inheritance-advanced', note: 'Hierarchies, composition, and special methods.' }
      ],
      knowledgeCheck: {
        question: 'What is the role of the "self" parameter in Python class methods?',
        options: [
          'It is a special password required by the CPU',
          'It is an explicit reference to the current instance object whose method is being executed',
          'It forces the method to run in a background thread',
          'It deletes the class when finished'
        ],
        correctIndex: 1,
        explanation: 'In Python, methods are bound to instances. When invoked, Python passes the calling instance as the first argument, conventionally named "self".'
      },
      endOfTopicQuestions: {
        easy: 'What is the name of the initialization method that runs automatically when an object is instantiated?',
        medium: 'Explain the difference between a class attribute and an instance attribute with a code example.',
        hard: 'How does Python\'s descriptor protocol power the @property decorator under the hood (__get__, __set__, and __delete__)?'
      }
    },
    {
      id: 'oop-inheritance-advanced',
      sectionId: 'stage-9-oop',
      title: 'Inheritance, Polymorphism, Special Methods, & Dataclasses',
      subtitle: 'The 4 pillars of OOP, super(), dunder methods, composition over inheritance, and modern dataclasses',
      readingTimeMinutes: 14,
      definition: 'Advanced OOP encompasses the mechanisms of Inheritance (deriving specialized classes from parent classes), Polymorphism (handling diverse objects through a unified interface), Special (Dunder) Methods (customizing Python operators and behavior), and Dataclasses (automatic generation of boilerplate data structures).',
      inSimpleTerms: 'Inheritance is like genetic biology: a child class inherits all the traits and abilities of its parent class, but can add its own unique abilities or override existing ones. Polymorphism means "many shapes": if a dog, a cat, and a duck all have a "make_sound()" method, a farmer function can simply tell all animals to make their sound without needing to know what specific species each one is. Finally, "dunder" methods allow your custom objects to behave like native Python types: you can add them with "+", check their length with "len()", or print them cleanly.',
      whyDoesItExist: 'Writing repetitive classes that share 90% of their logic violates DRY. More importantly, polymorphism allows systems to be extensible: you can add 50 new payment processors (PayPal, Stripe, Bitcoin) without touching a single line of your central checkout loop, provided each implements the common payment interface.',
      howDoesItWork: '1. Inheritance & super(): Subclasses inherit attributes and methods. super().__init__() invokes the parent constructor, ensuring base initialization runs properly.\n2. Method Resolution Order (MRO): In multiple inheritance, Python resolves methods using the C3 Linearization algorithm. You can inspect any class\'s lookup order with ClassName.__mro__.\n3. Polymorphism: Functions interact with objects based on their interface (Duck Typing: "If it walks like a duck and quacks like a duck, it\'s a duck"), not their rigid concrete type.\n4. Special (Dunder) Methods:\n  - __repr__: Unambiguous developer representation (e.g., Point(x=3, y=4)).\n  - __str__: Readable end-user string representation.\n  - __eq__: Enables "==" equality comparison.\n  - __len__: Enables the len() function.\n  - __add__: Overloads the "+" operator.\n5. Modern Dataclasses (@dataclass): Introduced in Python 3.7, this decorator automatically generates __init__, __repr__, __eq__, and typing metadata from simple class variable annotations, eliminating tedious boilerplate.',
      syntaxDescription: 'class Child(Parent):\n    def __init__(self, arg):\n        super().__init__(arg)\n\n@dataclass\nclass Record:\n    name: str\n    score: int',
      exampleCode: 'from dataclasses import dataclass\n\n# 1. Modern Dataclass for clean data modeling\n@dataclass(frozen=True)\nclass GeographicCoordinate:\n    latitude: float\n    longitude: float\n    label: str = "Unknown"\n    \n    def __str__(self) -> str:\n        return f"{self.label} ({self.latitude:.4f}, {self.longitude:.4f})"\n\n# 2. Inheritance and Polymorphism\nclass NotificationService:\n    def send(self, recipient: str, message: str) -> bool:\n        raise NotImplementedError("Subclasses must implement abstract send method.")\n\nclass EmailNotification(NotificationService):\n    def send(self, recipient: str, message: str) -> bool:\n        print(f"[EMAIL -> {recipient}] {message}")\n        return True\n\nclass SMSNotification(NotificationService):\n    def send(self, recipient: str, message: str) -> bool:\n        print(f"[SMS -> {recipient}] {message}")\n        return True\n\n# Polymorphic dispatcher function\ndef broadcast_alert(services: list[NotificationService], recipient: str, text: str):\n    for service in services:\n        service.send(recipient, text)\n\n# Execution\ncoord = GeographicCoordinate(37.7749, -122.4194, "San Francisco Datacenter")\nprint(f"Location initialized: {coord}")\n\nchannels: list[NotificationService] = [EmailNotification(), SMSNotification()]\nbroadcast_alert(channels, "ops@apex.com", "High CPU load detected.")',
      codeExplanation: [
        'Lines 4-10 define a frozen (immutable) dataclass. Python automatically writes __init__, __repr__, and __eq__ for GeographicCoordinate behind the scenes.',
        'Lines 13-15 define an abstract base interface "NotificationService".',
        'Lines 17-25 define specialized subclasses implementing the send() method.',
        'Lines 28-30 define a polymorphic dispatcher: it calls service.send() without caring whether the channel is Email or SMS.',
        'Line 38 broadcasts the alert seamlessly across all channels.'
      ],
      expectedOutput: 'Location initialized: San Francisco Datacenter (37.7749, -122.4194)\n[EMAIL -> ops@apex.com] High CPU load detected.\n[SMS -> ops@apex.com] High CPU load detected.',
      commonMistakes: [
        {
          mistake: 'Deep inheritance trees (e.g., Class A inherits B, which inherits C, which inherits D, 8 levels deep).',
          consequence: 'Fragile base class problem: a tiny change in class A unexpectedly breaks dozens of downstream classes.',
          correction: 'Favor Composition over Inheritance: build classes by combining independent objects rather than deep subclassing.'
        },
        {
          mistake: 'Forgetting to call super().__init__() in a child class constructor.',
          consequence: 'Parent class attributes are never initialized, causing unexpected AttributeErrors when calling inherited methods.',
          correction: 'Always invoke super().__init__(*args) in subclass constructors.'
        }
      ],
      importantPoints: [
        'Inheritance models an "IS-A" relationship; Composition models a "HAS-A" relationship.',
        'Favor Composition over Inheritance whenever possible.',
        'Polymorphism lets functions work with any object that provides the expected interface (Duck Typing).',
        'Use @dataclass to eliminate repetitive __init__ boilerplate for data-holding classes.'
      ],
      relatedConcepts: [
        { name: 'Advanced Python', targetId: 'advanced-python', note: 'Abstract Base Classes (ABCs) and Protocols.' }
      ],
      knowledgeCheck: {
        question: 'What does the @dataclass decorator automatically generate for a Python class?',
        options: [
          'A web page and an SQL database',
          'Standard boilerplate methods including __init__, __repr__, and __eq__ based on type annotations',
          'It compiles the class into C machine code',
          'It makes the class run in parallel threads'
        ],
        correctIndex: 1,
        explanation: 'The @dataclass decorator inspects type-annotated class attributes and automatically generates constructors, string representations, and equality comparison methods.'
      },
      endOfTopicQuestions: {
        easy: 'What dunder method is called when you pass an object to the print() function?',
        medium: 'Explain the difference between Inheritance ("is-a") and Composition ("has-a") with a concrete software modeling example.',
        hard: 'Explain Python\'s C3 Linearization algorithm and how Method Resolution Order (MRO) resolves diamond inheritance graphs.'
      }
    }
  ]
};
