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
    { id: 'all', name: 'Network-Wide (All Apps)', badge: 'Maximum Reach', traffic: '1.8M+ Monthly Sessions' },
    { id: 'easypdfwork', name: 'EasyPDFWork', badge: 'Productivity & Enterprise', traffic: '850K+ Monthly Tools Used' },
    { id: 'estateflow', name: 'EstateFlow', badge: 'High-Net-Worth & PropTech', traffic: '120K+ Active Investors' },
    { id: 'frigzone', name: 'FrigZone', badge: 'B2B & Industrial Commerce', traffic: '95K+ Commercial Buyers' },
    { id: 'jobbuddy', name: 'JobBuddy', badge: 'Talent & Recruitment', traffic: '250K+ Active Job Seekers' },
    { id: 'pixolstudio', name: 'PixolStudio', badge: 'Creative 3D & Digital Media', traffic: '140K+ Digital Creators' }
  ];

  const placements: PlacementCardConfig[] = [
    {
      id: 'leaderboard',
      badgeTop: 'HIGH IMPACT',
      badgeTopColor: 'bg-slate-800/90 text-slate-200 border-slate-700/80',
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
      badgeTopColor: 'bg-slate-800/90 text-slate-200 border-slate-700/80',
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
      badgeTopColor: 'bg-slate-800/90 text-slate-200 border-slate-700/80',
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
    const rawTotal = basePrice * volume;
    let discount = 0;
    if (volume === 2.5) discount = 0.05;
    if (volume === 5) discount = 0.10;
    if (volume === 10) discount = 0.15;
    return Math.round(rawTotal * (1 - discount));
  };

  const getVolumeLabel = () => {
    switch (volume) {
      case 1:
        return '100,000 (1 Lakh) Views';
      case 2.5:
        return '250,000 (2.5 Lakh) Views';
      case 5:
        return '500,000 (5 Lakh) Views';
      case 10:
        return '1,000,000 (10 Lakh) Views';
      default:
        return '100,000 Views';
    }
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
    <div className="pt-20 sm:pt-24 pb-32 bg-slate-950 relative min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>ZYNOCS IN-HOUSE ADTECH & SPONSORSHIPS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            High-Impact Ad Placements In{' '}
            <span className="text-slate-200">
              Our In-House Apps
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Run guaranteed view campaigns inside our high-traffic digital products. Native first-party components that are <strong className="text-slate-200">100% immune to AdBlockers</strong>, with zero bot fraud and transparent impression delivery.
          </p>
        </div>

        {/* Guaranteed Volume Package Indicator */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Package: {getVolumeLabel()}</span>
            <span className="text-slate-400">• Auto-pauses immediately on delivery</span>
          </div>

          {/* Volume Multiplier Pills */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-md gap-1">
            {([1, 2.5, 5, 10] as VolumeMultiplier[]).map((v) => (
              <button
                key={v}
                onClick={() => setVolume(v)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  volume === v
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {v === 1 ? '100K (1 Lakh)' : v === 2.5 ? '250K (2.5L)' : v === 5 ? '500K (5L)' : '1M (10L)'}
              </button>
            ))}
          </div>
        </div>

        {/* In-House Apps Selector Tabs */}
        <div className="mb-14">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5">
            Target Your Audience Across Zynocs In-House Products:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-6xl mx-auto">
            {appsList.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                  selectedApp === app.id
                    ? 'bg-slate-900 border-slate-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold truncate ${selectedApp === app.id ? 'text-white' : 'text-slate-300'}`}>
                    {app.name}
                  </span>
                  {selectedApp === app.id && <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />}
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">{app.badge}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{app.traffic}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Placement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {placements.map((card) => {
            const currentSize = cardSizes[card.id] || 'medium';
            const basePrice = card.prices[currentSize];
            const finalPrice = getCalculatedPrice(basePrice);

            return (
              <div
                key={card.id}
                className={`rounded-2xl bg-slate-900/60 border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative shadow-lg hover:shadow-xl hover:border-slate-700 ${
                  card.recommended
                    ? 'border-slate-700 bg-slate-900/80 ring-1 ring-slate-700/50'
                    : 'border-slate-800/90'
                }`}
              >
                {/* Top Category Badge */}
                <div className="flex justify-center -mt-10 mb-4">
                  <span className={`px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-md ${card.badgeTopColor}`}>
                    {card.badgeTop}
                  </span>
                </div>

                <div>
                  {/* Sub Badges: Prime Placement + AdBlock-Proof */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-[10px] font-mono font-semibold uppercase tracking-wide text-slate-300 border border-slate-800">
                      {card.subBadges[0].label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>AdBlock-Proof</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {card.subtitle}
                  </p>

                  {/* Width / Size Switcher Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                      <span className="uppercase font-semibold tracking-wider text-slate-300">
                        {currentSize.toUpperCase()} WIDTH
                      </span>
                      <span className="text-slate-300 font-medium">
                        {volume === 1 ? '1 Lakh Impressions' : `${volume * 100}K Impressions`}
                      </span>
                    </div>

                    <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-3">
                      ${finalPrice}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        / {getVolumeLabel()}
                      </span>
                    </div>

                    {/* Size Selector Buttons */}
                    <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
                      {(['small', 'medium', 'wide'] as SizeType[]).map((sz) => {
                        const isSelected = currentSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSizeChange(card.id, sz)}
                            className={`py-1.5 px-1 rounded-md text-center transition-all ${
                              isSelected
                                ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 text-[11px]'
                            }`}
                          >
                            <div className="text-[10px] font-bold uppercase">{sz}</div>
                            <div className="text-[10px] font-mono text-slate-300">
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
                      <span className="text-slate-400">Guaranteed Volume:</span>
                      <span className="text-white font-semibold">{getVolumeLabel()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Typical CTR:</span>
                      <span className="text-slate-200 font-semibold">{card.typicalCtr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Placement:</span>
                      <span className="text-slate-300 truncate max-w-[170px]" title={card.placementLocation}>
                        {card.placementLocation}
                      </span>
                    </div>
                  </div>

                  {/* Checklist Features */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-300 leading-normal">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={() => handleOpenBooking(card)}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>BOOK {getVolumeLabel().split(' ')[0]} (${finalPrice})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Zynocs In-House AdTech Comparison Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl relative overflow-hidden mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              The First-Party Advantage
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Why In-House Ad Placements Outperform Traditional Display Ads
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Google Display Network and third-party ad networks suffer from 42% AdBlock loss, accidental clicks, and delayed reporting. Because our apps render your creatives as native first-party components, every impression is 100% visible, bot-filtered, and verified.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="space-y-1">
                <div className="text-lg font-mono font-bold text-white">0% AdBlock Loss</div>
                <div className="text-xs text-slate-400">Native code bypasses all browser ad-blocking extensions completely.</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-mono font-bold text-white">Auto-Pause Guard</div>
                <div className="text-xs text-slate-400">Campaigns automatically pause upon 100% view delivery. Zero budget waste.</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-mono font-bold text-white">Direct Portal</div>
                <div className="text-xs text-slate-400">Manage creative assets and view live analytics inside <span className="text-slate-300 font-mono">sponsors.zynocs.com</span>.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Serve Dashboard Link Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-slate-900/80 border border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Are you an existing advertiser or brand sponsor?</h4>
              <p className="text-xs text-slate-400">Access your live campaign telemetry, impression graphs, and creative swapping portal.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate?.(Section.Auth, 'sponsors')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all shrink-0"
          >
            <span>Open Sponsor Portal (sponsors.zynocs.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Booking Drawer / Modal */}
      {bookingModalOpen && selectedPlacementForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Campaign Reserved!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Our AdOps team has dispatched your booking confirmation and creative submission guidelines to <strong className="text-white">{workEmail}</strong>.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Auto-closing...</div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
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
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Brand / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Cloud, Stripe..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="sponsor@brand.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Destination Landing URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://yourbrand.com/special-offer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
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
