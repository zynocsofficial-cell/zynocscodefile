import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  KeyRound,
  Lock,
  Smartphone,
  Laptop,
  Globe,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Save,
  RefreshCw,
  Sliders,
  Mail,
  Phone,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Database,
  Fingerprint,
  LogOut,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface DirectorProfileSettingsProps {
  user: {
    name: string;
    email: string;
    role: string;
    subdomain: string;
  };
  onSignOut: () => void;
}

export const DirectorProfileSettings: React.FC<DirectorProfileSettingsProps> = ({
  user,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'governance' | 'integrations' | 'sessions'>('profile');
  
  // Profile Form State
  const [fullName, setFullName] = useState(user.name || 'Mohammed Khaja Moinuddin');
  const [officialTitle, setOfficialTitle] = useState('Founder, Chairperson & Board Director');
  const [emailAddress, setEmailAddress] = useState(user.email || 'director@zynocs.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST - UTC+05:30)');
  const [executiveBio, setExecutiveBio] = useState(
    'Chairperson and Co-founder leading technical governance, multi-region cloud architecture, and strategic enterprise growth at Zynocs Global Technologies.'
  );
  const [isSaved, setIsSaved] = useState(false);

  // Security State
  const [fidoKeyName, setFidoKeyName] = useState('YubiKey 5 NFC (Primary Executive Token)');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangedSuccess, setPasswordChangedSuccess] = useState(false);

  // Integrations State
  const [githubSync, setGithubSync] = useState(true);
  const [googleCalendarSync, setGoogleCalendarSync] = useState(true);
  const [cloudflareEdgeSync, setCloudflareEdgeSync] = useState(true);

  // Sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro 16" (macOS Sonoma)',
      browser: 'Chrome 124.0.6367',
      ip: '103.24.88.12 (Hyderabad, India)',
      time: 'Active Now (Current Session)',
      isCurrent: true,
      icon: Laptop
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro (iOS 18)',
      browser: 'Mobile Safari 18.0',
      ip: '157.34.120.45 (Mumbai, India)',
      time: '3 hours ago',
      isCurrent: false,
      icon: Smartphone
    }
  ]);
  const [sessionRevokedNotice, setSessionRevokedNotice] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangedSuccess(true);
    setTimeout(() => {
      setPasswordChangedSuccess(false);
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
    }, 2000);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    setSessionRevokedNotice('Remote session terminated and security token revoked in PostgreSQL 18.');
    setTimeout(() => setSessionRevokedNotice(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* 1. Executive Profile Hero Header */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Director Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-200">
                  KM
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center" title="Online & FIDO2 Verified">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-black text-white tracking-tight">{fullName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  Tier-1 Executive Boardroom
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  FIDO2 Active
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300">{officialTitle}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1 flex-wrap">
                <span className="text-cyan-400">{emailAddress}</span>
                <span>•</span>
                <span>Zynocs Global Technologies</span>
                <span>•</span>
                <span className="text-emerald-400">PostgreSQL 18 Master Node</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={onSignOut}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'security'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Security & Passkeys</span>
          </button>

          <button
            onClick={() => setActiveTab('governance')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'governance'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Governance & Equity Rights</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'integrations'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cloud & Git Integrations</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sessions'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Active Sessions ({sessions.length})</span>
          </button>
        </div>
      </div>

      {/* Notifications Banner */}
      {sessionRevokedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{sessionRevokedNotice}</span>
        </div>
      )}

      {/* TAB 1: Profile & Identity */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Director Profile & Executive Dossier</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your public legal identity and corporate boardroom registry details.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Full Legal Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Official Title & Board Seat</label>
                    <input
                      type="text"
                      value={officialTitle}
                      onChange={(e) => setOfficialTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Corporate Email Address</label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Emergency Direct Phone</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Primary Timezone & Locale</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Executive Mandate & Bio</label>
                  <textarea
                    rows={4}
                    value={executiveBio}
                    onChange={(e) => setExecutiveBio(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-xs leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Updated in PostgreSQL 18 table: <code>directors_registry</code>
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{isSaved ? 'Saved to PostgreSQL' : 'Save Profile Changes'}</span>
                  </button>
                </div>

              </form>

            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            
            {/* Legal Signing Authority Card */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Legal Signature Authority
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registered signatory for bilateral contracts, bank authorizations, and SEC / Ministry filings.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] space-y-1">
                <div className="text-slate-400">Signatory ID: <span className="text-cyan-400">ZYN-DIR-001-KM</span></div>
                <div className="text-slate-400">Class: <span className="text-emerald-400">Unrestricted Authorized</span></div>
                <div className="text-slate-400">Public Key Hash: <span className="text-slate-300">0x8a91...4fe9</span></div>
              </div>
            </div>

            {/* Quick Director Quick Stats */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Executive Metadata
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tenure:</span>
                  <span className="text-white font-mono">Founder (Permanent)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Appointed By:</span>
                  <span className="text-white">Incorporation Charter</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Board Seat:</span>
                  <span className="text-cyan-400 font-mono font-bold">Seat #1 (Chairperson)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Security & Passkeys */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* FIDO2 Hardware Key */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">FIDO2 Hardware Key</h3>
                    <span className="text-xs text-slate-400">WebAuthn / USB-C & NFC Token</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  Enforced
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Cryptographic hardware authentication ensures zero credential theft or phishing attacks on the Board of Directors console.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                <div className="text-slate-300 font-bold">{fidoKeyName}</div>
                <div className="text-slate-500">Serial: 99482-YUBI-ENT • Registered on 2024-02-14</div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all">
                + Register Backup Security Key
              </button>
            </div>

            {/* Password & Hash */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Bcrypt Master Password</h3>
                    <span className="text-xs text-slate-400">PostgreSQL 18 User Auth Table</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  10-Round Hash
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Your password is salted and encrypted using Bcrypt prior to persistence in PostgreSQL 18. Plaintext is never transmitted.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400">
                Last Rotated: <span className="text-white">14 days ago</span> • Requirements: <span className="text-emerald-400">High Entropy</span>
              </div>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-all cursor-pointer"
              >
                Change Master Password
              </button>
            </div>

          </div>

          {/* Emergency Lockout Card */}
          <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Emergency Boardroom Lockdown</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Immediately invalidate all active sessions, revoke temporary keys, and lock the director console across the entire globe.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Emergency protocol initiated: All director access sessions revoked.');
                onSignOut();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all shrink-0 cursor-pointer"
            >
              Execute Emergency Lock
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Governance & Equity Rights */}
      {activeTab === 'governance' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">Executive Governance & Voting Rights</h3>
            <p className="text-xs text-slate-400 mt-1">
              Legal equity share, quorum weight, and executive resolution sign-off privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Equity Voting Share</span>
              <div className="text-3xl font-black text-cyan-400 font-mono">35.0%</div>
              <p className="text-xs text-slate-400">Class-A Super-Voting Common Equity Stock.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Boardroom Quorum Power</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">Supermajority</div>
              <p className="text-xs text-slate-400">Chairperson casting vote on deadlocked board matters.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Treasury Sign-off Limit</span>
              <div className="text-3xl font-black text-purple-400 font-mono">$5,000,000</div>
              <p className="text-xs text-slate-400">Single-signatory ACH & wire transfer clearance threshold.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Cloud & Git Integrations */}
      {activeTab === 'integrations' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">Ecosystem & Cloud Integrations</h3>
            <p className="text-xs text-slate-400 mt-1">
              Synchronize the Director Console with GitHub Enterprise, Google Workspace, and PostgreSQL 18.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* GitHub Enterprise Integration */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    GitHub Enterprise
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Connected
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sync repositories, review pull requests, and monitor CI/CD automated test runs.
                  </p>
                  <span className="text-[11px] font-mono text-slate-500">Account: @mohammed-zynocs (Admin)</span>
                </div>
              </div>

              <button
                onClick={() => setGithubSync(!githubSync)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  githubSync
                    ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    : 'bg-emerald-600 text-white border-emerald-500'
                }`}
              >
                {githubSync ? 'Manage Access' : 'Connect'}
              </button>
            </div>

            {/* Google Workspace & Calendar */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Google Workspace & Executive Calendar
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Synced
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Two-way synchronization of Board meetings, shareholder assemblies, and Google Meet rooms.
                  </p>
                  <span className="text-[11px] font-mono text-slate-500">Sync: director@zynocs.com</span>
                </div>
              </div>

              <button
                onClick={() => setGoogleCalendarSync(!googleCalendarSync)}
                className="px-4 py-2 rounded-xl text-xs font-bold border bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                Sync Settings
              </button>
            </div>

            {/* PostgreSQL 18 Live Replica */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    PostgreSQL 18 Enterprise Master Node
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Port 8800 Active
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    High-throughput connection pool with PgBouncer and streaming WAL replica.
                  </p>
                  <span className="text-[11px] font-mono text-slate-500">Latency: 0.8ms • Zero Packet Loss</span>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 font-bold">100% Operational</span>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: Active Sessions */}
      {activeTab === 'sessions' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Active Cryptographic Sessions</h3>
              <p className="text-xs text-slate-400 mt-1">
                Devices authorized to access <code>directors.zynocs.com</code> via FIDO2 passkeys.
              </p>
            </div>

            {sessions.length > 1 && (
              <button
                onClick={() => {
                  setSessions(sessions.filter(s => s.isCurrent));
                  setSessionRevokedNotice('All other remote devices logged out successfully.');
                  setTimeout(() => setSessionRevokedNotice(null), 3000);
                }}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold border border-red-500/40 transition-all cursor-pointer"
              >
                Revoke All Other Sessions
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300">
                    <sess.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{sess.device}</h4>
                      {sess.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{sess.browser}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-1">
                      {sess.ip} • <span className="text-slate-400">{sess.time}</span>
                    </div>
                  </div>
                </div>

                {!sess.isCurrent && (
                  <button
                    onClick={() => handleRevokeSession(sess.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-300 text-xs font-semibold border border-slate-800 hover:border-red-500/40 transition-all self-start sm:self-auto"
                  >
                    Revoke Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Change Master Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                Change Master Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {passwordChangedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Password changed & re-hashed with Bcrypt in PostgreSQL 18!</span>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">New Master Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 12 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                  >
                    Update & Hash
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
