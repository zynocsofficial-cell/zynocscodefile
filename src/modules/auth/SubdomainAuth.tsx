import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  KeyRound, 
  Users, 
  Briefcase, 
  BarChart3, 
  Radio, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Fingerprint, 
  Laptop, 
  Building2, 
  Check, 
  Copy, 
  ChevronRight, 
  Globe, 
  Loader2, 
  Mail, 
  Award,
  FileCheck2,
  Key,
  ExternalLink
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Section, SubdomainId } from '@/types';
import { Directors } from '@/modules/directors/Directors';
import { RoleDashboard } from './RoleDashboard';
import { authService, AuthUser } from '@/services/authService';

interface SubdomainAuthProps {
  initialSubdomain?: SubdomainId;
  onNavigate: (section: Section, subdomain?: SubdomainId) => void;
  onAuthStateChange?: (user: any | null) => void;
}

interface SubdomainMeta {
  id: SubdomainId;
  name: string;
  subdomain: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  emailLabel: string;
  signupTabLabel: string;
  altAuthLabel?: string;
  altAuthType?: 'passkey' | 'google' | 'magic_link' | 'google_sponsor';
}

export const SubdomainAuth: React.FC<SubdomainAuthProps> = ({ 
  initialSubdomain = 'client', 
  onNavigate,
  onAuthStateChange
}) => {
  const [activeSubdomain, setActiveSubdomain] = useState<SubdomainId>(initialSubdomain);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // Form submission and loading states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  // Sync auth state with parent App (to hide top navbar & bottom footer)
  useEffect(() => {
    onAuthStateChange?.(authenticatedUser);
  }, [authenticatedUser, onAuthStateChange]);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [passkeyModalOpen, setPasskeyModalOpen] = useState(false);
  const [passkeyScanning, setPasskeyScanning] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [activationKey, setActivationKey] = useState('');

  // Sync initialSubdomain prop and check existing active session
  useEffect(() => {
    if (initialSubdomain) {
      setActiveSubdomain(initialSubdomain);
      setAuthMode('signin');
      const session = authService.getCurrentSession();
      if (session && session.subdomain.startsWith(initialSubdomain)) {
        setAuthenticatedUser(session);
      } else {
        setAuthenticatedUser(null);
      }
    }
  }, [initialSubdomain]);

  const subdomains: Record<SubdomainId, SubdomainMeta> = {
    client: {
      id: 'client',
      name: 'Client Portal',
      subdomain: 'client.zynocs.com',
      badge: 'Client Deliverables & SLA',
      badgeColor: 'border-brand-500/30 bg-brand-500/10 text-brand-400',
      icon: Briefcase,
      title: 'Client Portal',
      subtitle: 'Milestone tracking, staging previews, and billing.',
      emailLabel: 'Client Work Email',
      emailPlaceholder: 'cto@yourcompany.com',
      signupTabLabel: 'Activate Contract',
      altAuthLabel: 'Send One-Click Magic Login Link',
      altAuthType: 'magic_link'
    },
    work: {
      id: 'work',
      name: 'Work Workspace',
      subdomain: 'work.zynocs.com',
      badge: 'Internal Staff Network',
      badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      icon: Laptop,
      title: 'Staff & Engineering',
      subtitle: 'Engineering sprints, deployment pipelines, and internal tools.',
      emailLabel: 'Corporate Work Email',
      emailPlaceholder: 'name@zynocs.com',
      signupTabLabel: 'Activate Staff',
      altAuthLabel: 'Sign in with Google Workspace (@zynocs.com)',
      altAuthType: 'google'
    },
    directors: {
      id: 'directors',
      name: 'Directors Portal',
      subdomain: 'directors.zynocs.com',
      badge: 'Board Governance',
      badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
      icon: Shield,
      title: 'Board of Directors',
      subtitle: 'Restricted to appointed Directors, Chairperson, and CEO.',
      emailLabel: 'Director Corporate Email',
      emailPlaceholder: 'director@zynocs.com',
      signupTabLabel: 'Appointment',
      altAuthLabel: 'Authenticate with FIDO2 Passkey / TouchID',
      altAuthType: 'passkey'
    },
    sponsors: {
      id: 'sponsors',
      name: 'Sponsors Hub',
      subdomain: 'sponsors.zynocs.com',
      badge: 'Advertiser Platform',
      badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      icon: BarChart3,
      title: 'Advertisers & Sponsors',
      subtitle: 'Live campaign telemetry, CTR analytics, and creative studio.',
      emailLabel: 'Brand Work Email',
      emailPlaceholder: 'marketing@brand.com',
      signupTabLabel: 'Create Account',
      altAuthLabel: 'Continue with Google Account',
      altAuthType: 'google_sponsor'
    },
    ads: {
      id: 'ads',
      name: 'AdTech Platform',
      subdomain: 'ads.zynocs.com',
      badge: 'AdOps Infrastructure',
      badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      icon: Radio,
      title: 'AdOps Operations',
      subtitle: 'Header bidding floor engine, inventory, and fraud telemetry.',
      emailLabel: 'Operator Clearance ID',
      emailPlaceholder: 'operator@zynocs.com',
      signupTabLabel: 'Operator Key'
    },
    main: {
      id: 'main',
      name: 'Central Identity',
      subdomain: 'zynocs.com',
      badge: 'Global Single Sign-On',
      badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      icon: Globe,
      title: 'Global Single Sign-On',
      subtitle: 'One master account connecting all Zynocs enterprise services.',
      emailLabel: 'Zynocs Account Email',
      emailPlaceholder: 'user@domain.com',
      signupTabLabel: 'Register ID',
      altAuthLabel: 'Continue with Google Account',
      altAuthType: 'google'
    }
  };

  const current = subdomains[activeSubdomain];

  const getDisplayUrl = (subId: SubdomainId) => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('localhost')) {
      const port = window.location.port ? `:${window.location.port}` : '';
      return subId === 'main' ? `localhost${port}` : `${subId}.localhost${port}`;
    }
    return subId === 'main' ? 'zynocs.com' : `${subId}.zynocs.com`;
  };

  const handleCopyUrl = () => {
    const domain = getDisplayUrl(activeSubdomain);
    const protocol = typeof window !== 'undefined' && window.location.protocol === 'http:' ? 'http://' : 'https://';
    navigator.clipboard.writeText(`${protocol}${domain}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSubdomainChange = (subId: SubdomainId) => {
    setActiveSubdomain(subId);
    setAuthMode('signin');
    setErrorMessage('');
    const session = authService.getCurrentSession();
    if (session && session.subdomain.startsWith(subId)) {
      setAuthenticatedUser(session);
    } else {
      setAuthenticatedUser(null);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await authService.signIn(email, password, activeSubdomain);
      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
        return;
      }
      setAuthenticatedUser(res.user);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await authService.register({
        email: signupEmail,
        password: signupPassword,
        fullName,
        subdomain: activeSubdomain,
        resolutionKey: activationKey,
        companyName
      });
      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Registration failed.');
        return;
      }
      setAuthenticatedUser(res.user);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Activation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerPasskey = async () => {
    setPasskeyModalOpen(true);
    setPasskeyScanning(true);
    setErrorMessage('');

    try {
      // Hardware biometric challenge simulation
      await new Promise((resolve) => setTimeout(resolve, 1400));
      const res = await authService.authenticateFido2(activeSubdomain);
      setPasskeyScanning(false);
      if (res.success && res.user) {
        setTimeout(() => {
          setPasskeyModalOpen(false);
          setAuthenticatedUser(res.user);
        }, 500);
      } else {
        setPasskeyModalOpen(false);
        setErrorMessage(res.error || 'FIDO2 Passkey verification failed.');
      }
    } catch (err: any) {
      setPasskeyScanning(false);
      setPasskeyModalOpen(false);
      setErrorMessage('Passkey hardware handshake failed.');
    }
  };

  const handleSignOut = () => {
    authService.logout();
    setAuthenticatedUser(null);
    setEmail('');
    setPassword('');
    setSignupEmail('');
    setSignupPassword('');
    setFullName('');
    setActivationKey('');
    setErrorMessage('');
  };

  // If successfully logged in as Director, render the Executive Boardroom Panel
  if (authenticatedUser && activeSubdomain === 'directors') {
    return (
      <Directors 
        user={authenticatedUser} 
        onSignOut={handleSignOut} 
        onNavigate={onNavigate} 
      />
    );
  }

  // If successfully logged in under any other role/subdomain, render their Dedicated Personalized Dashboard
  if (authenticatedUser) {
    return (
      <RoleDashboard
        user={authenticatedUser}
        subdomain={activeSubdomain}
        onSignOut={handleSignOut}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-32 sm:pb-24 min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[320px] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg mx-auto px-4 w-full relative z-10">

        {/* Top Bar: Return Link + Subdomain URL Bar */}
        <div className="mb-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => onNavigate(Section.Home)}
              className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              <span>Return to Homepage</span>
            </button>

            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline-block">
              Identity Mesh v2.4
            </span>
          </div>

          {/* Subdomain Switcher Box - Clean Grid Layout (No Scrolling) */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              
              {/* Domain URL Address Indicator - Click to open in browser address bar */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <a
                  href={`${typeof window !== 'undefined' && window.location.protocol === 'http:' ? 'http://' : 'https://'}${getDisplayUrl(activeSubdomain)}`}
                  className="flex items-center gap-1.5 overflow-hidden text-slate-300 hover:text-white group transition-colors"
                  title="Click to navigate browser to this subdomain address"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-bold">https://</span>
                  <span className="text-white font-bold truncate group-hover:underline">{getDisplayUrl(activeSubdomain)}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-0.5" />
                </a>
                <button
                  onClick={handleCopyUrl}
                  title="Copy Subdomain URL"
                  className="text-slate-500 hover:text-slate-300 pl-2 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* 6 Subdomain Pills: Equal width grid, zero scrollbar, all visible simultaneously */}
              <div className="grid grid-cols-6 gap-1.5 w-full">
                {(['client', 'work', 'directors', 'sponsors', 'ads', 'main'] as SubdomainId[]).map((subId) => {
                  const isActive = activeSubdomain === subId;
                  return (
                    <button
                      key={subId}
                      type="button"
                      onClick={() => handleSubdomainChange(subId)}
                      className={`w-full py-1.5 px-0.5 text-center text-[11px] sm:text-xs font-mono rounded-xl transition-all truncate ${
                        isActive
                          ? 'bg-slate-100 text-slate-950 font-bold shadow-md'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                      }`}
                    >
                      {subId}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* Centered Main Authentication Card (Rock-solid fixed coordinates) */}
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.15)"
          className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl shadow-2xl relative min-h-[490px] flex flex-col justify-between"
        >

          {/* Success Screen */}
          {authenticatedUser ? (
            <div className="my-auto py-8 text-center space-y-5 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Session Verified
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Welcome, {authenticatedUser.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Active node: <span className="text-brand-300">{authenticatedUser.subdomain}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => onNavigate(Section.Home)}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all"
                >
                  Enter Platform
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Live Form View */
            <div className="flex flex-col h-full justify-between">
              
              {/* Card Header (Fixed height to prevent any layout jumping) */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${current.badgeColor}`}>
                    <current.icon className="w-3.5 h-3.5" />
                    <span>{current.badge}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    SSO Active
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {current.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {current.subtitle}
                </p>
              </div>

              {/* Standardized Tabs (Sign In vs Activation / Registration) */}
              <div className="flex border-b border-slate-800 mb-5">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold text-center transition-all relative ${
                    authMode === 'signin'
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sign In
                  {authMode === 'signin' && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-brand-400 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold text-center transition-all relative ${
                    authMode === 'signup'
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {current.signupTabLabel}
                  {authMode === 'signup' && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-accent-400 rounded-full" />
                  )}
                </button>
              </div>

              {/* ==================== SIGN IN VIEW ==================== */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-3.5">
                    {/* Fixed Field 1: Email / Identity */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        {current.emailLabel}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={current.emailPlaceholder}
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Fixed Field 2: Password with Eye Toggle */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Password
                        </label>
                        <a 
                          href="#forgot" 
                          onClick={(e) => { e.preventDefault(); alert(`Password recovery link dispatched to ${email || 'your email'}`); }}
                          className="text-xs text-brand-400 hover:underline"
                        >
                          Forgot?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 text-brand-400" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Submit */}
                  <div className="space-y-2.5 pt-2">
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs text-center font-medium animate-shake">
                        {errorMessage}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to {current.name}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Integrated Subdomain Alternative Action (Consistent Slot, Never Displaces Boxes) */}
                    {current.altAuthLabel && (
                      <div className="pt-0.5">
                        {current.altAuthType === 'passkey' && (
                          <button
                            type="button"
                            onClick={handleTriggerPasskey}
                            className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                          >
                            <Fingerprint className="w-4 h-4" />
                            <span>{current.altAuthLabel}</span>
                          </button>
                        )}

                        {current.altAuthType === 'google' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!email) {
                                setErrorMessage('Please enter your corporate @zynocs.com email address above first.');
                                return;
                              }
                              setErrorMessage('');
                              alert(`Redirecting to Google Workspace SSO for ${email}...`);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                          >
                            <Globe className="w-4 h-4 text-emerald-400" />
                            <span>{current.altAuthLabel}</span>
                          </button>
                        )}

                        {current.altAuthType === 'google_sponsor' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!email) {
                                setErrorMessage('Please enter your brand corporate email above first.');
                                return;
                              }
                              setErrorMessage('');
                              alert(`Connecting to Google Workspace Identity for ${email}...`);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                          >
                            <Globe className="w-4 h-4 text-amber-400" />
                            <span>{current.altAuthLabel}</span>
                          </button>
                        )}

                        {current.altAuthType === 'magic_link' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!email) {
                                setErrorMessage('Please enter your client corporate work email above first.');
                                return;
                              }
                              setErrorMessage('');
                              alert(`Passwordless Magic Login link dispatched to ${email}. Check your inbox!`);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-brand-500/40 text-slate-300 hover:text-brand-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                          >
                            <Sparkles className="w-4 h-4 text-brand-400" />
                            <span>{current.altAuthLabel}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                </form>
              )}

              {/* ==================== SIGN UP / ACTIVATION VIEW ==================== */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3 flex-1 flex flex-col justify-between animate-fade-in-up">
                  
                  <div className="space-y-3">
                    
                    {/* Directors Appointment Form */}
                    {activeSubdomain === 'directors' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-[11px] text-slate-300 leading-relaxed">
                          <span className="text-cyan-400 font-bold block mb-0.5">Board of Directors Appointment</span>
                          Board access is strictly peer-invited. Enter the 24-hour temporary invite key generated by an active Director inside their Executive Board Panel.
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Temporary Director Invite Key *
                          </label>
                          <div className="relative">
                            <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={activationKey}
                              onChange={(e) => setActivationKey(e.target.value)}
                              placeholder="e.g. ZYN-DIR-KEY-84920"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Director Corporate Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="director@zynocs.com"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Set Master Password *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Minimum 12 characters"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              title={showSignupPassword ? "Hide password" : "Show password"}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                            >
                              {showSignupPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Work Staff Onboarding Form */}
                    {activeSubdomain === 'work' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-slate-300 leading-relaxed">
                          <span className="text-emerald-400 font-bold block mb-0.5">Staff Onboarding Activation</span>
                          Enter the HR onboarding token received in your official Zynocs Human Resources welcome letter.
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            HR Onboarding Token *
                          </label>
                          <div className="relative">
                            <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={activationKey}
                              onChange={(e) => setActivationKey(e.target.value)}
                              placeholder="HR-EMP-4019-ONBOARD"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Assigned Work Email (@zynocs.com) *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="engineer@zynocs.com"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Set Password *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Minimum 10 characters"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              title={showSignupPassword ? "Hide password" : "Show password"}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                            >
                              {showSignupPassword ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Client Contract Activation Form */}
                    {activeSubdomain === 'client' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/25 text-[11px] text-brand-300 leading-relaxed">
                          Enter your Master Services Agreement (MSA) reference code to claim your dedicated client portal.
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            MSA Contract Reference ID *
                          </label>
                          <div className="relative">
                            <FileCheck2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={activationKey}
                              onChange={(e) => setActivationKey(e.target.value)}
                              placeholder="ZYN-MSA-2026-X88"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Authorized Corporate Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="cto@clientcorp.com"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Set Password *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Minimum 10 characters"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              title={showSignupPassword ? "Hide password" : "Show password"}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                            >
                              {showSignupPassword ? <EyeOff className="w-4 h-4 text-brand-400" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Sponsors Public Self-Serve Advertiser Registration */}
                    {activeSubdomain === 'sponsors' && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                              Brand Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="Stripe, AWS..."
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                              Lead Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Alex Morgan"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Work Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="alex@brand.com"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Set Password *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Minimum 10 characters"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              title={showSignupPassword ? "Hide password" : "Show password"}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                            >
                              {showSignupPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Ads Operator Registration */}
                    {activeSubdomain === 'ads' && (
                      <>
                        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-[11px] text-purple-300 leading-relaxed">
                          AdTech operations require an Operator Security Clearance Key issued by Infrastructure Leads.
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Operator Clearance Key *
                          </label>
                          <div className="relative">
                            <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="ADOPS-SEC-2026-X77"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Main Website Universal Signup */}
                    {activeSubdomain === 'main' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Sarah Jenkins"
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Account Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="sarah@company.com"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Set Password *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Minimum 10 characters"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              title={showSignupPassword ? "Hide password" : "Show password"}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                            >
                              {showSignupPassword ? <EyeOff className="w-4 h-4 text-brand-400" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs text-center font-medium mb-2 animate-shake">
                        {errorMessage}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Activating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete {current.signupTabLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </SpotlightCard>

      </div>

      {/* Interactive Passkey Biometric Scanning Modal for Directors */}
      {passkeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl max-w-sm w-full text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Fingerprint className={`w-8 h-8 ${passkeyScanning ? 'animate-pulse text-cyan-300' : 'text-emerald-400'}`} />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                {passkeyScanning ? 'Touch Security Key / Sensor' : 'Passkey Authenticated'}
              </h3>
              <p className="text-xs text-slate-400">
                {passkeyScanning 
                  ? 'Verifying FIDO2 cryptographic token for Board of Directors clearance...'
                  : 'Hardware signature matched. Forwarding to boardroom...'}
              </p>
            </div>

            {passkeyScanning && (
              <div className="flex items-center justify-center gap-2 text-xs text-cyan-400 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Awaiting touch verification...</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
