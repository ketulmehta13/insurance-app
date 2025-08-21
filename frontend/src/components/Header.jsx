// import React, { useState, useRef, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { User } from "lucide-react";
// import logo from "../assets/photo insurance.png";
// import { AuthContext } from "../pages/AuthProvider";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
//   const { isLoggedIn, logout } = useContext(AuthContext);

//   const dropdownRef = useRef(null);

//   const navigate = useNavigate();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo - Far Left */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} className="w-14 h-20 object-contain" />
//           </Link>

//           {/* Desktop Navigation - Center */}
//           <nav
//             className="hidden md:flex items-center space-x-6"
//             ref={dropdownRef}
//           >
//             <Link
//               to="/"
//               className="px-3 py-2 rounded-md font-bold bg-indigo-700 text-white transition-colors"
//             >
//               Home
//             </Link>

//             {/* Services Dropdown */}
//             <div className="relative">
//               <button
//                 className="flex items-center font-medium text-gray-900 hover:text-indigo-600 px-3 py-2"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 aria-haspopup="true"
//                 aria-expanded={isDropdownOpen}
//               >
//                 Services <span className="ml-1">▾</span>
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   className="absolute bg-white shadow-md rounded mt-2 py-2 w-48 z-10 border"
//                   ref={dropdownRef}
//                 >
//                   {[
//                     { label: "Health Insurance", to: "/insurance/health" },
//                     { label: "Life Insurance", to: "/insurance/life" },
//                     { label: "Vehicle Insurance", to: "/insurance/vehicle" },
//                     { label: "Travel Insurance", to: "/insurance/travel" },
//                     { label: "Property Insurance", to: "/insurance/property" },
//                     { label: "Business Insurance", to: "/insurance/business" },
//                   ].map((item) => (
//                     <Link
//                       key={item.to}
//                       to={item.to}
//                       className="block px-4 py-2 hover:bg-indigo-50"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Link
//               to="/about"
//               className="font-medium text-gray-900 hover:text-indigo-600 px-3 py-2"
//             >
//               About Us
//             </Link>
//             <Link
//               to="/contact"
//               className="font-medium text-gray-900 hover:text-indigo-600 px-3 py-2"
//             >
//               Contact Us
//             </Link>
//           </nav>

//           {/* Desktop Login/Register or Profile/Logout */}
//           <div className="hidden md:flex items-center space-x-4 ">
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   to="/customerdashboard"
//                   className="flex items-center px-3 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
//                   title="Profile"
//                 >
//                   <User className="w-6 h-6" />
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="px-4 py-2 rounded-md font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-700 text-xl"
//             >
//               {isMenuOpen ? "✕" : "☰"}
//             </button>
//           </div>

//           {/* Slide-Out Drawer */}
//           {isDrawerOpen && (
//             <div className="fixed inset-0 z-50 flex justify-end">
//               <div
//                 className="fixed inset-0 bg-black opacity-40"
//                 onClick={() => setIsDrawerOpen(false)}
//               ></div>
//               <div className="relative bg-white w-80 h-full shadow-lg z-50 overflow-y-auto">
//                 <button
//                   onClick={() => setIsDrawerOpen(false)}
//                   className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                 >
//                   <span className="text-xl">✕</span>
//                 </button>

//                 <div className="p-6 mt-8">
//                   <div className="flex items-center space-x-2 mb-6">
//                     <span className="text-xl font-bold text-gray-900">
//                       PR_ADVISOR
//                     </span>
//                   </div>

//                   <h2 className="text-xl font-bold mb-3">About Us</h2>
//                   <p className="text-gray-700 mb-6 text-sm leading-relaxed">
//                     With our extensive experience in the insurance industry, we
//                     strive to be your go-to resource for comprehensive coverage
//                     and exceptional customer service.
//                   </p>

//                   <h3 className="text-lg font-bold mb-3">Contact Info</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <span className="w-5 h-5 text-blue-500 text-sm">🕐</span>
//                       <span className="text-sm">Digitally: 24 x 7</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <span className="w-5 h-5 text-blue-500 text-sm">🕐</span>
//                       <span className="text-sm">11:00am - 6:00pm</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t bg-white">
//             <div className="flex flex-col space-y-2">
//               <Link
//                 to="/"
//                 className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>

//               {/* Mobile Services */}
//               <div>
//                 <button
//                   onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
//                   className="w-full text-left px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-between"
//                 >
//                   <span>Services</span>
//                   <span
//                     className={`transform transition-transform ${
//                       isMobileServicesOpen ? "rotate-180" : ""
//                     }`}
//                   >
//                     ▾
//                   </span>
//                 </button>
//                 {isMobileServicesOpen && (
//                   <div className="ml-4 mt-2 space-y-1">
//                     {[
//                       { label: "Health Insurance", to: "/insurance/health" },
//                       { label: "Life Insurance", to: "/insurance/life" },
//                       { label: "Vehicle Insurance", to: "/insurance/vehicle" },
//                       { label: "Travel Insurance", to: "/insurance/travel" },
//                       {
//                         label: "Property Insurance",
//                         to: "/insurance/property",
//                       },
//                       { label: "Business Insurance", to: "/insurance/pet" },
//                     ].map((item) => (
//                       <Link
//                         key={item.to}
//                         to={item.to}
//                         className="block px-3 py-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//                         onClick={() => {
//                           setIsMenuOpen(false);
//                           setIsMobileServicesOpen(false);
//                         }}
//                       >
//                         {item.label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/about"
//                 className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About Us
//               </Link>
//               <Link
//                 to="/contact"
//                 className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact Us
//               </Link>

//               {/* Add login/register or profile/logout */}
//               {isLoggedIn ? (
//                 <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
//                   <Link
//                     to="/profile"
//                     className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center space-x-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="w-6 h-6" />
//                     <span>Profile</span>
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="px-2 py-1 rounded-md font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
//                   <Link
//                     to="/login"
//                     className="px-3 py-3 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors text-center"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="px-3 py-3 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors text-center"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
// Header.jsx

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
