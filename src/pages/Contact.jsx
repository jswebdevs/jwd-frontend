import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MapPin, Mail, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Contact = () => {
    // কন্টেন্ট এনিমেশন
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden relative transition-colors duration-500 selection:bg-blue-500 selection:text-white">
            
            {/* === UNIQUE ANIMATED BACKGROUND === */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                
                {/* 1. Grid Pattern (Dark Mode এ হালকা দেখাবে) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* 2. Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px]"></div>

                {/* 3. Floating Animated Shapes */}
                <FloatingShape 
                    color="bg-purple-500/20 dark:bg-purple-500/30" 
                    size="w-64 h-64" 
                    top="10%" 
                    left="-5%" 
                    delay={0} 
                />
                <FloatingShape 
                    color="bg-blue-500/20 dark:bg-blue-500/30" 
                    size="w-72 h-72" 
                    bottom="10%" 
                    right="-5%" 
                    delay={2} 
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 z-10"
            >
                {/* Left Side: Contact Info */}
                <motion.div variants={itemVariants} className="space-y-8">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800">
                            Get in Touch
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-4 leading-tight">
                            Let’s Build <br/> Something <span className="text-blue-600 dark:text-blue-500">Cool.</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed">
                            আপনার পরবর্তী প্রজেক্ট বা আইডিয়া নিয়ে আমাদের সাথে কথা বলুন। আমরা সবসময় নতুন চ্যালেঞ্জ নিতে প্রস্তুত।
                        </p>
                    </div>

                    <div className="space-y-6">
                        <ContactItem icon={Phone} title="Phone" content="01881176704" />
                        <ContactItem icon={Mail} title="Email" content="hello@example.com" />
                       
                    </div>

                    {/* Social Links with Facebook */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <SocialBtn icon={Facebook} href="https://facebook.com" color="hover:text-blue-600" />
                            <SocialBtn icon={Linkedin} href="#" color="hover:text-blue-700" />
                            <SocialBtn icon={Twitter} href="#" color="hover:text-sky-500" />
                            <SocialBtn icon={Instagram} href="#" color="hover:text-pink-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Glassmorphism Form */}
                <motion.div variants={itemVariants} className="relative group">
                    {/* Form Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="First Name" placeholder="" />
                                <InputGroup label="Last Name" placeholder="" />
                            </div>

                            <InputGroup label="Email Address" placeholder="" type="email" />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none h-32 placeholder:text-slate-400"
                                    placeholder="আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors shadow-lg"
                            >
                                <span>Send Message</span>
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// --- Helper Components ---

// Floating Background Shapes
const FloatingShape = ({ color, size, top, left, right, bottom, delay }) => (
    <motion.div
        animate={{
            y: [0, 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            delay: delay,
        }}
        className={`absolute rounded-[30%] blur-3xl ${color} ${size}`}
        style={{ top, left, right, bottom }}
    />
);

const ContactItem = ({ icon: Icon, title, content }) => (
    <motion.div
        whileHover={{ x: 5 }}
        className="flex items-center gap-4 group cursor-pointer"
    >
        <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Icon size={20} />
        </div>
        <div>
            <h3 className="text-slate-500 dark:text-slate-500 text-sm font-medium">{title}</h3>
            <p className="text-slate-900 dark:text-white font-semibold transition-colors duration-300">{content}</p>
        </div>
    </motion.div>
);

const SocialBtn = ({ icon: Icon, href, color }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
        className={`w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 ${color}`}
    >
        <Icon size={20} />
    </motion.a>
);

const InputGroup = ({ label, placeholder, type = "text" }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <input
            type={type}
            className="w-full bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400"
            placeholder={placeholder}
        />
    </div>
);

export default Contact;