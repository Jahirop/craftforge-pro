import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const BUSINESS_CONTEXT = `
You are the AI assistant for Craftforge Pro Studio, an AI-powered creative agency.

ABOUT THE STUDIO:
- Name: Craftforge Pro Studio (also known as Craftforge)
- Owner/Founder: Jahiruddin Sekh — AI Creative Strategist, Prompt Engineer, Vibe Code Builder
- Email: hello.craftforge.studio@gmail.com
- WhatsApp: +91 9641547271
- Location: India
- Behance Portfolio: https://www.behance.net/Designer_Pro_Plus
- Instagram: https://www.instagram.com/craftforge.studio/
- LinkedIn: https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/

SERVICES WE OFFER:
1. AI Graphic Design — Brand visuals, product graphics, campaign creatives from single prompts
2. AI Video & Motion — Short form video, motion content, visual storytelling at scale
3. Vibe Code & AI Websites — Intelligent, conversion-focused websites built with AI-assisted development
4. Ecommerce Creative — High-converting product visuals for Amazon, Shopify, Flipkart
5. AI Automation — Autonomous pipelines using n8n, Make, and AI agents that eliminate repetitive work
6. Generative AI Systems — Prompt libraries, reusable AI pipelines, production systems built to scale

RESULTS & STATS:
- 9x faster creative production
- 1000+ AI-powered digital assets delivered
- 67% manual workload reduction
- 6+ major marketplaces scaled

PRICING (approximate ranges):
- Starter projects: ₹1,000 – ₹25,000
- Growth projects: ₹25,000 – ₹75,000
- Enterprise/custom: ₹75,000 – ₹2,00,000+
- Custom budget available for large projects

HOW TO GET STARTED:
1. Contact via WhatsApp at +91 9641547271
2. Email at hello.craftforge.studio@gmail.com
3. Fill the contact form on the website
4. Connect via LinkedIn or Instagram

PORTFOLIO HIGHLIGHTS:
- AI Brand Visual System for luxury fragrance brand
- AI Motion Content Pipeline for social media
- Complete E-commerce Listing Pack for Amazon & Flipkart
- AI Content Automation Pipeline with n8n
- AI Prompt Engineering System
- AI Print-on-Demand Design System (300+ SKUs)

Be helpful, concise, friendly, and professional. Answer questions about services, pricing, the portfolio, how to get started, or anything related to the studio. If unsure, direct to WhatsApp or email. Keep responses short (2-4 sentences max). Use → and short bullet points for lists.
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does it cost?",
  "How do I get started?",
  "Show me your portfolio",
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Craftforge AI assistant. Ask me anything about our services, pricing, or how to get started! 🚀",
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

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm currently offline. Please reach us directly → WhatsApp: +91 9641547271 or email: hello.craftforge.studio@gmail.com",
          },
        ]);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const history = messages.slice(1).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history,
        config: {
          systemInstruction: BUSINESS_CONTEXT,
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });

      const response = await chat.sendMessage({ message: text });
      const reply =
        response.text || "I couldn't process that. Please contact us directly!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Reach us directly → WhatsApp: +91 9641547271",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-gradient rounded-full flex items-center justify-center shadow-2xl shadow-brand-purple/40 animate-pulse-glow"
        aria-label="Chat with us"
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
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Unread badge when closed */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[72px] right-[18px] z-50 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center text-[10px] font-bold text-white"
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
            className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
            style={{
              background: "rgba(13, 13, 26, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-brand-gradient">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Craftforge AI</p>
                  <p className="text-[11px] text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
                    Online · Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Minimize2 size={16} />
              </button>
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
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === "user"
                              ? "bg-brand-purple"
                              : "bg-brand-gradient"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <User size={14} />
                          ) : (
                            <Bot size={14} />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-brand-purple/80 text-white rounded-tr-sm"
                              : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {loading && (
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
                          <Bot size={14} />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-brand-purple chat-dot"
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
                          className="text-[11px] px-3 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/30 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-white/10 flex gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                      placeholder="Ask anything..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/50 transition-colors"
                    />
                    <motion.button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0"
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
