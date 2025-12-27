import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, Briefcase } from 'lucide-react';

// --- 1. DATA (No changes needed) ---
const reviews = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "Siyam is an absolute machine when it comes to MERN stack. He architected our entire SaaS platform with scalability in mind. His code is clean, well-documented, and proactive.",
    tag: "SaaS Dev"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Founder, Glow Co.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "Moved from Shopify to custom WordPress. Site speed improved by 300%, conversion doubled. Highly recommended!",
    tag: "WordPress"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO, DataSphere",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "His understanding of Redux and state management is top-notch. Solved issues our previous devs couldn't fix for weeks.",
    tag: "ReactJS"
  },
  {
    id: 4,
    name: "Emily Watson",
    role: "Marketing Dir.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "Modern, sleek, and mobile-responsive design. He has a great eye for design details.",
    tag: "UI/UX"
  },
  {
    id: 5,
    name: "David Ross",
    role: "Owner, Ross Real Estate",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    review: "Great experience. Integrated the map search feature perfectly. Delivered on time.",
    tag: "Full Stack"
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "The migration to Next.js was seamless. Looking forward to our next collaboration.",
    tag: "Next.js"
  },
  {
    id: 7,
    name: "Robert Fox",
    role: "Dev Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    review: "Exceptional problem solver. He fixed our database bottlenecks in record time.",
    tag: "Backend"
  }
];

const brands = ["Vertex Quiz", "Raj Property", "Weblasser", "RAM IT", "Philip Karto", "Gae-Du", "Rent Spot 24"];

const Reviews = () => {
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
      
      {/* === BACKGROUND DECOR === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div variants={blobVariants} animate="animate" className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <motion.div variants={blobVariants} animate="animate" transition={{ delay: 2 }} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-20">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             // CHANGE 2: Badge using theme variables
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-bg)]/50 border border-[var(--theme-border)] shadow-sm mb-6 backdrop-blur-sm"
          >
            <div className="flex -space-x-2">
               {reviews.slice(0,3).map(r => (
                 <img key={r.id} src={r.image} alt="" className="w-6 h-6 rounded-full border-2 border-[var(--theme-bg)] object-cover" />
               ))}
            </div>
            <span className="text-sm font-medium text-[var(--theme-text-main)]/70">Loved by founders</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--theme-text-main)]"
          >
            Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Love.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-[var(--theme-text-main)]/70 text-xl"
          >
            Don't just take my word for it. Here's what clients and teammates have to say about working with me.
          </motion.p>
        </div>

        {/* --- INFINITE BRAND MARQUEE --- */}
        <div className="w-full overflow-hidden mb-20 mask-linear-gradient relative">
            {/* CHANGE 3: Gradients match the theme background */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[var(--theme-bg)] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[var(--theme-bg)] to-transparent z-10"></div>
            
            <motion.div 
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...brands, ...brands, ...brands].map((brand, i) => (
                // Icons using theme opacity
                <div key={i} className="flex items-center gap-2 text-2xl font-bold text-[var(--theme-text-main)]/30 uppercase">
                  <Briefcase size={24} /> {brand}
                </div>
              ))}
            </motion.div>
        </div>

        {/* --- MASONRY GRID LAYOUT --- */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <MasonryCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* --- CTA --- */}
        <div className="mt-24 text-center">
            <motion.a 
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // CHANGE 4: Inverted Button Style (Text color becomes Bg, Bg becomes Text)
              className="inline-flex items-center gap-3 bg-[var(--theme-text-main)] text-[var(--theme-bg)] px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:opacity-90 transition-all"
            >
              Add Your Success Story <ArrowRight />
            </motion.a>
        </div>

      </div>
    </div>
  );
};

// --- HELPER: MASONRY CARD ---
const MasonryCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      // CHANGE 5: Card Styles using theme variables
      className="break-inside-avoid relative group bg-[var(--theme-bg)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 overflow-hidden"
    >
      
      {/* Quote Icon */}
      <div className="mb-4 text-blue-500/20">
        <Quote size={32} />
      </div>

      {/* Text */}
      <p className="text-[var(--theme-text-main)]/80 leading-relaxed mb-6 font-medium">
        "{review.review}"
      </p>

      {/* Footer Info */}
      <div className="flex items-center gap-3 mt-auto">
        <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-[var(--theme-border)]" />
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[var(--theme-text-main)]">{review.name}</h4>
          <p className="text-xs text-[var(--theme-text-main)]/50">{review.role}</p>
        </div>
        
        {/* Rating or Tag */}
        <div className="text-right">
           <div className="flex text-yellow-500 mb-1">
             {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#eab308" />)}
           </div>
           {/* Tag using theme opacity */}
           <span className="text-[10px] uppercase font-bold text-[var(--theme-text-main)]/60 bg-[var(--theme-text-main)]/5 px-2 py-1 rounded">
             {review.tag}
           </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Reviews;