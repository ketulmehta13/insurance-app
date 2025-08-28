

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import ThemeToggle from "../pages/ThemeToogle";
import logo from "../assets/photo insurance.png";
import { AuthContext } from "../pages/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", to: "/faq" },
  ];

  const serviceLinks = [
    { label: "Health Insurance", to: "/insurance/health" },
    { label: "Life Insurance", to: "/insurance/life" },
    { label: "Vehicle Insurance", to: "/insurance/vehicle" },
    { label: "Travel Insurance", to: "/insurance/travel" },
    { label: "Property Insurance", to: "/insurance/property" },
    { label: "Business Insurance", to: "/insurance/business" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Guard.In Logo" className="h-11 w-11 rounded shadow-sm" />
          <span className="font-extrabold text-2xl tracking-tight text-cyan-600">
            <span className="text-slate-900 dark:text-white">PR-Advisor</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-base font-medium text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-slate-800 dark:hover:text-cyan-400 transition-all duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-base font-medium text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-slate-800 dark:hover:text-cyan-400 transition-all duration-200"
            >
              Services
              <ChevronDown size={16} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2"
                >
                  {serviceLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link 
                to="/customerdashboard" 
                className="p-2 rounded-full bg-cyan-100 dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-slate-600 transition-all"
                title="Dashboard"
              >
                <User size={20} />
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-2xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-2xl bg-slate-900 dark:bg-cyan-600 text-white font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-500 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} className="text-slate-700 dark:text-slate-200" /> : <Menu size={28} className="text-slate-700 dark:text-slate-200" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  {label}
                </Link>
              ))}
              
              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-base font-medium text-slate-700 dark:text-slate-200"
                >
                  Services
                  <ChevronDown size={16} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {serviceLinks.map(({ label, to }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <ThemeToggle />
              </div>

              {/* Mobile Auth */}
              {isLoggedIn ? (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/customerdashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-cyan-600 dark:text-cyan-400"
                  >
                    <User size={20} /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-slate-700 dark:text-slate-200 font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-2 rounded-2xl bg-slate-900 dark:bg-cyan-600 text-white font-semibold text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
