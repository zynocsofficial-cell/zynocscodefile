import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  Layers, 
  Check, 
  Sliders, 
  ExternalLink,
  Laptop,
  CheckCircle,
  HelpCircle,
  X,
  FileCheck2,
  Mail,
  Building2,
  Globe
} from 'lucide-react';
import { Section, SubdomainId } from '@/types';

interface AdPlacementsProps {
  onNavigate?: (section: Section, subdomain?: SubdomainId) => void;
}

type SizeType = 'small' | 'medium' | 'wide';
type VolumeMultiplier = 1 | 2.5 | 5 | 10;

interface PlacementCardConfig {
  id: string;
  badgeTop: string;
  badgeTopColor: string;
  subBadges: { label: string; icon?: React.ElementType }[];
  title: string;
  subtitle: string;
  prices: { small: number; medium: number; wide: number };
  guaranteedVolume: string;
  typicalCtr: string;
  placementLocation: string;
  features: string[];
  recommended?: boolean;
}

export const AdPlacements: React.FC<AdPlacementsProps> = ({ onNavigate }) => {
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [volume, setVolume] = useState<VolumeMultiplier>(1);
  const [cardSizes, setCardSizes] = useState<Record<string, SizeType>>({
    leaderboard: 'medium',
    action: 'medium',
    modal: 'medium'
  });

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlacementForBooking, setSelectedPlacementForBooking] = useState<{
    title: string;
    size: SizeType;
    price: number;
    volumeViews: string;
  } | null>(null);
  const [brandName, setBrandName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const appsList = [
    { id: 'all', name: 'Network-Wide (All Apps)', badge: 'Maximum Reach', traffic: '1.2M+ Monthly Sessions' },
    { id: 'easypdfwork', name: 'EasyPDFWork', badge: 'Productivity & Enterprise', traffic: '850K+ Monthly Tools Used' },
    { id: 'estateflow', name: 'EstateFlow', badge: 'High-Net-Worth & PropTech', traffic: '120K+ Active Investors' },
    { id: 'frigzone', name: 'FrigZone', badge: 'B2B & Industrial Commerce', traffic: '95K+ Commercial Buyers' }
  ];

  const placements: PlacementCardConfig[] = [
    {
      id: 'leaderboard',
      badgeTop: 'HIGH IMPACT',
      badgeTopColor: 'bg-indigo-950 text-indigo-300 border-indigo-500/30',
      subBadges: [
        { label: 'PRIME PLACEMENT' },
        { label: 'AdBlock-Proof', icon: ShieldCheck }
      ],
      title: 'Top Leaderboard Banner',
      subtitle: 'Maximum visibility above the fold on all 30+ tools and primary workspace canvas',
      prices: { small: 159, medium: 229, wide: 299 },
      guaranteedVolume: '100,000 Verified Views',
      typicalCtr: '1.8% – 2.5%',
      placementLocation: 'Sticky Header • Top of Canvas',
      features: [
        '100,000 (1 Lakh) Guaranteed verified impressions',
        'Runs continuously until 1 Lakh views delivered, then auto-pauses',
        '100% Above-the-fold location across all 30+ tools',
        'First-party native component (100% AdBlock-proof)',
        'Direct do-follow link with custom UTM tracking tags',
        'Live CTR & real-time impression analytics dashboard',
        'Instant renewal & scale-up to multiple Lakh packages'
      ]
    },
    {
      id: 'action',
      badgeTop: 'LOWEST ENTRY',
      badgeTopColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/30',
      subBadges: [
        { label: 'HIGH ROI & VALUE' },
        { label: 'AdBlock-Proof', icon: ShieldCheck }
      ],
      title: 'Bottom Action Banner',
      subtitle: 'High-converting placement at the file download & completion zone with lowest entry price',
      prices: { small: 99, medium: 149, wide: 199 },
      guaranteedVolume: '100,000 Verified Views',
      typicalCtr: '1.2% – 1.7%',
      placementLocation: 'Tool Workspace Footer • Right at Action',
      features: [
        '100,000 (1 Lakh) Guaranteed verified impressions',
        'Runs continuously until 1 Lakh views delivered, then auto-pauses',
        'Positioned right next to the "Download PDF" & action trigger',
        'Seen when users feel relief & satisfaction from finishing work',
        '100% AdBlock-immune first-party native code',
        'Direct link with full UTM attribution tracking',
        'Lowest entry barrier starting at just $99'
      ]
    },
    {
      id: 'modal',
      badgeTop: 'HIGHEST CTR',
      badgeTopColor: 'bg-purple-950 text-purple-300 border-purple-500/30',
      subBadges: [
        { label: 'PEAK ENGAGEMENT' },
        { label: 'AdBlock-Proof', icon: ShieldCheck }
      ],
      title: 'Post-Process Pop-Up Modal',
      subtitle: 'High-engagement modal captured right when document or workflow processing completes',
      prices: { small: 249, medium: 349, wide: 449 },
      guaranteedVolume: '100,000 Verified Views',
      typicalCtr: '3.2% – 4.5%',
      placementLocation: 'Center Screen • Download Ready Modal',
      recommended: true,
      features: [
        '100,000 (1 Lakh) Guaranteed verified impressions',
        'Runs continuously until 1 Lakh views delivered, then auto-pauses',
        'Displays inside the download ready modal (100% viewability)',
        'Rich custom graphic, headline, description & CTA button',
        'Triggered upon successful task, merge, compress, or conversion',
        '100% AdBlock-proof native React modal component',
        'Highest conversion rate with custom call-to-action button'
      ]
    }
  ];

  const handleSizeChange = (cardId: string, size: SizeType) => {
    setCardSizes((prev) => ({ ...prev, [cardId]: size }));
  };

  const getCalculatedPrice = (basePrice: number) => {
    // Volume discount: 2.5x = 5% off, 5x = 10% off, 10x = 15% off
    const discount = volume === 1 ? 1 : volume === 2.5 ? 0.95 : volume === 5 ? 0.90 : 0.85;
    return Math.round(basePrice * volume * discount);
  };

  const getVolumeLabel = () => {
    if (volume === 1) return '100,000 (1 Lakh) Views';
    if (volume === 2.5) return '250,000 (2.5 Lakh) Views';
    if (volume === 5) return '500,000 (5 Lakh) Views';
    return '1,000,000 (10 Lakh) Views';
  };

  const handleOpenBooking = (card: PlacementCardConfig) => {
    const size = cardSizes[card.id] || 'medium';
    const price = getCalculatedPrice(card.prices[size]);
    setSelectedPlacementForBooking({
      title: card.title,
      size,
      price,
      volumeViews: getVolumeLabel()
    });
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
      setBrandName('');
      setWorkEmail('');
      setTargetUrl('');
    }, 2800);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-32 bg-[#020617] relative min-h-screen">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[350px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-mono font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>ZYNOCS IN-HOUSE ADTECH & SPONSORSHIPS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            High-Impact Ad Placements In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-indigo-400">
              Our In-House Apps
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Run guaranteed view campaigns inside our high-traffic digital products. Native first-party components that are <strong className="text-white">100% immune to AdBlockers</strong>, with zero bot fraud and transparent impression delivery.
          </p>
        </div>

        {/* Guaranteed Volume Package Indicator (As shown in reference image) */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono shadow-xl backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Package: {getVolumeLabel()}</span>
            <span className="text-slate-400">• Auto-pauses immediately on delivery</span>
          </div>

          {/* Volume Multiplier Pills */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl gap-1">
            {([1, 2.5, 5, 10] as VolumeMultiplier[]).map((v) => (
              <button
                key={v}
                onClick={() => setVolume(v)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  volume === v
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {v === 1 ? '100K (1 Lakh)' : v === 2.5 ? '250K (2.5L)' : v === 5 ? '500K (5L)' : '1M (10L)'}
              </button>
            ))}
          </div>
        </div>

        {/* In-House Apps Selector Tabs */}
        <div className="mb-12">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Target Your Audience Across Zynocs In-House Products:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {appsList.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                  selectedApp === app.id
                    ? 'bg-slate-900 border-brand-500/60 shadow-lg shadow-brand-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold truncate ${selectedApp === app.id ? 'text-white' : 'text-slate-300'}`}>
                    {app.name}
                  </span>
                  {selectedApp === app.id && <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
                </div>
                <div className="text-[10px] text-brand-400/90 font-mono truncate">{app.badge}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{app.traffic}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Placement Cards (Exact replica of user reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {placements.map((card) => {
            const currentSize = cardSizes[card.id] || 'medium';
            const basePrice = card.prices[currentSize];
            const finalPrice = getCalculatedPrice(basePrice);

            return (
              <div
                key={card.id}
                className={`rounded-3xl bg-slate-900/80 border backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1 ${
                  card.recommended
                    ? 'border-purple-500/40 ring-1 ring-purple-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top High Impact / Lowest Entry / Highest CTR Badge */}
                <div className="flex justify-center -mt-10 mb-4">
                  <span className={`px-4 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border shadow-lg ${card.badgeTopColor}`}>
                    {card.badgeTop}
                  </span>
                </div>

                <div>
                  {/* Sub Badges: Prime Placement + AdBlock-Proof */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-[10px] font-mono font-bold uppercase tracking-wide text-brand-300 border border-slate-800">
                      {card.subBadges[0].label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>AdBlock-Proof</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {card.subtitle}
                  </p>

                  {/* Width / Size Switcher Box (As in photo) */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                      <span className="uppercase font-bold tracking-wider text-slate-300">
                        {currentSize.toUpperCase()} WIDTH
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {volume === 1 ? '1 Lakh Impressions' : `${volume * 100}K Impressions`}
                      </span>
                    </div>

                    <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-3">
                      ${finalPrice}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        / {getVolumeLabel()}
                      </span>
                    </div>

                    {/* Size Selector Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
                      {(['small', 'medium', 'wide'] as SizeType[]).map((sz) => {
                        const isSelected = currentSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSizeChange(card.id, sz)}
                            className={`py-1.5 px-1 rounded-lg text-center transition-all ${
                              isSelected
                                ? 'bg-brand-500 text-white font-bold shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800 text-[11px]'
                            }`}
                          >
                            <div className="text-[10px] font-bold uppercase">{sz}</div>
                            <div className="text-[10px] font-mono">
                              ${getCalculatedPrice(card.prices[sz])}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Placement Specs Grid */}
                  <div className="space-y-2 py-3 border-t border-b border-slate-800/80 mb-5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guaranteed Volume:</span>
                      <span className="text-white font-bold">{getVolumeLabel()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Typical CTR:</span>
                      <span className="text-emerald-400 font-bold">{card.typicalCtr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Placement:</span>
                      <span className="text-slate-300 truncate max-w-[170px]" title={card.placementLocation}>
                        {card.placementLocation}
                      </span>
                    </div>
                  </div>

                  {/* Checklist Features */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-300 leading-normal">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={() => handleOpenBooking(card)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>BOOK {getVolumeLabel().split(' ')[0]} (${finalPrice})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Zynocs In-House AdTech Comparison Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl relative overflow-hidden mb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-400 font-bold mb-2">
              The First-Party Advantage
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Why In-House Ad Placements Outperform Traditional Display Ads
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Google Display Network and third-party ad networks suffer from 42% AdBlock loss, accidental clicks, and delayed reporting. Because our apps render your creatives as native first-party components, every impression is 100% visible, bot-filtered, and verified.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="space-y-1">
                <div className="text-xl font-mono font-bold text-emerald-400">0% AdBlock Loss</div>
                <div className="text-xs text-slate-400">Native code bypasses all browser ad-blocking extensions completely.</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-mono font-bold text-cyan-400">Auto-Pause Guard</div>
                <div className="text-xs text-slate-400">Campaigns automatically pause upon 100% view delivery. Zero budget waste.</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-mono font-bold text-purple-400">Direct Portal</div>
                <div className="text-xs text-slate-400">Manage creative assets and view live analytics inside <span className="text-brand-300 font-mono">sponsors.zynocs.com</span>.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Serve Dashboard Link Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Are you an existing advertiser or brand sponsor?</h4>
              <p className="text-xs text-slate-400">Access your live campaign telemetry, impression graphs, and creative swapping portal.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate?.(Section.Auth, 'sponsors')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all shrink-0"
          >
            <span>Open Sponsor Portal (sponsors.zynocs.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Booking Drawer / Modal */}
      {bookingModalOpen && selectedPlacementForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Campaign Reserved!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Our AdOps team has dispatched your booking confirmation and creative submission guidelines to <strong className="text-white">{workEmail}</strong>.
                </p>
                <div className="text-[11px] font-mono text-emerald-400">Auto-closing...</div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-1">
                    Book Guaranteed Impression Package
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedPlacementForBooking.title} ({selectedPlacementForBooking.size.toUpperCase()})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Total: <strong className="text-white font-mono">${selectedPlacementForBooking.price}</strong> for {selectedPlacementForBooking.volumeViews}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Brand / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Cloud, Stripe..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="sponsor@brand.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Destination Landing URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://yourbrand.com/special-offer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs sm:text-sm shadow-xl transition-all"
                  >
                    Lock Placement Package (${selectedPlacementForBooking.price})
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Zero payment required today. AdOps will review your destination URL and send creative specifications within 2 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
