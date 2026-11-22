
# 🎓 CampusMind — AI-Powered College Enquiry Chatbot

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

CampusMind is an AI-powered college enquiry chatbot developed as an academic project for **Some University (Example here is govt college dharamshala)**.

It helps students find information about admissions, courses, scholarships, examinations, fees, and campus facilities through an interactive conversational interface.

The chatbot combines **Retrieval-Augmented Generation (RAG)**, **TF-IDF-based information retrieval**, and **Google Gemini AI** to generate responses using a college-specific knowledge base.

---

## ✨ Features

- 🤖 AI-powered responses using Google Gemini
- 📚 Retrieval-Augmented Generation (RAG)
- 🔎 TF-IDF and cosine similarity for information retrieval
- 🏫 College-specific JSON knowledge base
- 💬 Multiple independent chat conversations
- 💾 Temporary chat history using sessionStorage
- ⏳ Automatic session expiration after 10 minutes of inactivity
- ➕ Create new conversations
- 🗑️ Clear and delete individual conversations
- 📱 Responsive desktop, tablet, and mobile interface
- 🌙 Light and dark mode
- 📝 Markdown-formatted AI responses
- ❓ Suggested questions and FAQ section
- 🔗 Clickable links in chatbot responses

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React.js, JavaScript, Vite |
| Styling | Tailwind CSS v4, CSS |
| Icons | Lucide React |
| Markdown | React Markdown, Remark GFM |
| Backend | Python, FastAPI, Uvicorn |
| AI Model | Google Gemini |
| AI Integration | Google Gen AI SDK |
| Retrieval | Scikit-learn, TF-IDF |
| Similarity | Cosine Similarity |
| Knowledge Base | JSON |
| Session Management | Browser sessionStorage |

---

## 🏗️ System Architecture

```text
                  ┌───────────────────────┐
                  │     Student / User    │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │    React Frontend     │
                  │  Chat Interface / UI  │
                  └───────────┬───────────┘
                              │
                       HTTP POST /chat
                              │
                              ▼
                  ┌───────────────────────┐
                  │    FastAPI Backend    │
                  │     Python Server     │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   TF-IDF Retrieval    │
                  │   Cosine Similarity   │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │    knowledge.json     │
                  │ College Information   │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  Retrieved Context +  │
                  │     User Question     │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   Google Gemini API   │
                  │    AI Generation      │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │    Generated Answer   │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  React Chat Interface │
                  └───────────────────────┘
```

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

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Python 3.10 or later
- Node.js and npm
- Git
- Google Gemini API key

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

**Windows:**

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

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite, usually:

```text
http://localhost:5173
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

The system identifies the most relevant college information.

### Step 5: Context Retrieval

Relevant information is retrieved from `knowledge.json`.

This information is used as context for the language model.

### Step 6: Gemini AI Generation

The backend sends the user's question and retrieved context to the Google Gemini API.

Gemini generates a conversational response based on the provided information.

### Step 7: Response Display

The backend returns the generated response to the frontend.

React displays the response using Markdown formatting.

---

## 💬 Chat Session Management

CampusMind supports multiple temporary conversations.

### New Chat

Creates a new conversation while preserving previous conversations in the current browser session.

### Switch Chat

Allows users to reopen previous conversations from the sidebar.

### Clear Chat

Removes messages from the currently selected conversation.

### Delete Chat

Deletes a selected conversation from the current session.

### Temporary Storage

Conversations are stored using the browser's `sessionStorage` API.

### Session Expiration

The application uses a 10-minute inactivity timeout to reset the stored conversations.

Chat history is not stored in a server-side database.

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

---

## 🎨 User Interface

The frontend includes:

- Responsive sidebar navigation
- College branding
- Chat interface
- Conversation history
- New Chat button
- Clear Chat button
- Light and dark themes
- Suggested questions
- FAQ section
- About section
- Loading indicator
- Markdown response rendering

The sidebar adapts to different viewport sizes and provides a scrollable conversation list.

---

## 🌍 Deployment

CampusMind can be deployed using free-tier hosting services.

### Frontend

Cloudflare Pages can host the React/Vite frontend.

Recommended build configuration:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

### Backend

Render can host the Python FastAPI backend.

Recommended configuration:

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables

Configure the Gemini API key securely in the backend hosting platform.

The frontend must use the deployed backend URL, and the backend CORS configuration must allow the deployed frontend origin.

Free-tier hosting may have resource limits, idle shutdowns, and API quota restrictions.

---

## 🔐 Security Considerations

- Gemini API credentials are stored in backend environment variables.
- `.env` files are excluded from version control.
- Gemini API calls are made from the backend.
- The frontend does not expose the Gemini API key.
- CORS restricts browser access to configured frontend origins.
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

---

## 📚 Key Concepts

### Retrieval-Augmented Generation

A technique that combines external information retrieval with language model generation.

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

---

## 📄 Disclaimer

CampusMind is an independent academic project developed for educational purposes.

It is not an official service of Government College Dharamshala.

Users should verify important information about admissions, fees, scholarships, examinations, and other academic matters through official college announcements.

---

## 👨‍💻 Developer

**GitHub:** [DARK7177](https://github.com/DARK7177)

**Repository:** [CampusMind](https://github.com/DARK7177/CampusMind)

---

**Built with React, FastAPI, Retrieval-Augmented Generation, and Google Gemini AI.**
