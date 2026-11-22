import React, { useState, useMemo } from 'react';
import { Clock, Tag, ArrowRight, User, Search, X, Check, Mail, Sparkles, BookOpen } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BlogPostItem } from '@/types';
import { blogsData } from '../data/blogsData';

interface InsightsProps {
  onSelectBlog?: (blog: BlogPostItem) => void;
  isStandalonePage?: boolean;
}

export const Insights: React.FC<InsightsProps> = ({ onSelectBlog, isStandalonePage = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Newsletter subscription state
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['All', 'Artificial Intelligence', 'Cloud Engineering', 'FinTech', 'Security'];

  const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600';

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return blogsData.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured post is the first featured or first item
  const featuredPost = useMemo(() => {
    return blogsData.find((p) => p.featured) || blogsData[0];
  }, []);

  // Standard grid posts (if on 'All' with no query, show rest; otherwise show all matching)
  const displayPosts = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery.trim()) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, activeCategory, searchQuery, featuredPost.id]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmailInput('');
    }, 700);
  };

  return (
    <div className={`${isStandalonePage ? 'pt-28' : 'pt-24'} pb-24 min-h-screen relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Dispatches & Articles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight">
            Zynocs <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-indigo-400">Blogs & Insights</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives into enterprise architecture, cloud scale, AI systems, and security engineering. Written by the builders at Zynocs.
          </p>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="mb-12 sm:mb-16 space-y-6 animate-fade-in-up">
          
          {/* Real-time Search Input */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs by keyword, topic, or technology (e.g. 'Kubernetes', 'AI', 'React Native')..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25 ring-2 ring-brand-400/30' 
                    : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
                {cat === 'All' ? ` (${blogsData.length})` : ''}
              </button>
            ))}
          </div>

        </div>

        {/* Featured Post (Displayed when on 'All' with no active search query) */}
        {activeCategory === 'All' && !searchQuery.trim() && (
          <div 
            onClick={() => onSelectBlog && onSelectBlog(featuredPost)}
            className="mb-14 sm:mb-16 animate-fade-in-up cursor-pointer group"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/8] hover:border-slate-700 transition-all duration-500 shadow-2xl hover:shadow-brand-500/10">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImage;
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-105 transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-12 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-wider uppercase">
                  <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 backdrop-blur-md">
                    Featured • {featuredPost.category}
                  </span>
                  <span className="text-slate-400">{featuredPost.date}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight group-hover:text-brand-200 transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-white font-medium">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200';
                      }}
                      className="h-7 w-7 rounded-full object-cover border border-slate-600"
                    />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <span className="ml-auto inline-flex items-center text-xs sm:text-sm font-bold text-brand-400 group-hover:text-brand-300 group-hover:translate-x-1 transition-all">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results Fallback */}
        {displayPosts.length === 0 && (
          <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800 mb-16">
            <Search className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No articles match your search</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; in {activeCategory}. Try adjusting your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-5 py-2.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {displayPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 animate-fade-in-up">
            {displayPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectBlog && onSelectBlog(post)}
                className="cursor-pointer h-full"
              >
                <SpotlightCard 
                  className="group flex flex-col h-full bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" 
                  spotlightColor="rgba(56, 189, 248, 0.12)"
                >
                  {/* Card Image Banner with Fallback Handler */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-slate-800 bg-slate-950">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-mono font-bold text-brand-300 border border-slate-700/60">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span>{post.date}</span>
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-brand-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200';
                          }}
                          className="h-5 w-5 rounded-full object-cover border border-slate-700"
                        />
                        <span className="truncate max-w-[130px]">{post.author.name}</span>
                      </div>
                      <span className="flex items-center group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>

                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-brand-900/30 via-slate-900 to-accent-900/30 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex p-3 rounded-2xl bg-slate-800/80 text-brand-400 mb-4 border border-slate-700">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Subscribe to the Engineering Dispatch
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
              Bi-weekly technical architecture breakdowns, cloud cost optimization tactics, and system design patterns. Zero fluff, just code and strategy.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-center animate-fade-in">
                <Check className="h-4 w-4 mr-2 text-emerald-400" />
                You&apos;re subscribed! Welcome to the Zynocs Engineering Dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@company.com" 
                  className="flex-grow px-5 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-105 shrink-0 disabled:opacity-50"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}

            <p className="text-xs text-slate-500 mt-4">We respect your privacy. No spam, unsubscribe anytime.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
