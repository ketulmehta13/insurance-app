import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import logo from "../assets/photo insurance.png";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white relative" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="PR-Advisor Logo" className="w-14 h-20 object-contain" />
              <span className="text-xl font-bold">PR-Advisor</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner in finding the perfect insurance coverage.
              Expert advice, smart comparisons, and personalized solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/privacypolicy" className="text-gray-400 hover:text-white">Privacy Policies</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Insurance Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Insurance Types</h3>
            <ul className="space-y-2">
              <li><Link to="/health-insurance" className="text-gray-400 hover:text-white">Health Insurance</Link></li>
              <li><Link to="/life-insurance" className="text-gray-400 hover:text-white">Life Insurance</Link></li>
              <li><Link to="/vehicle-insurance" className="text-gray-400 hover:text-white">Vehicle Insurance</Link></li>
              <li><Link to="/property-insurance" className="text-gray-400 hover:text-white">Property Insurance</Link></li>
              <li><Link to="/business-insurance" className="text-gray-400 hover:text-white">Business Insurance</Link></li>
              <li><Link to="/travel-insurance" className="text-gray-400 hover:text-white">Travel Insurance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <span aria-hidden="true">📞</span>
                <span>99999999999</span>
              </div>
              <div className="flex items-center space-x-3">
                <span aria-hidden="true">📧</span>
                <span>info@pr_advisor.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span aria-hidden="true">📍</span>
                <span>123 Insurance St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">Copyright © 2024 PR-Advisor. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Go to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Go to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
