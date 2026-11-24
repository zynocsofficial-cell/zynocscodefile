import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Logo } from '@/components/common/Logo';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ChatbotPlaceholder } from '@/components/common/ChatbotPlaceholder';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

// Landing Page Components
import { Hero } from '@/modules/landing/components/Hero';
import { Services } from '@/modules/landing/components/Services';
import { Contact } from '@/modules/landing/components/Contact';
import { About } from '@/modules/landing/components/About';
import { Testimonials } from '@/modules/landing/components/Testimonials';
import { Portfolio } from '@/modules/landing/components/Portfolio';
import { Careers } from '@/modules/landing/components/Careers';
import { Insights } from '@/modules/landing/components/Insights';
import { ProjectCaseStudy } from '@/modules/landing/components/ProjectCaseStudy';
import { BlogPostDetail } from '@/modules/landing/components/BlogPostDetail';
import { CallToAction } from '@/modules/landing/components/CallToAction';
import { AdPlacements } from '@/modules/landing/components/AdPlacements';
import { SubdomainAuth } from '@/modules/auth/SubdomainAuth';
import { authService } from '@/services/authService';

import { ProjectItem, Section, BlogPostItem, SubdomainId } from '@/types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [selectedSubdomain, setSelectedSubdomain] = useState<SubdomainId>('client');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  // Preloader only once on public website initial entry
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const alreadyPreloaded = sessionStorage.getItem('zynocs_preloaded');
      const params = new URLSearchParams(window.location.search);
      const isPortal = params.has('portal') || params.has('subdomain') || params.has('auth_token') || params.has('token');
      const host = window.location.hostname;
      const isSubdomain = host.includes('.') && !host.endsWith('.vercel.app') && host !== 'localhost' && !host.startsWith('www.');

      // If already shown in this session, or accessing a portal/subdomain directly, skip preloader
      if (alreadyPreloaded || isPortal || isSubdomain) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        try {
          sessionStorage.setItem('zynocs_preloaded', 'true');
        } catch (e) {
          // Ignore
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Subdomain & Portal Route Ingestion
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const authToken = params.get('auth_token') || params.get('token');
      
      if (authToken) {
        const user = authService.restoreFromToken(authToken);
        if (user) {
          setAuthenticatedUser(user);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        const session = authService.getCurrentSession();
        if (session) {
          setAuthenticatedUser(session);
        }
      }

      const secParam = params.get('section') || params.get('page');
      if (secParam === 'ad_placements' || secParam === 'ads' || secParam === 'sponsors') {
        setActiveSection(Section.AdPlacements);
      } else if (secParam === 'blogs') {
        setActiveSection(Section.Blogs);
      } else if (secParam === 'about') {
        setActiveSection(Section.About);
      } else if (secParam === 'contact') {
        setActiveSection(Section.Contact);
      }

      const subParam = params.get('subdomain') || params.get('portal');
      const validSubdomains: SubdomainId[] = ['main', 'directors', 'work', 'client', 'ads', 'sponsors'];
      
      if (subParam && validSubdomains.includes(subParam as SubdomainId)) {
        setSelectedSubdomain(subParam as SubdomainId);
        setActiveSection(Section.Auth);
      } else {
        const host = window.location.hostname;
        const sub = host.split('.')[0] as SubdomainId;
        if (validSubdomains.includes(sub)) {
          setSelectedSubdomain(sub);
          setActiveSection(Section.Auth);
        }
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  const handleNavigate = (section: Section, subdomain?: SubdomainId) => {
    if (subdomain) {
      setSelectedSubdomain(subdomain);
    }
    setActiveSection(section);
    if (section !== Section.ProjectDetails) {
      setSelectedProject(null);
    }
    if (section !== Section.BlogDetails) {
      setSelectedBlog(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setActiveSection(Section.ProjectDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveSection(Section.Home);
    setTimeout(() => {
      window.scrollTo({ top: 650, behavior: 'smooth' });
    }, 50);
  };

  const handleSelectBlog = (blog: BlogPostItem) => {
    setSelectedBlog(blog);
    setActiveSection(Section.BlogDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
    setActiveSection(Section.Blogs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Portfolio onSelectProject={handleSelectProject} />
            <Services onNavigate={handleNavigate} />
            <Insights onSelectBlog={handleSelectBlog} isStandalonePage={false} />
            <Testimonials />
            <CallToAction onNavigate={handleNavigate} />
          </>
        );

      case Section.AdPlacements:
        return (
          <div className="pt-12 min-h-screen">
            <AdPlacements onNavigate={handleNavigate} />
          </div>
        );

      case Section.Services:
        return (
          <div className="pt-20 min-h-screen">
            <Services onNavigate={handleNavigate} />
            <Portfolio onSelectProject={handleSelectProject} />
            <Testimonials />
          </div>
        );

      case Section.About:
        return <About onNavigate={handleNavigate} />;

      case Section.Blogs:
        return (
          <div className="pt-12 min-h-screen">
            <Insights onSelectBlog={handleSelectBlog} isStandalonePage={true} />
          </div>
        );

      case Section.BlogDetails:
        return selectedBlog ? (
          <BlogPostDetail
            blog={selectedBlog}
            onBack={handleBackToBlogs}
            onSelectBlog={handleSelectBlog}
            onNavigate={handleNavigate}
          />
        ) : (
          <div className="pt-12 min-h-screen">
            <Insights onSelectBlog={handleSelectBlog} isStandalonePage={true} />
          </div>
        );

      case Section.Careers:
        return (
          <div className="pt-20 min-h-screen">
            <Careers />
          </div>
        );

      case Section.Contact:
        return (
          <div className="pt-20 min-h-screen">
            <Contact onNavigate={handleNavigate} />
          </div>
        );

      case Section.Auth:
        return (
          <SubdomainAuth
            initialSubdomain={selectedSubdomain}
            onNavigate={handleNavigate}
            onAuthStateChange={setAuthenticatedUser}
          />
        );

      case Section.ProjectDetails:
        return selectedProject ? (
          <ProjectCaseStudy
            project={selectedProject}
            onBack={handleBackToProjects}
            onNavigate={handleNavigate}
          />
        ) : (
          <Hero onNavigate={handleNavigate} />
        );

      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#020617] z-[9999] flex flex-col items-center justify-center">
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

  const isDashboardActive = activeSection === Section.Auth && Boolean(authenticatedUser);

  return (
    <div className={`bg-[#020617] text-slate-200 selection:bg-brand-500/30 font-sans ${isDashboardActive ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {!isDashboardActive && (
        <>
          <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-400 to-accent-500 z-[60] shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
        </>
      )}

      <ParticleBackground />

      <main className={isDashboardActive ? 'h-full w-full' : 'relative z-10'}>{renderSection()}</main>

      {!isDashboardActive && (
        <>
          <ScrollToTop />
          <ChatbotPlaceholder />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
};

export default App;
