
import React, { useState } from 'react';
import { Clock, Tag, ArrowRight, User } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Insights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Artificial Intelligence', 'Cloud Engineering', 'FinTech', 'Security'];

  const featuredPost = {
    title: "The Architecture of Scale: Rebuilding Legacy Banking Core for 2025",
    excerpt: "How we migrated a Fortune 500 financial institution from a monolithic mainframe to a microservices mesh using Kubernetes and Rust, reducing transaction latency by 94%.",
    category: "Cloud Engineering",
    author: "Alexander Zaine",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600",
    date: "Oct 12, 2024"
  };

  const posts = [
    {
      title: "Generative AI in Enterprise: Beyond the Chatbot",
      excerpt: "Exploring practical use cases for LLMs in supply chain optimization and predictive maintenance.",
      category: "Artificial Intelligence",
      date: "Oct 08, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "Zero Trust Security for Remote-First Teams",
      excerpt: "Implementing strict identity verification and least-privilege access without hindering developer productivity.",
      category: "Security",
      date: "Sep 29, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "Why We Chose React Native for High-Frequency Trading Mobile Apps",
      excerpt: "Debunking the 'native is faster' myth with benchmark data from our latest trading platform release.",
      category: "FinTech",
      date: "Sep 15, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Zynocs <span className="text-brand-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Deep dives into engineering, strategy, and the future of technology. Written by the builders at Zynocs.
            </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25' 
                        : 'bg-slate-900 border border-slate-700 text-slate-400 hover:border-brand-500 hover:text-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 aspect-[21/9] md:aspect-[21/8]">
                <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                    <div className="flex items-center space-x-4 mb-4 text-sm font-bold tracking-wider uppercase">
                        <span className="text-brand-400">{featuredPost.category}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">{featuredPost.date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-brand-100 transition-colors">
                        {featuredPost.title}
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 line-clamp-2 md:line-clamp-none">
                        {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-sm text-white font-medium">
                             <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                <User className="h-4 w-4" />
                             </div>
                             <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-400">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.readTime}</span>
                        </div>
                        <button className="ml-auto flex items-center text-white font-bold hover:text-brand-400 transition-colors">
                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {posts.map((post, idx) => (
                <SpotlightCard key={idx} className="group flex flex-col h-full bg-slate-900/30" spotlightColor="rgba(56, 189, 248, 0.1)">
                    <div className="aspect-video w-full overflow-hidden relative border-b border-slate-800">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{post.category}</span>
                            <span className="text-xs text-slate-500">{post.readTime}</span>
                         </div>
                         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-200 transition-colors">
                            {post.title}
                         </h3>
                         <p className="text-slate-400 text-sm mb-6 flex-grow">
                            {post.excerpt}
                         </p>
                         <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform cursor-pointer">
                            Read More <ArrowRight className="ml-2 h-3 w-3" />
                         </div>
                    </div>
                </SpotlightCard>
            ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-brand-900/20 to-accent-900/20 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
             <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Ahead of the Curve</h3>
                <p className="text-slate-400 mb-8">
                    Get our bi-weekly engineering deep dives and industry analysis delivered straight to your inbox. No fluff, just code and strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                        type="email" 
                        placeholder="engineer@company.com" 
                        className="flex-grow px-5 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                    <button className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-lg transition-all hover:scale-105">
                        Subscribe
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-4">We respect your inbox. Unsubscribe at any time.</p>
             </div>
        </div>

      </div>
    </div>
  );
};
