import { Section } from '../types/curriculum';

export const stage12Section: Section = {
  id: 'stage-12-backend',
  number: 12,
  title: 'Stage 12 — Python Backend Engineering',
  badge: 'Servers & APIs',
  description: 'Full-stack server architecture: Client-Server protocol, HTTP/HTTPS request-response lifecycle, RESTful APIs, authentication vs authorization, CORS, SQL databases, and comprehensive production pathways for Flask, Django, and FastAPI.',
  lessons: [
    {
      id: 'backend-overview',
      sectionId: 'stage-12-backend',
      title: 'Backend Architecture: The HTTP Protocol, REST, & Security',
      subtitle: 'Client-server contracts, headers, status codes, query vs path params, cookies, CORS, and SQL',
      readingTimeMinutes: 14,
      definition: 'A backend is the server-side software layer responsible for business logic execution, database interactions, authentication, authorization, and data processing, communicating with clients (web browsers, mobile apps) over the HTTP/HTTPS network protocol.',
      inSimpleTerms: 'When you order food at a restaurant, you sit at a dining table looking at a menu (the frontend). You tell the waiter what you want (the HTTP request). The waiter walks through double doors into a bustling kitchen (the backend). In the kitchen, the chef checks the refrigerator inventory (the database), prepares your meal safely following hygiene rules (business logic), and hands the plate back to the waiter (the HTTP response). The diner never enters the kitchen, but without the kitchen, the restaurant has no food.',
      whyDoesItExist: 'Client devices (browsers and smartphones) are untrusted environments: any user can open browser developer tools and alter JavaScript variables, steal API keys, or fake data. All critical security checks, payment operations, private database queries, and business rules MUST execute on a secure server controlled by your organization.',
      howDoesItWork: '1. The HTTP Request-Response Lifecycle:\n- The Client sends an HTTP Request: Method (GET, POST, PUT, DELETE, PATCH) + Path (/api/v1/users) + Headers (Content-Type, Authorization) + Body (JSON payload).\n- The Server processes the request, queries databases via SQL (Structured Query Language: CRUD - Create, Read, Update, Delete), enforces permissions, and returns an HTTP Response.\n- The HTTP Response includes: Status Code + Headers + Body.\n\n2. Standard HTTP Status Code Categories:\n- 2xx Success: 200 OK, 201 Created (resource added), 204 No Content.\n- 3xx Redirection: 301 Moved Permanently, 304 Not Modified.\n- 4xx Client Error: 400 Bad Request (invalid format), 401 Unauthorized (unauthenticated/missing token), 403 Forbidden (authenticated but lacks role permission), 404 Not Found.\n- 5xx Server Error: 500 Internal Server Error (unhandled exception in code), 502 Bad Gateway, 503 Service Unavailable.\n\n3. REST (Representational State Transfer):\n- Statelessness: Every request must contain all necessary authentication credentials; the server does not store client session memory between calls.\n- Resource-Oriented URLs: URLs represent nouns (/articles, /orders), while HTTP methods represent verbs (GET reads, POST creates, PUT replaces, DELETE removes).\n\n4. Critical Security Concepts:\n- Authentication: "Who are you?" (verifying username/password or JWT token).\n- Authorization: "What are you permitted to do?" (RBAC: checking if user has admin privileges).\n- CORS (Cross-Origin Resource Sharing): A browser security standard that blocks web pages on domain A from reading API responses from domain B unless domain B explicitly sends access-control-allow-origin headers.\n- CSRF (Cross-Site Request Forgery): Malicious websites tricking an authenticated user\'s browser into sending unauthorized commands; mitigated using CSRF tokens and SameSite cookies.',
      syntaxDescription: 'HTTP Format:\nPOST /api/v1/orders HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAuthorization: Bearer <jwt_token>\n\n{"item_id": 904, "quantity": 2}',
      exampleCode: 'import json\n\n# Demonstrating the Anatomy of an HTTP Request/Response Dispatcher\ndef mock_api_router(method: str, path: str, headers: dict, body: str) -> dict:\n    """Simulates a backend API endpoint handler."""\n    # 1. Authentication check\n    auth_header = headers.get("Authorization", "")\n    if not auth_header.startswith("Bearer valid_secret_token"):\n        return {\n            "status_code": 401,\n            "headers": {"Content-Type": "application/json"},\n            "body": json.dumps({"error": "Unauthorized", "detail": "Invalid or missing Bearer token."})\n        }\n        \n    # 2. REST Routing\n    if method == "GET" and path == "/api/users":\n        sample_users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]\n        return {\n            "status_code": 200,\n            "headers": {"Content-Type": "application/json"},\n            "body": json.dumps({"data": sample_users})\n        }\n    elif method == "POST" and path == "/api/users":\n        payload = json.loads(body)\n        new_user = {"id": 3, "name": payload["name"]}\n        return {\n            "status_code": 201,\n            "headers": {"Content-Type": "application/json"},\n            "body": json.dumps({"message": "User created", "user": new_user})\n        }\n    else:\n        return {"status_code": 404, "headers": {}, "body": json.dumps({"error": "Endpoint Not Found"})}\n\n# Test call\nresponse = mock_api_router("POST", "/api/users", {"Authorization": "Bearer valid_secret_token"}, \'{"name": "Charlie"}\')\nprint(f"Status Code: {response[\'status_code\']}")\nprint(f"Response Body: {response[\'body\']}")',
      codeExplanation: [
        'Lines 6-12 inspect the HTTP "Authorization" header. If invalid, it immediately terminates with a 401 Unauthorized status code.',
        'Lines 15-21 route GET requests on "/api/users" and return a 200 OK with a JSON list.',
        'Lines 22-29 route POST requests, parse the incoming JSON payload, construct a record, and return a 201 Created status.',
        'Line 30 handles unmatched routes with a 404 Not Found error.',
        'Lines 33-35 simulate an incoming request and display the resulting HTTP envelope.'
      ],
      expectedOutput: 'Status Code: 201\nResponse Body: {"message": "User created", "user": {"id": 3, "name": "Charlie"}}',
      commonMistakes: [
        {
          mistake: 'Returning HTTP 200 OK for requests that actually failed (e.g., returning 200 OK with body {"status": "error"}).',
          consequence: 'Breaks HTTP standards, confuses frontend caching, and prevents automated monitoring tools from detecting system outages.',
          correction: 'Always return semantic HTTP status codes: 400 for bad input, 401 for auth failure, 404 for missing items, 500 for server errors.'
        },
        {
          mistake: 'Concatenating user input directly into SQL strings: cursor.execute("SELECT * FROM users WHERE name = \'" + user_input + "\'").',
          consequence: 'Catastrophic SQL Injection (SQLi) vulnerability allowing attackers to dump or delete the entire database.',
          correction: 'Always use parameterized SQL queries: cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,)).'
        }
      ],
      importantPoints: [
        'The backend is the trusted boundary: never trust client-submitted data without server-side validation.',
        'Use standard HTTP status codes: 2xx (Success), 3xx (Redirect), 4xx (Client fault), 5xx (Server fault).',
        'Always use parameterized SQL queries or ORMs to prevent SQL injection.',
        'Understand the difference between Authentication (identity) and Authorization (permissions).'
      ],
      relatedConcepts: [
        { name: 'FastAPI Pathway', targetId: 'fastapi-tutorial', note: 'Modern high-performance async APIs.' },
        { name: 'Flask Pathway', targetId: 'flask-tutorial', note: 'WSGI lightweight microframework.' },
        { name: 'Django Pathway', targetId: 'django-tutorial', note: 'Enterprise batteries-included framework.' }
      ],
      knowledgeCheck: {
        question: 'Which HTTP status code should your backend return when a client attempts to access a protected endpoint without providing an authentication token?',
        options: [
          '200 OK',
          '404 Not Found',
          '401 Unauthorized',
          '500 Internal Server Error'
        ],
        correctIndex: 2,
        explanation: 'HTTP 401 Unauthorized is the standardized semantic status code indicating that authentication credentials are required and have failed or were omitted.'
      },
      endOfTopicQuestions: {
        easy: 'What HTTP method is standard for creating a new resource in a RESTful API?',
        medium: 'Explain the difference between path parameters (e.g., /users/42) and query parameters (e.g., /users?status=active).',
        hard: 'Explain how Cross-Origin Resource Sharing (CORS) preflight OPTIONS requests operate between the browser and API server.'
      }
    },
    {
      id: 'fastapi-tutorial',
      sectionId: 'stage-12-backend',
      title: 'FastAPI: Modern Async APIs with Pydantic & OpenAPI',
      subtitle: 'ASGI architecture, automatic data validation, dependency injection, and automatic Swagger docs',
      readingTimeMinutes: 14,
      definition: 'FastAPI is a modern, high-performance, asynchronous web framework for building RESTful APIs with Python 3.10+, built on Starlette for routing and Pydantic for data validation, featuring automatic OpenAPI documentation generation and native async/await support.',
      inSimpleTerms: 'Building an API used to mean writing code to handle routes, writing separate code to check whether numbers were actually numbers, and writing third documents to explain your API to other developers. FastAPI does all three in one stroke: you write type-annotated Python models, and FastAPI automatically validates incoming data, rejects bad input with detailed error messages, runs at C-level speeds, and automatically builds an interactive documentation website (/docs) for you.',
      whyDoesItExist: 'Legacy Python web frameworks (like Flask and Django) were built on the synchronous WSGI specification created in 2003, making high-concurrency async operations difficult. FastAPI was engineered from scratch on modern ASGI (Asynchronous Server Gateway Interface), making it one of the fastest Python frameworks in existence, on par with Node.js and Go.',
      howDoesItWork: '1. Pydantic Models: Define data schemas using standard Python class type hints. Pydantic parses incoming JSON, enforces types, and raises 422 Unprocessable Entity automatically if validation fails.\n2. Path Operations: Decorators like @app.get("/items/{item_id}") bind URLs to functions.\n3. Automatic Swagger / OpenAPI: FastAPI inspects your function signatures and generates interactive OpenAPI documentation at "/docs" and ReDoc at "/redoc" without writing a single line of extra code.\n4. Dependency Injection (Depends): A modular system to inject database sessions, current user tokens, and configuration into route functions.\n5. Production Server: Executed via Uvicorn (a lightning-fast ASGI server) with workers: uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4.',
      syntaxDescription: 'from fastapi import FastAPI\napp = FastAPI()\n@app.get("/")\nasync def root(): return {"message": "ok"}',
      exampleCode: 'from fastapi import FastAPI, HTTPException, status, Depends\nfrom pydantic import BaseModel, Field, EmailStr\nfrom typing import Optional\n\napp = FastAPI(title="Customer API", version="1.0.0")\n\n# 1. Pydantic Data Validation Model\nclass UserCreateSchema(BaseModel):\n    username: str = Field(..., min_length=3, max_length=50, description="Unique username")\n    email: str = Field(..., description="Valid user email address")\n    tier: str = Field(default="standard", pattern="^(standard|premium|enterprise)$")\n    spending_budget: Optional[float] = Field(default=0.0, ge=0.0)\n\nclass UserResponseSchema(BaseModel):\n    user_id: int\n    username: str\n    email: str\n    tier: str\n\n# In-memory mock database\nfake_db = {}\n\n# 2. Dependency Injection for Authentication Token\nasync def verify_api_key(token: str = "Bearer secret"):\n    if token != "Bearer secret":\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key")\n    return token\n\n# 3. Path Operation with Validation and Dependency\n@app.post("/users", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)\nasync def create_user(payload: UserCreateSchema, auth: str = Depends(verify_api_key)):\n    user_id = len(fake_db) + 1\n    stored_user = {\n        "user_id": user_id,\n        "username": payload.username,\n        "email": payload.email,\n        "tier": payload.tier\n    }\n    fake_db[user_id] = stored_user\n    return stored_user\n\n@app.get("/users/{user_id}", response_model=UserResponseSchema)\nasync def get_user(user_id: int):\n    if user_id not in fake_db:\n        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User record not found.")\n    return fake_db[user_id]',
      codeExplanation: [
        'Line 5 initializes the FastAPI application instance.',
        'Lines 8-12 define "UserCreateSchema": Pydantic automatically validates that username is 3-50 characters, email is valid, tier matches the regex pattern, and spending_budget is >= 0.',
        'Lines 22-25 define a security dependency using Depends.',
        'Lines 28-37 define a POST endpoint: FastAPI validates incoming JSON against UserCreateSchema, runs verify_api_key, serializes the response with UserResponseSchema, and returns HTTP 201.',
        'Lines 39-43 define a GET endpoint using a typed path parameter (user_id: int); passing text like /users/abc automatically returns an HTTP 422 error.'
      ],
      expectedOutput: 'FastAPI web service serving REST endpoints with auto-generated documentation accessible at http://localhost:8000/docs.',
      commonMistakes: [
        {
          mistake: 'Using def instead of async def for endpoints that perform asynchronous I/O, or using async def for CPU-heavy blocking code.',
          consequence: 'Blocking async functions stalls the Uvicorn event loop. Ordinary synchronous def routes are run in a threadpool by FastAPI, whereas async def routes run directly on the event loop.',
          correction: 'Use async def when using "await"; use standard def if calling blocking synchronous libraries.'
        },
        {
          mistake: 'Returning database model instances directly without response_model filtering.',
          consequence: 'Accidentally leaking hashed password fields or private internal database columns in the JSON response.',
          correction: 'Always define and specify explicit Pydantic response_model schemas.'
        }
      ],
      importantPoints: [
        'FastAPI is built on ASGI and uses Pydantic for strict schema validation.',
        'Interactive Swagger documentation is available at /docs automatically.',
        'Dependency injection (Depends) simplifies authentication, database sessions, and configuration.',
        'Run FastAPI in production using Uvicorn or Gunicorn with Uvicorn worker classes.'
      ],
      relatedConcepts: [
        { name: 'Flask Pathway', targetId: 'flask-tutorial', note: 'Comparing ASGI FastAPI with WSGI Flask.' },
        { name: 'Django Pathway', targetId: 'django-tutorial', note: 'Comparing microservices with full-stack Django.' }
      ],
      knowledgeCheck: {
        question: 'What URL endpoint does FastAPI automatically host for interactive Swagger UI documentation?',
        options: [
          '/admin',
          '/docs',
          '/api/help',
          '/swagger.html'
        ],
        correctIndex: 1,
        explanation: 'FastAPI provides automatic OpenAPI interactive Swagger documentation at the "/docs" route out of the box.'
      },
      endOfTopicQuestions: {
        easy: 'What data validation library powers FastAPI schemas and type parsing?',
        medium: 'Explain the role of the Depends() function in FastAPI\'s dependency injection architecture.',
        hard: 'Explain how FastAPI dispatches synchronous def endpoints to an external AnyIO worker threadpool while running async def endpoints directly on the main event loop.'
      }
    },
    {
      id: 'flask-tutorial',
      sectionId: 'stage-12-backend',
      title: 'Flask: The Python Microframework Pathway',
      subtitle: 'WSGI, application factories, blueprints, SQLAlchemy integration, and testing',
      readingTimeMinutes: 13,
      definition: 'Flask is a lightweight, extensible WSGI (Web Server Gateway Interface) microframework developed by Armin Ronacher (Pallets Projects), providing core routing, request handling, and Jinja2 templating while leaving database, authentication, and validation choices to developer preference.',
      inSimpleTerms: 'If Django is a fully furnished mansion with all furniture, appliances, and security alarms pre-installed, Flask is an elegant, open architectural loft. It gives you a solid foundation, four sturdy walls, and complete freedom to install whatever custom kitchen or furniture you want. It is called a "microframework" not because it can only make small apps, but because its core is lean and un-opinionated.',
      whyDoesItExist: 'Many microservices, internal dashboards, and prototypes don\'t need 40 complex database tables, admin panels, or monolithic structures. Flask lets you build a working API in a single 10-line Python file, yet scales up to millions of users when structured with blueprints and application factories.',
      howDoesItWork: '1. WSGI Specification: Communicates with web servers (like Nginx via Gunicorn) through synchronous callable WSGI objects.\n2. The Application Factory Pattern: Wrapping app initialization inside a "create_app()" function allows clean testing with isolated configurations.\n3. Blueprints: Modular packages that register routes under specific URL prefixes (e.g., auth_bp with /auth, api_bp with /api/v1).\n4. Request Context & Thread Locals: Flask uses Context Locals to provide access to the current request and session objects without explicitly passing them through every function.\n5. Extensions Ecosystem: Flask-SQLAlchemy (ORM), Flask-Migrate (Alembic database migrations), Flask-JWT-Extended (auth).',
      syntaxDescription: 'from flask import Flask, request, jsonify\napp = Flask(__name__)\n@app.route("/api")\ndef api(): return jsonify({"status": "ok"})',
      exampleCode: 'from flask import Flask, request, jsonify, abort\n\ndef create_app(test_config=None) -> Flask:\n    """Application factory pattern for modular production architecture."""\n    app = Flask(__name__)\n    \n    # In-memory storage for demonstration\n    products = {1: {"id": 1, "name": "Mechanical Keyboard", "price": 129.99}}\n    \n    @app.route("/health", methods=["GET"])\n    def health_check():\n        return jsonify({"status": "healthy", "service": "catalog"}), 200\n        \n    @app.route("/api/products", methods=["GET"])\n    def list_products():\n        return jsonify({"products": list(products.values())}), 200\n        \n    @app.route("/api/products", methods=["POST"])\n    def create_product():\n        data = request.get_json()\n        if not data or "name" not in data or "price" not in data:\n            return jsonify({"error": "Bad Request", "detail": "Missing name or price."}), 400\n            \n        new_id = len(products) + 1\n        item = {"id": new_id, "name": data["name"], "price": float(data["price"])}\n        products[new_id] = item\n        return jsonify({"message": "Product created", "item": item}), 201\n        \n    return app\n\napp = create_app()',
      codeExplanation: [
        'Line 3 defines the "create_app()" application factory function: the industry-standard design pattern for production Flask applications.',
        'Line 9 binds the "/health" endpoint using the @app.route decorator.',
        'Line 17 uses request.get_json() to parse the incoming JSON payload.',
        'Lines 18-19 enforce validation and return an HTTP 400 Bad Request error if fields are missing.',
        'Line 24 returns a 201 Created status code with the serialized product dictionary.'
      ],
      expectedOutput: 'Flask application initialized with application factory pattern and RESTful product endpoints.',
      commonMistakes: [
        {
          mistake: 'Using global app = Flask(__name__) at top-level rather than an Application Factory (create_app).',
          consequence: 'Makes automated unit testing and switching between testing and production database configurations difficult.',
          correction: 'Always wrap application setup inside a create_app(config) factory function.'
        },
        {
          mistake: 'Running app.run(debug=True) on a public production server.',
          consequence: 'Catastrophic security vulnerability: the Werkzeug interactive debugger allows arbitrary Python code execution through the browser!',
          correction: 'Never enable debug=True in production; serve using Gunicorn or uWSGI behind Nginx.'
        }
      ],
      importantPoints: [
        'Flask is a WSGI microframework: minimal core, maximum developer flexibility.',
        'Use the Application Factory pattern (create_app) for production scalability.',
        'Use Blueprints to divide large applications into modular routing directories.',
        'Never run Flask\'s built-in development server in production; use Gunicorn.'
      ],
      relatedConcepts: [
        { name: 'Backend Overview', targetId: 'backend-overview', note: 'HTTP and REST foundations.' }
      ],
      knowledgeCheck: {
        question: 'Why is running Flask with "debug=True" dangerous on a public internet server?',
        options: [
          'Because it turns the text red',
          'Because the interactive web debugger allows anyone visiting the crash page to execute arbitrary Python commands on the server',
          'Because it slows down internet speeds for the whole city',
          'Because it deletes all installed packages'
        ],
        correctIndex: 1,
        explanation: 'The Werkzeug debugger exposed by debug=True includes an interactive console that allows remote code execution directly on the server host.'
      },
      endOfTopicQuestions: {
        easy: 'What pattern in Flask wraps application setup inside a create_app() function?',
        medium: 'Explain the purpose of Flask Blueprints in organizing a 50-route web service.',
        hard: 'Explain how Flask uses Context Locals and Werkzeug\'s LocalProxy to provide access to the "request" object safely across multi-threaded WSGI workers.'
      }
    },
    {
      id: 'django-tutorial',
      sectionId: 'stage-12-backend',
      title: 'Django: The Full-Stack Enterprise Framework',
      subtitle: 'MVT architecture, the Django ORM, automated migrations, the Admin portal, and Django REST Framework',
      readingTimeMinutes: 14,
      definition: 'Django is a high-level, batteries-included Python web framework designed to encourage rapid development and clean, pragmatic design, featuring an integrated Object-Relational Mapper (ORM), automated database migrations, user authentication, security protection, and an automated administration portal.',
      inSimpleTerms: 'If building a web app with Flask is like buying ingredients at the grocery store and cooking from scratch, building with Django is like hiring an executive master chef who arrives with a complete commercial kitchen, a team of sous-chefs, and a book of 500 perfected recipes. Django provides everything out of the box: database management, user login systems, password reset emails, database migrations, and a professional admin dashboard without writing extra code.',
      whyDoesItExist: 'Django was created in a fast-paced newspaper newsroom (the Lawrence Journal-World) where journalists and developers had to launch complete, database-backed web applications in a matter of hours. It exists to eliminate repetitive web development chores while enforcing rock-solid security by default.',
      howDoesItWork: '1. MVT Architectural Pattern (Model-View-Template):\n- Model: Defines your database schema in Python classes. Django automatically generates SQL migrations (makemigrations and migrate).\n- View: Business logic that processes incoming HTTP requests and queries Models.\n- Template: HTML presentation layer (or JSON when using Django REST Framework).\n2. The Django ORM:\nAllows you to query databases in pure Python: User.objects.filter(is_active=True).order_by("-created_at"). Django translates this into optimized SQL for PostgreSQL, MySQL, SQLite, or Oracle.\n3. The Automated Admin Interface:\nBy registering a model in admin.py, Django automatically renders a secure, searchable, filterable web administration portal for business staff.\n4. Built-In Security:\nDjango automatically enables CSRF protection, SQL injection prevention, XSS (cross-site scripting) escaping, clickjacking protection, and secure password hashing (PBKDF2/Argon2) out of the box.\n5. Django REST Framework (DRF):\nThe industry standard for building production REST APIs on top of Django, providing Serializers, ViewSets, and API routing.',
      syntaxDescription: 'django-admin startproject myproject\npython manage.py makemigrations\npython manage.py migrate\npython manage.py runserver',
      exampleCode: '# Conceptual representation of Django Model, Serializer, and ViewSet (DRF)\n\n# 1. Model Definition (models.py)\n"""\nfrom django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    content = models.TextField()\n    published_at = models.DateTimeField(auto_now_add=True)\n    is_published = models.BooleanField(default=False)\n    \n    def __str__(self):\n        return self.title\n"""\n\n# 2. Django REST Framework Serializer (serializers.py)\n"""\nfrom rest_framework import serializers\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Article\n        fields = [\'id\', \'title\', \'slug\', \'content\', \'published_at\', \'is_published\']\n"""\n\n# 3. ViewSet (views.py)\n"""\nfrom rest_framework import viewsets, permissions\n\nclass ArticleViewSet(viewsets.ModelViewSet):\n    queryset = Article.objects.filter(is_published=True)\n    serializer_class = ArticleSerializer\n    permission_classes = [permissions.IsAuthenticatedOrReadOnly]\n"""\n\nprint("Django Architecture: Models -> Migrations -> ORM -> Admin / DRF API ViewSets.")',
      codeExplanation: [
        'The Model definition represents the database table: Django automatically generates the underlying SQL CREATE TABLE and ALTER TABLE statements.',
        'The ArticleSerializer converts complex Article model instances into JSON payloads and validates incoming POST data.',
        'The ArticleViewSet automatically provides full REST CRUD endpoints (GET /articles, POST /articles, GET /articles/1, PUT /articles/1, DELETE /articles/1) in just four lines of code!',
        'permission_classes enforces that anonymous guests can read articles, while only logged-in authenticated users can create or modify them.'
      ],
      expectedOutput: 'Django Architecture: Models -> Migrations -> ORM -> Admin / DRF API ViewSets.',
      commonMistakes: [
        {
          mistake: 'Modifying models.py but forgetting to run "python manage.py makemigrations" and "python manage.py migrate".',
          consequence: 'OperationalError: no such column, because the physical database schema does not match the Python model definitions.',
          correction: 'Whenever you edit models.py, always run makemigrations followed by migrate immediately.'
        },
        {
          mistake: 'The "N+1 Query Problem": querying child relationships inside a template loop without select_related() or prefetch_related().',
          consequence: 'Renders 100 articles by executing 101 separate SQL queries, grinding the database to a halt.',
          correction: 'Use Article.objects.select_related("author") to join tables in a single SQL query.'
        }
      ],
      importantPoints: [
        'Django is "batteries-included": ORM, admin panel, auth system, migrations, and security are pre-installed.',
        'Django uses the MVT (Model-View-Template) architectural pattern.',
        'Django REST Framework (DRF) is the standard library for turning Django into a world-class REST API.',
        'Never deploy with DEBUG = True in settings.py.'
      ],
      relatedConcepts: [
        { name: 'FastAPI Pathway', targetId: 'fastapi-tutorial', note: 'Contrasting Django monolithic power with lightweight async FastAPI.' }
      ],
      knowledgeCheck: {
        question: 'What Django management command creates migration files after you modify a Model class in models.py?',
        options: [
          'python manage.py build_db',
          'python manage.py makemigrations',
          'python manage.py update_sql',
          'python manage.py create_tables'
        ],
        correctIndex: 1,
        explanation: 'makemigrations packages your Model schema changes into version-controlled migration scripts; migrate executes those scripts against the database.'
      },
      endOfTopicQuestions: {
        easy: 'What architectural acronym describes Django\'s structure: MVC or MVT?',
        medium: 'Explain the difference between select_related() and prefetch_related() in the Django ORM to solve the N+1 query problem.',
        hard: 'Explain how Django middleware components process incoming requests and outgoing responses in an onion-layered call stack.'
      }
    }
  ]
};
