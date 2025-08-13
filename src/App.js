import { useState, useRef, useEffect } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm here to help you with any topic! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          padding: "12px 16px",
          borderRadius: "18px",
          maxWidth: "80%",
          fontSize: "14px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#64748b",
              borderRadius: "50%",
              animation: "typing 1.4s infinite ease-in-out",
              animationDelay: "0s",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#64748b",
              borderRadius: "50%",
              animation: "typing 1.4s infinite ease-in-out",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#64748b",
              borderRadius: "50%",
              animation: "typing 1.4s infinite ease-in-out",
              animationDelay: "0.4s",
            }}
          ></div>
        </div>
        <span>AI is typing...</span>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .message-enter {
          animation: slideUp 0.3s ease-out;
        }
        
        .chat-window::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-window::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "16px",
          width: "380px",
          height: "500px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(10px)",
          pointerEvents: isOpen ? "auto" : "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.62xhYrRo3ea-St_vraobugHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Gateway Logo"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontWeight: "600",
                  fontSize: "18px",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Gateway AI
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  opacity: 0.9,
                  fontWeight: "400",
                }}
              >
                Online • Ready to help
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 200ms ease",
              backdropFilter: "blur(10px)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            background: "linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="message-enter"
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius:
                      message.sender === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    wordWrap: "break-word",
                    backgroundColor:
                      message.sender === "user"
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "#ffffff",
                    color: message.sender === "user" ? "#ffffff" : "#334155",
                    boxShadow:
                      message.sender === "user"
                        ? "0 4px 12px rgba(102, 126, 234, 0.4)"
                        : "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border:
                      message.sender === "bot" ? "1px solid #e2e8f0" : "none",
                    background:
                      message.sender === "user"
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "#ffffff",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-end",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "14px",
                backgroundColor: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                outline: "none",
                transition: "all 200ms ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                padding: "12px 20px",
                background:
                  inputValue.trim() && !isTyping
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "#e2e8f0",
                color: inputValue.trim() && !isTyping ? "#ffffff" : "#94a3b8",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "12px",
                border: "none",
                cursor:
                  inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                transition: "all 200ms ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                minWidth: "70px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isTyping ? (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #94a3b8",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              ) : (
                <>
                  Send
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          borderRadius: "50%",
          boxShadow:
            "0 8px 25px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: isOpen ? "none" : "pulse 2s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 12px 35px rgba(102, 126, 234, 0.5), 0 6px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)";
        }}
      >
        {/* {!isOpen && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "12px",
              height: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              border: "2px solid #ffffff",
              animation: "pulse 2s infinite",
            }}
          ></div>
        )} */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 200ms ease",
          }}
        >
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 9h8M8 13h6" />
            </svg>
          )}
        </div>
      </button>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
