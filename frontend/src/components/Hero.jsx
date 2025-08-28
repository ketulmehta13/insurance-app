

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "30+", label: "Years of Experience" },
    { value: "15+", label: "Insurance Services" },
    { value: "240K", label: "Happy Clients" },
  ];

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-white/90 to-cyan-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
          >
            Insurance Protects <br />
            <span className="text-cyan-600 dark:text-cyan-400">Your Life.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
          >
            Simple insurance solutions that protect what matters most. Compare policies, 
            get expert advice, and secure your family's future with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-slate-900 dark:bg-cyan-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-300 text-base font-medium hover:underline transition-all duration-200"
            >
              <PlayCircle size={22} />
              Video Introduction
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-10 pt-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex items-center justify-center relative"
        >
          <div className="relative">
            {/* Main Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="rounded-full bg-white/70 dark:bg-slate-800/40 w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center shadow-2xl border-4 border-cyan-200 dark:border-slate-700 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
                alt="Happy Family"
                className="rounded-full object-cover w-72 h-72 lg:w-88 lg:h-88 shadow-lg"
              />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 1 }}
              className="absolute -bottom-4 -right-4 w-40 h-32 bg-white dark:bg-slate-700 rounded-2xl shadow-xl border-2 border-cyan-100 dark:border-cyan-700 p-4 flex flex-col items-center justify-center"
            >
              <div className="text-2xl font-bold text-slate-900 dark:text-white">99%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
                Customer Satisfaction
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
              className="absolute -top-4 -left-4 px-4 py-2 bg-cyan-600 text-white rounded-2xl shadow-lg text-sm font-semibold"
            >
              Trusted by 240K+
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
