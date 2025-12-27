import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Database, Layout, Server, Zap, Coffee, 
  ArrowRight, Github, Linkedin, Mail, Twitter,
  Cpu, Globe 
} from 'lucide-react';

// আপনার ইমেজের পাথ ঠিক আছে কিনা দেখে নেবেন
import jamilImg from "../assets/img/jamil.png";
import nagibImg from "../assets/img/nagib.png";
import siyamImg from "../assets/img/siyam.png";

const About = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  const teamMembers = [
    {
      name: "Md. Jamil Shikder",
      role: "Lead Developer",
      image: jamilImg, 
      socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
      name: "Nagib",
      role: "Frontend Developer", 
      image: nagibImg, 
      socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
      name: "Siyam",
      role: "Backend Engineer", 
      image: siyamImg, 
      socials: { github: "#", linkedin: "#", twitter: "#" }
    }
  ];

  return (
    // CHANGE 1: Main Wrapper using CSS Variables
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-main)] font-sans selection:bg-teal-500 selection:text-white transition-colors duration-500 overflow-x-clip">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Gradients (Optional: kept specific colors for mood) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
           {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-teal-500/10 text-teal-500 text-xs font-bold tracking-widest uppercase mb-8 border border-teal-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Available for Hire
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-[var(--theme-text-main)]">
            More Than Just <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Code.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--theme-text-main)]/70 max-w-2xl mx-auto leading-relaxed">
            I’m <span className="font-bold text-[var(--theme-text-main)]">Md. Jamil Shikder</span>. I bridge the gap between complex backend logic and pixel-perfect frontend design to build web solutions that scale.
          </motion.p>
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-teal-500 rounded-3xl opacity-20 transition-transform duration-500 blur-xl"></div>
            
            {/* Card structure */}
            <div className="relative bg-[var(--theme-bg)] border border-[var(--theme-border)] p-3 rounded-3xl shadow-2xl">
               
               {/* === ANIMATION UPDATED HERE === */}
               {/* The Frame Container: Now this part scales up */}
               <motion.div 
                 className="aspect-[4/5] bg-[var(--theme-text-main)]/5 rounded-2xl overflow-hidden relative"
                 whileHover={{ scale: 1.03 }} // Frame gets 3% bigger on hover
                 transition={{ duration: 0.3, ease: "easeOut" }}
               >
                  {/* Standard Image inside (No independent animation) */}
                  <img
                    src={jamilImg} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Badge (No independent animation, scales with parent) */}
                  <div 
                    className="absolute bottom-4 right-4 bg-[var(--theme-bg)]/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[var(--theme-border)]"
                  >
                    <div className="text-2xl font-bold text-teal-500">3+ Years</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-main)]">Experience</div>
                  </div>
               </motion.div>
               {/* === ANIMATION END === */}

            </div>
          </motion.div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg leading-relaxed"
            >
              <h2 className="text-3xl font-bold text-[var(--theme-text-main)] mb-6">The Journey</h2>
              <p className="text-[var(--theme-text-main)]/80 mb-4">
                It started with a curiosity about how the internet worked. That curiosity quickly turned into an obsession with <strong className="text-teal-500">MERN Stack</strong> architecture and the flexibility of content systems.
              </p>
              <p className="text-[var(--theme-text-main)]/80">
                Today, I help businesses scale their digital presence. I focus on <strong className="text-blue-500">performance, SEO, and user experience</strong>. Whether it's a complex SaaS platform or a high-converting landing page, my goal is real-world results.
              </p>
            </motion.div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--theme-text-main)]">
                <Cpu className="text-teal-500" /> Technical Arsenal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Layout className="text-purple-500" />, title: "Frontend", desc: "React, Next.js, Tailwind CSS, Framer Motion" },
                  { icon: <Server className="text-blue-500" />, title: "Backend", desc: "Node.js, Express, MongoDB, PostgreSQL" },
                  { icon: <Globe className="text-pink-500" />, title: "CMS & Tools", desc: "WordPress, Sanity, Docker, Git" },
                  { icon: <Zap className="text-yellow-500" />, title: "Performance", desc: "Core Web Vitals, SEO, Lazy Loading" }
                ].map((tech, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    // CHANGE 3: Tech Cards using theme variables
                    className="bg-[var(--theme-bg)] border border-[var(--theme-border)] p-4 rounded-xl flex items-start gap-4 transition-colors hover:border-teal-500/50 hover:bg-[var(--theme-text-main)]/5"
                  >
                    <div className="p-3 bg-[var(--theme-text-main)]/5 rounded-lg">{tech.icon}</div>
                    <div>
                      <h4 className="font-bold text-[var(--theme-text-main)]">{tech.title}</h4>
                      <p className="text-sm text-[var(--theme-text-main)]/60 mt-1">{tech.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Collaborate Section */}
      <section className="py-24 px-6 border-y border-[var(--theme-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--theme-text-main)]">Why collaborate?</h2>
            <p className="text-[var(--theme-text-main)]/70 max-w-2xl mx-auto">I treat every project as if it were my own business, focusing on longevity and quality code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clean Code", desc: "Modular, scalable, and fully documented architecture.", icon: <Code /> },
              { title: "On-Time Delivery", desc: "Respect for deadlines with clear communication milestones.", icon: <Coffee /> },
              { title: "Long-Term Support", desc: "I don't disappear after deployment. I help you grow.", icon: <Database /> }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                // CHANGE 4: Info Cards
                className="bg-[var(--theme-bg)] p-8 rounded-3xl border border-[var(--theme-border)] hover:shadow-xl transition-all hover:bg-[var(--theme-text-main)]/5"
              >
                <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--theme-text-main)]">{item.title}</h3>
                <p className="text-[var(--theme-text-main)]/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -translate-y-1/2 -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--theme-text-main)]">Meet the Minds</h2>
            <p className="text-[var(--theme-text-main)]/70">The talented people making magic happen behind the scenes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                // CHANGE 5: Team Cards
                className="group bg-[var(--theme-bg)] border border-[var(--theme-border)] p-6 rounded-3xl hover:border-teal-500/50 transition-all duration-300 shadow-sm"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative bg-[var(--theme-text-main)]/5">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <a href={member.socials.github} className="p-2 bg-white/10 rounded-full hover:bg-teal-500 hover:text-white text-white transition-colors"><Github size={20} /></a>
                    <a href={member.socials.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-blue-600 hover:text-white text-white transition-colors"><Linkedin size={20} /></a>
                    <a href={member.socials.twitter} className="p-2 bg-white/10 rounded-full hover:bg-sky-500 hover:text-white text-white transition-colors"><Twitter size={20} /></a>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[var(--theme-text-main)] group-hover:text-teal-500 transition-colors">{member.name}</h3>
                  <p className="text-[var(--theme-text-main)]/50 text-sm mt-1 uppercase tracking-wider">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 relative">
         <div className="max-w-5xl mx-auto border border-[var(--theme-border)] bg-[var(--theme-bg)]/50 backdrop-blur-md rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
           
           <h2 className="text-3xl md:text-5xl font-bold text-[var(--theme-text-main)] mb-8 relative z-10">
               Ready to start your project?
           </h2>
           <p className="text-[var(--theme-text-main)]/70 mb-10 text-lg relative z-10 max-w-xl mx-auto">
               Let's discuss how we can improve your digital presence today.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 // Inverted Button: Bg matches text color, Text matches bg color
                 className="bg-[var(--theme-text-main)] text-[var(--theme-bg)] font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
               >
                   Start a Conversation <ArrowRight size={20} />
               </motion.button>
               <div className="flex gap-4 items-center justify-center sm:justify-start">
                   <a href="#" className="p-4 rounded-full border border-[var(--theme-border)] text-[var(--theme-text-main)] hover:bg-[var(--theme-text-main)] hover:text-[var(--theme-bg)] transition-colors"><Github size={20} /></a>
                   <a href="#" className="p-4 rounded-full border border-[var(--theme-border)] text-[var(--theme-text-main)] hover:bg-[var(--theme-text-main)] hover:text-[var(--theme-bg)] transition-colors"><Linkedin size={20} /></a>
                   <a href="#" className="p-4 rounded-full border border-[var(--theme-border)] text-[var(--theme-text-main)] hover:bg-[var(--theme-text-main)] hover:text-[var(--theme-bg)] transition-colors"><Mail size={20} /></a>
               </div>
           </div>
         </div>
      </section>

    </div>
  );
};

export default About;