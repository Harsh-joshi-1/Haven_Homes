import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Home, Building, Info, MessageCircle, Phone, User, LogOut, KeyRound, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ChangePasswordModal from '../auth/ChangePasswordModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Properties', path: '/properties', icon: Building },
    { title: 'About Us', path: '/about', icon: Info },
    { title: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-[#1C1B1A]/95 backdrop-blur-md shadow-lg h-[65px]' : 'bg-[#1C1B1A] h-[81px]'
      }`}>
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between relative">
        {/* Mobile Menu Button (Now on Left) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#C5A059]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo (Centered) */}
        <Link
          to="/"
          className="flex items-center gap-3 h-full py-0 lg:static absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0"
        >
          <img
            src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_auto,q_auto/v1776492125/logo-Photoroom.png"
            alt="Haven Homes Logo"
            className="h-full w-auto object-contain py-1"
          />
          <span className="font-fraunces font-bold text-xl sm:text-2xl text-[#C5A059] tracking-tight hidden lg:block">Haven Homes</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={`font-red-hat text-sm font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${location.pathname === link.path
                ? 'text-[#C5A059]'
                : 'text-gray-400 hover:text-[#C5A059]'
                }`}
            >
              {link.title}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"
                />
              )}
            </Link>
          ))}
          <Link
            to="/properties"
            className="bg-white text-[#1C1B1A] font-red-hat text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-md"
          >
            Explore Listings
          </Link>

          {/* Auth Button/Profile */}
          <div className="relative ml-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="h-8 w-8 bg-[#C5A059] rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-[#1C1B1A]" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Welcome</div>
                    <div className="text-sm font-bold text-[#C5A059]">{user?.name.split(' ')[0]}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-[#1C1B1A] border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden z-[110]"
                    >
                      <div className="px-5 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Logged in as</p>
                        <p className="text-sm font-bold text-[#FAF8F4] truncate">{user?.email}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsPasswordModalOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-400 hover:text-[#C5A059] hover:bg-white/5 transition-all"
                      >
                        <KeyRound className="w-4 h-4" />
                        Change Password
                      </button>

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 text-[#C5A059] font-red-hat text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Rightmost Decorative Image */}
        <div className="flex items-center h-full py-0.5">
          <img
            src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_auto,q_auto/v1776584992/Gemini_Generated_Image_6q1o176q1o176q1o-Photoroom.png"
            alt="Decorative Element"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] lg:hidden"
            />
            
            {/* Slider Drawer (Now from Left) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[85%] sm:w-[400px] h-screen bg-[#1C1B1A] z-[90] lg:hidden flex flex-col p-8 shadow-2xl"
            >
              {/* Close Button Inside Menu */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#C5A059] hover:bg-white/5 rounded-full transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-6 w-full">
                <p className="font-red-hat text-[10px] text-gray-500 uppercase tracking-[4px] mb-8">Navigation</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="flex items-center gap-6 group py-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#C5A059]/10 transition-colors">
                      <link.icon className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <span className="font-fraunces text-2xl font-bold text-[#C5A059] group-hover:translate-x-2 transition-transform">{link.title}</span>
                  </Link>
                ))}
                
                <div className="pt-8">
                  <Link
                    to="/properties"
                    className="flex items-center justify-center gap-3 w-full bg-[#C5A059] text-[#1C1B1A] font-red-hat text-xs font-bold uppercase tracking-[2px] py-5 rounded-xl shadow-xl hover:shadow-[#C5A059]/20 transition-all active:scale-95"
                  >
                    Explore Properties
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="mt-auto pb-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <p className="font-red-hat text-[10px] text-gray-500 uppercase tracking-widest opacity-60">Direct Support</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-[#1C1B1A]">
                       <Phone className="w-5 h-5" />
                    </div>
                    <p className="font-fraunces text-xl font-bold text-[#C5A059]">95014-90002</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
