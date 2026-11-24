
# 🎓 CampusMind — AI-Powered College Enquiry Chatbot

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Frontend-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

CampusMind is an AI-powered college enquiry chatbot developed as an independent academic project to simplify access to college-related information.

It helps students find information about admissions, courses, scholarships, examinations, fees, and campus facilities through a modern conversational interface.

The chatbot combines **Retrieval-Augmented Generation (RAG)**, **TF-IDF-based information retrieval**, **cosine similarity**, and **Google Gemini AI** to provide context-aware responses using a structured knowledge base.

CampusMind is designed as a generic college enquiry system. Government College Dharamshala is used as a demonstration example, and the knowledge base can be customized for other educational institutions.

---

## 🌐 Live Demo

| Resource | Link |
|----------|------|
| Live Application | [campusmind.bhupesh.website](https://campusmind.bhupesh.website) |
| GitHub Repository | [DARK7177/CampusMind](https://github.com/DARK7177/CampusMind) |
| Backend API | [Render API](https://campusmind-api-q782.onrender.com) |
| Developer Portfolio | [Portfolio](https://bhupesh-portfolio7.netlify.app/) |

> The backend is hosted on Render. Initial responses may take longer if the free-tier server is inactive.

---

## ✨ Features

### Artificial Intelligence

- AI-powered responses using Google Gemini
- Retrieval-Augmented Generation (RAG)
- TF-IDF-based information retrieval
- Cosine similarity for relevant information matching
- Structured JSON knowledge base
- Context-aware college enquiry responses

### Chat Functionality

- Multiple independent chat conversations
- Temporary chat history using sessionStorage
- Automatic session expiration after 10 minutes of inactivity
- Create new conversations
- Switch between existing conversations
- Clear individual conversations
- Delete individual conversations
- Automatic scrolling to the latest message
- Loading and typing indicators
- Markdown-formatted AI responses
- Clickable links in chatbot responses
- Cancellation of pending requests when changing conversations

### User Interface

- Modern portfolio-inspired interface
- Minimal black, white, and green colour scheme
- Animated particle network background
- Canvas-based animations without external animation libraries
- Light and dark themes
- Persistent theme preference using localStorage
- Responsive desktop, tablet, and mobile layout
- Redesigned welcome screen
- Collapsible mobile sidebar
- Interactive FAQ section
- Dedicated About page
- GitHub repository integration
- Keyboard focus indicators
- Reduced-motion preference support

---

## 🆕 Latest UI Update

The CampusMind frontend has been redesigned to provide a cleaner and more consistent user experience.

The updated interface is inspired by the developer's personal portfolio website and focuses on simplicity, accessibility, and responsiveness.

### Major Improvements

- Replaced the previous college-specific visual theme with generic CampusMind branding.
- Introduced a minimal black and green dark theme.
- Added an animated particle background using the HTML5 Canvas API.
- Redesigned the welcome screen with prominent typography.
- Introduced modern rounded action buttons.
- Improved sidebar navigation and conversation history.
- Redesigned chat messages and the message input area.
- Added a floating theme switch on desktop.
- Implemented persistent theme preferences.
- Improved mobile navigation and responsive layouts.
- Redesigned the FAQ and About pages.
- Separated interface styling into a dedicated portfolio.css file.

The frontend redesign does not change the existing Python backend, retrieval algorithms, knowledge base, or Gemini API integration.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React.js, JavaScript, Vite |
| Styling | CSS3, CSS Variables, Tailwind CSS v4 |
| Animation | HTML5 Canvas API, requestAnimationFrame |
| Icons | Lucide React |
| Markdown | React Markdown, Remark GFM |
| Backend | Python, FastAPI, Uvicorn |
| AI Model | Google Gemini |
| AI Integration | Google Gen AI SDK |
| Retrieval | Scikit-learn, TF-IDF |
| Similarity | Cosine Similarity |
| Knowledge Base | JSON |
| Chat Storage | Browser sessionStorage |
| Theme Storage | Browser localStorage |
| Frontend Hosting | Cloudflare Pages |
| Backend Hosting | Render |
| Version Control | Git and GitHub |

---

## 🏗️ System Architecture

```text
                  ┌────────────────────────┐
                  │     Student / User     │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │     React Frontend     │
                  │ Portfolio-Inspired UI  │
                  │ Chat / FAQ / About     │
                  └────────────┬───────────┘
                               │
                        HTTP POST /chat
                               │
                               ▼
                  ┌────────────────────────┐
                  │    FastAPI Backend     │
                  │     Python Server      │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │   TF-IDF Retrieval     │
                  │   Cosine Similarity    │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │     knowledge.json     │
                  │   College Information  │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │  Retrieved Context +   │
                  │     User Question      │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │   Google Gemini API    │
                  │     AI Generation      │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │   Generated Response   │
                  └────────────┬───────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │  React Chat Interface  │
                  │   Markdown Rendering   │
                  └────────────────────────┘
```

The architecture represents the retrieval-augmented response generation workflow. The backend may also return knowledge-base responses directly, depending on its matching logic.

---

## 📁 Project Structure

```text
CampusMind/
│
├── backend/
│   ├── main.py
│   ├── chatbot.py
│   ├── knowledge.json
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── BackgroundParticles.jsx
│   │   ├── portfolio.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

### Important Files

| File | Description |
|------|-------------|
| main.py | FastAPI application and API endpoints |
| chatbot.py | Chatbot processing and retrieval logic |
| knowledge.json | Structured college information |
| requirements.txt | Python dependencies |
| App.jsx | Main React application and chat functionality |
| BackgroundParticles.jsx | Animated canvas-based particle network |
| portfolio.css | Main UI styling and responsive layouts |
| index.css | Global styles, typography, and CSS reset |
| main.jsx | React application entry point |
| vite.config.js | Vite development and build configuration |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Python 3.10 or later
- Node.js and npm
- Git
- Google Gemini API key

Use a Node.js version supported by the project's installed Vite version.

### 1. Clone the Repository

```bash
git clone https://github.com/DARK7177/CampusMind.git
cd CampusMind
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment.

**macOS / Linux:**

```bash
source .venv/bin/activate
```

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
```

Replace the placeholder values with your actual Gemini API key and supported model name.

Start the backend server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal from the project root and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend directory if you need to configure a custom backend URL:

```env
VITE_API_URL=http://127.0.0.1:8000
```

The frontend automatically appends `/chat` to the configured backend URL.

If the environment variable is not provided, the application defaults to the local backend URL.

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite, usually:

```text
http://localhost:5173
```

### 4. Production Build

Generate an optimized production build:

```bash
npm run build
```

The production files will be generated inside:

```text
frontend/dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔍 How RAG Works

RAG stands for **Retrieval-Augmented Generation**.

It combines information retrieval with generative artificial intelligence to produce context-aware responses.

### Step 1: User Question

A student enters a question through the React chatbot interface.

Example:

```text
How can I apply for BCA admission?
```

### Step 2: Backend Processing

The React frontend sends the question to the FastAPI backend using an HTTP POST request.

Example request:

```json
{
  "message": "How can I apply for BCA admission?"
}
```

### Step 3: TF-IDF Vectorization

The backend converts the question and knowledge base entries into numerical vectors using TF-IDF.

TF-IDF stands for Term Frequency–Inverse Document Frequency.

It assigns importance weights to words based on their frequency within documents and across the knowledge base.

### Step 4: Similarity Calculation

Cosine similarity compares the question vector with the knowledge base vectors.

The system identifies the most relevant college information based on similarity scores.

### Step 5: Context Retrieval

Relevant information is retrieved from `knowledge.json`.

This information can be used as context for the language model.

### Step 6: Gemini AI Generation

When AI generation is required, the backend sends the user's question and relevant context to the Google Gemini API.

Gemini generates a conversational response based on the provided information.

### Step 7: Response Display

The backend returns the response to the frontend.

React displays the response using Markdown formatting, including headings, lists, bold text, tables, and clickable links.

---

## 📚 Knowledge Base

CampusMind uses a structured JSON knowledge base to store college-related information.

The knowledge base covers topics such as:

- College admissions
- Eligibility criteria
- Undergraduate and postgraduate courses
- Fee structure
- Scholarships
- Examination procedures
- Results
- Library facilities
- Hostel facilities
- Campus services
- Official website information

Government College Dharamshala is currently used as a demonstration institution.

The knowledge base can be modified to support other colleges and universities without redesigning the entire application.

---

## 💬 Chat Session Management

CampusMind supports multiple temporary conversations within the current browser session.

### New Chat

Creates a new conversation while preserving previous conversations in the current browser session.

### Switch Chat

Allows users to reopen previous conversations from the sidebar.

### Clear Chat

Removes messages from the currently selected conversation and restores the welcome screen.

### Delete Chat

Deletes a selected conversation from the current session.

### Temporary Storage

Conversations are stored using the browser's `sessionStorage` API.

Chat history is not stored in a server-side database.

### Session Expiration

The application uses a 10-minute inactivity timeout to reset stored conversations.

Session expiration is checked periodically and when the browser window regains focus.

### Request Cancellation

The application uses AbortController to cancel pending API requests during relevant conversation changes.

This helps prevent outdated responses from being added to the wrong conversation.

### Automatic Scrolling

The chat interface automatically scrolls to the latest message when a new response is received.

---

## 🎨 User Interface

CampusMind features a modern interface inspired by a minimal developer portfolio design.

The interface uses a combination of neutral colours, green accents, clean typography, and subtle animations.

### Dark Mode

The dark theme is enabled by default and includes:

- Pure black background
- Dark sidebar and navigation bar
- Green accent colour
- White primary action buttons
- Subtle borders
- Animated white particles
- High-contrast typography

### Light Mode

The light theme includes:

- White background
- Light grey panels
- Dark typography
- Green accent colour
- Subtle dark particles

### Theme Persistence

The selected theme is saved using the browser's `localStorage` API.

The theme preference is restored when the user reloads or reopens the application.

Theme preferences are stored separately from temporary chat conversations.

### Animated Particle Background

The particle background is implemented using the HTML5 Canvas API.

It uses:

- React useEffect and useRef hooks
- requestAnimationFrame
- ResizeObserver
- Device pixel ratio scaling
- Dynamic particle positioning
- Distance-based connecting lines
- Theme-aware particle colours
- Reduced-motion preference detection

The particle animation does not require an additional animation library.

### Welcome Screen

The redesigned welcome screen provides:

- CampusMind branding
- Project introduction
- Quick admission enquiry button
- FAQ navigation
- Demonstration institution information

### Chat Interface

The chat interface includes:

- Separate user and chatbot message styles
- Markdown response rendering
- Animated typing indicator
- Responsive message bubbles
- Accessible message input
- Automatic scrolling
- Conversation history

### Navigation

The application includes three main sections:

| Section | Purpose |
|---------|---------|
| Home | Main chatbot interface |
| FAQs | Frequently asked college-related questions |
| About | Project information, technologies, and useful links |

### Responsive Design

The interface adapts to desktop, tablet, and mobile devices.

On smaller screens, the sidebar becomes collapsible and can be opened using the mobile navigation button.

---

## 🌐 API Endpoint

### POST `/chat`

Sends a question to the chatbot backend.

**Request:**

```json
{
  "message": "What courses are offered?"
}
```

**Example response:**

```json
{
  "response": "The college offers various undergraduate and postgraduate courses.",
  "intent": "courses",
  "confidence": 0.85
}
```

The response content, intent, and confidence values depend on the backend implementation.

The frontend uses the `response` field to display the chatbot's answer.

### Example API Request Using cURL

```bash
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What courses are offered?"}'
```

---

## 🌍 Deployment

CampusMind uses separate hosting services for its frontend and backend.

| Component | Hosting Platform |
|-----------|------------------|
| React Frontend | Cloudflare Pages |
| Python Backend | Render |
| Source Code | GitHub |

### Frontend Deployment — Cloudflare Pages

Recommended build configuration:

```text
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Build Output Directory: dist
Production Branch: main
```

Configure the following frontend environment variable:

```env
VITE_API_URL=https://campusmind-api-q782.onrender.com
```

The frontend is accessible through:

```text
https://campusmind.bhupesh.website
```

When GitHub integration is enabled, Cloudflare Pages automatically builds and deploys new commits pushed to the configured production branch.

### Backend Deployment — Render

Recommended configuration:

```text
Runtime: Python
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

Configure the following environment variables securely in Render:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
```

Backend URL:

```text
https://campusmind-api-q782.onrender.com
```

### Cross-Origin Resource Sharing

The FastAPI backend must allow requests from the configured frontend origins.

The production frontend origin is:

```text
https://campusmind.bhupesh.website
```

Local development may also require:

```text
http://localhost:5173
http://127.0.0.1:5173
```

### Deployment Notes

- Frontend-only changes do not require a manual backend redeployment.
- Changes to frontend environment variables require a new frontend build.
- Backend changes require a backend deployment.
- Free-tier hosting may have resource limits and idle shutdowns.
- Gemini API usage is subject to applicable quotas and limits.

---

## 🔐 Security and Privacy Considerations

- Gemini API credentials are stored in backend environment variables.
- Sensitive `.env` files should be excluded from version control.
- Gemini API calls are made from the backend.
- The frontend does not expose the Gemini API key.
- CORS controls browser access from configured frontend origins.
- Chat history is temporarily stored in the browser.
- Theme preferences are stored locally on the user's device.
- The application does not require student authentication.
- Questions may be processed by the backend and Gemini API when AI generation is required.
- Users should avoid entering sensitive personal information.
- AI-generated answers should be verified using official college sources.

---

## ⚠️ Limitations

- College information requires manual updates.
- TF-IDF retrieval primarily matches lexical similarity.
- Gemini API requires an internet connection.
- AI-generated responses may contain inaccuracies.
- Chat history is temporary and browser-based.
- The current backend does not automatically maintain multi-turn conversational memory.
- The application does not automatically synchronize with live college notices.
- Free-tier hosting may introduce delays during initial requests.
- The quality of retrieved information depends on the knowledge base.
- The current demonstration knowledge base is primarily focused on Government College Dharamshala.

---

## 🔮 Future Enhancements

- Semantic embeddings for improved retrieval
- Vector database integration
- Automatic PDF and document ingestion
- Multilingual chatbot support
- Student authentication
- Persistent conversation history
- Multi-turn conversational memory
- Admin dashboard
- Automatic college information updates
- Advanced analytics and feedback collection
- Support for multiple institutions
- Institution-specific knowledge base selection
- Source citations for retrieved information
- Improved accessibility and performance optimization

---

## 📚 Key Concepts

### Retrieval-Augmented Generation

A technique that combines external information retrieval with language model generation to produce context-aware responses.

### TF-IDF

A statistical technique used to represent the importance of words in text documents.

### Cosine Similarity

A mathematical measure used to determine similarity between numerical vectors.

### FastAPI

A modern Python framework for building web APIs.

### React

A JavaScript library for building interactive component-based user interfaces.

### Gemini

Google's family of generative AI models used to generate natural-language responses.

### HTML5 Canvas

A browser-based drawing interface used to render graphics and animations programmatically.

CampusMind uses Canvas to create its animated particle network background.

### sessionStorage

A browser storage mechanism used to temporarily store data within the current browsing session.

CampusMind uses sessionStorage for conversation history.

### localStorage

A browser storage mechanism used to retain data across browser sessions.

CampusMind uses localStorage to remember the user's selected theme.

---

## 📄 Disclaimer

CampusMind is an independent academic project developed for educational and demonstration purposes.

It is designed as a generic college enquiry system, with Government College Dharamshala serving as a reference institution.

CampusMind is not an official service of Government College Dharamshala or any other educational institution.

Users should verify important information about admissions, fees, scholarships, examinations, and other academic matters through official college announcements.

---

## 👨‍💻 Developer

**GitHub:** [DARK7177](https://github.com/DARK7177)

**Portfolio:** [Developer Portfolio](https://bhupesh-portfolio7.netlify.app/)

**Repository:** [CampusMind](https://github.com/DARK7177/CampusMind)

**Live Project:** [campusmind.bhupesh.website](https://campusmind.bhupesh.website)

---

<div align="center">

**Built with React, Python, FastAPI, Retrieval-Augmented Generation, and Google Gemini AI.**

*Making college information more accessible through conversational AI.*

⭐ If you find this project useful, consider starring the repository.

</div>
