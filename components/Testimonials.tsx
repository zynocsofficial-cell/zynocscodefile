import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO, FinTech Global",
      text: "Zynocs didn't just build our app; they re-engineered our entire cloud infrastructure. The speed improvement is phenomenal.",
      stars: 5
    },
    {
      name: "Marcus Chen",
      role: "Founder, DataFlow",
      text: "The AI integration they provided automates 40% of our customer service. It pays for itself every single month.",
      stars: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Product Lead, HealthPlus",
      text: "Professional, timely, and technically brilliant. Their React Native team delivered a seamless cross-platform experience.",
      stars: 5
    },
    {
      name: "David Smith",
      role: "Director, RetailX",
      text: "Security was our top concern. Zynocs's audit and implementation gave us the enterprise-grade protection we needed.",
      stars: 5
    },
    {
      name: "James Wilson",
      role: "CEO, StartUp Inc",
      text: "We went from MVP to scaling to 100k users in 3 months. Zynocs handled the load balancing perfectly.",
      stars: 5
    }
  ];

  const ReviewCard = ({ review }: { review: typeof testimonials[0] }) => (
    <div className="w-80 flex-shrink-0 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl relative mr-6 hover:border-brand-500/50 transition-colors duration-300 group">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-800 group-hover:text-brand-500/20 transition-colors" />
      <div className="flex space-x-1 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-slate-300 text-sm mb-6 leading-relaxed">"{review.text}"</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
          {review.name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-white text-sm font-bold">{review.name}</p>
          <p className="text-slate-500 text-xs">{review.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trusted by Industry Leaders</h2>
        <p className="text-slate-400">Don't just take our word for it.</p>
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