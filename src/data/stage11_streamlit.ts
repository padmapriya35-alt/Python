import { Section } from '../types/curriculum';

export const stage11Section: Section = {
  id: 'stage-11-streamlit',
  number: 11,
  title: 'Stage 11 — Interactive Web Apps with Streamlit',
  badge: 'Web GUI',
  description: 'The complete Streamlit pathway: transforming pure Python data scripts into interactive, reactive web dashboards without HTML, CSS, or JavaScript. Architecture, the unique top-to-bottom re-run execution model, state management, caching, widgets, layouts, and cloud deployment.',
  lessons: [
    {
      id: 'streamlit-architecture',
      sectionId: 'stage-11-streamlit',
      title: 'Streamlit: Architecture & Reactive Execution Model',
      subtitle: 'How pure Python scripts become reactive web applications',
      readingTimeMinutes: 13,
      definition: 'Streamlit is an open-source Python framework that dynamically renders pure Python source code into a fully interactive, reactive web browser application using a client-server WebSocket architecture, executing scripts top-to-bottom on every user interaction.',
      inSimpleTerms: 'Historically, if a Python developer wanted to build a web dashboard for their model or data analysis, they had to learn four different languages: HTML, CSS, JavaScript, and a backend framework like Flask. Streamlit changes this completely: you write plain Python, and Streamlit translates it into a polished, modern web app in real time. Whenever a user moves a slider, clicks a button, or selects an item, Streamlit automatically updates the browser page.',
      whyDoesItExist: 'Data scientists, researchers, and AI engineers need to share models, analytics, and internal business tools quickly. Spending three weeks writing custom React/JavaScript frontends for a machine learning model is an inefficient use of data engineering time. Streamlit allows a full production-ready dashboard to be built in 30 minutes in pure Python.',
      howDoesItWork: 'THE UNIQUE STREAMLIT EXECUTION MODEL:\nUnderstanding how Streamlit executes code is the single most important concept in Streamlit:\n1. Top-to-Bottom Execution:\nWhenever a user interacts with ANY widget in the browser (e.g., drags a slider, enters text, clicks a checkbox), Streamlit executes the ENTIRE Python script from the very first line to the very last line all over again!\n2. The Reactive Loop:\n- The Python script runs on the backend server.\n- Widget calls (like st.slider) send updated state over a persistent WebSocket connection.\n- The server re-evaluates the script with the newly selected slider value.\n- The updated UI tree is streamed back to the React browser client and re-rendered.\n3. The State Problem and Solution:\nBecause the script re-runs from top to bottom on every click, ordinary Python variables reset to their initial values! To remember data across re-runs (like shopping cart contents, active user sessions, or model predictions), Streamlit provides st.session_state (a persistent session dictionary).\n4. The Performance Problem and Solution:\nIf your script re-runs from top to bottom on every slider move, you cannot reload a 2GB dataset from disk every time! Streamlit provides high-performance caching decorators:\n- @st.cache_data: Caches computation outcomes, database queries, and dataframes (serializable data).\n- @st.cache_resource: Caches global stateful objects (like loaded AI neural network models, database connection pools).',
      syntaxDescription: 'Install: pip install streamlit\nRun app: streamlit run app.py\nCore library: import streamlit as st',
      exampleCode: 'import streamlit as st\nimport pandas as pd\nimport numpy as np\n\n# 1. Page Configuration and Titles\nst.set_page_config(page_title="Executive Analytics", layout="wide")\nst.title("📊 Executive KPI & Revenue Forecaster")\nst.markdown("This dashboard updates reactively using pure Python.")\n\n# 2. Sidebar Controls and Widgets\nwith st.sidebar:\n    st.header("⚙️ Simulation Settings")\n    tax_rate = st.slider("Corporate Tax Rate (%)", min_value=10, max_value=35, value=21)\n    include_overheads = st.checkbox("Include Operating Overheads", value=True)\n    industry = st.selectbox("Market Segment", ["Enterprise SaaS", "E-Commerce", "Hardware IoT"])\n\n# 3. High-Performance Caching Decorator\n@st.cache_data\ndef generate_revenue_model(segment: str, tax_pct: int, overheads: bool) -> pd.DataFrame:\n    # Simulated expensive calculation cached in memory\n    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\n    base_revenue = 100000 if segment == "Enterprise SaaS" else 75000\n    revenues = [base_revenue * (1 + (i * 0.08)) for i in range(len(months))]\n    tax_factor = 1.0 - (tax_pct / 100.0)\n    net_incomes = [r * tax_factor for r in revenues]\n    \n    return pd.DataFrame({"Month": months, "Gross Revenue": revenues, "Net Income": net_incomes})\n\ndf = generate_revenue_model(industry, tax_rate, include_overheads)\n\n# 4. Multi-Column Layout and Metric Display\ncol1, col2, col3 = st.columns(3)\ncol1.metric("Selected Segment", industry)\ncol2.metric("Gross H1 Total", f"${df[\'Gross Revenue\'].sum():,.0f}")\ncol3.metric("Projected Net Total", f"${df[\'Net Income\'].sum():,.0f}", delta=f"-{tax_rate}% Tax")\n\n# 5. Interactive Charts and Data Tables\nst.subheader("Projected H1 Trajectory")\nst.line_chart(df.set_index("Month"))\n\nwith st.expander("View Raw Dataframe Records"):\n    st.dataframe(df, use_container_width=True)',
      codeExplanation: [
        'Line 5 configures page metadata and enables a responsive wide layout.',
        'Lines 10-14 place interactive control widgets in a clean collapsible sidebar.',
        'Lines 17-27 demonstrate @st.cache_data: this function is only executed when its parameter inputs change; otherwise, cached results are returned instantly in microseconds.',
        'Lines 31-34 create a 3-column layout displaying key financial metric callouts.',
        'Lines 37-38 render an interactive line chart using Streamlit\'s built-in graphing engine.',
        'Lines 40-41 wrap the tabular records inside a collapsible expander container.'
      ],
      expectedOutput: 'Interactive web application running on local port http://localhost:8501 with reactive sliders and real-time chart updates.',
      commonMistakes: [
        {
          mistake: 'Putting expensive data-loading or model-loading calls in the global script body without @st.cache_data or @st.cache_resource.',
          consequence: 'Every click or slider movement reloads the entire dataset or re-downloads the model, making the web UI sluggish and unresponsive.',
          correction: 'Always wrap data loaders in @st.cache_data and AI models in @st.cache_resource.'
        },
        {
          mistake: 'Trying to update an ordinary global variable (counter += 1) across user clicks.',
          consequence: 'The counter resets to 0 on every interaction because the script re-runs from line 1.',
          correction: 'Use st.session_state: if "counter" not in st.session_state: st.session_state.counter = 0; then st.session_state.counter += 1.'
        }
      ],
      importantPoints: [
        'Streamlit scripts execute from top to bottom on every user interaction.',
        'Use st.session_state to persist state across script re-runs.',
        'Use @st.cache_data for datasets/computations and @st.cache_resource for models/connections.',
        'Streamlit applications run on port 8501 by default.'
      ],
      relatedConcepts: [
        { name: 'Streamlit Widgets & Layouts', targetId: 'streamlit-widgets', note: 'Deep dive into forms, callbacks, tabs, and file uploads.' }
      ],
      knowledgeCheck: {
        question: 'What happens in a Streamlit application when a user changes the value of a slider widget?',
        options: [
          'Only that specific slider widget re-renders while the rest of the file sleeps',
          'The entire Python script is re-executed from top to bottom with the new slider value',
          'The server reboots the operating system',
          'The browser downloads a new HTML file from GitHub'
        ],
        correctIndex: 1,
        explanation: 'Streamlit\'s fundamental architecture is top-to-bottom re-run: each user interaction causes the entire script to execute again from line 1.'
      },
      endOfTopicQuestions: {
        easy: 'What command launches a Streamlit script named "main.py" in your web browser?',
        medium: 'Explain the difference between @st.cache_data and @st.cache_resource in Streamlit.',
        hard: 'How does st.session_state maintain state isolation between multiple distinct concurrent users connecting to the same Streamlit server?'
      }
    },
    {
      id: 'streamlit-widgets',
      sectionId: 'stage-11-streamlit',
      title: 'Streamlit Widgets, Forms, State, & Cloud Deployment',
      subtitle: 'Forms with batch submit buttons, session state dictionaries, callbacks, secrets, and deployment',
      readingTimeMinutes: 13,
      definition: 'Streamlit widgets are interactive user interface components (inputs, buttons, select boxes, file uploaders) that capture client input and bind it to Python variables. Forms batch widget updates to prevent premature re-runs, and session state maintains user continuity across re-runs.',
      inSimpleTerms: 'If you have an application where a user must fill out their first name, last name, phone number, and address, you don\'t want the page to reload four separate times as they type each word. A Streamlit "form" is like an envelope: the user fills out all fields at their own pace, and the script only re-runs once when they finally click the "Submit" button.',
      whyDoesItExist: 'Because Streamlit re-runs on every single keystroke or widget adjustment by default, typing text or configuring complex multi-parameter simulations would trigger dozens of premature recalculations. Forms batch these inputs cleanly.',
      howDoesItWork: '1. st.form and st.form_submit_button: Groups widgets inside a batch envelope. Changes to widgets inside a form do NOT trigger a re-run until the user clicks the explicit submit button.\n2. st.session_state: A dictionary-like object available throughout the session. Keys survive re-runs: if "cart" not in st.session_state: st.session_state["cart"] = [].\n3. Callbacks: Functions passed via on_change or on_click parameters that execute BEFORE the rest of the script re-runs.\n4. Secrets Management: Stored in .streamlit/secrets.toml. Accessed via st.secrets["API_KEY"] without exposing passwords in source code.\n5. Production Deployment: Deployable via Docker, Streamlit Community Cloud, AWS ECS, or Google Cloud Run.',
      syntaxDescription: 'with st.form("my_form"):\n    val = st.text_input("Name")\n    submitted = st.form_submit_button("Submit")',
      exampleCode: 'import streamlit as st\n\n# 1. Initialize persistent session state keys\nif "messages" not in st.session_state:\n    st.session_state.messages = []\nif "submission_count" not in st.session_state:\n    st.session_state.submission_count = 0\n\nst.subheader("📬 Feedback Processing Portal")\n\n# 2. Batch Form Input\nwith st.form("feedback_form", clear_on_submit=True):\n    user_name = st.text_input("Full Name")\n    feedback_type = st.selectbox("Feedback Category", ["Bug Report", "Feature Request", "General Praise"])\n    message_body = st.text_area("Your Message")\n    rating = st.slider("Overall Satisfaction", 1, 5, 5)\n    \n    # The submit button that triggers the atomic batch re-run:\n    submitted = st.form_submit_button("Submit Feedback")\n    \n    if submitted:\n        if not user_name.strip() or not message_body.strip():\n            st.error("Please fill in both your name and message.")\n        else:\n            # Mutate persistent session state:\n            st.session_state.messages.append({\n                "name": user_name,\n                "category": feedback_type,\n                "rating": rating,\n                "body": message_body\n            })\n            st.session_state.submission_count += 1\n            st.success("Feedback submitted successfully!")\n\n# 3. Displaying persistent state across re-runs\nst.divider()\nst.write(f"Total Feedback Items Recorded in this session: **{st.session_state.submission_count}**")\n\nfor item in reversed(st.session_state.messages):\n    with st.chat_message(item["name"]):\n        st.write(f"**[{item[\'category\']}]** - Rating: {\'⭐\' * item[\'rating\']}")\n        st.write(item["body"])',
      codeExplanation: [
        'Lines 4-7 check if session state variables exist; if not, they are initialized once.',
        'Line 12 opens an "st.form" container. Everything inside is batched until submission.',
        'Line 19 defines the "st.form_submit_button": clicking this button triggers the single re-run.',
        'Lines 26-33 append the new record to st.session_state.messages.',
        'Lines 37-43 loop through st.session_state.messages in reverse order, rendering each previously submitted item.'
      ],
      expectedOutput: 'Interactive form that collects feedback cleanly, updates counter, and renders previous entries without losing history on re-runs.',
      commonMistakes: [
        {
          mistake: 'Putting an interactive widget with an on_change callback inside an st.form container.',
          consequence: 'Streamlit raises a StreamlitAPIException: widgets inside forms cannot have custom callbacks because forms batch events.',
          correction: 'Keep widgets with individual callbacks outside of forms, or handle state transitions inside the if submitted: block.'
        },
        {
          mistake: 'Committing .streamlit/secrets.toml to public GitHub repositories.',
          consequence: 'Leaking production API keys and database passwords to the public internet.',
          correction: 'Add .streamlit/secrets.toml to .gitignore and configure environment variables in your deployment cloud provider.'
        }
      ],
      importantPoints: [
        'Use st.form to batch inputs and prevent premature script re-runs.',
        'Session state persists across re-runs for the same user, but is isolated between different browser tabs/users.',
        'Store sensitive database passwords in secrets.toml, never in hardcoded source code.',
        'Streamlit apps containerize cleanly with Docker using python:3.12-slim.'
      ],
      relatedConcepts: [
        { name: 'Python Backend Overview', targetId: 'backend-overview', note: 'When to transition from Streamlit to full REST backends.' }
      ],
      knowledgeCheck: {
        question: 'What is the primary benefit of wrapping input widgets inside an st.form container in Streamlit?',
        options: [
          'It changes the background color to blue',
          'It batches user inputs together so the script does not re-run until the user clicks the submit button',
          'It automatically encrypts the Python source code',
          'It converts the website into a native iOS app'
        ],
        correctIndex: 1,
        explanation: 'st.form groups widgets into an atomic batch, preventing the script from re-running on every keystroke until the explicit form submit button is clicked.'
      },
      endOfTopicQuestions: {
        easy: 'What Streamlit object acts as a persistent dictionary surviving script re-runs?',
        medium: 'Explain how st.secrets allows secure credential management without exposing API keys in Git.',
        hard: 'Describe the complete Dockerfile architecture for containerizing and deploying a production Streamlit application with health checks.'
      }
    }
  ]
};
