import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../assets/photo insurance.png";
import { AuthContext } from "../pages/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Far Left */}
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-14 h-20 object-contain" />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden md:flex items-center space-x-6"
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              to="/"
              className="px-3 py-2 rounded-md font-bold bg-indigo-700 text-white transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button className="flex items-center font-medium text-gray-900 hover:text-indigo-600 px-3 py-2">
                Services <span className="ml-1">▾</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white shadow-md rounded mt-2 py-2 w-48 z-10 border">
                  <Link
                    to="/insurance/health"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Health Insurance
                  </Link>
                  <Link
                    to="/insurance/life"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Life Insurance
                  </Link>
                  <Link
                    to="/insurance/vehicle"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Vehicle Insurance
                  </Link>
                  <Link
                    to="/insurance/travel"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Travel Insurance
                  </Link>
                  <Link
                    to="/insurance/property"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Property Insurance
                  </Link>
                  <Link
                    to="/insurance/pet"
                    className="block px-4 py-2 hover:bg-indigo-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Business Insurance
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="font-medium text-gray-900 hover:text-indigo-600 px-3 py-2"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-900 hover:text-indigo-600 px-3 py-2"
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Login/Register or Profile/Logout */}
          <div className="hidden md:flex items-center space-x-4 ">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
                  title="Profile"
                >
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 text-xl"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Slide-Out Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div
                className="fixed inset-0 bg-black opacity-40"
                onClick={() => setIsDrawerOpen(false)}
              ></div>
              <div className="relative bg-white w-80 h-full shadow-lg z-50 overflow-y-auto">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <span className="text-xl">✕</span>
                </button>

                <div className="p-6 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-xl font-bold text-gray-900">
                      PR_ADVISOR
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3">About Us</h2>
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    With our extensive experience in the insurance industry, we
                    strive to be your go-to resource for comprehensive coverage
                    and exceptional customer service.
                  </p>

                  <h3 className="text-lg font-bold mb-3">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 text-blue-500 text-sm">🕐</span>
                      <span className="text-sm">Digitally: 24 x 7</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 text-blue-500 text-sm">🕐</span>
                      <span className="text-sm">11:00am - 6:00pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full text-left px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-between"
                >
                  <span>Services</span>
                  <span
                    className={`transform transition-transform ${
                      isMobileServicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isMobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {[
                      { label: "Health Insurance", to: "/insurance/health" },
                      { label: "Life Insurance", to: "/insurance/life" },
                      { label: "Vehicle Insurance", to: "/insurance/vehicle" },
                      { label: "Travel Insurance", to: "/insurance/travel" },
                      {
                        label: "Property Insurance",
                        to: "/insurance/property",
                      },
                      { label: "Business Insurance", to: "/insurance/pet" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-3 py-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Add login/register or profile/logout */}
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
                  <Link
                    to="/profile"
                    className="px-3 py-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-6 h-6" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="px-2 py-1 rounded-md font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
                  <Link
                    to="/login"
                    className="px-3 py-3 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-3 rounded-md font-bold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
