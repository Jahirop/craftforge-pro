import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, User, Minimize2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Official WhatsApp Logo SVG (extracted from official asset with text removed)
const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 346 346"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M173,0C77.45,0,0,77.45,0,173c0,31.43,8.38,60.91,23.04,86.31L0,346l89.87-21.25c24.67,13.54,53,21.25,83.13,21.25,95.55,0,173-77.45,173-173S268.55,0,173,0ZM173,315.01c-28.91,0-55.81-8.64-78.24-23.48l-53.1,13.52,14.89-50.75c-16.11-23.03-25.56-51.06-25.56-81.3,0-78.43,63.58-142.01,142.01-142.01s142.01,63.58,142.01,142.01-63.58,142.01-142.01,142.01Z" />
    <path d="M213.54,195.84l41.86,19.73c1.92.91,3.15,2.85,2.98,4.97-.45,5.51-2.66,16.55-12.56,26.44-27.93,27.93-78.09-3.67-80.13-4.89-12.34-6.63-24.06-15.49-35.17-26.61-11.11-11.11-19.98-22.84-26.61-35.17-1.22-2.04-32.82-52.19-4.89-80.13,9.9-9.9,20.93-12.1,26.44-12.56,2.12-.17,4.07,1.06,4.97,2.98l19.73,41.86c.93,1.98.52,4.33-1.02,5.88l-14.71,14.71c-3.18,3.18-4.12,8.13-1.92,12.06,5.37,9.63,12.59,18.9,20.95,27.43,8.53,8.36,17.8,15.58,27.43,20.95,3.93,2.19,8.88,1.26,12.06-1.92l14.71-14.71c1.55-1.55,3.9-1.96,5.88-1.02Z" />
  </svg>
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "I want to start a new project 🚀",
  "Tell me about pricing 💰",
  "Show me your portfolio 📁",
  "I have a custom requirement ⚙️",
];

export default function ChatAssistant() {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Welcome to Craftforge Pro Studio. 🎨 How can we help you accelerate your brand? Type your message below, and we'll instantly connect you with Jahir on WhatsApp to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Mock quick response then redirect
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connecting you on WhatsApp now... 🚀",
        },
      ]);
      setLoading(false);
      
      const whatsappUrl = `https://wa.me/919641547271?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    }, 850);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 8px 32px rgba(37, 211, 102, 0.4)",
          color: "#ffffff",
        }}
        aria-label="Chat with us on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WhatsAppIcon size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Unread badge when closed */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[72px] right-[18px] z-50 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md pointer-events-none"
        >
          1
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: isDark ? "rgba(13,13,26,0.97)" : "rgba(248,249,255,0.97)",
              border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(124,58,237,0.18)",
              backdropFilter: "blur(20px)",
              boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 text-white"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-white/10">
                  <img
                    src="/super-pro-profile.webp"
                    alt="Jahir Sekh"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm">Jahir Sekh</p>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  <p className="text-[11px] text-white/80">
                    Craftforge Pro · Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Messages */}
                  <div className="h-[280px] overflow-y-auto p-4 space-y-3 flex flex-col">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-2 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                            msg.role === "user"
                              ? "bg-brand-purple"
                              : "bg-emerald-500"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <User size={14} />
                          ) : (
                            <WhatsAppIcon size={14} />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                            msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                          }`}
                          style={msg.role === "user"
                            ? { background: "rgba(124,58,237,0.85)", color: "#ffffff" }
                            : { background: isDark ? "rgba(255,255,255,0.05)" : "rgba(241,245,249,0.90)", border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)", color: isDark ? "rgba(255,255,255,0.90)" : "#1E293B" }
                          }
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {loading && (
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                          <WhatsAppIcon size={14} />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center"
                        style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(241,245,249,0.90)", border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)" }}>
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-500 chat-dot"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer font-medium"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 flex gap-2" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.07)" }}>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                      placeholder="Type a message to WhatsApp..."
                      className="flex-1 rounded-xl px-3 py-2 text-sm focus:outline-none transition-colors"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(241,245,249,0.90)",
                        border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
                        color: isDark ? "#ffffff" : "#0F172A",
                      }}
                    />
                    <motion.button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0 cursor-pointer text-white"
                      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
                    >
                      <Send size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
