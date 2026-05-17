import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import CyclingBadge from "../components/CyclingBadge";

const FILTERS = ["All", "Graphic Design", "Video", "Ecommerce", "Automation"];

const CATEGORY_COLOR: Record<string, string> = {
  "Graphic Design": "#7C3AED",
  "Video": "#4F46E5",
  "Ecommerce": "#F97316",
  "Automation": "#10B981",
};

const PROJECTS = [
  {
    title: "AI Brand Visual System",
    category: "Graphic Design",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/0b2bd1239980485.Y3JvcCwxNTAwLDExNzMsMCww.png",
    desc: "Complete AI powered brand visual identity and social media creative system for India's first pure parfum luxury fragrance brand. Delivered 120+ assets in 5 days.",
    tags: ["Brand Identity", "AI Design", "Social Media"],
    link: "https://www.behance.net/gallery/239980485/E-commerce-Listing-Pack-Amazon-A-Premium",
    featured: true,
  },
  {
    title: "AI Motion Content Pipeline",
    category: "Video",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/28d30a240008013.Y3JvcCwxNTAwLDExNzMsMCww.png",
    desc: "AI generated short form video and motion content pipeline for luxury fragrance brand. Built reusable templates for 3 platform formats.",
    tags: ["Video", "Motion", "AI Pipeline"],
    link: "https://www.behance.net/gallery/240008013/Ai-Video-Content-Suite-BB-Premium-Perfume-Ecommerce",
    featured: false,
  },
  {
    title: "E commerce Listing Pack Amazon & Flipkart",
    category: "Ecommerce",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/b893fa247458413.Y3JvcCwxNTAwLDExNzMsMCwyNTI.png",
    desc: "Complete AI-powered e-commerce listing pack with product visuals, infographics, and A+ content built for Amazon and Flipkart at scale.",
    tags: ["Amazon", "Flipkart", "Product Visuals"],
    link: "https://www.behance.net/gallery/247458413/All-E-commerce-Listing-Pack-Amazon-Flipkart",
    featured: true,
  },
  {
    title: "AI Content Automation Pipeline",
    category: "Automation",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/df0e2c240005159.Y3JvcCwxMzUwLDEwNTUsMCwxMw.png",
    desc: "End to end n8n automation pipeline for content creation, scheduling, and multi platform publishing. Reduced manual effort by 67%.",
    tags: ["n8n", "Automation", "AI Agents"],
    link: "https://www.behance.net/gallery/240005159/BB-E-commerce-Perfume-Catalog-with-Amazon-A-F",
    featured: false,
  },
  {
    title: "AI Prompt Engineering System",
    category: "Automation",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/6ecd1e247630553.Y3JvcCw5NTEsNzQ0LDIyMyww.png",
    desc: "Reusable prompt libraries and AI production systems for consistent brand visual output across all platforms and team members.",
    tags: ["Prompt Library", "AI Systems", "Workflow"],
    link: "https://www.behance.net/gallery/247630553/Craftforge-AI-Powered-Creative-Ecommerce-Website",
    featured: false,
  },
  {
    title: "AI Print on Demand Design System",
    category: "Graphic Design",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/4b1708216067635.Y3JvcCw1NDY1LDQyNzUsMTIxLDA.jpg",
    desc: "Scalable print on demand design system with reusable templates and AI assisted graphic generation across 300+ SKUs for multiple niches.",
    tags: ["POD", "300+ SKUs", "Template System"],
    link: "https://www.behance.net/gallery/216067635/T-SHIRT-DESIGN",
    featured: false,
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filtered = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter
  );

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <CyclingBadge label="Portfolio" className="mb-6" />
          <RevealText
            text="WHAT WE'VE BUILT"
            className="text-white font-poppins font-bold text-4xl md:text-6xl leading-tight justify-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-grey text-lg leading-relaxed"
          >
            Real work, real results. Every project below was built using AI first methodology faster, smarter, and at scale.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all border ${
                  filter === f
                    ? "bg-brand-gradient border-transparent text-white shadow-lg shadow-brand-purple/20"
                    : "border-white/10 text-brand-grey hover:border-brand-purple/30 hover:text-white"
                }`}
                style={filter !== f ? {
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                } : undefined}
              >
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
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => {
                const col = CATEGORY_COLOR[project.category] ?? "#7C3AED";
                return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`group glass-card-hover rounded-3xl overflow-hidden flex flex-col ${
                    project.featured ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  style={{
                    background: `${col}0d`,
                    border: `1px solid ${col}33`,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: `0 0 36px ${col}14, inset 0 0 20px ${col}06`,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-purple/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-bold rounded-full text-sm hover:bg-white/90 transition-colors"
                      >
                        VIEW ON BEHANCE <ArrowUpRight size={15} />
                      </a>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                      {project.category}
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-brand-orange rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="font-poppins font-bold text-base md:text-lg text-white leading-tight uppercase"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-brand-grey text-sm leading-relaxed flex-1"
                    >
                      {project.desc}
                    </motion.p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-brand-purple/15 border border-brand-purple/20 text-brand-purple font-medium uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-brand-grey hover:text-brand-purple transition-colors mt-1"
                    >
                      <ExternalLink size={12} /> VIEW ON BEHANCE
                    </a>
                  </div>
                </motion.div>
              );})}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-brand-grey">
              No projects in this category yet check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Behance CTA */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden border border-brand-indigo/20"
            style={{
              background: "rgba(79,70,229,0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(79,70,229,0.12), inset 0 0 24px rgba(79,70,229,0.06)",
            }}
          >
            <div className="absolute inset-0 bg-brand-indigo/5 pointer-events-none" />
            <div className="relative z-10">
              <SectionHeading
                badge="See More"
                title="FULL PORTFOLIO ON BEHANCE"
                subtext="Browse the complete collection of AI powered creative work brands, products, motion, and more."
              />
              <a
                href="https://www.behance.net/Designer_Pro_Plus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient rounded-full font-bold text-white shadow-xl shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow"
              >
                VIEW ON BEHANCE <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
