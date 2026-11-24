
import React, { useEffect, useRef, useState } from "react";

import {
  MessageCircle,
  CircleHelp,
  Info,
  Send,
  Moon,
  Sun,
  ExternalLink,
  Menu,
  X,
  Plus,
  Trash2,
  Code2 as Github,
  ArrowUpRight,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./index.css";
import "./portfolio.css";
import BackgroundParticles from "./BackgroundParticles";

const API_URL = `${
  (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000"
  ).replace(/\/+$/, "")
}/chat`;

const STORAGE_KEY = "campusmind-session-v3";
const SESSION_TIMEOUT = 10 * 60 * 1000;

const WELCOME_MESSAGE = {
  role: "bot",
  text: "Welcome to CampusMind.",
};

const SUGGESTED_QUESTIONS = [
  "How can I apply for admission?",
  "What courses are offered?",
  "Tell me about scholarships.",
  "What are the hostel facilities?",
];

const NAV_ITEMS = [
  { id: "chat", label: "Home", icon: MessageCircle },
  { id: "faq", label: "FAQs", icon: CircleHelp },
  { id: "about", label: "About", icon: Info },
];

function createChat(id) {
  return {
    id,
    title: "New Conversation",
    messages: [{ ...WELCOME_MESSAGE }],
  };
}

function createSession() {
  return {
    chats: [createChat(1)],
    activeChatId: 1,
    nextChatId: 2,
    lastActivity: Date.now(),
  };
}

function loadSession() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved);

      const valid =
        Array.isArray(data.chats) &&
        data.chats.length > 0 &&
        typeof data.lastActivity === "number" &&
        Date.now() - data.lastActivity < SESSION_TIMEOUT &&
        data.chats.every(
          (chat) =>
            typeof chat.id === "number" &&
            Array.isArray(chat.messages) &&
            chat.messages.length > 0
        );

      if (valid) {
        return {
          ...data,
          activeChatId: data.chats.some(
            (chat) => chat.id === data.activeChatId
          )
            ? data.activeChatId
            : data.chats[0].id,

          nextChatId: Math.max(
            Number(data.nextChatId) || 1,
            ...data.chats.map((chat) => chat.id + 1)
          ),
        };
      }

      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to load session:", error);
  }

  return createSession();
}

function MarkdownMessage({ text }) {
  return (
    <div className="cm-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
              <ExternalLink size={12} />
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(loadSession);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("chat");

  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("campusmind-theme") !== "light";
    } catch {
      return true;
    }
  });

  const bottomRef = useRef(null);
  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const { chats, activeChatId } = session;

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) ||
    chats[0];

  const isEmpty = activeChat.messages.length === 1;

  useEffect(() => {
    try {
      localStorage.setItem(
        "campusmind-theme",
        dark ? "dark" : "light"
      );
    } catch (error) {
      console.error(error);
    }
  }, [dark]);


  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(session)
      );
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  }, [session]);

  function cancelPendingRequest() {
    requestIdRef.current += 1;
    controllerRef.current?.abort();
    controllerRef.current = null;
    setLoading(false);
  }

  function resetExpiredSession() {
    if (
      Date.now() - session.lastActivity <
      SESSION_TIMEOUT
    ) {
      return;
    }

    cancelPendingRequest();
    setSession(createSession());
    setInput("");
    setPage("chat");
  }

  useEffect(() => {
    const interval = setInterval(
      resetExpiredSession,
      15000
    );

    window.addEventListener(
      "focus",
      resetExpiredSession
    );

    document.addEventListener(
      "visibilitychange",
      resetExpiredSession
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "focus",
        resetExpiredSession
      );

      document.removeEventListener(
        "visibilitychange",
        resetExpiredSession
      );
    };
  }, [session.lastActivity]);


  useEffect(() => {
    if (page === "chat" && !isEmpty) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [
    activeChat.messages,
    activeChatId,
    loading,
    page,
    isEmpty,
  ]);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  function updateSession(updater) {
    setSession((previous) => ({
      ...updater(previous),
      lastActivity: Date.now(),
    }));
  }

  function updateChat(chatId, updater) {
    updateSession((previous) => ({
      ...previous,
      chats: previous.chats.map((chat) =>
        chat.id === chatId ? updater(chat) : chat
      ),
    }));
  }

  function newChat() {
    cancelPendingRequest();

    updateSession((previous) => {
      const id = previous.nextChatId;

      return {
        ...previous,
        chats: [...previous.chats, createChat(id)],
        activeChatId: id,
        nextChatId: id + 1,
      };
    });

    setInput("");
    setPage("chat");
    setSidebar(false);
  }

  function clearChat() {
    cancelPendingRequest();

    updateChat(activeChatId, (chat) => ({
      ...chat,
      title: "New Conversation",
      messages: [{ ...WELCOME_MESSAGE }],
    }));

    setInput("");
    setPage("chat");
    setSidebar(false);
  }

  function switchChat(id) {
    if (id !== activeChatId) {
      cancelPendingRequest();
    }

    updateSession((previous) => ({
      ...previous,
      activeChatId: id,
    }));

    setInput("");
    setPage("chat");
    setSidebar(false);
  }

  function deleteChat(id) {
    cancelPendingRequest();

    updateSession((previous) => {
      const remaining = previous.chats.filter(
        (chat) => chat.id !== id
      );

      if (remaining.length === 0) {
        const newId = previous.nextChatId;

        return {
          ...previous,
          chats: [createChat(newId)],
          activeChatId: newId,
          nextChatId: newId + 1,
        };
      }

      return {
        ...previous,
        chats: remaining,
        activeChatId:
          previous.activeChatId === id
            ? remaining[remaining.length - 1].id
            : previous.activeChatId,
      };
    });

    setInput("");
  }

  function navigate(id) {
    setPage(id);
    setSidebar(false);
  }


  async function sendMessage(value = input) {
    const question = value.trim();

    if (!question || loading || !activeChat) {
      return;
    }

    const chatId = activeChat.id;

    setInput("");
    setPage("chat");
    setSidebar(false);

    updateChat(chatId, (chat) => ({
      ...chat,

      title:
        chat.messages.length === 1
          ? question.slice(0, 38)
          : chat.title,

      messages: [
        ...chat.messages,
        {
          role: "user",
          text: question,
        },
      ],
    }));

    setLoading(true);

    const currentRequestId = ++requestIdRef.current;

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: question,
        }),

        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      if (
        currentRequestId !== requestIdRef.current
      ) {
        return;
      }

      updateChat(chatId, (chat) => ({
        ...chat,
        messages: [
          ...chat.messages,
          {
            role: "bot",
            text:
              typeof data.response === "string"
                ? data.response
                : "Sorry, I couldn't generate an answer.",
          },
        ],
      }));
    } catch (error) {
      if (
        controller.signal.aborted ||
        currentRequestId !== requestIdRef.current
      ) {
        return;
      }

      console.error("Chat request failed:", error);

      updateChat(chatId, (chat) => ({
        ...chat,
        messages: [
          ...chat.messages,
          {
            role: "bot",
            text: "Unable to connect to the server. Please try again in a moment.",
          },
        ],
      }));
    } finally {
      if (
        currentRequestId === requestIdRef.current
      ) {
        setLoading(false);
        controllerRef.current = null;
      }
    }
  }

  return (
    <div
      className={`campus-app cm-app ${
        dark ? "theme-dark" : "theme-light"
      }`}
    >
      {/* Mobile overlay */}

      {sidebar && (
        <button
          className="cm-overlay"
          onClick={() => setSidebar(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`cm-sidebar ${
          sidebar ? "cm-sidebar-open" : ""
        }`}
      >
        <div className="cm-sidebar-brand">
          <div>
            <h2>
              Campus<span>Mind.</span>
            </h2>

            <p>College Enquiry System</p>
          </div>

          <button
            className="cm-mobile-close"
            onClick={() => setSidebar(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <button
          className="cm-new-chat"
          onClick={newChat}
        >
          <Plus size={19} />
          New Chat
        </button>

        <nav className="cm-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  page === item.id ? "active" : ""
                }
                onClick={() => navigate(item.id)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="cm-history">
          <p className="cm-history-label">
            Recent conversations
          </p>

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`cm-history-row ${
                chat.id === activeChatId
                  ? "selected"
                  : ""
              }`}
            >
              <button
                className="cm-history-item"
                onClick={() => switchChat(chat.id)}
                title={chat.title}
              >
                <MessageCircle size={16} />
                <span>{chat.title}</span>
              </button>

              <button
                className="cm-delete"
                onClick={() => deleteChat(chat.id)}
                aria-label={`Delete ${chat.title}`}
                title="Delete conversation"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="cm-sidebar-bottom">
          <button
            className="cm-clear"
            onClick={clearChat}
          >
            <Trash2 size={17} />
            Clear current chat
          </button>

          <div className="cm-project-credit">
            <p>Python Minor Project</p>

            <a
              href="https://github.com/DARK7177/CampusMind"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} />
              Source code
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </aside>

      {/* Main section */}

      <main className="campus-main cm-main">
        <BackgroundParticles />

        {/* Navbar */}

        <header className="cm-navbar">
          <button
            className="cm-mobile-menu"
            onClick={() => setSidebar(true)}
            aria-label="Open sidebar"
          >
            <Menu size={23} />
          </button>

          <button
            className="cm-navbar-brand"
            onClick={() => navigate("chat")}
          >
            Campus<span>Mind.</span>
          </button>

          <nav className="cm-top-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={
                  page === item.id ? "active" : ""
                }
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            className="cm-github"
            href="https://github.com/DARK7177/CampusMind"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <Github size={21} />
          </a>
        </header>

        {page === "chat" ? (
          <>
            {/* Chat content */}

            <div
              className={`cm-conversation ${
                isEmpty ? "cm-empty" : ""
              }`}
            >
              {/* Portfolio-style welcome screen */}

              {isEmpty ? (
                <div className="cm-hero">
                  <div className="cm-hero-content">
                    <p className="cm-eyebrow">
                      College Enquiry System
                    </p>

                    <h1>
                      Welcome to
                      <br />
                      <span>CampusMind.</span>
                    </h1>

                    <p className="cm-hero-description">
                      A simple way to find information
                      about admissions, courses,
                      scholarships, examinations and
                      campus facilities.
                    </p>

                    <div className="cm-hero-actions">
                      <button
                        className="cm-primary"
                        onClick={() =>
                          sendMessage(
                            "How can I apply for admission?"
                          )
                        }
                        disabled={loading}
                      >
                        Admissions
                        <ArrowUpRight size={15} />
                      </button>

                      <button
                        className="cm-secondary"
                        onClick={() => navigate("faq")}
                      >
                        Explore FAQs
                      </button>
                    </div>

                    <p className="cm-reference">
                      Demo data: Government College
                      Dharamshala
                    </p>
                  </div>
                </div>
              ) : (
                <div className="cm-message-list">
                  {activeChat.messages
                    .slice(1)
                    .map((message, index) => (
                      <div
                        key={`${activeChat.id}-${index}`}
                        className={`cm-message ${
                          message.role === "user"
                            ? "cm-user-message"
                            : "cm-bot-message"
                        }`}
                      >
                        <div className="cm-message-label">
                          {message.role === "user"
                            ? "You"
                            : "CampusMind"}
                        </div>

                        <div className="cm-bubble">
                          {message.role === "bot" ? (
                            <MarkdownMessage
                              text={message.text}
                            />
                          ) : (
                            message.text
                          )}
                        </div>
                      </div>
                    ))}

                  {loading && (
                    <div className="cm-message cm-bot-message">
                      <div className="cm-message-label">
                        CampusMind
                      </div>

                      <div
                        className="cm-typing"
                        role="status"
                        aria-label="Preparing response"
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Message input */}

            <div className="cm-composer-wrap">
              <form
                className="cm-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Ask a question about college..."
                  aria-label="Message CampusMind"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={19} />
                </button>
              </form>

              <p className="cm-composer-note">
                Verify important information from
                official college notices.
              </p>
            </div>
          </>
        ) : page === "faq" ? (
          /* FAQ Page */

          <div className="cm-info-page">
            <div className="cm-info-content">
              <p className="cm-eyebrow">
                Need some help?
              </p>

              <h1>
                Frequently Asked
                <br />
                <span>Questions.</span>
              </h1>

              <p className="cm-info-description">
                Select a question to start a conversation.
              </p>

              <div className="cm-faq-list">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                  >
                    <span>{question}</span>
                    <ArrowUpRight size={19} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* About Page */

          <div className="cm-info-page">
            <div className="cm-info-content">
              <p className="cm-eyebrow">
                About the project
              </p>

              <h1>
                Meet <span>CampusMind.</span>
              </h1>

              <p className="cm-info-description">
                CampusMind is an independent Python-based
                academic project designed to simplify
                common college enquiries.
              </p>

              <p className="cm-info-description">
                It uses a structured knowledge base,
                TF-IDF, cosine similarity and Gemini API
                integration to answer questions through
                a simple chat interface.
              </p>

              <p className="cm-info-description">
                Government College Dharamshala is used
                as a demonstration example. CampusMind
                is not an official college service.
              </p>

              <div className="cm-tech-list">
                {[
                  "Python",
                  "FastAPI",
                  "React",
                  "TF-IDF",
                  "Gemini API",
                ].map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>

              <div className="cm-hero-actions">
                <a
                  className="cm-primary"
                  href="https://github.com/DARK7177/CampusMind"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} />
                  View Source
                </a>

                <a
                  className="cm-secondary"
                  href="https://gcdharamshala.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  College Website
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        <button
          className="cm-theme-toggle"
          onClick={() => setDark((previous) => !previous)}
          aria-label={
            dark
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </main>
    </div>
  );
}
