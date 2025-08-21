// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ArrowUp } from "lucide-react";
// import logo from "../assets/photo insurance.png";

// const Footer = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.pageYOffset > 300);
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-gray-900 text-white relative" role="contentinfo">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="col-span-1">
//             <Link to="/" className="flex items-center space-x-2 mb-4">
//               <img src={logo} alt="PR-Advisor Logo" className="w-14 h-20 object-contain" />
//               <span className="text-xl font-bold">PR-Advisor</span>
//             </Link>
//             <p className="text-gray-400 mb-6">
//               Your trusted partner in finding the perfect insurance coverage.
//               Expert advice, smart comparisons, and personalized solutions.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
//               <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
//               <li><Link to="/privacypolicy" className="text-gray-400 hover:text-white">Privacy Policies</Link></li>
//               <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
//             </ul>
//           </div>

//           {/* Insurance Types */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Insurance Types</h3>
//             <ul className="space-y-2">
//               <li><Link to="/health-insurance" className="text-gray-400 hover:text-white">Health Insurance</Link></li>
//               <li><Link to="/life-insurance" className="text-gray-400 hover:text-white">Life Insurance</Link></li>
//               <li><Link to="/vehicle-insurance" className="text-gray-400 hover:text-white">Vehicle Insurance</Link></li>
//               <li><Link to="/property-insurance" className="text-gray-400 hover:text-white">Property Insurance</Link></li>
//               <li><Link to="/business-insurance" className="text-gray-400 hover:text-white">Business Insurance</Link></li>
//               <li><Link to="/travel-insurance" className="text-gray-400 hover:text-white">Travel Insurance</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <div className="space-y-3 text-gray-400">
//               <div className="flex items-center space-x-3">
//                 <span aria-hidden="true">📞</span>
//                 <span>99999999999</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span aria-hidden="true">📧</span>
//                 <span>info@pr_advisor.com</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span aria-hidden="true">📍</span>
//                 <span>123 Insurance St, City, State 12345</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-10 pt-6">
//           <div className="flex justify-center">
//             <p className="text-gray-400 text-sm">Copyright © 2024 PR-Advisor. All rights reserved.</p>
//           </div>
//         </div>
//       </div>

//       {/* Go to Top Button */}
//       {isVisible && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
//           aria-label="Go to top"
//         >
//           <ArrowUp className="w-5 h-5" />
//         </button>
//       )}
//     </footer>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/photo insurance.png";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-slate-600 dark:text-slate-300">
        {/* Company Info */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Guard.In Logo" className="h-11 w-11 rounded shadow-sm" />
            <span className="font-extrabold text-2xl text-cyan-600">
              <span className="text-slate-900 dark:text-white">PR-Advisor</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Insurance solutions for everyone, everywhere. Simple, secure, and tailored for your peace of mind.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © 2024 Guard.In. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Insurance Types */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Insurance Types</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/insurance/health" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Health Insurance
              </Link>
            </li>
            <li>
              <Link to="/insurance/life" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Life Insurance
              </Link>
            </li>
            <li>
              <Link to="/insurance/vehicle" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Vehicle Insurance
              </Link>
            </li>
            <li>
              <Link to="/insurance/property" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Property Insurance
              </Link>
            </li>
            <li>
              <Link to="/insurance/business" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Business Insurance
              </Link>
            </li>
            <li>
              <Link to="/insurance/travel" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Travel Insurance
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span>📞</span>
              <span>99999999999</span>
            </div>
            <div className="flex items-center gap-3">
              <span>📧</span>
              <span>info@guardin.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span>📍</span>
              <span>123 Insurance St, City, State</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
