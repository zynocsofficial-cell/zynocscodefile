import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AIChat } from './components/AIChat';
import { Logo } from './components/Logo';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { Portfolio } from './components/Portfolio';
import { ParticleBackground } from './components/ParticleBackground';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectDetails } from './components/ProjectDetails';
import { Leadership } from './components/Leadership';
import { Careers } from './components/Careers';
import { Insights } from './components/Insights';
import { ScrollToTop } from './components/ScrollToTop';
import { Section } from './types';
import { Twitter, Linkedin, Github, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: 'client' | 'admin') => {
      setIsLoggedIn(true);
      if (role === 'admin') {
        setIsAdmin(true);
        setActiveSection(Section.AdminDashboard);
      } else {
        setIsAdmin(false);
        setActiveSection(Section.Dashboard);
      }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setActiveSection(Section.Home);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return (
            <>
                <Hero onNavigate={handleNavigate} />
                <Portfolio />
                <Services />
                <Insights />
                <Testimonials />
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to Digitalize Your Business?</h2>
                        <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">Join industry leaders who trust Zynocs for their most critical infrastructure. Experience the future of IT solutions.</p>
                        <button onClick={() => handleNavigate(Section.Contact)} className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-brand-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
                            Schedule a Consultation
                        </button>
                    </div>
                </div>
            </>
        );
      case Section.Services:
        return (
            <div className="pt-20 min-h-screen">
                <Services />
                <Portfolio />
                <Testimonials />
            </div>
        );
      case Section.About:
        return (
          <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="animate-fade-in-up">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">About <span className="text-brand-400">Zynocs</span></h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        We are a collective of visionaries, engineers, and strategists obsessed with the future of technology.
                    </p>
                </div>

                <Stats />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                        <p>
                            Zynocs was founded with a singular mission: to bridge the gap between complex enterprise requirements and modern, agile software development. We noticed that many businesses were stuck with legacy systems because "modernization" felt too risky.
                        </p>
                        <p>
                            We bring the discipline of traditional engineering and combine it with the speed of modern frameworks. Our team hails from top tech giants and innovative startups, bringing a wealth of diverse experience to your project.
                        </p>
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="h-12 w-1 bg-brand-500 rounded-full"></div>
                            <p className="text-white font-medium italic">"Technology is best when it brings people together."</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600 rounded-2xl transform rotate-3 opacity-20 blur-lg group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="glass-card p-8 rounded-2xl border border-slate-700 relative z-10">
                             <h3 className="text-xl font-bold text-white mb-4">Our Core Values</h3>
                             <ul className="space-y-4">
                                {['Innovation First', 'Transparent Process', 'Pixel-Perfect Design', 'Security by Default'].map((val, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <div className="h-2 w-2 rounded-full bg-brand-400 mr-3 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                                        {val}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>

                <Leadership />
             </div>
          </div>
        );
      case Section.Insights:
        return <Insights />;
      case Section.Contact:
        return (
            <div className="pt-20">
                <Contact />
            </div>
        );
      case Section.Careers:
        return <Careers />;
      case Section.Login:
        return <Login onLogin={handleLoginSuccess} />;
      case Section.Dashboard:
        return isLoggedIn ? (isAdmin ? <AdminDashboard /> : <Dashboard onNavigate={handleNavigate} />) : <Login onLogin={handleLoginSuccess} />;
      case Section.AdminDashboard:
        return isLoggedIn && isAdmin ? <AdminDashboard /> : <Login onLogin={handleLoginSuccess} />;
      case Section.ProjectDetails:
        return isLoggedIn ? <ProjectDetails onNavigate={handleNavigate} /> : <Login onLogin={handleLoginSuccess} />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center">
        <div className="animate-pulse mb-8">
           <Logo className="h-20 w-20" withText={false} />
        </div>
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
        </div>
        <div className="mt-4 text-brand-400 font-mono text-sm animate-pulse">INITIALIZING SYSTEM...</div>
        <style>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 selection:bg-brand-500/30 font-sans">
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-400 to-accent-500 z-[60] shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <ParticleBackground />

      <main className="relative z-10">
        {renderSection()}
      </main>

      {activeSection !== Section.Login && <AIChat />}
      
      <ScrollToTop />

      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
             <div className="col-span-1 md:col-span-1">
                <div className="mb-4">
                  <Logo className="h-8 w-8" withText={true} />
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Building the digital infrastructure of tomorrow, today. <br/>
                    Trusted by forward-thinking enterprises worldwide.
                </p>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><button onClick={() => handleNavigate(Section.Services)} className="hover:text-brand-400 transition-colors">Web Development</button></li>
                    <li><button onClick={() => handleNavigate(Section.Services)} className="hover:text-brand-400 transition-colors">Cloud Solutions</button></li>
                    <li><button onClick={() => handleNavigate(Section.Services)} className="hover:text-brand-400 transition-colors">AI Integration</button></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><button onClick={() => handleNavigate(Section.About)} className="hover:text-brand-400 transition-colors">About Us</button></li>
                    <li><button onClick={() => handleNavigate(Section.Careers)} className="hover:text-brand-400 transition-colors">Careers</button></li>
                    <li><button onClick={() => handleNavigate(Section.Insights)} className="hover:text-brand-400 transition-colors">Insights</button></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Connect</h4>
                <div className="flex space-x-4">
                    <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 p-2 rounded-full border border-slate-800 hover:border-slate-700"><Github className="h-5 w-5" /></a>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 p-2 rounded-full border border-slate-800 hover:border-slate-700"><Twitter className="h-5 w-5" /></a>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 p-2 rounded-full border border-slate-800 hover:border-slate-700"><Linkedin className="h-5 w-5" /></a>
                </div>
             </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">© 2024 Zynocs Technologies Inc. All rights reserved.</p>
            <div className="flex items-center text-slate-600 text-sm mt-4 md:mt-0">
                <span>Designed with</span>
                <Heart className="h-4 w-4 mx-1 text-red-500 fill-current animate-pulse" />
                <span>by Zynocs Team</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;