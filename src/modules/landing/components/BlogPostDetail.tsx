import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  Copy, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen,
  Code2
} from 'lucide-react';
import { BlogPostItem, Section } from '@/types';
import { blogsData } from '../data/blogsData';

interface BlogPostDetailProps {
  blog: BlogPostItem;
  onBack: () => void;
  onSelectBlog: (blog: BlogPostItem) => void;
  onNavigate: (section: Section) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ 
  blog, 
  onBack, 
  onSelectBlog,
  onNavigate 
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600';

  // Related articles from the same or other categories
  const relatedBlogs = blogsData.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <article className="pt-24 pb-24 min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors group px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
          >
            {copied ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="mr-1.5 h-3.5 w-3.5 text-brand-400" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-12 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {blog.category}
            </span>
            <div className="flex items-center text-xs text-slate-400">
              <Calendar className="h-3.5 w-3.5 mr-1 text-slate-500" />
              <span>{blog.date}</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light mb-8">
            {blog.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200';
              }}
              className="h-12 w-12 rounded-full object-cover border border-slate-700 shrink-0"
            />
            <div>
              <div className="text-white font-bold text-sm sm:text-base">{blog.author.name}</div>
              <div className="text-slate-400 text-xs">{blog.author.role} at Zynocs</div>
            </div>
          </div>
        </header>

        {/* Main Banner Image */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 mb-12 sm:mb-16 aspect-[16/9] shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 sm:space-y-12 text-slate-300 text-base sm:text-lg leading-relaxed">
          
          {/* Introduction Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-brand-500/20 text-slate-200">
            <p className="font-medium leading-relaxed">
              {blog.content.intro}
            </p>
          </div>

          {/* Sections */}
          {blog.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-b border-slate-800/80 pb-3">
                {sec.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {sec.body}
              </p>

              {/* Code Snippet if present */}
              {sec.codeSnippet && (
                <div className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <span className="text-xs font-mono text-slate-400 ml-2 uppercase">
                        {sec.codeSnippet.language}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(sec.codeSnippet!.code, idx)}
                      className="inline-flex items-center text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 mr-1 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-brand-300 leading-relaxed bg-[#020617]">
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Key Points */}
              {sec.keyPoints && sec.keyPoints.length > 0 && (
                <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-400 mr-1.5" /> Key Architectural Takeaways
                  </div>
                  {sec.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start text-sm text-slate-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-2 mr-3 shrink-0"></div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
              <Sparkles className="h-5 w-5 text-brand-400 mr-2" /> Conclusion & Next Steps
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {blog.content.conclusion}
            </p>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2 items-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-2">
              Topic Tags:
            </span>
            {blog.tags.map((tag, tIdx) => (
              <span 
                key={tIdx}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Consultation Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-900/30 via-slate-900 to-accent-900/30 border border-brand-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Need to Architect Similar Systems?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
              Zynocs engineers partner with tech-forward enterprises to modernize legacy systems, integrate custom AI workflows, and scale cloud infrastructure.
            </p>
            <button
              onClick={() => onNavigate(Section.Contact)}
              className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-brand-500/25 transition-all hover:scale-105 inline-flex items-center"
            >
              Schedule Engineering Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-8">Related Engineering Dispatches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectBlog(item)}
                className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="h-36 rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <span className="text-[11px] font-mono text-brand-400 uppercase font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.readTime}</span>
                  <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
