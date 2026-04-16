/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronDown, Menu, X, Instagram, Linkedin, ExternalLink, MessageCircle, Palette, Film, Globe, ShoppingBag, Settings, Cpu } from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";

// --- Constants ---
const LOGO_WORDS = [
  "Craftforge",
  "Craftforge.studio",
  "Craft",
  "Forge",
  "Studio",
];

const HERO_WORDS = [
  "AI Graphic Design",
  "Ecommerce Creative",
  "AI Video",
  "AI Automation",
  "Vibe Code",
];

const SERVICES = [
  {
    icon: <Palette className="w-10 h-10 icon-3d" />,
    title: "AI Graphic Design",
    description: "Brand visuals → product graphics → campaign creatives from single prompts",
    delay: 0,
  },
  {
    icon: <Film className="w-10 h-10 icon-3d" />,
    title: "AI Video → Motion",
    description: "Short form video → motion content → visual storytelling at scale",
    delay: 100,
  },
  {
    icon: <Globe className="w-10 h-10 icon-3d" />,
    title: "Vibe Code → AI Websites",
    description: "Intelligent conversion focused websites built with AI assisted development",
    delay: 200,
  },
  {
    icon: <ShoppingBag className="w-10 h-10 icon-3d" />,
    title: "Ecommerce Creative",
    description: "High converting product visuals → marketplace content for Amazon Shopify and more",
    delay: 300,
  },
  {
    icon: <Settings className="w-10 h-10 icon-3d" />,
    title: "AI Automation",
    description: "Autonomous pipelines using n8n Make and AI agents that eliminate repetitive work",
    delay: 400,
  },
  {
    icon: <Cpu className="w-10 h-10 icon-3d" />,
    title: "Generative AI Systems",
    description: "Prompt libraries → reusable AI pipelines → production systems built to scale",
    delay: 500,
  },
];

const PORTFOLIO_PROJECTS = [
  { 
    title: "AI Brand Visual System", 
    category: "Graphic Design", 
    img: "https://picsum.photos/seed/bergamot1/600/400", 
    desc: "Complete AI powered brand visual identity and social media creative system for India's first pure parfum luxury fragrance brand",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
  { 
    title: "AI Motion Content Pipeline", 
    category: "Video", 
    img: "https://picsum.photos/seed/bergamot2/600/400", 
    desc: "AI generated short form video and motion content pipeline for luxury fragrance brand social media presence",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
  { 
    title: "AI Ecommerce Visual System", 
    category: "Ecommerce", 
    img: "https://picsum.photos/seed/wizeprint1/600/400", 
    desc: "Scaled AI powered product photography and listing visuals across Amazon Flipkart Etsy and Redbubble for print on demand brand",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
  { 
    title: "AI Content Automation Pipeline", 
    category: "Automation", 
    img: "https://picsum.photos/seed/wizeprint2/600/400", 
    desc: "Built end to end n8n automation pipeline for content creation scheduling and multi platform publishing",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
  { 
    title: "AI Prompt Engineering System", 
    category: "Automation", 
    img: "https://picsum.photos/seed/bergamot3/600/400", 
    desc: "Reusable prompt libraries and AI production systems for consistent brand visual output across all platforms",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
  { 
    title: "AI POD Design System", 
    category: "Graphic Design", 
    img: "https://picsum.photos/seed/wizeprint3/600/400", 
    desc: "Built scalable print on demand design system with reusable templates and AI assisted graphic generation across 300 plus SKUs",
    link: "https://www.behance.net/Designer_Pro_Plus"
  },
];

const STATS = [
  { number: "9x", label: "Faster creative production" },
  { number: "1000+", label: "AI powered digital assets delivered" },
  { number: "67%", label: "Manual workload reduction" },
  { number: "6+", label: "Major marketplaces scaled" },
];

// --- Components ---

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number;
    let h: number;

    const setCanvasSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const starCount = 400;
    const stars: { x: number; y: number; z: number; prevZ: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        prevZ: 0,
      });
    }

    const speed = 5; // Increased speed for more energy

    const animate = () => {
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;

      const centerX = w / 2;
      const centerY = h / 2;

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 2000;
          star.prevZ = 2000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const x = centerX + (star.x / star.z) * 1000;
        const y = centerY + (star.y / star.z) * 1000;

        const px = centerX + (star.x / star.prevZ) * 1000;
        const py = centerY + (star.y / star.prevZ) * 1000;

        // Opacity based on Z (closer = brighter)
        const opacity = Math.min(1, (2000 - star.z) / 1500);
        ctx.globalAlpha = opacity;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "#0D0D0D" }}
    />
  );
};

const HeroTypewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    if (subIndex === HERO_WORDS[index].length + 1 && !reverse) {
      setPause(true);
      setTimeout(() => {
        setReverse(true);
        setPause(false);
      }, 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % HERO_WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, pause]);

  return (
    <span className="text-brand-purple font-poppins font-medium">
      {HERO_WORDS[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Logo = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [pause, setPause] = useState(false);
  const [showShine, setShowShine] = useState(false);

  useEffect(() => {
    if (pause) return;

    if (subIndex === LOGO_WORDS[index].length + 1 && !reverse) {
      setPause(true);
      setShowShine(true);
      setTimeout(() => {
        setReverse(true);
        setPause(false);
        setShowShine(false);
      }, 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % LOGO_WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, pause]);

  return (
    <div className="flex items-center gap-2">
      <span className={`font-poppins font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-brand-purple to-brand-blue ${showShine ? "animate-logo-shine-text" : ""}`}>
        {LOGO_WORDS[index].substring(0, subIndex)}
        <span className="animate-pulse text-brand-blue">|</span>
      </span>
    </div>
  );
};

const Navbar = () => {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [80, 60]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      style={{ height, backgroundColor: `rgba(13, 13, 13, ${bgOpacity.get()})` }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 backdrop-blur-sm border-b border-white/5"
    >
      <Logo />
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Services", "Portfolio", "About", "Contact"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative font-medium text-sm hover:text-brand-purple transition-colors group"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-purple transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <motion.a
          href="https://wa.me/919641547271"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, backgroundImage: "linear-gradient(to right, #7D3C98, #3498DB)" }}
          className="px-6 py-2 bg-brand-purple text-white rounded-full text-sm font-bold transition-all inline-block"
        >
          Lets Build
        </motion.a>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {["Services", "Portfolio", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                {link}
              </a>
            ))}
            <a 
              href="https://wa.me/919641547271"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-brand-purple rounded-full font-bold text-center block"
            >
              Lets Build
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const RevealText = ({ text, className = "", delay = 0, stagger = 0.02 }: { text: string; className?: string; delay?: number; stagger?: number }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-0 ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-5%" }}
              transition={{ 
                duration: 0.5, 
                delay: delay + (wordIndex * 0.1) + (charIndex * stagger), 
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtext, centered = true }: { title: string; subtext?: string; centered?: boolean }) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <RevealText 
        text={title} 
        className={`text-3xl md:text-6xl font-poppins font-bold ${centered ? "justify-center" : "justify-start"}`} 
      />
      {subtext && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`text-brand-grey text-base md:text-xl max-w-2xl mt-4 md:mt-6 ${centered ? "mx-auto" : ""}`}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
};

interface CountUpProps {
  end: string;
  label: string;
  key?: string | number;
}

const CountUp = ({ end, label }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const endNum = parseInt(end.replace(/[^0-9]/g, ""));
          const duration = endNum > 500 ? 2500 : endNum > 50 ? 2000 : 1500;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * endNum));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endNum);
            }
          };

          requestAnimationFrame(animate);
        } else {
          // Reset when out of view
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-poppins font-bold mb-2">
        {count}{end.replace(/[0-9]/g, "")}
      </div>
      <div className="text-sm md:text-base text-white/80 font-medium">{label}</div>
    </div>
  );
};

const ProfileIllustration = () => {
  return (
    <div className="relative w-[320px] h-[320px] group">
      {/* Glow Ring */}
      <div className="absolute inset-0 rounded-full p-[4px] animate-[profile-ring-rotate_6s_linear_infinite] group-hover:animate-[profile-ring-rotate_3s_linear_infinite]"
           style={{ background: "conic-gradient(from 0deg, #7D3C98, #3498DB, #7D3C98)" }}>
        <div className="w-full h-full rounded-full bg-brand-dark" />
      </div>
      
      {/* Image Container */}
      <div className="absolute inset-[8px] rounded-full overflow-hidden bg-linear-to-br from-[#1A0A2E] to-[#0D0D0D]">
        <img
          src="DRX_SM.webp"
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Who Built This Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-dark/40 backdrop-blur-[2px]">
          <span className="font-poppins font-bold text-white text-xl">Who Built This</span>
        </div>
      </div>

      {/* Orbiting Particles */}
      {[0, 90, 180, 270].map((angle, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-brand-purple rounded-full blur-[1px]"
          style={{
            animation: `particle-orbit ${10 + i * 2}s linear infinite`,
            animationDelay: `-${i * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const HorizontalScrollSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // On mobile (1 item per view), we move further.
  // Desktop: 6 items, 2 per view -> move 4 items (4/6 * 100% = 66.66%)
  // Mobile: 6 items, 1 per view -> move 5 items (5/6 * 100% = 83.33%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]);

  return (
    <section id="services" ref={targetRef} className="relative h-[500vh] bg-brand-dark/50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        <div className="px-6 md:px-12 mb-6 md:mb-12">
          <SectionHeading
            title="What We Build"
            subtext="End to end AI creative systems for brands that want to move fast"
            centered={false}
          />
        </div>
        
        <div className="flex flex-col">
          <motion.div 
            style={{ x }} 
            className="flex gap-4 md:gap-6 px-6 md:px-12 w-fit"
          >
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85vw] md:w-[calc(50vw-4rem)] h-[50vh] md:h-[60vh] p-6 md:p-12 bg-white/5 border border-white/10 rounded-3xl flex flex-col justify-center gap-4 md:gap-6 group hover:border-brand-purple/50 hover:bg-white/[0.07] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-brand-purple group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                
                <div className="space-y-2 md:space-y-4">
                  <h3 className="text-xl md:text-4xl font-poppins font-bold group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-grey text-sm md:text-xl leading-relaxed group-hover:text-white/90 transition-colors max-w-xl line-clamp-3 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-brand-purple font-bold group-hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                  Learn More <ChevronDown className="-rotate-90" size={16} />
                </div>

                <div className="absolute -right-8 -bottom-8 w-24 h-24 md:w-32 md:h-32 bg-brand-purple/10 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-colors" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HorizontalPortfolioSection = ({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const filteredProjects = PORTFOLIO_PROJECTS.filter(p => filter === "All" || p.category === filter);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const count = filteredProjects.length;
  // Mobile: 1 item per view -> move (count - 1) / count
  // Desktop: 2 items per view -> move (count - 2) / count
  // We use a safe default that works for both or adjust with media queries in CSS if needed, 
  // but here we can use a slightly larger shift to ensure all items are seen on mobile.
  const shiftPercentage = count <= 1 ? 0 : ((count - 1) / count) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${shiftPercentage}%`]);

  return (
    <section id="portfolio" ref={targetRef} className="relative h-[500vh] bg-brand-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        <div className="px-6 md:px-12 mb-6">
          <SectionHeading
            title="What We Have Built"
            subtext="Real work → real results → built with AI"
            centered={false}
          />
          
          <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
            {["All", "Graphic Design", "Video", "Ecommerce", "Automation", "Websites"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all border ${
                  filter === t 
                    ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                    : "bg-white/5 border-white/10 text-brand-grey hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <motion.div 
            style={{ x }} 
            className="flex gap-4 md:gap-6 px-6 md:px-12 w-fit"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-[85vw] md:w-[calc(50vw-4rem)] group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-purple/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <span className="font-bold text-white flex items-center gap-2 text-sm">
                        View Work <ExternalLink size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <h4 className="font-poppins font-bold text-lg md:text-2xl line-clamp-1">{project.title}</h4>
                      <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-brand-blue/20 text-brand-blue rounded">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-brand-grey text-xs md:text-base mb-4 md:mb-6 line-clamp-2">{project.desc}</p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-brand-purple hover:text-brand-blue transition-colors"
                    >
                      View Project → Behance
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="relative">
      <Starfield />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <div className="relative z-10 max-w-[900px] w-full flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-1 bg-brand-purple/20 border border-brand-purple/30 rounded-full text-brand-purple text-xs font-bold uppercase tracking-widest"
          >
            AI Powered Creative Studio
          </motion.div>

          <RevealText 
            text="We Build Intelligent Brands With AI"
            className="text-white font-poppins font-bold text-3xl sm:text-4xl md:text-[64px] leading-tight tracking-tight justify-center"
          />

          <div className="text-xl md:text-2xl min-h-[1.5em]">
            <HeroTypewriter />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <RevealText 
              text="From one prompt to a complete brand system → faster smarter at scale."
              className="text-brand-grey font-inter text-lg md:text-xl max-w-[700px] justify-center"
              delay={1.2}
              stagger={0.03}
            />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <motion.a
              href="#portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#3498DB" }}
              className="px-8 py-4 bg-brand-purple text-white rounded-full font-bold transition-colors duration-300 shadow-xl shadow-brand-purple/20 text-center"
            >
              See Our Work
            </motion.a>
            <motion.a
              href="https://wa.me/919641547271"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ backgroundColor: "#3498DB", color: "#FFFFFF" }}
              className="px-8 py-4 border-2 border-brand-blue text-brand-blue rounded-full font-bold transition-all duration-300 text-center"
            >
              Lets Talk
            </motion.a>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Services Section */}
      <HorizontalScrollSection />

      {/* Portfolio Section */}
      <HorizontalPortfolioSection filter={filter} setFilter={setFilter} />

      <div className="py-12 text-center bg-brand-dark">
        <a 
          href="https://www.behance.net/Designer_Pro_Plus" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 border-2 border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors"
        >
          See Full Portfolio → Behance
        </a>
      </div>

      {/* Results Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient -skew-y-3 origin-left scale-110" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <CountUp key={i} end={stat.number} label={stat.label} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <ProfileIllustration />
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <RevealText 
                text="Jahiruddin Sekh"
                className="text-2xl font-poppins font-bold justify-start"
              />
              <RevealText 
                text="AI Creative Strategist → Prompt Engineer → Vibe Code Builder"
                className="text-brand-purple font-medium justify-start"
                delay={0.3}
                stagger={0.03}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {["AI Design", "Video", "Automation", "Vibe Code", "Prompt Engineering"].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.08 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/919641547271" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-brand-purple rounded-full font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 transition-transform"
                >
                  Work With Me
                </a>
                <a 
                  href="https://wa.me/919641547271" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-brand-blue text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all"
                >
                  Lets Talk
                </a>
              </div>
              <p className="text-sm text-brand-grey">or email → <a href="mailto:hello@craftforge.studio" className="text-brand-purple hover:underline">hello@craftforge.studio</a></p>
            </div>

            <a 
              href="https://wa.me/919641547271" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit px-6 py-3 bg-brand-green text-white rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={20} /> Chat on WhatsApp 📱
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <SectionHeading
          title="Ready to Build Something Intelligent?"
          subtext="Lets create your AI powered brand system → together"
        />

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Name</label>
            <input type="text" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-purple outline-none transition-colors" placeholder="Your Name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Email</label>
            <input type="email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-purple outline-none transition-colors" placeholder="hello@example.com" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Budget</label>
            <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-purple outline-none transition-colors appearance-none">
              <option className="bg-brand-dark">Select Budget Range</option>
              <option className="bg-brand-dark">₹1,000 → ₹25,000</option>
              <option className="bg-brand-dark">₹25,000 → ₹75,000</option>
              <option className="bg-brand-dark">₹75,000 → ₹2,00,000</option>
              <option className="bg-brand-dark">Custom Budget</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Message</label>
            <textarea rows={4} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-purple outline-none transition-colors resize-none" placeholder="Tell us about your project" />
          </div>
          
          <div className="md:col-span-2 flex flex-col items-center gap-8 mt-4">
            <motion.a
              href="https://wa.me/919641547271"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(125, 60, 152, 0.4)" }}
              className="w-full md:w-fit px-12 py-4 bg-brand-purple rounded-full font-bold text-lg text-center inline-block"
            >
              Lets Build
            </motion.a>

            <a 
              href="https://wa.me/919641547271" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-green font-bold hover:opacity-80 transition-opacity"
            >
              <MessageCircle size={24} /> Chat on WhatsApp 📱
            </a>
          </div>
        </form>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-brand-grey font-medium">hello@craftforge.studio</p>
          <div className="flex gap-6">
            {[
              { Icon: Linkedin, link: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/", label: "LinkedIn" },
              { Icon: Instagram, link: "https://www.instagram.com/designerpro_plus/", label: "Instagram personal" },
              { Icon: Instagram, link: "https://www.instagram.com/craftforge.studio/", label: "Instagram Craftforge" },
              { Icon: Palette, link: "https://www.behance.net/Designer_Pro_Plus/", label: "Behance" },
            ].map(({ Icon, link, label }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple transition-colors group/social"
              >
                <Icon size={20} />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-purple text-white text-[10px] rounded opacity-0 group-hover/social:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-gradient opacity-50" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-brand-grey text-sm">Infinite possibilities, one solution.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-brand-grey">
            {["Services", "Portfolio", "About", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          <p className="text-brand-grey text-xs">© 2026 Craftforge.studio → All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
