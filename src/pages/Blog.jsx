import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';

// --- 1. CATEGORY IMAGES (No changes needed) ---
const categoryImages = {
  Project: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop", 
  Education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", 
  Skills: "https://images.unsplash.com/photo-1504384308090-c54be3855463?q=80&w=800&auto=format&fit=crop", 
  default: "https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=800&auto=format&fit=crop" 
};

// --- 2. DATA (Same Data Used) ---
const blogPosts = [
  {
    "id": 1,
    "category": "Project",
    "year": "2024",
    "title": "Building the Vertex Quiz Platform for High Traffic",
    "slug": "vertex-quiz-platform",
    "image": "/images/vertex-quiz-platform.png",
    "techStack": ["React", "Node.js", "MongoDB"],
    "details": "How we engineered a dynamic educational platform for BCS candidates featuring real-time quiz functionality, user progress tracking, and secure authentication handling concurrent users."
  },
  {
    "id": 2,
    "category": "Project",
    "year": "2025",
    "title": "Architecting a Scalable Real Estate Marketplace",
    "slug": "raj-property",
    "image": "/images/raj-property.png",
    "techStack": ["MERN", "Redux", "Architecture"],
    "details": "A deep dive into creating Raj Property. We implemented advanced database schemas for property attributes and a custom dashboard for agents to manage listings efficiently."
  },
  {
    "id": 15,
    "category": "Case Study",
    "year": "2025",
    "title": "Optimizing Local Service Platforms for Speed",
    "slug": "pest-control-rajshahi",
    "image": "/images/pest-control-rajshahi.png",
    "techStack": ["Performance", "Core Web Vitals"],
    "details": "Spearheading the modernization of a legacy stack to Breakdance Builder to achieve sub-second load times and a mobile-first architecture for higher conversion rates."
  },
  {
    "id": 19,
    "category": "Education",
    "year": "2025",
    "title": "My Journey in Computer Science at RUET",
    "slug": "ruet-education",
    "image": "/images/ruet-logo.png",
    "techStack": ["Career", "CSE", "University"],
    "details": "Reflecting on completing my Bachelor of Science in Computer Science and Engineering. Key learnings, algorithm challenges, and the transition from student to professional developer."
  },
  {
    "id": 22,
    "category": "Tech Talk",
    "year": "2025",
    "title": "Mastering the MERN Stack & Modern UI/UX",
    "slug": "key-skills",
    "image": "/images/skills-inventory.png",
    "techStack": ["Full Stack", "Learning Path"],
    "details": "A comprehensive look at my technical inventory. Why I chose React, Node.js, and WordPress for different use cases and how UI/UX design plays a crucial role in development."
  },
  {
    "id": 3,
    "category": "Project",
    "year": "2024",
    "title": "Integrating Complex Data Flows in SaaS",
    "slug": "weblasser-ecosystem",
    "image": "/images/weblasser-ecosystem.png",
    "techStack": ["SaaS", "Integration", "PHP"],
    "details": "Challenges and solutions faced while leading the development of a corporate website and custom Point of Sale (POS) integration for the Weblasser Ecosystem."
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    // CHANGE 1: Main Wrapper using Theme Variables
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-main)] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative transition-colors duration-500">
      
      {/* === BACKGROUND ANIMATION === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 justify-center md:justify-start text-blue-500 font-semibold mb-2"
            >
              <BookOpen size={20} />
              <span>Insights & Articles</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-[var(--theme-text-main)]"
            >
              Latest from the <br/> <span className="text-blue-500">Blog</span>
            </motion.h2>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-80"
          >
            {/* CHANGE 2: Search Input using Theme Variables */}
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-full py-3 pl-12 pr-4 text-[var(--theme-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm placeholder-[var(--theme-text-main)]/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-main)]/50" size={18} />
          </motion.div>
        </div>

        {/* Blog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
          
          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-20 text-[var(--theme-text-main)]/50">
              <p>No articles found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// --- Single Blog Card Component ---
const BlogCard = ({ post }) => {
  // Random Read Time generator logic (Just for UI)
  const readTime = Math.floor(Math.random() * 5) + 3; 

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      // CHANGE 3: Card Styles using Theme Variables
      className="group flex flex-col h-full bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
    >
      {/* Image Wrapper */}
      <div className="relative h-56 overflow-hidden">
        {/* Overlay is optional, kept transparent-dark to ensure text readability if needed, but here removed for cleaner look or kept minimal */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        
        <img 
          src={post.image} 
          alt={post.title}
          onError={(e) => { 
             e.target.onerror = null; 
             e.target.src = categoryImages[post.category] || categoryImages.default;
          }}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-md rounded-md shadow-md">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Data */}
        <div className="flex items-center gap-4 text-xs text-[var(--theme-text-main)]/50 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{post.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime} min read</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--theme-text-main)] mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
          {post.title}
        </h3>

        <p className="text-[var(--theme-text-main)]/70 text-sm mb-4 line-clamp-3 flex-grow">
          {post.details}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.techStack.slice(0, 2).map((tag, idx) => (
            // CHANGE 4: Tags using Theme Variables
            <span key={idx} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[var(--theme-text-main)]/5 text-[var(--theme-text-main)]/70">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mt-auto pt-4 border-t border-[var(--theme-border)]">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--theme-text-main)] group-hover:text-blue-500 transition-colors">
            Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;