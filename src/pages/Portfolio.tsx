import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import CyclingBadge from "../components/CyclingBadge";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const portfolioSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://craftforge.studio/portfolio#webpage",
      "url": "https://craftforge.studio/portfolio",
      "name": "Craftforge Portfolio",
      "description": "Browse our portfolio of AI-powered creative designs, luxury branding, packaging design, high-performance websites, and workflow automations.",
      "about": [
        {
          "@type": "CreativeWork",
          "name": "Bergamot Beauté — Brand & AI Content System",
          "description": "End-to-end AI creative system for India's first pure-parfum D2C brand. AI prompt libraries, n8n pipelines, and brand-consistent content production achieving 40%+ engagement growth.",
          "url": "https://bergamotbeaute.com"
        },
        {
          "@type": "CreativeWork",
          "name": "Bergamot Beauté — Motion Content Pipeline",
          "description": "n8n and Claude-powered content pipeline collapsing three workflows into one unified text-image-video production system.",
          "url": "https://www.behance.net/gallery/240008013/Ai-Video-Content-Suite-BB-Premium-Perfume-Ecommerce"
        },
        {
          "@type": "CreativeWork",
          "name": "WizePrint — AI Print Production System",
          "description": "AI-to-print pipeline powering 300% SKU expansion across three sub-brands and six marketplaces with 45% lower design time.",
          "url": "https://www.behance.net/gallery/247458413/All-E-commerce-Listing-Pack-Amazon-Flipkart"
        },
        {
          "@type": "CreativeWork",
          "name": "Bergamot Beauté — Luxury Packaging System",
          "description": "High-end fragrance packaging visuals and D2C product imagery for premium shelf presence and conversion-ready unboxing content.",
          "url": "https://www.behance.net/gallery/216067635/T-SHIRT-DESIGN"
        },
        {
          "@type": "CreativeWork",
          "name": "Juno Paris — AI Creative System",
          "description": "Custom AI workflows and reusable prompt libraries for premium D2C brand Juno Paris, delivered via Secretto Agency.",
          "url": "https://junoparis.com"
        },
        {
          "@type": "CreativeWork",
          "name": "Secretto Agency — Multi-Brand Automation",
          "description": "AI workflow delivery engine behind WishCare, Biomlogy, and LA OTTER — n8n pipelines, automation SOPs, and brand identity systems.",
          "url": "https://staging.secretto.in"
        }
      ]
    }
  ]
};

const FILTERS = ["All", "Forge", "Form", "Field", "Forecast"];

const CATEGORY_COLOR: Record<string, string> = {
  "Forge":     "#7C3AED",
  "Form":      "#F97316",
  "Field":     "#3B82F6",
  "Forecast":  "#10B981",
};

const PROJECTS = [
  {
    title: "Bergamot Beauté ✦ Brand & AI Content System",
    category: "Forecast",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/0b2bd1239980485.Y3JvcCwxNTAwLDExNzMsMCww.png",
    desc: "End-to-end creative system for India's first pure parfum D2C brand. Product imagery, reels, story templates, and campaign creatives via AI augmented Midjourney and Adobe workflows. Brand consistent AI prompt libraries ensuring visual coherence across every touchpoint. Result: 40%+ engagement growth.",
    tags: ["AI Content System", "Prompt Libraries", "Brand Identity"],
    link: "https://www.behance.net/gallery/239980485/E-commerce-Listing-Pack-Amazon-A-Premium",
    featured: true,
  },
  {
    title: "Bergamot Beauté ✦ Motion Content Pipeline",
    category: "Forecast",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/28d30a240008013.Y3JvcCwxNTAwLDExNzMsMCww.png",
    desc: "n8n and Claude powered pipelines for scheduling, visual QA, and cross platform publishing. Three separate workflows collapsed into one unified text image video production pipeline ✦ operating at 4× the previous output speed.",
    tags: ["n8n Automation", "AI Video", "Content Pipeline"],
    link: "https://www.behance.net/gallery/240008013/Ai-Video-Content-Suite-BB-Premium-Perfume-Ecommerce",
    featured: false,
  },
  {
    title: "WizePrint ✦ AI Print Production System",
    category: "Forecast",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/b893fa247458413.Y3JvcCwxNTAwLDExNzMsMCwyNTI.png",
    desc: "AI to print production pipeline powering 300% SKU expansion across three sub brands and six marketplaces. Midjourney prompt libraries, n8n automation for upload and listing QA, AI powered SEO content for Amazon, Etsy, and Teepublic. Outcome: 45% lower design time, outsourcing eliminated entirely.",
    tags: ["n8n", "Prompt Library", "Ecommerce"],
    link: "https://www.behance.net/gallery/247458413/All-E-commerce-Listing-Pack-Amazon-Flipkart",
    featured: true,
  },
  {
    title: "Bergamot Beauté ✦ Luxury Packaging System",
    category: "Form",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/4b1708216067635.Y3JvcCw1NDY1LDQyNzUsMTIxLDA.jpg",
    desc: "High end fragrance packaging visuals and D2C product imagery engineered for visual consistency across storefronts and social. Built for shelf presence, premium positioning, and conversion ready unboxing content.",
    tags: ["Luxury Packaging", "Fragrance", "Product Visuals"],
    link: "https://www.behance.net/gallery/216067635/T-SHIRT-DESIGN",
    featured: false,
  },
  {
    title: "Juno Paris ✦ AI Creative System",
    category: "Forecast",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/6ecd1e247630553.Y3JvcCw5NTEsNzQ0LDIyMyww.png",
    desc: "Custom AI workflows, brand identity visuals, and reusable prompt libraries tuned to the brand's voice and output needs ✦ delivered via Secretto Agency. A repeatable creative system the brand can run without rebuilding each campaign.",
    tags: ["AI Workflows", "Brand Identity", "Automation"],
    link: "https://www.behance.net/gallery/247630553/Craftforge-AI-Powered-Creative-Ecommerce-Website",
    featured: false,
  },
  {
    title: "Secretto Agency ✦ Multi Brand Automation",
    category: "Forecast",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/df0e2c240005159.Y3JvcCwxMzUwLDEwNTUsMCwxMw.png",
    desc: "The delivery engine behind multiple early stage D2C startups ✦ WishCare, Biomlogy, LA OTTER. Custom AI workflows, automation SOPs, brand identity visuals, and n8n pipelines tailored per brand. End-to-end creative systems from guidelines to production ready content.",
    tags: ["n8n", "Automation SOPs", "Multi Brand"],
    link: "https://www.behance.net/gallery/240005159/BB-E-commerce-Perfume-Catalog-with-Amazon-A-F",
    featured: false,
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const { isDark } = useTheme();

  const filtered = PROJECTS.filter((p) => filter === "All" || p.category === filter);
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="Portfolio | Brand, Packaging & Digital Work | Craftforge"
        description="Browse Craftforge's portfolio ✦ premium brand identities, luxury D2C packaging, high performance websites, and AI powered creative systems, each forged with global craft standards and AI native execution."
        schema={portfolioSchema}
      />
      {/* Hero */}
      <section className="py-9 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: isDark ? "rgba(79,70,229,0.10)" : "rgba(79,70,229,0.06)" }} />
        <div className="relative max-w-3xl mx-auto">
          <CyclingBadge label="Portfolio" className="mb-6" />
          <RevealText text="WHAT WE'VE BUILT"
            className="font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
            style={{ color: textPrimary }} />
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: textMuted }}>
            A studio is its clients. Here's the work ✦ premium D2C, fragrance, beauty brands, and the AI systems that power them. Each project is a proof point of the Craftforge thesis: great brands are engineered, not just designed.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {FILTERS.map((f) => (
              <motion.button key={f} onClick={() => setFilter(f)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all border ${
                  filter === f ? "bg-brand-gradient border-transparent text-white shadow-lg shadow-brand-purple/20" : ""
                }`}
                style={filter !== f ? {
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.80)",
                  border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  color: textMuted,
                } : undefined}>
                {f}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => {
                const col = CATEGORY_COLOR[project.category] ?? "#7C3AED";
                return (
                <motion.div key={project.title} layout
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`group glass-card-hover rounded-3xl overflow-hidden flex flex-col ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
                  style={{
                    background: isDark ? `${col}0d` : "rgba(255,255,255,0.90)",
                    border: `1px solid ${col}${isDark ? "33" : "22"}`,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: isDark ? `0 0 36px ${col}14, inset 0 0 20px ${col}06` : `0 4px 20px rgba(0,0,0,0.06)`,
                  }}>
                  <div className="relative overflow-hidden aspect-video">
                    <img src={project.img} alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy" />
                    <div className="absolute inset-0 bg-brand-purple/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-bold rounded-full text-sm hover:bg-white/90 transition-colors">
                        VIEW ON BEHANCE <ArrowUpRight size={15} />
                      </a>
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                      {project.category}
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-brand-orange rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="font-poppins font-bold text-base md:text-lg leading-tight uppercase" style={{ color: textPrimary }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: textMuted }}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-full font-medium uppercase"
                          style={{ background: `${col}15`, border: `1px solid ${col}20`, color: col }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold hover:text-brand-purple transition-colors mt-1"
                      style={{ color: textMuted }}>
                      <ExternalLink size={12} /> VIEW ON BEHANCE
                    </a>
                  </div>
                </motion.div>
              );})}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-20 text-center" style={{ color: textMuted }}>
              No projects in this category yet ✦ check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Behance CTA */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden"
            style={{
              background: isDark ? "rgba(79,70,229,0.07)" : "rgba(255,255,255,0.90)",
              border: isDark ? "1px solid rgba(79,70,229,0.20)" : "1px solid rgba(79,70,229,0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: isDark ? "0 0 40px rgba(79,70,229,0.12), inset 0 0 24px rgba(79,70,229,0.06)" : "0 8px 40px rgba(79,70,229,0.08)",
            }}>
            <div className="relative z-10">
              <SectionHeading badge="See More" title="FULL PORTFOLIO ON BEHANCE"
                subtext="Browse the complete collection ✦ premium brand systems, luxury packaging, digital products, and AI powered creative work forged by Craftforge." />
              <a href="https://www.behance.net/Designer_Pro_Plus" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient rounded-full font-bold text-white shadow-xl shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow">
                VIEW ON BEHANCE <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
