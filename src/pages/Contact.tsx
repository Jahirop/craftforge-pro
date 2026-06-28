import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail, MessageCircle, Linkedin, Instagram, ExternalLink,
  Send, CheckCircle2, ChevronDown,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import CyclingBadge from "../components/CyclingBadge";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://craftforge.studio/contact#webpage",
      "url": "https://craftforge.studio/contact",
      "name": "Contact Craftforge",
      "description": "Get in touch with Craftforge for premium brand systems, luxury packaging design, high-performance web engineering, and AI automation inquiries."
    },
    {
      "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does Craftforge.studio do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Craftforge is an AI native creative studio that builds brand identity, luxury packaging, websites, and AI content systems for premium D2C brands. We combine boutique-level craft with AI pipelines that produce at 4x speed."
            }
          },
          {
            "@type": "Question",
            "name": "Who is behind Craftforge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Founder Jahiruddin Sekh, an AI creative strategist and systems architect with 6+ years building intelligent brands and automation pipelines. Every project stays founder-led, start to finish."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Craftforge different from an agency?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Founder-led senior delivery plus AI pipelines that produce 4x faster, without holding-company overhead. You get the founder on every project, not a junior account manager and a rotating creative team."
            }
          },
          {
            "@type": "Question",
            "name": "What brands has Craftforge worked with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bergamot Beauté (India's first pure-parfum D2C brand), Juno Paris, Saher Perfumes, and early-stage D2C clients via Secretto Agency including WishCare, Biomlogy, and LA OTTER."
            }
          },
          {
            "@type": "Question",
            "name": "Does Craftforge work with international clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, based in Gurugram, Delhi NCR, India, working with clients globally. Pricing in INR with international wire transfers and USD/GBP equivalent scopes available on request."
            }
          }
        ]
    }
  ]
};

const SERVICES_OPTIONS = ["Forge / Brand & Identity", "Form / Packaging & Product", "Field / Web & Digital", "Forecast / AI & Marketing", "Multiple Services", "Not Sure Yet"];
const BUDGET_OPTIONS   = ["₹1,000 – ₹25,000 (Starter)","₹25,000 – ₹75,000 (Growth)","₹75,000 – ₹2,00,000 (Enterprise)","₹2,00,000+ (Custom)","Let's discuss"];

const CONTACT_ITEMS = [
  { Icon: Mail,        label: "Email",     value: "hello.craftforge.studio@gmail.com", href: "mailto:hello.craftforge.studio@gmail.com", color: "#7C3AED" },
  { Icon: MessageCircle,label: "WhatsApp", value: "+91 9641547271",                    href: "https://wa.me/919641547271",               color: "#25D366" },
  { Icon: Linkedin,    label: "LinkedIn",  value: "Jahiruddin Sekh",                   href: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/", color: "#0A66C2" },
  { Icon: Instagram,   label: "Instagram", value: "@craftforge.studio",                href: "https://www.instagram.com/craftforge.studio/", color: "#E1306C" },
  { Icon: ExternalLink,label: "Behance",   value: "Designer_Pro_Plus",                 href: "https://www.behance.net/Designer_Pro_Plus/",   color: "#1769FF" },
];

const FAQS = [
  { q: "What does Craftforge.studio do?", a: "Craftforge is an AI native creative studio that builds brand identity, luxury packaging, websites, and AI content systems for premium D2C brands. We combine boutique level craft with AI pipelines that produce at 4× speed ✦ so your brand grows without growing the headcount behind it." },
  { q: "Who is behind Craftforge?", a: "Founder Jahiruddin Sekh ✦ AI creative strategist and systems architect with 6+ years building intelligent brands and automation pipelines. Every project stays founder led, start to finish." },
  { q: "What makes Craftforge different from an agency?", a: "Founder led senior delivery plus AI pipelines that produce 4× faster, without holding company overhead. You get the founder on every project ✦ not a junior account manager and a rotating creative team." },
  { q: "What brands has Craftforge worked with?", a: "Bergamot Beauté (India's first pure parfum D2C brand), Juno Paris, Saher Perfumes, and early stage D2C clients via Secretto Agency ✦ including WishCare, Biomlogy, and LA OTTER." },
  { q: "Does Craftforge work with international clients?", a: "Yes ✦ based in Gurugram, Delhi NCR, India, working with clients globally. Pricing in INR with international wire transfers and USD/GBP equivalent scopes available on request." },
];

function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: isDark ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.88)",
      border: isDark ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(124,58,237,0.15)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
    }}>
      <button className="w-full flex items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-sm uppercase" style={{ color: "var(--th-text)" }}>{q}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-brand-purple transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--th-text-muted)" }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";
  const cardBg      = isDark ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.90)";
  const cardBdr     = isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.18)";
  const cardShadow  = isDark ? "0 0 40px rgba(124,58,237,0.10), inset 0 0 24px rgba(124,58,237,0.04)" : "0 4px 24px rgba(124,58,237,0.08)";
  const formBg      = isDark ? "rgba(37,211,102,0.06)" : "rgba(37,211,102,0.03)";
  const formBdr     = isDark ? "rgba(37,211,102,0.25)" : "rgba(37,211,102,0.20)";
  const formShadow  = isDark ? "0 0 40px rgba(37,211,102,0.10), inset 0 0 24px rgba(37,211,102,0.04)" : "0 4px 24px rgba(37,211,102,0.07)";
  const inputBg     = isDark ? "rgba(255,255,255,0.04)" : "rgba(248,250,252,0.80)";
  const inputBdr    = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const inputTxt    = isDark ? "#ffffff" : "#0F172A";
  const placeholderClr = isDark ? "rgba(255,255,255,0.25)" : "#94A3B8";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Proposal from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Jahiruddin,\n\nHere are the details of my project proposal:\n\n` +
      `- Name: ${form.name}\n` +
      `- Email: ${form.email}\n` +
      `- Service Needed: ${form.service || "Not specified"}\n` +
      `- Budget Range: ${form.budget || "Not specified"}\n\n` +
      `Project Details:\n${form.message}\n\nBest regards,\n${form.name}`
    );
    window.location.href = `mailto:hello.craftforge.studio@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle = {
    background: inputBg,
    border: `1px solid ${inputBdr}`,
    borderRadius: "1rem",
    padding: "0.875rem 1.25rem",
    fontSize: "0.875rem",
    color: inputTxt,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="Contact | Start Your Project | Craftforge Studio"
        description="Partner with Craftforge ✦ India's founder led premium boutique creative studio. Contact us for brand identity, luxury packaging design, high performance web engineering, and AI automation. Free 30 minute discovery call available."
        schema={contactSchema}
      />
      {/* Hero */}
      <section className="py-10 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: isDark ? "rgba(124,58,237,0.10)" : "rgba(124,58,237,0.06)" }} />
        <div className="relative max-w-2xl mx-auto">
          <CyclingBadge label="Contact" className="mb-6" />
          <RevealText text="LET'S FORGE SOMETHING EXTRAORDINARY"
            className="font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
            style={{ color: textPrimary }} />
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: textMuted }}>
            If you're building a premium brand and want it engineered ✦ not just designed ✦ let's talk. I take on a small number of projects at a time so each one stays founder led, start to finish.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} className="rounded-3xl p-10 md:p-14"
              style={{ background: formBg, border: formBdr, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: formShadow }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-brand-green" />
                  </div>
                  <h3 className="font-poppins font-bold text-2xl" style={{ color: textPrimary }}>PROPOSAL SENT!</h3>
                  <p className="text-sm max-w-sm" style={{ color: textMuted }}>
                    Your email client has been opened with your proposal pre-filled. Please send the email to complete your submission!
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-colors"
                    style={{ border: isDark ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(0,0,0,0.12)", color: textMuted }}>
                    SEND ANOTHER PROPOSAL
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <RevealText text="START A PROJECT"
                    className="font-poppins font-bold text-2xl mb-2" style={{ color: textPrimary }} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Doe" style={{ ...inputStyle, "--placeholder-color": placeholderClr } as React.CSSProperties}
                        className="focus:border-brand-green/50 placeholder:text-[var(--placeholder-color,#94a3b8)]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="hello@example.com" style={inputStyle}
                        className="focus:border-brand-green/50 placeholder:text-[#94a3b8]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} style={inputStyle}
                        className="focus:border-brand-green/50 appearance-none">
                        <option value="">Select a service</option>
                        {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange} style={inputStyle}
                        className="focus:border-brand-green/50 appearance-none">
                        <option value="">Select budget</option>
                        {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>Tell Us About Your Project *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Describe what you want to build, your timeline, and any specific requirements..."
                      style={{ ...inputStyle, resize: "none" }}
                      className="focus:border-brand-green/50 placeholder:text-[#94a3b8]" />
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,0.30)" }}>
                    <Send size={16} /> SEND PROPOSAL
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} className="rounded-3xl p-10"
              style={{ background: cardBg, border: `1px solid ${cardBdr}`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: isDark ? "0 0 30px rgba(124,58,237,0.10)" : "0 4px 20px rgba(124,58,237,0.07)" }}>
              <h3 className="font-poppins font-bold text-lg mb-5 uppercase" style={{ color: textPrimary }}>CONTACT INFO</h3>
              <div className="flex flex-col gap-3">
                {CONTACT_ITEMS.map(({ Icon, label, href, color }) => (
                  <motion.a key={href} href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all uppercase"
                    style={{ background: `${color}18`, border: `1px solid ${color}40`, color: isDark ? "#ffffff" : color }}>
                    <Icon size={16} style={{ color }} />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} className="rounded-3xl p-10"
              style={{
                background: isDark ? "rgba(37,211,102,0.06)" : "rgba(37,211,102,0.05)",
                border: "1px solid rgba(37,211,102,0.25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: isDark ? "0 0 30px rgba(37,211,102,0.10)" : "0 4px 20px rgba(37,211,102,0.07)",
              }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                <span className="font-poppins font-bold text-brand-green text-sm">CURRENTLY AVAILABLE</span>
              </div>
              <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-green text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity">
                <MessageCircle size={16} /> MESSAGE ON WHATSAPP
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <SectionHeading badge="FAQ" title="BEFORE YOU REACH OUT"
            subtext="Quick answers to the most common pre-project questions." />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
