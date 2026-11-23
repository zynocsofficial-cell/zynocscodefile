import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Lock } from 'lucide-react';
import { Section } from '@/types';
import { Logo } from './Logo';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
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
    { id: Section.AdPlacements, label: 'Ad Placements' },
    { id: Section.Blogs, label: 'Blogs' },
    { id: Section.About, label: 'About' },
    { id: Section.Careers, label: 'Careers' },
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
            <div className="ml-4 lg:ml-10 flex items-center space-x-3.5 lg:space-x-6">
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

              <button
                onClick={() => handleNavClick(Section.Auth)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border ${
                  activeSection === Section.Auth
                    ? 'bg-slate-800 text-brand-300 border-brand-500/50 shadow-md shadow-brand-500/10'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-brand-400" />
                <span>Portal Login</span>
              </button>

              <button 
                onClick={() => handleNavClick(Section.Contact)}
                className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-brand-900/50 flex items-center ring-2 ring-transparent hover:ring-brand-400/50"
              >
                Get in Touch <ChevronRight className="ml-1 h-4 w-4" />
              </button>
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
      <div className={`md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
          
          <div className="border-t border-slate-800 pt-3 mt-2 px-2 space-y-2">
            <button 
              onClick={() => handleNavClick(Section.Auth)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border border-slate-700"
            >
              <Lock className="w-4 h-4 text-brand-400" />
              <span>Portal Login</span>
            </button>

            <button 
              onClick={() => handleNavClick(Section.Contact)}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center shadow-lg"
            >
              Get in Touch <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
