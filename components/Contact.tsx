
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      // Reset after showing success
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="py-24 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
              Let's Build Something <br /><span className="gradient-text">Extraordinary</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Ready to transform your digital presence? We are currently accepting new enterprise partnerships for Q4 2024.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-brand-500/25 group-hover:-translate-y-1">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Email Us</h4>
                  <p className="text-slate-400">hello@zynocs.tech</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-brand-500/25 group-hover:-translate-y-1">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Call Us</h4>
                  <p className="text-slate-400">+1 (888) ZYNOCS-IT</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-brand-500/25 group-hover:-translate-y-1">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Visit HQ</h4>
                  <p className="text-slate-400">101 Innovation Blvd, Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-3xl animate-fade-in-up border border-slate-700/50" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Interest</label>
                <select id="subject" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none">
                    <option>Custom Web Development</option>
                    <option>Cloud Infrastructure</option>
                    <option>AI Solutions</option>
                    <option>Enterprise Security</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="Tell us about your goals, timeline, and budget..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`w-full font-bold py-4 rounded-xl shadow-xl transition-all flex items-center justify-center relative overflow-hidden group ${
                    formState === 'success' 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gradient-to-r from-brand-600 to-accent-600 text-white hover:shadow-brand-500/40 hover:-translate-y-1 active:scale-95'
                }`}
              >
                {formState === 'idle' && (
                    <>
                        <span className="relative z-10 flex items-center">Send Inquiry <Send className="ml-2 h-5 w-5" /></span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </>
                )}
                
                {formState === 'submitting' && (
                    <Loader2 className="h-6 w-6 animate-spin" />
                )}

                {formState === 'success' && (
                    <span className="flex items-center">Message Sent <CheckCircle className="ml-2 h-5 w-5" /></span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};