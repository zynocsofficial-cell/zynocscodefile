
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, LogIn, LayoutDashboard, LogOut, User } from 'lucide-react';
import { Section } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: Section.Home, label: 'Home' },
    { id: Section.Services, label: 'Services' },
    { id: Section.Insights, label: 'Insights' },
    { id: Section.About, label: 'About' },
    { id: Section.Contact, label: 'Contact' },
  ];

  const handleNavClick = (section: Section) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 shadow-2xl' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick(Section.Home)}>
            <div className="transform group-hover:scale-105 transition-transform duration-300">
               <Logo className="h-10 w-10" withText={true} />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 group ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-400 transform origin-left transition-transform duration-300 ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              
              <div className="h-6 w-px bg-slate-800 mx-2"></div>

              {isLoggedIn ? (
                <>
                   <button 
                    onClick={() => handleNavClick(Section.Dashboard)}
                    className={`text-sm font-medium transition-colors duration-200 flex items-center ${
                        activeSection === Section.Dashboard ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2"/> Dashboard
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1"/> Logout
                  </button>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 cursor-default">
                    <User className="h-4 w-4" />
                  </div>
                </>
              ) : (
                <>
                    <button 
                        onClick={() => handleNavClick(Section.Login)}
                        className={`text-sm font-medium transition-colors duration-200 flex items-center ${
                            activeSection === Section.Login ? 'text-white' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Client Login
                    </button>
                    <button 
                        onClick={() => handleNavClick(Section.Contact)}
                        className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-brand-900/50 flex items-center ring-2 ring-transparent hover:ring-brand-400/50"
                    >
                        Get Started <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                </>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                activeSection === link.id
                  ? 'text-white bg-slate-800 border-l-4 border-brand-500'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="border-t border-slate-800 pt-3 mt-2">
            {isLoggedIn ? (
                <>
                    <button
                        onClick={() => handleNavClick(Section.Dashboard)}
                        className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <span className="flex items-center"><LayoutDashboard className="h-4 w-4 mr-2"/> Dashboard</span>
                    </button>
                     <button
                        onClick={onLogout}
                        className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    >
                        <span className="flex items-center"><LogOut className="h-4 w-4 mr-2"/> Logout</span>
                    </button>
                </>
            ) : (
                 <button
                    onClick={() => handleNavClick(Section.Login)}
                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                    <span className="flex items-center"><LogIn className="h-4 w-4 mr-2"/> Client Login</span>
                </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
