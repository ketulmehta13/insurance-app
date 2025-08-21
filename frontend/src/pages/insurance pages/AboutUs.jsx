// import React from "react";
// import insurance1 from "../../assets/insurance1.jpg";
// import insurance2 from "../../assets/insurance2.jpg";

// const AboutUs = () => {
//   return (
//     <div className="relative min-h-screen bg-white flex items-center justify-center py-8 overflow-hidden">
//       {/* Animated floating dots */}
//       <svg
//         className="absolute left-8 top-8 w-16 h-16 opacity-20 animate-floatY pointer-events-none"
//         fill="none"
//         viewBox="0 0 100 100"
//         style={{ zIndex: 0 }}
//       >
//         <circle cx="20" cy="20" r="4" fill="#6366f1" />
//         <circle cx="60" cy="40" r="3" fill="#6366f1" />
//         <circle cx="80" cy="70" r="2" fill="#818cf8" />
//         <circle cx="40" cy="80" r="2" fill="#a5b4fc" />
//       </svg>
//       <svg
//         className="absolute right-8 top-8 w-16 h-16 opacity-20 animate-floatY pointer-events-none"
//         fill="none"
//         viewBox="0 0 100 100"
//         style={{ zIndex: 0 }}
//       >
//         <circle cx="20" cy="20" r="3" fill="#a5b4fc" />
//         <circle cx="70" cy="30" r="4" fill="#6366f1" />
//         <circle cx="85" cy="60" r="2" fill="#818cf8" />
//         <circle cx="60" cy="90" r="2" fill="#6366f1" />
//       </svg>
//       {/* Main Content */}
//       <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center z-10">
//         {/* Left: Illustration with overlay to hide text */}
//         <div className="flex-1 flex justify-center items-start mb-8 md:mb-0 relative">
//           <img
//             src={insurance1}
//             alt="Insurance Globe"
//             className="w-full max-w-md h-auto rounded-2xl shadow-lg"
//             style={{ background: "rgba(99,102,241,0.08)" }}
//           />
//         </div>
//         {/* Right: Text Content */}
//         <div className="flex-1 px-0 md:px-10">
//           <div className="space-y-8">
//             <section>
//               <h2 className="text-xl font-bold text-indigo-700 underline mb-2">
//                 OUR VISION
//               </h2>
//               <ul className="list-disc list-inside text-gray-800 space-y-2">
//                 <li>
//                   Our vision is to be the premier destination for insurance
//                   solutions, recognised for our commitment to client
//                   satisfaction and industry leadership.
//                 </li>
//                 <li>
//                   We aim to leverage technology and innovation to transform the
//                   insurance experience, making it simple, accessible, and
//                   personalised.
//                 </li>
//                 <li>
//                   Our vision includes being a trusted advisor, empowering
//                   clients with knowledge, and providing them with customised
//                   coverage options that protect what matters most to them.
//                 </li>
//                 <li>
//                   We strive to continuously enhance our services, stay ahead of
//                   industry trends, and exceed client expectations.
//                 </li>
//               </ul>
//             </section>
//             <section>
//               <h2 className="text-xl font-bold text-indigo-700 underline mb-2">
//                 OUR MISSION
//               </h2>
//               <ul className="list-disc list-inside text-gray-800 space-y-2">
//                 <li>
//                   Our mission is to provide exceptional insurance services
//                   tailored to the unique needs of our clients.
//                 </li>
//                 <li>
//                   We prioritize trust, transparency, and personalized attention,
//                   ensuring our clients' peace of mind and protection.
//                 </li>
//                 <li>
//                   We strive for seamless customer experiences, from policy
//                   selection to claims support, building long-term relationships
//                   based on reliability and exceptional service.
//                 </li>
//                 <li>
//                   Our most important mission is to build lifelong relationships
//                   with our clients, not only to earn money but to create a
//                   prestigious life for each other.
//                 </li>
//               </ul>
//             </section>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         .animate-floatY {
//           animation: floatY 4s infinite ease-in-out alternate;
//         }
//         @keyframes floatY {
//           from { transform: translateY(0);}
//           to { transform: translateY(24px);}
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutUs;

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Heart, Users, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import insurance1 from "../../assets/insurance1.jpg";
import insurance2 from "../../assets/insurance2.jpg";

const AboutUs = () => {
  const visionPoints = [
    {
      text: "Our vision is to be the premier destination for insurance solutions, recognised for our commitment to client satisfaction and industry leadership.",
      icon: Target
    },
    {
      text: "We aim to leverage technology and innovation to transform the insurance experience, making it simple, accessible, and personalised.",
      icon: Sparkles
    },
    {
      text: "Our vision includes being a trusted advisor, empowering clients with knowledge, and providing them with customised coverage options that protect what matters most to them.",
      icon: Shield
    },
    {
      text: "We strive to continuously enhance our services, stay ahead of industry trends, and exceed client expectations.",
      icon: CheckCircle
    }
  ];

  const missionPoints = [
    {
      text: "Our mission is to provide exceptional insurance services tailored to the unique needs of our clients.",
      icon: Heart
    },
    {
      text: "We prioritize trust, transparency, and personalized attention, ensuring our clients' peace of mind and protection.",
      icon: Shield
    },
    {
      text: "We strive for seamless customer experiences, from policy selection to claims support, building long-term relationships based on reliability and exceptional service.",
      icon: Users
    },
    {
      text: "Our most important mission is to build lifelong relationships with our clients, not only to earn money but to create a prestigious life for each other.",
      icon: Heart
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
      style={{
        left: `${10 + (i * 12)}%`,
        top: `${20 + (i % 3) * 30}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 3 + (i * 0.5),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.3
      }}
    />
  ));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 overflow-hidden transition-colors duration-500">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-slate-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/5 to-slate-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
            <Shield className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="text-cyan-600 dark:text-cyan-400">Guard.In</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Empowering your future with innovative insurance solutions and exceptional service.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-slate-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                src={insurance1}
                alt="Insurance Globe"
                className="relative w-full max-w-lg mx-auto h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">99%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Client Satisfaction</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -left-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">10+</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Years Experience</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Trusted Protection</div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">Comprehensive coverage you can rely on</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Expert Support</div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">24/7 assistance from certified advisors</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Innovation First</div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">Cutting-edge technology for better service</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Vision Section */}
          <motion.section variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {visionPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {point.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Mission Section */}
          <motion.section variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {missionPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {point.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            variants={itemVariants}
            className="bg-gradient-to-r from-cyan-600 to-slate-700 dark:from-cyan-700 dark:to-slate-800 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Guard.In for their insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-300"
              >
                Get Started Today
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-700 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

