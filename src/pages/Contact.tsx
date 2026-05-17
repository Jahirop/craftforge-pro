import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail, MessageCircle, Linkedin, Instagram, ExternalLink,
  Send, CheckCircle2, ChevronDown,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import CyclingBadge from "../components/CyclingBadge";

const SERVICES_OPTIONS = [
  "AI Graphic Design",
  "AI Video & Motion",
  "Vibe Code & AI Websites",
  "Ecommerce Creative",
  "AI Automation",
  "Generative AI Systems",
  "Multiple Services",
  "Not Sure Yet",
];

const BUDGET_OPTIONS = [
  "₹1,000 – ₹25,000 (Starter)",
  "₹25,000 – ₹75,000 (Growth)",
  "₹75,000 – ₹2,00,000 (Enterprise)",
  "₹2,00,000+ (Custom)",
  "Let's discuss",
];

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello.craftforge.studio@gmail.com",
    href: "mailto:hello.craftforge.studio@gmail.com",
    color: "#7C3AED",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 9641547271",
    href: "https://wa.me/919641547271",
    color: "#25D366",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "Jahiruddin Sekh",
    href: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/",
    color: "#0A66C2",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    value: "@craftforge.studio",
    href: "https://www.instagram.com/craftforge.studio/",
    color: "#E1306C",
  },
  {
    Icon: ExternalLink,
    label: "Behance",
    value: "Designer_Pro_Plus",
    href: "https://www.behance.net/Designer_Pro_Plus/",
    color: "#1769FF",
  },
];

const FAQS = [
  {
    q: "How quickly will you respond?",
    a: "Typically within 2–4 hours on WhatsApp. Email responses within 24 hours. For urgent projects, WhatsApp is best.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes we work with clients globally. Pricing is in INR but we can discuss USD/GBP equivalent for international projects.",
  },
  {
    q: "What do I need to prepare before reaching out?",
    a: "Just a rough idea of what you want to build and your approximate budget range. We'll handle the rest in the discovery call.",
  },
  {
    q: "Do you offer a free consultation?",
    a: "Yes the first 30 minute strategy call is always free. We'll scope your project and give honest recommendations before any commitment.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-sm text-white uppercase">{q}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-brand-purple transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-5 pb-5 text-brand-grey text-sm leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to WhatsApp with pre-filled message
    const msg = encodeURIComponent(
      `Hi Craftforge! I'm ${form.name} (${form.email}).\n\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.open(`https://wa.me/919641547271?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[70px]"
    >
      {/* Hero */}
      <section className="py-14 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <CyclingBadge label="Contact" className="mb-6" />
          <RevealText
            text="LET'S BUILD SOMETHING INTELLIGENT"
            className="text-white font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-grey text-lg leading-relaxed"
          >
            Tell us about your project and we'll get back to you within hours. No fluff, just straight to the point strategy.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-white/07"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-brand-green" />
                  </div>
                  <h3 className="font-poppins font-bold text-2xl text-white">MESSAGE SENT!</h3>
                  <p className="text-brand-grey text-sm max-w-sm">
                    You've been redirected to WhatsApp with your message pre-filled. We'll follow up within a few hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-white/20 rounded-full text-sm font-medium hover:border-white/40 transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <RevealText
                    text="START A PROJECT"
                    className="text-white font-poppins font-bold text-2xl mb-2"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Your Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-white/4 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-purple/50 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                        className="bg-white/4 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-purple/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Service Needed</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="bg-white/4 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-brand-purple/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-brand-surface">Select a service</option>
                        {SERVICES_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-brand-surface">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Budget Range</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="bg-white/4 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-brand-purple/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-brand-surface">Select budget</option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b} className="bg-brand-surface">{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Tell Us About Your Project *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe what you want to build, your timeline, and any specific requirements..."
                      className="bg-white/4 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-purple/50 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-gradient rounded-2xl font-bold text-white shadow-xl shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow"
                  >
                    <Send size={16} /> SEND
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-7 border border-white/07"
            >
              <h3 className="font-poppins font-bold text-lg text-white mb-5">CONTACT INFO</h3>
              <div className="flex flex-col gap-3">
                {CONTACT_ITEMS.map(({ Icon, label, href, color }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-white transition-all uppercase"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${color}55, 0 0 40px ${color}20`;
                      (e.currentTarget as HTMLElement).style.background = `${color}28`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                      (e.currentTarget as HTMLElement).style.background = `${color}18`;
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-3xl p-7 border border-brand-green/15"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                <span className="font-poppins font-bold text-brand-green text-sm">CURRENTLY AVAILABLE</span>
              </div>
              <p className="text-brand-grey text-sm leading-relaxed mb-5">
                Taking on new projects. Typical response time: 2–4 hours on WhatsApp.
              </p>
              <a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-green text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={16} /> MESSAGE ON WHATSAPP
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            badge="FAQ"
            title="BEFORE YOU REACH OUT"
            subtext="Quick answers to the most common pre-project questions."
          />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
