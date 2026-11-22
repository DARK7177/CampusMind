
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  GraduationCap,
  MessageCircle,
  CircleHelp,
  Info,
  Send,
  Moon,
  Sun,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  BookOpen,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
}/chat`;
const STORAGE_KEY = "campusmind-session-v3";
const SESSION_TIMEOUT = 10 * 60 * 1000;

const WELCOME_MESSAGE = {
  role: "bot",
  text: `## Welcome to CampusMind! 👋

I'm your AI enquiry assistant for Government College Dharamshala.

You can ask me about:
- Admissions and eligibility
- Undergraduate and postgraduate courses
- Fees and scholarships
- Examinations and results
- Library, hostel and campus facilities

**How can I help you today?**`,
};

const SUGGESTED_QUESTIONS = [
  "How can I apply for admission?",
  "What courses are offered?",
  "Tell me about scholarships.",
  "What are the hostel facilities?",
];

const NAV_ITEMS = [
  {
    id: "chat",
    label: "Chat with CampusMind",
    icon: MessageCircle,
  },
  {
    id: "faq",
    label: "FAQs",
    icon: CircleHelp,
  },
  {
    id: "about",
    label: "About",
    icon: Info,
  },
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
            Array.isArray(chat.messages)
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
    <div className="markdown-body">
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
              <ExternalLink
                size={12}
                className="inline ml-1"
              />
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
  const [dark, setDark] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("chat");

  const bottomRef = useRef(null);
  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const { chats, activeChatId } = session;

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) ||
    chats[0];

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
    const interval = setInterval(() => {
      resetExpiredSession();
    }, 15000);

    return () => clearInterval(interval);
  }, [session.lastActivity]);

  useEffect(() => {
    const checkExpiry = () => {
      resetExpiredSession();
    };

    window.addEventListener("focus", checkExpiry);

    document.addEventListener(
      "visibilitychange",
      checkExpiry
    );

    return () => {
      window.removeEventListener(
        "focus",
        checkExpiry
      );

      document.removeEventListener(
        "visibilitychange",
        checkExpiry
      );
    };
  }, [session.lastActivity]);

  useEffect(() => {
    if (page === "chat") {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [
    activeChat?.messages,
    activeChatId,
    loading,
    page,
  ]);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
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
        chat.id === chatId
          ? updater(chat)
          : chat
      ),
    }));
  }

  function newChat() {
    cancelPendingRequest();

    updateSession((previous) => {
      const id = previous.nextChatId;

      return {
        ...previous,
        chats: [
          ...previous.chats,
          createChat(id),
        ],
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

    const currentRequestId =
      ++requestIdRef.current;

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
        currentRequestId !==
        requestIdRef.current
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
        currentRequestId !==
          requestIdRef.current
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
            text:
              "I'm having trouble connecting to the AI server. Please check the backend and try again.",
          },
        ],
      }));
    } finally {
      if (
        currentRequestId ===
        requestIdRef.current
      ) {
        setLoading(false);
        controllerRef.current = null;
      }
    }
  }


  return (
    <div
      className={`campus-app ${
        dark ? "theme-dark" : ""
      }`}
    >
      {sidebar && (
        <button
          className="mobile-overlay"
          onClick={() => setSidebar(false)}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`campus-sidebar ${
          sidebar ? "show" : ""
        }`}
      >
        <div className="college-brand">
          <div className="college-emblem">
            <GraduationCap size={31} />
          </div>

          <h2>
            Government College
            <br />
            Dharamshala
          </h2>

          <span className="brand-divider" />
        </div>

        <div className="session-chat-controls">
          <button
            className="new-chat-button"
            onClick={newChat}
          >
            <Plus size={19} />
            New Chat
          </button>

          <button
            className="clear-chat-button"
            onClick={clearChat}
          >
            <Trash2 size={17} />
            Clear Current Chat
          </button>
        </div>

        <nav className="side-navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`side-link ${
                  page === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setPage(item.id);
                  setSidebar(false);
                }}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="session-history">
          <p className="session-history-label">
            CURRENT SESSION
          </p>

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`session-chat-row ${
                chat.id === activeChatId
                  ? "selected"
                  : ""
              }`}
            >
              <button
                className="session-chat-item"
                onClick={() =>
                  switchChat(chat.id)
                }
                title={chat.title}
              >
                <MessageCircle size={16} />

                <span>{chat.title}</span>
              </button>

              <button
                className="delete-chat-button"
                onClick={() =>
                  deleteChat(chat.id)
                }
                title="Delete conversation"
                aria-label={`Delete ${chat.title}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="mountain-art">
            <div className="mountain-back" />
            <div className="mountain-front" />
          </div>

          <div className="powered-by">
            <div className="powered-icon">
              <Sparkles size={23} />
            </div>

            <div>
              <small>Powered by</small>
              <strong>CampusMind AI</strong>
            </div>
          </div>
        </div>
      </aside>

      <section className="campus-main">
        <header className="chat-topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebar(true)}
            aria-label="Open navigation"
          >
            <Menu size={23} />
          </button>

          <div className="topbar-logo">
            <div className="bot-logo">
              <Bot size={32} />
            </div>

            <div>
              <h1>
                Campus<span>Mind</span>
              </h1>

              <p>
                Your AI Enquiry Assistant for
                Government College Dharamshala
              </p>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="ai-status">
              <span className="status-dot" />
              AI Assistant
            </div>

            <button
              className="theme-toggle"
              onClick={() =>
                setDark((previous) => !previous)
              }
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          </div>
        </header>

        {page === "chat" ? (
          <>
            {/* Messages */}
            <div className="conversation-area">
              {activeChat.messages.map(
                (message, index) => (
                  <div
                    key={`${activeChat.id}-${index}`}
                    className={`message-row ${
                      message.role === "user"
                        ? "from-user"
                        : "from-bot"
                    }`}
                  >
                    {message.role === "bot" && (
                      <div className="message-avatar bot-avatar">
                        <Bot size={23} />
                      </div>
                    )}

                    <div className="message-content">
                      {message.role === "bot" && (
                        <div className="message-author">
                          CampusMind
                          <span>AI</span>
                        </div>
                      )}

                      <div
                        className={`message-bubble ${
                          message.role
                        }`}
                      >
                        {message.role === "bot" ? (
                          <MarkdownMessage
                            text={message.text}
                          />
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <div className="message-avatar user-avatar">
                        <GraduationCap size={19} />
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Suggested Questions */}
              {activeChat.messages.length === 1 && (
                <div className="suggested-area">
                  <p>
                    <Sparkles size={15} />
                    Suggested questions
                  </p>

                  <div className="suggestion-grid">
                    {SUGGESTED_QUESTIONS.map(
                      (question) => (
                        <button
                          key={question}
                          onClick={() =>
                            sendMessage(question)
                          }
                          disabled={loading}
                        >
                          {question}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {loading && (
                <div className="message-row from-bot">
                  <div className="message-avatar bot-avatar">
                    <Bot size={23} />
                  </div>

                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="chat-composer-wrap">
              <form
                className="chat-composer"
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
                  placeholder="Ask about courses, admissions, fees, exams..."
                  aria-label="Message CampusMind"
                />

                <button
                  type="submit"
                  disabled={
                    loading || !input.trim()
                  }
                  aria-label="Send message"
                >
                  <Send size={21} />
                </button>
              </form>

              <p className="composer-note">
                <ShieldCheck size={13} />
                AI-generated answers may require
                verification from official notices.
              </p>
            </div>
          </>
        ) : (
          <div className="information-page">
            {page === "faq" ? (
              <>
                <BookOpen size={34} />

                <h2>
                  Frequently Asked Questions
                </h2>

                <p>
                  Select a question to ask
                  CampusMind.
                </p>

                <div className="faq-grid">
                  {SUGGESTED_QUESTIONS.map(
                    (question) => (
                      <button
                        key={question}
                        onClick={() => {
                          setPage("chat");
                          sendMessage(question);
                        }}
                        disabled={loading}
                      >
                        {question}
                        <Send size={16} />
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                <Bot size={40} />

                <h2>About CampusMind</h2>

                <p>
                  CampusMind is an independent
                  academic chatbot project designed
                  to help students find information
                  about Government College Dharamshala
                  using retrieval-augmented generation
                  and Gemini AI.
                </p>

                <a
                  href="https://gcdharamshala.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official College Website
                  <ExternalLink size={16} />
                </a>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
