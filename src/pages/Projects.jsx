import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Code2, Layers, GraduationCap, Briefcase } from 'lucide-react';

// --- 1. DATA (আপনার দেওয়া ডেটা এখানে পেস্ট করা হয়েছে) ---
// আমি ডেটার সাথে একটি 'category' ফিল্ড যুক্ত করেছি যাতে ফিল্টার করা সহজ হয়।
const allData = [
  {
    "id": 1,
    "category": "Project",
    "company": "Vertex Quiz Platform",
    "year": "2024",
    "title": "Educational Platform for BCS Candidates",
    "slug": "vertex-quiz-platform",
    "results": ["Real-time quiz", "User progress tracking", "High traffic management"],
    "link": "https://vertexforbcs.org",
    "image": "/images/vertex-quiz-platform.png",
    "techStack": ["MongoDB", "Express", "React", "Node.js"],
    "details": "Developed a dynamic educational platform for BCS candidates featuring real-time quiz functionality."
  },
  {
    "id": 2,
    "category": "Project",
    "company": "Raj Property",
    "year": "2025",
    "title": "Scalable Real Estate Marketplace",
    "slug": "raj-property",
    "results": ["Advanced Property Search", "Agent Dashboard", "Scalable Schema"],
    "link": "https://rajproperty.site",
    "image": "/images/raj-property.png",
    "techStack": ["MERN Stack", "Redux", "REST API"],
    "details": "Architecting a scalable Real Estate Marketplace allowing users to list, search, and filter properties."
  },
  {
    "id": 3,
    "category": "Project",
    "company": "Weblasser Ecosystem",
    "year": "2024",
    "title": "Corporate Website & Custom SaaS",
    "slug": "weblasser-ecosystem",
    "results": ["Custom POS", "Complex Data Flow", "Team Leadership"],
    "link": "https://weblasser.com",
    "image": "/images/weblasser-ecosystem.png",
    "techStack": ["WordPress", "SaaS", "PHP"],
    "details": "Led the development of a corporate website and collaborated on a team to build a custom POS solution."
  },
  {
    "id": 4,
    "category": "Project",
    "company": "RAM IT Agency",
    "year": "2024",
    "title": "High-Performance Agency SPA",
    "slug": "ram-it-agency",
    "results": ["SPA Architecture", "Rapid Load Times", "Reusable Components"],
    "link": "https://ramitbd.com",
    "image": "/images/ram-it-agency.png",
    "techStack": ["React.js", "Tailwind CSS"],
    "details": "Built a high-performance Single Page Application (SPA) for a digital agency."
  },
  {
    "id": 5,
    "category": "Project",
    "company": "Philip Karto",
    "year": "2024",
    "title": "Bespoke Luxury E-Commerce",
    "slug": "philipkarto-luxury-store",
    "results": ["Custom Theme", "Pixel-perfect Design", "Optimized Checkout"],
    "link": "https://philipkarto.com",
    "image": "/images/philipkarto.png",
    "techStack": ["WooCommerce", "PHP", "CSS"],
    "details": "Developed a bespoke e-commerce experience for a luxury brand with a custom WordPress theme."
  },
  {
    "id": 6,
    "category": "Project",
    "company": "Gae-Du Aggregator",
    "year": "2024",
    "title": "Hybrid Content Aggregation",
    "slug": "gae-du-aggregator",
    "results": ["Python RSS Integration", "Automated Content", "Unified UI"],
    "link": "https://gae-du.com",
    "image": "/images/gae-du.png",
    "techStack": ["WordPress", "Python", "RSS"],
    "details": "A hybrid content platform featuring a custom Python integration to parse and generate custom RSS feeds."
  },
  {
    "id": 7,
    "category": "Project",
    "company": "VL Strategies",
    "year": "2024",
    "title": "Secure Digital Vault",
    "slug": "vl-strategies",
    "results": ["Secure Vault", "Tiered Subscription", "Recurring Billing"],
    "link": "https://vlstrategies.com",
    "image": "/images/vl-strategies.png",
    "techStack": ["WordPress", "MemberPress"],
    "details": "Built a secure Digital Vault and membership platform with tiered subscription levels."
  },
  {
    "id": 8,
    "category": "Project",
    "company": "Rent Spot 24",
    "year": "2024",
    "title": "Car Rental Marketplace",
    "slug": "rent-spot-24",
    "results": ["Advanced Filtering", "Booking Calendars", "Location-Based"],
    "link": "https://rentspot24.com",
    "image": "/images/rent-spot-24.png",
    "techStack": ["WordPress", "Booking Engine"],
    "details": "Created a car rental marketplace with advanced filtering and booking calendars."
  },
  // ... (Other projects can be added here following the same pattern)
  {
    "id": 15,
    "category": "Project",
    "company": "Pest Control Rajshahi",
    "year": "2025",
    "title": "Local Service Platform",
    "slug": "pest-control-rajshahi",
    "results": ["90+ Core Web Vitals", "Sub-second Load", "Mobile-First"],
    "link": "https://pestcontrolrajshahi.com",
    "image": "/images/pest-control-rajshahi.png",
    "techStack": ["WordPress", "Breakdance", "CSS Grid"],
    "details": "Migrating from a legacy stack to Breakdance Builder to achieve sub-second load times."
  },
  {
    "id": 19,
    "category": "Education",
    "company": "RUET",
    "year": "2025",
    "title": "B.Sc. in CSE",
    "slug": "ruet-education",
    "results": ["CGPA: 2.59", "Rajshahi, Bangladesh"],
    "link": "#",
    "image": "/images/ruet-logo.png",
    "techStack": ["Education", "B.Sc.", "CSE"],
    "details": "Completed Bachelor of Science in Computer Science and Engineering from RUET."
  },
  {
    "id": 20,
    "category": "Education",
    "company": "Notre Dame College",
    "year": "2016",
    "title": "HSC (Science)",
    "slug": "notre-dame-college",
    "results": ["GPA: 5.00", "Dhaka Board"],
    "link": "#",
    "image": "/images/ndc-logo.png",
    "techStack": ["Education", "HSC", "Science"],
    "details": "Completed Higher Secondary Certificate from the prestigious Notre Dame College, Dhaka."
  },
  {
    "id": 22,
    "category": "Skills",
    "company": "Technical Inventory",
    "year": "2025",
    "title": "Full Stack & UI/UX",
    "slug": "key-skills",
    "results": ["MERN Stack", "WordPress", "System Design"],
    "link": "#",
    "image": "/images/skills-inventory.png",
    "techStack": ["React", "Node.js", "MongoDB", "Figma"],
    "details": "Comprehensive expertise in the MERN stack, WordPress development, and UI/UX design."
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  // Filter Logic
  const filteredProjects = filter === 'All' 
    ? allData 
    : allData.filter(item => item.category === filter);

  // Background Animation Variants
  const blobVariants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -50, 20, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative transition-colors duration-500">
      
      {/* === ANIMATED BACKGROUND (Same as Contact Page) === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div variants={blobVariants} animate="animate" className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <motion.div variants={blobVariants} animate="animate" transition={{ delay: 2 }} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800"
          >
            Portfolio & Experience
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-6"
          >
            My Recent <span className="text-blue-600 dark:text-blue-500">Work</span>
          </motion.h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Project', 'Education', 'Skills'].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === item
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// --- Single Project Card Component ---
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Image / Gradient Placeholder if no image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 opacity-60" />
        {/* Placeholder logic: You can replace src with real images */}
        <img 
          src={project.image} 
          alt={project.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"; }} // Fallback image
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge on Image */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-bold text-white bg-blue-600/90 backdrop-blur-md rounded-full shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-1">
              {project.category === 'Education' ? <GraduationCap size={16}/> : <Briefcase size={16}/> }
              <span>{project.company}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {project.details}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
              <Code2 size={10} /> {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Footer: Year & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <Calendar size={14} />
            <span>{project.year}</span>
          </div>
          
          {project.link !== "#" && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Details <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;