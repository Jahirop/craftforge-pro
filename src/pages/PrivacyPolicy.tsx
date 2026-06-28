import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Shield, User, Eye, BarChart2, Share2, Globe, Lock, ExternalLink, Baby, CheckCircle, Flag, FileText, RefreshCw, Mail, MessageCircle, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const CYCLE_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];

const SECTIONS = [
  {
    icon: User,
    color: "#7C3AED",
    title: "Who This Applies To",
    content: `This policy covers information collected on craftforge.studio only. It does not cover information collected through other channels, or through any third party platforms, tools, or partner sites we may link to, since those run under their own policies. Where a separate service of ours collects a different kind of data, we will say so at the point it is collected.`,
  },
  {
    icon: FileText,
    color: "#06B6D4",
    title: "Information You Give Us",
    content: `When you reach out, whether by email, a project enquiry, or a contact form, you may choose to share personal details with us. That can include your name, email address, phone number, company, or business address.\n\nWe use what you share for one reason first: to answer you and move your project forward. We may also use it to follow up on related topics we genuinely think will be useful to you. You can opt out of that anytime.`,
  },
  {
    icon: Eye,
    color: "#EC4899",
    title: "Information We Collect Automatically",
    content: `To keep the Site fast, relevant, and worth your time, we collect some technical information automatically when you visit. This typically includes your IP address, browser type, operating system, referring URLs, the pages and actions you take on the Site, and the date and time of your visit.\n\nThis data is aggregated. It tells us how people use the Site so we can improve it, not who you are personally.`,
    subsections: [
      {
        title: "Cookies",
        text: "Cookies are small text files placed on your device when you visit certain sites. They let the Site remember preferences, support security, and gather statistics. You are in control you can refuse or delete cookies through your browser settings.",
      },
      {
        title: "Pixels & Web Beacons",
        text: "A web beacon (or pixel) is a tiny graphic embedded in a page or email. We use these, including the Meta (Facebook) Pixel and Pinterest tag, to understand traffic patterns and measure whether content was viewed.",
      },
      {
        title: "Analytics",
        text: "We use third party analytics, including Google Analytics, to help us understand how the Site is used. You can opt out using the Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout.",
      },
    ],
  },
  {
    icon: BarChart2,
    color: "#F97316",
    title: "How We Use Your Information",
    content: `We use the information we collect to build and maintain our relationship with you, and to run the studio well.`,
    bullets: [
      "Respond to, evaluate, and process your enquiries and requests",
      "Send you updates, studio news, or relevant insights",
      "Verify your identity to keep the other purposes here secure",
      "Operate, measure, and improve our work, including developing new services",
      "Perform data analysis, including anonymizing personal information",
      "Enforce our Terms of Use",
      "Meet applicable legal requirements, industry standards, and our own policies",
    ],
  },
  {
    icon: Share2,
    color: "#10B981",
    title: "How We Share Information",
    highlight: "We do not sell your personal information. Full stop.",
    content: `We may share information only as described here: with trusted service providers who help us run the Site or serve you (hosting, analytics, handling your requests), each bound by contract to protect your data. We may also disclose information where required by law, to protect our legal rights, or to investigate fraud or misuse of the Site.`,
  },
  {
    icon: Globe,
    color: "#3B82F6",
    title: "Cross Border Data",
    content: `We may process or store information in countries other than the one where you provided it. Those countries may have different data protection laws. By submitting your information, you consent to this transfer, and we will protect it in line with this policy wherever it goes.`,
  },
  {
    icon: Lock,
    color: "#7C3AED",
    title: "Security",
    content: `We take security seriously and use reasonable measures to protect the personal information we collect. That said, no method of transmission over the internet is fully secure, so we cannot guarantee absolute security of data sent to or stored on the Site.`,
  },
  {
    icon: ExternalLink,
    color: "#06B6D4",
    title: "Links to Other Sites",
    content: `The Site may link to other websites for your convenience. These operate independently and have their own privacy policies, which we encourage you to read. We are not responsible for the content or privacy practices of sites we link to.`,
  },
  {
    icon: Baby,
    color: "#EC4899",
    title: "Children",
    content: `This Site is not intended for anyone under the age of 18, and we do not knowingly collect personal data from minors. If you believe a minor has provided us information without parental or guardian consent, please contact us and we will remove it.`,
  },
  {
    icon: CheckCircle,
    color: "#F97316",
    title: "Your Rights & Choices",
    content: `You can tell us to stop sending marketing emails anytime. Use the unsubscribe link in any such email, or contact us directly. Subject to applicable law, you may also have the right to access, correct, update, or delete the personal data we hold about you.\n\nTo make a request, email hello.craftforge.studio@gmail.com. To protect you, we may ask for proof of identity before acting on a request.`,
  },
  {
    icon: Flag,
    color: "#10B981",
    title: "Your Rights Under India's DPDP Act",
    content: `If you are in India, the Digital Personal Data Protection Act, 2023 gives you certain rights over your personal data, including access, correction, and erasure, and the right to withdraw consent. To exercise any of these, contact us at the email above and we will respond in line with applicable law.`,
  },
  {
    icon: Shield,
    color: "#3B82F6",
    title: "Consent",
    content: `By using this Site, you consent to the processing of your personal information as described in this Privacy Policy.`,
  },
  {
    icon: RefreshCw,
    color: "#7C3AED",
    title: "Changes to This Policy",
    content: `We may update this policy from time to time and will post any changes on this page. We encourage you to check back so you are always seeing the current version.`,
  },
];

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return "124,58,237";
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
}

export default function PrivacyPolicy() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "rgba(255,255,255,0.55)" : "#475569";

  const [colorIdx, setColorIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setColorIdx((i) => (i + 1) % CYCLE_COLORS.length), 1800);
    return () => clearInterval(t);
  }, []);
  const badgeColor     = CYCLE_COLORS[colorIdx];
  const badgeColorNext = CYCLE_COLORS[(colorIdx + 1) % CYCLE_COLORS.length];

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [openSubIdx, setOpenSubIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[76px] md:pt-[108px] pb-24"
    >
      <SEO
        title="Privacy Policy | Craftforge — AI Creative Studio"
        description="Craftforge's Privacy Policy. We build brands with intent, and we treat your data the same way. Clear, transparent, no fine print."
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: isDark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.05)", filter: "blur(100px)" }} />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: isDark ? "rgba(6,182,212,0.06)" : "rgba(6,182,212,0.04)", filter: "blur(80px)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-semibold tracking-widest"
            style={{
              borderColor: `${badgeColor}55`,
              background: `${badgeColor}12`,
              color: badgeColor,
              boxShadow: `0 0 16px ${badgeColor}22`,
              filter: `drop-shadow(0 0 6px ${badgeColor}44)`,
              transition: "color 0.8s ease, border-color 0.8s ease, background 0.8s ease, box-shadow 0.8s ease",
            }}
          >
            <Shield size={12} style={{ color: badgeColorNext, transition: "color 0.8s ease" }} />
            LEGAL & PRIVACY
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6"
            style={{ color: textPrimary }}
          >
            Privacy{" "}
            <span style={{
              background: "linear-gradient(135deg,#7C3AED,#06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Policy
            </span>
          </motion.h1>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl p-6 md:p-8 text-left"
            style={{
              background: isDark ? "rgba(124,58,237,0.07)" : "rgba(124,58,237,0.04)",
              border: isDark ? "1px solid rgba(124,58,237,0.20)" : "1px solid rgba(124,58,237,0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: textMuted }}>
              We build brands with intent, and we treat your data the same way. This Privacy Policy explains what
              information we collect when you visit{" "}
              <span style={{ color: "#7C3AED", fontWeight: 600 }}>craftforge.studio</span> how we use it, and the
              control you have over it.{" "}
              <span style={{ color: textPrimary, fontWeight: 500 }}>No fine print games. Just a clear account of how things work.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIONS — ACCORDION ── */}
      <section className="px-6 md:px-8 max-w-3xl mx-auto flex flex-col gap-3">
        {SECTIONS.map((sec, i) => {
          const rgb    = hexToRgb(sec.color);
          const isOpen = openIdx === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: isOpen
                  ? isDark ? `rgba(${rgb},0.08)` : "rgba(255,255,255,0.95)"
                  : isDark ? `rgba(${rgb},0.04)` : "rgba(255,255,255,0.75)",
                border: `1px solid rgba(${rgb},${isOpen ? (isDark ? "0.28" : "0.20") : (isDark ? "0.12" : "0.10")})`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: isOpen
                  ? isDark ? `0 0 36px rgba(${rgb},0.14)` : `0 6px 28px rgba(0,0,0,0.07)`
                  : "none",
                transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Left accent bar — full height when open, partial when closed */}
              <div
                className="absolute left-0 top-0 w-[3px] rounded-l-2xl transition-all duration-300"
                style={{
                  background: sec.color,
                  bottom: 0,
                  opacity: isOpen ? 1 : 0.4,
                }}
              />

              {/* ── Accordion trigger ── */}
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full pl-7 pr-5 py-4 flex items-center gap-3 text-left focus:outline-none group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: `rgba(${rgb},${isOpen ? (isDark ? "0.22" : "0.15") : (isDark ? "0.14" : "0.09")})`,
                    color: sec.color,
                  }}
                >
                  <sec.icon size={17} />
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-[10px] font-mono tracking-widest flex-shrink-0"
                    style={{ color: sec.color, opacity: 0.75 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-poppins font-bold text-[14px] md:text-[15px] tracking-tight uppercase truncate"
                    style={{ color: isOpen ? sec.color : textPrimary, transition: "color 0.3s ease" }}>
                    {sec.title}
                  </h2>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="flex-shrink-0 ml-2"
                  style={{ color: isOpen ? sec.color : isDark ? "rgba(255,255,255,0.30)" : "#94A3B8" }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* ── Accordion content ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pl-7 pr-6 pb-6 pt-1">
                      {/* Divider */}
                      <div className="mb-4 h-px" style={{ background: `rgba(${rgb},${isDark ? "0.18" : "0.12"})` }} />

                      {/* Highlight callout */}
                      {"highlight" in sec && sec.highlight && (
                        <div
                          className="mb-4 px-4 py-3 rounded-xl text-sm font-bold"
                          style={{
                            background: `rgba(${rgb},${isDark ? "0.15" : "0.10"})`,
                            border: `1px solid rgba(${rgb},0.30)`,
                            color: sec.color,
                          }}
                        >
                          {sec.highlight}
                        </div>
                      )}

                      {/* Content paragraphs */}
                      {sec.content.split("\n\n").map((para, pi) => (
                        <p key={pi} className="text-sm leading-relaxed mb-3 last:mb-0"
                          style={{ color: textMuted }}>
                          {para}
                        </p>
                      ))}

                      {/* Bullet list */}
                      {"bullets" in sec && sec.bullets && (
                        <ul className="mt-3 flex flex-col gap-2">
                          {sec.bullets.map((b, bi) => (
                            <motion.li
                              key={bi}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bi * 0.04 }}
                              className="flex items-start gap-2.5 text-sm"
                              style={{ color: textMuted }}
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: sec.color }} />
                              {b}
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {/* Subsections — nested accordion */}
                      {"subsections" in sec && sec.subsections && (
                        <div className="mt-4 flex flex-col gap-2">
                          {sec.subsections.map((sub, si) => {
                            const isSubOpen = openSubIdx === si;
                            return (
                              <div key={si} className="rounded-xl overflow-hidden"
                                style={{
                                  background: isSubOpen
                                    ? isDark ? `rgba(${rgb},0.10)` : `rgba(${rgb},0.05)`
                                    : isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                  border: `1px solid rgba(${rgb},${isSubOpen ? "0.25" : "0.12"})`,
                                  transition: "background 0.25s ease, border-color 0.25s ease",
                                }}>
                                {/* Sub trigger */}
                                <button
                                  onClick={() => setOpenSubIdx(isSubOpen ? null : si)}
                                  className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
                                >
                                  <p className="text-[11px] font-bold tracking-widest uppercase"
                                    style={{ color: isSubOpen ? sec.color : isDark ? "rgba(255,255,255,0.55)" : "#64748B", transition: "color 0.25s ease" }}>
                                    {sub.title}
                                  </p>
                                  <motion.div
                                    animate={{ rotate: isSubOpen ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ color: isSubOpen ? sec.color : isDark ? "rgba(255,255,255,0.25)" : "#94A3B8", flexShrink: 0 }}
                                  >
                                    <ChevronDown size={14} />
                                  </motion.div>
                                </button>

                                {/* Sub content */}
                                <AnimatePresence initial={false}>
                                  {isSubOpen && (
                                    <motion.div
                                      key="sub-content"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                      style={{ overflow: "hidden" }}
                                    >
                                      <div className="px-4 pb-4">
                                        <div className="h-px mb-3" style={{ background: `rgba(${rgb},0.15)` }} />
                                        <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                                          {sub.text}
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* ── CONTACT CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden text-center p-8 md:p-12"
          style={{
            background: isDark ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.90)",
            border: isDark ? "1px solid rgba(124,58,237,0.22)" : "1px solid rgba(124,58,237,0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 0 40px rgba(124,58,237,0.12), inset 0 0 24px rgba(124,58,237,0.05)"
              : "0 8px 40px rgba(124,58,237,0.08)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
            style={{ background: isDark ? "rgba(124,58,237,0.18)" : "rgba(124,58,237,0.07)", filter: "blur(48px)" }} />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(124,58,237,0.15)", color: "#7C3AED" }}>
              <Mail size={22} />
            </div>

            <h2 className="font-poppins font-bold text-xl md:text-2xl tracking-tight mb-2" style={{ color: textPrimary }}>
              Questions About This Policy?
            </h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: textMuted }}>
              Questions about this policy or how we handle your data? Reach out directly we'll respond clearly and promptly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <motion.a
                href="mailto:hello.craftforge.studio@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 bg-brand-gradient rounded-full font-bold text-white text-sm flex items-center justify-center gap-2"
                style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}
              >
                <Mail size={14} /> SEND MAIL
              </motion.a>
              <motion.a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-full font-bold text-white text-sm flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,0.30)" }}
              >
                <MessageCircle size={14} /> CHAT ON WHATSAPP
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
