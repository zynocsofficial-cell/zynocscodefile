import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Github, Chrome, AlertCircle, Key, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface LoginProps {
  onLogin: (role: 'client' | 'admin') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API Validation
    setTimeout(() => {
      if (email === 'admin@zynocs.com' && password === 'admin123') {
        setIsLoading(false);
        onLogin('client');
      } else if (email === 'owner@zynocs.com' && password === 'admin123') {
        setIsLoading(false);
        onLogin('admin');
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Try using demo access.');
      }
    }, 1500);
  };

  const fillClientDemo = () => {
    setEmail('admin@zynocs.com');
    setPassword('admin123');
    setError('');
  };

  const fillAdminDemo = () => {
    setEmail('owner@zynocs.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative z-10">
      
      {/* Container */}
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
          
          {/* Top Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-75"></div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12" withText={false} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Access your Zynocs Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start space-x-3 animate-pulse">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-brand-500/50 focus:ring-offset-0"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex justify-between gap-3 text-xs text-slate-500">
                <button 
                  type="button" 
                  onClick={fillClientDemo}
                  className="hover:text-brand-400 flex items-center transition-colors"
                >
                  <Key className="h-3 w-3 mr-1" /> Client Demo
                </button>
                <button 
                  type="button" 
                  onClick={fillAdminDemo}
                  className="hover:text-red-400 flex items-center transition-colors"
                >
                  <ShieldCheck className="h-3 w-3 mr-1" /> Owner Demo
                </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/20 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/80 text-slate-500 backdrop-blur-md">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-slate-700 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                <Github className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-slate-700 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                <Chrome className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};