import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, ShoppingCart, Rocket, Database, Globe, ArrowRight, Zap, Award, Users, Coffee } from 'lucide-react';

// --- SERVICE DATA (No changes needed here, colors work on both themes) ---
const services = [
  {
    id: 1,
    colSpan: "md:col-span-2",
    title: "Full Stack Development",
    subtitle: "MERN & Next.js",
    description: "Building scalable, enterprise-grade web applications. From complex backend architecture to responsive frontend interfaces.",
    icon: Code,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tags: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: 2,
    colSpan: "md:col-span-1",
    title: "UI/UX Design",
    subtitle: "Figma & Prototyping",
    description: "Designing interfaces that are intuitive, accessible, and visually stunning.",
    icon: Layout,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tags: ["Figma", "Framing", "User Research"]
  },
  {
    id: 3,
    colSpan: "md:col-span-1",
    title: "E-Commerce",
    subtitle: "WooCommerce & Custom",
    description: "Robust online stores with secure payment gateways and inventory management.",
    icon: ShoppingCart,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    tags: ["WooCommerce", "Stripe", "Dashboard"]
  },
  {
    id: 4,
    colSpan: "md:col-span-2",
    title: "Advanced WordPress",
    subtitle: "Custom Themes & Plugins",
    description: "Moving beyond page builders. We create custom themes and plugins optimized for speed, security, and SEO.",
    icon: Globe,
    color: "text-green-500",
    bg: "bg-green-500/10",
    tags: ["PHP", "Theme Dev", "Speed Opt", "Security"]
  },
  {
    id: 5,
    colSpan: "md:col-span-1",
    title: "Performance",
    subtitle: "Speed Optimization",
    description: "Achieving 90+ Core Web Vitals and sub-second load times.",
    icon: Rocket,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tags: ["Vitals", "Caching", "CDN"]
  },
  {
    id: 6,
    colSpan: "md:col-span-1",
    title: "Backend API",
    subtitle: "Scalable Architecture",
    description: "Secure RESTful APIs and database schema design.",
    icon: Database,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    tags: ["REST", "GraphQL", "Schema"]
  }
];

// --- STATS DATA ---
const stats = [
  { label: "Projects Completed", value: "50+", icon: Award },
  { label: "Happy Clients", value: "30+", icon: Users },
  { label: "Years Experience", value: "4+", icon: Zap },
  { label: "Cups of Coffee", value: "1200+", icon: Coffee },
];

const Services = () => {
  // Background Animation
  const blobVariants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -50, 20, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    }
  };

  return (
    // CHANGE 1: Main Wrapper using Theme Variables
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-main)] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative transition-colors duration-500">
      
      {/* === BACKGROUND ANIMATION === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern updated to be subtle on both themes */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div variants={blobVariants} animate="animate" className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <motion.div variants={blobVariants} animate="animate" transition={{ delay: 2 }} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            // CHANGE 2: Badge using theme variables
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-bg)]/50 backdrop-blur-md border border-[var(--theme-border)] mb-6 text-sm font-medium text-[var(--theme-text-main)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--theme-text-main)]"
          >
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Scale.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-[var(--theme-text-main)]/70 text-xl leading-relaxed"
          >
            From concept to code, we deliver high-end software solutions tailored for growth-focused businesses.
          </motion.p>
        </div>

        {/* --- STATS SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[var(--theme-bg)]/40 border border-[var(--theme-border)] text-center backdrop-blur-sm">
              <div className="flex justify-center mb-3 text-blue-500">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold text-[var(--theme-text-main)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--theme-text-main)]/60 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* --- BENTO GRID SERVICES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* --- UNIQUE CTA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          // CHANGE 3: CTA Card using theme variables (Consistent with About Page)
          className="relative rounded-[2rem] overflow-hidden bg-[var(--theme-bg)] border border-[var(--theme-border)] p-12 md:p-20 text-center shadow-xl"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--theme-text-main)] mb-6">Have an idea? Let's build it.</h2>
            <p className="text-[var(--theme-text-main)]/70 mb-10 max-w-xl mx-auto text-lg">
              Unlock the full potential of your business with our expert development services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Inverted Button: Bg matches text color, Text matches bg color */}
              <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-[var(--theme-text-main)] text-[var(--theme-bg)] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Book a Call <ArrowRight size={20} />
              </a>
              {/* Outline Button */}
              <a href="/projects" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[var(--theme-text-main)] border border-[var(--theme-border)] hover:bg-[var(--theme-text-main)]/5 transition-all">
                View Work
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- HELPER: BENTO CARD ---
const BentoCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      // CHANGE 4: Card Styles using theme variables
      className={`${service.colSpan} group relative p-8 rounded-3xl bg-[var(--theme-bg)] border border-[var(--theme-border)] hover:border-blue-500/50 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-blue-500 to-purple-500`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={28} />
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--theme-text-main)]/5 border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-text-main)]/70 uppercase tracking-wider">
            {service.subtitle}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-[var(--theme-text-main)] mb-3">
          {service.title}
        </h3>
        
        <p className="text-[var(--theme-text-main)]/70 mb-6 flex-grow leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-medium px-2 py-1 rounded-md bg-[var(--theme-text-main)]/5 text-[var(--theme-text-main)]/60 border border-[var(--theme-border)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;