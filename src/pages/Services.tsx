import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Palette, Film, Globe, ShoppingBag, Settings, Cpu,
  CheckCircle2, ChevronDown, MessageCircle,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import CyclingBadge from "../components/CyclingBadge";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Forge / Brand & Identity",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Craftforge",
        "url": "https://craftforge.studio"
      },
      "description": "Cohesive brand systems, visual guidelines, typography, and logo design crafted to command a unique premium. We construct the strategic foundation of your identity."
    },
    {
      "@type": "Service",
      "serviceType": "Form / Packaging & Product",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Craftforge",
        "url": "https://craftforge.studio"
      },
      "description": "High-end packaging systems designed to dominate retail shelves, featuring luxury fragrance packaging (e.g. Midnight Queen Pure Parfum), beauty & cosmetics boxes, and premium D2C systems."
    },
    {
      "@type": "Service",
      "serviceType": "Field / Web & Digital",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Craftforge",
        "url": "https://craftforge.studio"
      },
      "description": "High-performance React & Tailwind websites, custom Shopify storefronts, Webflow platforms, and premium digital products designed to convert visitors into loyal clients."
    },
    {
      "@type": "Service",
      "serviceType": "Forecast / AI & Marketing",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Craftforge",
        "url": "https://craftforge.studio"
      },
      "description": "Bespoke prompt engineering libraries, n8n/Make workflow automation, and GEO (Generative Engine Optimization) campaigns designed to scale creative production up to 9x."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the four pillars of services that you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate through four structured pillars: Forge (Brand & Identity), Form (Packaging & Product), Field (Web & Digital), and Forecast (AI & Marketing). This structured approach allows us to deliver end-to-end design and automation without the bloat of a holding company agency."
          }
        },
        {
          "@type": "Question",
          "name": "Do you specialize in luxury D2C packaging design?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Under our Form pillar, we specialize in high-end cosmetic, beverage, and fragrance packaging systems—such as our signature Midnight Queen Pure Parfum launch—designing bottle shapes, retail box setups, and digital unboxing experiences."
          }
        },
        {
          "@type": "Question",
          "name": "How fast do you deliver creative projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We combine global craft with AI native execution to speed up production cycles by 9x and reduce manual creative workloads by 67%. Starter engagements are typically delivered in 3–5 business days, while comprehensive brand or website builds take 7–14 days."
          }
        },
        {
          "@type": "Question",
          "name": "Who leads the creative projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every engagement is founder led. You get direct access to lead designer Jahiruddin Sekh, ensuring top-tier creative strategy, design thinking, and high performance technical execution, with zero layers of junior accounts."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle international projects and billing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We partner with ambitious founders worldwide. While our primary pricing is in INR, we accept international wire transfers and can coordinate equivalent USD/GBP project scopes."
          }
        },
        {
          "@type": "Question",
          "name": "How do we get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply reach out via WhatsApp at +91 9641547271, fill out our contact intake form, or email hello.craftforge.studio@gmail.com. We typically respond within 2–4 hours to coordinate a free 30-minute discovery call."
          }
        }
      ]
    }
  ]
};

const SERVICES = [
  { icon: Palette, title: "Forge / Brand & Identity", tagline: "Brands forged with strategic intent.", desc: "Cohesive brand systems, visual guidelines, typography, naming, verbal identity, and logo design crafted to command a unique premium. We construct the strategic foundation of your identity, ensuring your brand stands out in both physical and digital markets.", included: ["Brand strategy & positioning", "Visual identity & logos", "Naming & verbal identity", "Brand guidelines & asset packs", "Stationery & collateral design", "AI assisted brand exploration"], color: "#7C3AED", glow: "rgba(124,58,237,0.25)" },
  { icon: ShoppingBag, title: "Form / Packaging & Product", tagline: "Premium D2C and luxury packaging.", desc: "Luxury packaging design, fragrance packaging (e.g. flagship Midnight Queen Pure Parfum), beauty & cosmetics boxes, and premium D2C custom packaging systems engineered to dominate retail shelves.", included: ["Bespoke luxury packaging", "Fragrance & cosmetic design", "D2C retail boxes & containers", "3D bottle & box mockups", "Print ready production files", "Eco friendly material advisory"], color: "#F97316", glow: "rgba(249,115,22,0.25)" },
  { icon: Globe, title: "Field / Web & Digital", tagline: "Intelligent, high performance web platforms.", desc: "High performance React & Tailwind websites, custom Shopify ecommerce storefronts, Webflow setups, and premium interactive digital products designed to convert visitors into loyal clients.", included: ["React & Tailwind development", "Shopify custom storefronts", "Webflow & Framer development", "UI/UX & interactive prototypes", "SEO optimized site architecture", "Mobile first responsive design"], color: "#3B82F6", glow: "rgba(59,130,246,0.25)" },
  { icon: Cpu, title: "Forecast / AI & Marketing", tagline: "Generative operations and search optimization.", desc: "Bespoke prompt engineering libraries, n8n/Make workflow automation, and Generative Engine Optimization (GEO) campaigns designed to scale creative output up to 9x.", included: ["Bespoke prompt libraries", "n8n & Make workflow automation", "Generative campaign systems", "Generative Engine Optimization (GEO)", "AI chatbot & agent integration", "Team AI training & handover"], color: "#10B981", glow: "rgba(16,185,129,0.25)" },
];

const PRICING = [
  { name: "Starter", price: "₹1,000 – ₹25,000", desc: "Perfect for solo founders and small brands getting started with premium design and AI workflows.", features: ["Single deliverable project","AI native assets (up to 20)","1 revision round","3–5 day delivery","WhatsApp support"], cta: "Get Started", highlight: false },
  { name: "Growth", price: "₹25,000 – ₹75,000", desc: "For growing brands that need a complete brand system, custom packaging, or automation pipeline.", features: ["Multi deliverable project scope","Full branding or web build","3 revision rounds","7–14 day delivery","Priority WhatsApp support","Strategy consultation included"], cta: "Most Recommended", highlight: true },
  { name: "Enterprise", price: "₹75,000+", desc: "Custom brand systems, packaging systems, and AI infrastructure for established enterprises.", features: ["Custom scope & timeline","Bespoke packaging & digital setups","Unlimited revisions","Ongoing retainer options","Direct founder access","Full documentation & training"], cta: "Let's Discuss", highlight: false },
];

const FAQS = [
  { q: "What are the four pillars of services that you offer?", a: "We operate through four structured pillars: Forge (Brand & Identity), Form (Packaging & Product), Field (Web & Digital), and Forecast (AI & Marketing). This structured approach allows us to deliver end to end design and automation without the bloat of a holding company agency." },
  { q: "Do you specialize in luxury D2C packaging design?", a: "Yes. Under our Form pillar, we specialize in high end cosmetic, beverage, and fragrance packaging systems ✦ such as our signature Midnight Queen Pure Parfum launch ✦ designing bottle shapes, retail box setups, and digital unboxing experiences." },
  { q: "How fast do you deliver creative projects?", a: "We combine global craft with AI native execution to speed up production cycles by 9x and reduce manual creative workloads by 67%. Starter engagements are typically delivered in 3–5 business days, while comprehensive brand or website builds take 7–14 days." },
  { q: "Who leads the creative projects?", a: "Every engagement is founder led. You get direct access to lead designer Jahiruddin Sekh, ensuring top tier creative strategy, design thinking, and high performance technical execution, with zero layers of junior accounts." },
  { q: "Can you handle international projects and billing?", a: "Yes. We partner with ambitious founders worldwide. While our primary pricing is in INR, we accept international wire transfers and can coordinate equivalent USD/GBP project scopes." },
  { q: "How do we get started?", a: "Simply reach out via WhatsApp at +91 9641547271, fill out our contact intake form, or email hello.craftforge.studio@gmail.com. We typically respond within 2–4 hours to coordinate a free 30-minute discovery call." },
];

function AnimateHeight({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.88)",
        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(124,58,237,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <button className="w-full flex items-center justify-between gap-4 p-6 text-left" onClick={() => setOpen(!open)}>
        <span className="font-poppins font-semibold text-sm md:text-base uppercase" style={{ color: "var(--th-text)" }}>{q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 text-brand-purple transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimateHeight open={open}>
        <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "var(--th-text-muted)" }}>{a}</p>
      </AnimateHeight>
    </motion.div>
  );
}

export default function Services() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";
  const cardBg      = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.88)";
  const cardBdrBase = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="Services | Branding, Luxury Packaging & AI Automation | Craftforge"
        description="Explore Craftforge's four creative pillars ✦ Forge, Form, Field, and Forecast ✦ combining global craft standards with AI native execution to serve ambitious Indian and global founders."
        schema={servicesSchema}
      />
      {/* Hero */}
      <section className="py-9 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: isDark ? "rgba(124,58,237,0.10)" : "rgba(124,58,237,0.06)" }} />
        <div className="relative max-w-3xl mx-auto">
          <CyclingBadge label="Our Services" className="mb-6" />
          <RevealText text="WHAT WE BUILD"
            className="font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
            style={{ color: textPrimary }} />
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: textMuted }}>
            Craftforge combines global craft standards with AI native execution ✦ forging premium brand identities, luxury packaging, and high performance digital products for ambitious Indian and global founders. No holding company bloat. No freelance inconsistency. Explore our four pillars.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10">
          {SERVICES.map(({ icon: Icon, title, tagline, desc, included, color, glow }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 * i }}
              className="rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative overflow-hidden"
              style={{
                background: isDark ? `rgba(255,255,255,0.04)` : "rgba(255,255,255,0.90)",
                border: `1px solid ${color}${isDark ? "33" : "22"}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: isDark ? `0 0 40px ${color}12, inset 0 0 20px ${color}06` : `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}18`,
              }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: glow }} />
              {/* Left */}
              <div className="flex flex-col gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>{tagline}</p>
                  <RevealText text={title} className="font-poppins font-bold text-2xl md:text-3xl mb-3 uppercase"
                    style={{ color: textPrimary }} />
                  <motion.p
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base leading-relaxed" style={{ color: textMuted }}>
                    {desc}
                  </motion.p>
                </div>
                <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
                  <MessageCircle size={15} /> GET A QUOTE
                </a>
              </div>
              {/* Right */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: textMuted }}>What's Included</p>
                <ul className="flex flex-col gap-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm uppercase" style={{ color: isDark ? "rgba(255,255,255,0.80)" : "#334155" }}>
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="Pricing" title="SIMPLE, TRANSPARENT PRICING"
            subtext="Boutique caliber design and AI native execution. No holding company bloat, just direct founder led delivery." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, desc, features, cta, highlight }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative rounded-3xl p-8 flex flex-col gap-6"
                style={highlight ? undefined : {
                  background: cardBg,
                  border: `1px solid ${cardBdrBase}`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.06)",
                }}
                {...(highlight ? { className: "relative rounded-3xl p-8 flex flex-col gap-6 bg-brand-gradient shadow-2xl shadow-brand-purple/30" } : {})}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? "text-white/70" : "text-brand-purple"}`}>{name}</p>
                  <p className="font-poppins font-bold text-2xl mb-2" style={{ color: highlight ? "#ffffff" : textPrimary }}>{price}</p>
                  <p className={`text-sm leading-relaxed`} style={{ color: highlight ? "rgba(255,255,255,0.70)" : textMuted }}>{desc}</p>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm uppercase"
                      style={{ color: highlight ? "rgba(255,255,255,0.90)" : isDark ? "rgba(255,255,255,0.70)" : "#334155" }}>
                      <CheckCircle2 size={15} className={`flex-shrink-0 mt-0.5 ${highlight ? "text-white" : "text-brand-purple"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                  className={`w-full py-3 rounded-full font-bold text-center text-sm transition-all ${
                    highlight ? "bg-white text-brand-purple hover:bg-white/90"
                              : "border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  }`}>
                  {cta.toUpperCase()}
                </a>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm mt-8" style={{ color: textMuted }}>
            All prices are approximate. Final scope and pricing agreed before any work begins.
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <SectionHeading badge="FAQ" title="COMMON QUESTIONS"
            subtext="Everything you need to know before we start building." />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-12"
            style={{
              background: cardBg,
              border: "1px solid rgba(124,58,237,0.20)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: isDark ? "none" : "0 4px 24px rgba(124,58,237,0.08)",
            }}
          >
            <RevealText text="NOT SURE WHICH SERVICE YOU NEED?"
              className="font-poppins font-bold text-3xl mb-4 justify-center"
              style={{ color: textPrimary }} />
            <motion.p
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8" style={{ color: textMuted }}>
              Drop us a message and we'll help you figure out the right starting point.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-brand-purple/30">
                CONTACT US
              </Link>
              <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-brand-green/30 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-colors">
                <MessageCircle size={16} /> WHATSAPP US
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
