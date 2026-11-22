import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "Zynocs didn't just build our app; they re-engineered our entire cloud infrastructure. The speed improvement is phenomenal.",
      rating: 4.8,
      domain: "Cloud Infrastructure"
    },
    {
      text: "The AI integration they provided automates 40% of our customer service. It pays for itself every single month.",
      rating: 4.7,
      domain: "AI & Automation"
    },
    {
      text: "Professional, timely, and technically brilliant. Their React Native team delivered a seamless cross-platform experience.",
      rating: 4.6,
      domain: "Mobile Ecosystem"
    },
    {
      text: "Security was our top concern. Zynocs's audit and implementation gave us the enterprise-grade protection we needed.",
      rating: 4.8,
      domain: "Cybersecurity"
    },
    {
      text: "We went from MVP to scaling to 100k users in 3 months. Zynocs handled the load balancing perfectly.",
      rating: 4.7,
      domain: "Scalability & DevOps"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-400 fill-yellow-400/60'
                : 'text-slate-700 fill-slate-800'
            }`}
          />
        ))}
        <span className="text-xs font-mono font-bold text-yellow-400 ml-1.5">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const ReviewCard = ({ review }: { review: typeof testimonials[0] }) => (
    <div className="w-80 flex-shrink-0 bg-slate-900/80 border border-slate-800 p-6 sm:p-7 rounded-2xl relative mr-6 hover:border-brand-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl">
      <div>
        <Quote className="absolute top-5 right-5 h-8 w-8 text-slate-800 group-hover:text-brand-500/20 transition-colors" />
        <div className="mb-4">
          {renderStars(review.rating)}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
      </div>

      {/* Domain badge only - no names, no designations */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-slate-800/90 text-[11px] font-mono font-bold text-brand-300 border border-slate-700/60 uppercase tracking-wider">
          {review.domain}
        </span>
      </div>
    </div>
  );

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center animate-fade-in-up">
        {/* Average 4.7 / 5 Star Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-4 shadow-inner">
          <div className="flex space-x-0.5 text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <Star className="h-3.5 w-3.5 fill-yellow-400/70 text-yellow-400" />
          </div>
          <span className="font-bold text-white font-mono">4.7 / 5.0</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-normal">Average Client Rating</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Trusted by Industry Leaders</h2>
        <p className="text-slate-400 text-sm sm:text-base">Engineering feedback across critical enterprise deployments.</p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <ReviewCard key={i} review={t} />
          ))}
        </div>
      </div>
    </div>
  );
};
