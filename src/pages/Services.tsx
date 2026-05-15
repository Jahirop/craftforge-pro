import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Palette, Film, Globe, ShoppingBag, Settings, Cpu,
  CheckCircle2, ChevronDown, MessageCircle,
} from "lucide-react";
import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";

const SERVICES = [
  {
    icon: Palette,
    title: "AI Graphic Design",
    tagline: "Brand visuals at machine speed.",
    desc: "We turn a single prompt into a complete brand visual system. From logo concepts to campaign creatives, product graphics to social media assets — all generated, refined, and delivered at scale using the latest AI design tools.",
    included: [
      "Brand identity & logo concepts",
      "Social media creative templates",
      "Product graphic design",
      "Campaign creative systems",
      "AI-generated illustration sets",
      "Print & digital asset packs",
    ],
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.25)",
  },
  {
    icon: Film,
    title: "AI Video & Motion",
    tagline: "Visual storytelling at scale.",
    desc: "Short-form video, motion graphics, and animated content pipelines. We build end-to-end production systems for social media, ads, and brand storytelling — cutting production time by up to 9x.",
    included: [
      "Short-form video production",
      "Motion graphics & animation",
      "AI-generated video content",
      "Social media video pipelines",
      "Brand storytelling reels",
      "Ad creative video systems",
    ],
    color: "#4F46E5",
    glow: "rgba(79,70,229,0.25)",
  },
  {
    icon: Globe,
    title: "Vibe Code & AI Websites",
    tagline: "Intelligent websites, live in days.",
    desc: "Conversion-focused websites built with AI-assisted development. We combine vibe coding methodology with AI tooling to deliver stunning, fast, and functional websites — without the 3-month agency timeline.",
    included: [
      "Landing page design & development",
      "Full multi-page websites",
      "React + Tailwind component systems",
      "AI chatbot integration",
      "SEO-optimised structure",
      "Mobile-first responsive design",
    ],
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Creative",
    tagline: "Product visuals that convert.",
    desc: "High-converting product listings for Amazon, Shopify, Flipkart, and more. We create complete listing packs — main images, infographics, A+ content, and lifestyle visuals — powered by AI for consistency and speed.",
    included: [
      "Amazon & Flipkart listing packs",
      "Product photography enhancement",
      "Infographic & benefit visuals",
      "A+ Content / EBC design",
      "Shopify storefront creatives",
      "Marketplace banner design",
    ],
    color: "#F97316",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    icon: Settings,
    title: "AI Automation",
    tagline: "Eliminate repetitive work, permanently.",
    desc: "We build autonomous pipelines using n8n, Make, Zapier, and AI agents that handle your repetitive creative and business workflows — so your team can focus on what matters.",
    included: [
      "n8n & Make workflow automation",
      "AI agent pipeline design",
      "Content scheduling automation",
      "Lead nurturing workflows",
      "Social media auto-publishing",
      "Data extraction & reporting",
    ],
    color: "#10B981",
    glow: "rgba(16,185,129,0.25)",
  },
  {
    icon: Cpu,
    title: "Generative AI Systems",
    tagline: "Production-ready AI infrastructure.",
    desc: "We design and build reusable AI systems — prompt libraries, model pipelines, and generative workflows — that become permanent assets in your creative operation, scaling output without scaling headcount.",
    included: [
      "Custom prompt library design",
      "Reusable AI pipeline architecture",
      "Model fine-tuning guidance",
      "Generative design systems",
      "AI content strategy frameworks",
      "Training & handover documentation",
    ],
    color: "#EC4899",
    glow: "rgba(236,72,153,0.25)",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "₹1,000 – ₹25,000",
    desc: "Perfect for solo founders and small brands getting started with AI creative.",
    features: [
      "Single deliverable project",
      "AI-generated assets (up to 20)",
      "1 revision round",
      "3–5 day delivery",
      "WhatsApp support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹25,000 – ₹75,000",
    desc: "For growing brands that need a complete creative system or automation pipeline.",
    features: [
      "Multi-deliverable project scope",
      "Full brand or automation system",
      "3 revision rounds",
      "7–14 day delivery",
      "Priority WhatsApp support",
      "Strategy consultation included",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "₹75,000+",
    desc: "Custom AI infrastructure for established brands, agencies, and marketplaces.",
    features: [
      "Custom scope & timeline",
      "Dedicated AI pipeline build",
      "Unlimited revisions",
      "Ongoing retainer options",
      "Direct founder access",
      "Full documentation & training",
    ],
    cta: "Let's Discuss",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "How fast can you actually deliver?",
    a: "Most starter projects are delivered in 3–5 business days. Growth projects take 7–14 days. Speed depends on scope — we'll give you a precise timeline after the brief.",
  },
  {
    q: "Do I need to know anything about AI to work with you?",
    a: "Not at all. You just need to know what you want to build. We handle all the AI tooling, prompting, and system design on our end.",
  },
  {
    q: "What industries do you specialise in?",
    a: "Ecommerce, D2C brands, SaaS, agencies, content creators, and marketplaces. If you have a brand and want to scale creatively, we can help.",
  },
  {
    q: "Can you handle ongoing work, not just one-off projects?",
    a: "Yes — we offer monthly retainers for brands that need consistent creative output, automation maintenance, or ongoing AI system management.",
  },
  {
    q: "What if I'm not happy with the output?",
    a: "We include revision rounds in every project. If we're genuinely not hitting the mark, we'll work until you're satisfied — or refund, no questions asked.",
  },
  {
    q: "How do we get started?",
    a: "Message us on WhatsApp (+91 9641547271), fill in the contact form, or email hello.craftforge.studio@gmail.com. We'll respond within a few hours with next steps.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="glass-card rounded-2xl border border-white/07 overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-poppins font-semibold text-sm md:text-base text-white">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-brand-purple transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimateHeight open={open}>
        <p className="px-6 pb-6 text-brand-grey text-sm leading-relaxed">{a}</p>
      </AnimateHeight>
    </motion.div>
  );
}

function AnimateHeight({ open, children }: { open: boolean; children: React.ReactNode }) {
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

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[70px]"
    >
      {/* Hero */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
            Our Services
          </motion.div>
          <RevealText
            text="What We Build"
            className="text-white font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-grey text-lg leading-relaxed"
          >
            Six AI-powered creative services designed to replace slow, expensive, and inconsistent traditional workflows.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10">
          {SERVICES.map(({ icon: Icon, title, tagline, desc, included, color, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="glass-card glass-card-hover rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ background: glow }}
              />
              {/* Left */}
              <div className="flex flex-col gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>{tagline}</p>
                  <RevealText
                    text={title}
                    className="font-poppins font-bold text-2xl md:text-3xl text-white mb-3"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-brand-grey text-sm md:text-base leading-relaxed"
                  >
                    {desc}
                  </motion.p>
                </div>
                <a
                  href="https://wa.me/919641547271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                >
                  <MessageCircle size={15} /> Get a Quote
                </a>
              </div>
              {/* Right — included list */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-4">What's Included</p>
                <ul className="flex flex-col gap-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80">
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
          <SectionHeading
            badge="Pricing"
            title="Simple, Transparent Pricing"
            subtext="No hidden fees. No hourly surprises. Just clear project scopes and fair rates."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, desc, features, cta, highlight }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative rounded-3xl p-8 flex flex-col gap-6 ${
                  highlight
                    ? "bg-brand-gradient shadow-2xl shadow-brand-purple/30"
                    : "glass-card glass-card-hover"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? "text-white/70" : "text-brand-purple"}`}>{name}</p>
                  <p className="font-poppins font-bold text-2xl text-white mb-2">{price}</p>
                  <p className={`text-sm leading-relaxed ${highlight ? "text-white/70" : "text-brand-grey"}`}>{desc}</p>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${highlight ? "text-white/90" : "text-white/70"}`}>
                      <CheckCircle2 size={15} className={`flex-shrink-0 mt-0.5 ${highlight ? "text-white" : "text-brand-purple"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/919641547271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-full font-bold text-center text-sm transition-all ${
                    highlight
                      ? "bg-white text-brand-purple hover:bg-white/90"
                      : "border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  }`}
                >
                  {cta}
                </a>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-brand-grey text-sm mt-8"
          >
            All prices are approximate. Final scope and pricing agreed before any work begins.
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="FAQ"
            title="Common Questions"
            subtext="Everything you need to know before we start building."
          />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 border border-brand-purple/20"
          >
            <RevealText
              text="Not Sure Which Service You Need?"
              className="text-white font-poppins font-bold text-3xl mb-4 justify-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-grey mb-8"
            >
              Drop us a message and we'll help you figure out the right starting point.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-brand-purple/30"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-brand-green/30 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
