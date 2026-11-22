import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Clock, 
  Check, 
  MoreHorizontal, 
  Flame, 
  DollarSign, 
  Filter, 
  X, 
  RotateCcw, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Building2,
  Calendar,
  Sparkles,
  XCircle
} from 'lucide-react';

export type StageId = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface CrmDeal {
  id: string;
  company: string;
  title: string;
  amount: number; // in thousands (e.g. 9.6 = $9.6k)
  stage: StageId;
  probability: number; // e.g. 10, 30, 55, 75, 100, 0
  date: string;
  assignee: string; // e.g. SK, AO, DN, JL, MT
  avatarColor: string;
  assigneeColor: string;
  isHot?: boolean;
  isOverdue?: boolean;
  overdueText?: string;
  wonDate?: string;
}

interface ColumnMeta {
  id: StageId;
  label: string;
  defaultProbability: number;
  dotColor: string;
  shadowColor: string;
}

const COLUMNS: ColumnMeta[] = [
  { id: 'lead', label: 'Lead', defaultProbability: 10, dotColor: 'bg-[#14b8a6]', shadowColor: 'shadow-[0_0_6px_#14b8a6]' },
  { id: 'qualified', label: 'Qualified', defaultProbability: 30, dotColor: 'bg-[#14b8a6]', shadowColor: 'shadow-[0_0_6px_#14b8a6]' },
  { id: 'proposal', label: 'Proposal', defaultProbability: 55, dotColor: 'bg-[#14b8a6]', shadowColor: 'shadow-[0_0_6px_#14b8a6]' },
  { id: 'negotiation', label: 'Negotiation', defaultProbability: 75, dotColor: 'bg-[#14b8a6]', shadowColor: 'shadow-[0_0_6px_#14b8a6]' },
  { id: 'won', label: 'Won', defaultProbability: 100, dotColor: 'bg-[#10b981]', shadowColor: 'shadow-[0_0_6px_#10b981]' },
  { id: 'lost', label: 'Lost', defaultProbability: 0, dotColor: 'bg-[#f43f5e]', shadowColor: 'shadow-[0_0_6px_#f43f5e]' }
];

const INITIAL_DEALS: CrmDeal[] = [
  // --- LEAD (Total: $31.7k) ---
  {
    id: 'deal-1',
    company: 'Tessellate',
    title: 'Design ops workspace',
    amount: 9.6,
    stage: 'lead',
    probability: 10,
    date: 'Jan 13',
    assignee: 'SK',
    avatarColor: 'bg-[#9a3412] text-[#ffedd5]',
    assigneeColor: 'bg-[#fbcfe8]/10 text-[#f472b6] border-[#f472b6]/30'
  },
  {
    id: 'deal-2',
    company: 'Kettle Supply Co.',
    title: 'Supplier onboarding',
    amount: 7.4,
    stage: 'lead',
    probability: 10,
    date: 'Jan 6',
    assignee: 'AO',
    avatarColor: 'bg-[#831843] text-[#fce7f3]',
    assigneeColor: 'bg-[#fdba74]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-3',
    company: 'Quarry Studio',
    title: 'Studio seats',
    amount: 5.8,
    stage: 'lead',
    probability: 10,
    date: 'Jan 24',
    assignee: 'SK',
    avatarColor: 'bg-[#334155] text-[#e2e8f0]',
    assigneeColor: 'bg-[#fbcfe8]/10 text-[#f472b6] border-[#f472b6]/30'
  },
  {
    id: 'deal-4',
    company: 'Pinecrest Labs',
    title: 'Research workspace',
    amount: 8.9,
    stage: 'lead',
    probability: 10,
    date: 'Jan 31',
    assignee: 'DN',
    avatarColor: 'bg-[#14532d] text-[#dcfce7]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },

  // --- QUALIFIED (Total: $71.9k) ---
  {
    id: 'deal-5',
    company: 'Pinecrest Labs',
    title: 'Lab inventory rollout',
    amount: 14.2,
    stage: 'qualified',
    probability: 30,
    date: 'Dec 26',
    assignee: 'AO',
    avatarColor: 'bg-[#14532d] text-[#dcfce7]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-6',
    company: 'Veridian Air',
    title: 'Crew scheduling add-on',
    amount: 12.9,
    stage: 'qualified',
    probability: 30,
    date: 'Dec 20',
    assignee: 'JL',
    avatarColor: 'bg-[#115e59] text-[#ccfbf1]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  },
  {
    id: 'deal-7',
    company: 'Larkspur Hotels',
    title: 'Guest messaging. 12 sites',
    amount: 31.2,
    stage: 'qualified',
    probability: 30,
    date: 'Dec 31',
    assignee: 'MT',
    avatarColor: 'bg-[#3730a3] text-[#e0e7ff]',
    assigneeColor: 'bg-[#ccfbf1]/10 text-[#2dd4bf] border-[#2dd4bf]/30'
  },
  {
    id: 'deal-8',
    company: 'Orbitra',
    title: 'Route planning',
    amount: 13.6,
    stage: 'qualified',
    probability: 30,
    date: 'Dec 23',
    assignee: 'SK',
    avatarColor: 'bg-[#155e75] text-[#cffafe]',
    assigneeColor: 'bg-[#fbcfe8]/10 text-[#f472b6] border-[#f472b6]/30'
  },

  // --- PROPOSAL (Total: $131.6k) ---
  {
    id: 'deal-9',
    company: 'Cobalt Harbor',
    title: 'Fleet tracking pilot',
    amount: 21.5,
    stage: 'proposal',
    probability: 55,
    date: 'Dec 9',
    isHot: true,
    assignee: 'JL',
    avatarColor: 'bg-[#1e40af] text-[#dbeafe]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  },
  {
    id: 'deal-10',
    company: 'Marlow & Finch',
    title: 'Wholesale portal',
    amount: 27.8,
    stage: 'proposal',
    probability: 55,
    date: 'Dec 13',
    assignee: 'MT',
    avatarColor: 'bg-[#854d0e] text-[#fef9c3]',
    assigneeColor: 'bg-[#ccfbf1]/10 text-[#2dd4bf] border-[#2dd4bf]/30'
  },
  {
    id: 'deal-11',
    company: 'Sundial Health',
    title: 'Clinic network licence',
    amount: 52.6,
    stage: 'proposal',
    probability: 55,
    date: 'Dec 18',
    isHot: true,
    assignee: 'AO',
    avatarColor: 'bg-[#92400e] text-[#fef3c7]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-12',
    company: 'Aster Robotics',
    title: 'Packaging line sensors',
    amount: 29.7,
    stage: 'proposal',
    probability: 55,
    date: 'Dec 6',
    assignee: 'MT',
    avatarColor: 'bg-[#0369a1] text-[#e0f2fe]',
    assigneeColor: 'bg-[#ccfbf1]/10 text-[#2dd4bf] border-[#2dd4bf]/30'
  },

  // --- NEGOTIATION (Total: $103.3k) ---
  {
    id: 'deal-13',
    company: 'Brightloom',
    title: 'Annual renewal – 60 seats',
    amount: 38.4,
    stage: 'negotiation',
    probability: 75,
    date: 'Nov 28',
    isHot: true,
    assignee: 'AO',
    avatarColor: 'bg-[#6b21a8] text-[#f3e8ff]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-14',
    company: 'Orbitra',
    title: 'Ground ops expansion',
    amount: 46.2,
    stage: 'negotiation',
    probability: 75,
    date: 'Dec 3',
    isHot: true,
    assignee: 'DN',
    avatarColor: 'bg-[#155e75] text-[#cffafe]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-15',
    company: 'Halcyon Bikes',
    title: 'Dealer network',
    amount: 18.7,
    stage: 'negotiation',
    probability: 75,
    date: '2d overdue',
    isOverdue: true,
    overdueText: '2d overdue',
    assignee: 'JL',
    avatarColor: 'bg-[#991b1b] text-[#fee2e2]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  },

  // --- WON (Total: $112.6k) ---
  {
    id: 'deal-16',
    company: 'Fennel Foods',
    title: 'Recipe compliance suite',
    amount: 23.9,
    stage: 'won',
    probability: 100,
    date: 'Won Nov 13',
    wonDate: 'Won Nov 13',
    assignee: 'AO',
    avatarColor: 'bg-[#166534] text-[#dcfce7]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-17',
    company: 'Aster Robotics',
    title: 'Warehouse automation',
    amount: 41.3,
    stage: 'won',
    probability: 100,
    date: 'Won Nov 6',
    wonDate: 'Won Nov 6',
    assignee: 'DN',
    avatarColor: 'bg-[#0369a1] text-[#e0f2fe]',
    assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30'
  },
  {
    id: 'deal-18',
    company: 'Cobalt Harbor',
    title: 'Shipping desk upgrade',
    amount: 16.8,
    stage: 'won',
    probability: 100,
    date: 'Won Oct 30',
    wonDate: 'Won Oct 30',
    assignee: 'JL',
    avatarColor: 'bg-[#1e40af] text-[#dbeafe]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  },
  {
    id: 'deal-19',
    company: 'Brightloom',
    title: 'Partner programme',
    amount: 11.2,
    stage: 'won',
    probability: 100,
    date: 'Won Oct 22',
    wonDate: 'Won Oct 22',
    assignee: 'MT',
    avatarColor: 'bg-[#6b21a8] text-[#f3e8ff]',
    assigneeColor: 'bg-[#ccfbf1]/10 text-[#2dd4bf] border-[#2dd4bf]/30'
  },
  {
    id: 'deal-20',
    company: 'Larkspur Hotels',
    title: 'Front desk tablets',
    amount: 19.4,
    stage: 'won',
    probability: 100,
    date: 'Won Oct 15',
    wonDate: 'Won Oct 15',
    assignee: 'JL',
    avatarColor: 'bg-[#3730a3] text-[#e0e7ff]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  },

  // --- LOST (Total: $34.2k) ---
  {
    id: 'deal-21',
    company: 'OmniRetail Ltd',
    title: 'POS system cloud migration',
    amount: 18.5,
    stage: 'lost',
    probability: 0,
    date: 'Lost Nov 2',
    assignee: 'SK',
    avatarColor: 'bg-[#881337] text-[#ffe4e6]',
    assigneeColor: 'bg-[#fbcfe8]/10 text-[#f472b6] border-[#f472b6]/30'
  },
  {
    id: 'deal-22',
    company: 'Skyline Logistics',
    title: 'Fleet dispatch algorithm',
    amount: 15.7,
    stage: 'lost',
    probability: 0,
    date: 'Lost Oct 28',
    assignee: 'JL',
    avatarColor: 'bg-[#4c0519] text-[#ffe4e6]',
    assigneeColor: 'bg-[#e0e7ff]/10 text-[#a5b4fc] border-[#a5b4fc]/30'
  }
];

const LOCAL_STORAGE_KEY = 'zynocs_crm_pipeline_v2';

// Smooth Number Counter Component with easing animation
const AnimatedAmount: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ value, prefix = '$', suffix = 'k', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    if (Math.abs(startValue - endValue) < 0.01) {
      setDisplayValue(endValue);
      return;
    }

    prevValueRef.current = endValue;
    const duration = 500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [value]);

  return (
    <span className={`inline-block tabular-nums transition-colors duration-200 ${className}`}>
      {prefix}{displayValue.toFixed(1)}{suffix}
    </span>
  );
};

export const CrmApp: React.FC = () => {
  const [deals, setDeals] = useState<CrmDeal[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load CRM deals from storage:', e);
    }
    return INITIAL_DEALS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  
  // Drag and Drop States
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<StageId | null>(null);

  // Selected deal for inspection modal
  const [activeDeal, setActiveDeal] = useState<CrmDeal | null>(null);
  
  // Create deal modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('15.0');
  const [newStage, setNewStage] = useState<StageId>('lead');
  const [newAssignee, setNewAssignee] = useState('SK');
  const [newIsHot, setNewIsHot] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deals));
    } catch (e) {
      console.error('Failed to save CRM deals to storage:', e);
    }
  }, [deals]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDealId(dealId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e: React.DragEvent, colId: StageId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: StageId) => {
    e.preventDefault();
    if (dragOverColumn === colId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: StageId) => {
    e.preventDefault();
    setDragOverColumn(null);
    const dealId = draggedDealId || e.dataTransfer.getData('text/plain');
    if (!dealId) return;

    setDeals((prev) => {
      return prev.map((deal) => {
        if (deal.id === dealId) {
          const targetMeta = COLUMNS.find((c) => c.id === targetStage);
          const prob = targetMeta ? targetMeta.defaultProbability : deal.probability;
          
          let dateStr = deal.date;
          const today = new Date();
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
          if (targetStage === 'won' && !deal.wonDate) {
            dateStr = `Won ${monthNames[today.getMonth()]} ${today.getDate()}`;
          } else if (targetStage === 'lost' && !deal.date.startsWith('Lost')) {
            dateStr = `Lost ${monthNames[today.getMonth()]} ${today.getDate()}`;
          }

          return {
            ...deal,
            stage: targetStage,
            probability: prob,
            date: dateStr,
            wonDate: targetStage === 'won' ? dateStr : undefined
          };
        }
        return deal;
      });
    });

    setDraggedDealId(null);
  };

  const handleDragEnd = () => {
    setDraggedDealId(null);
    setDragOverColumn(null);
  };

  // Quick Move Action
  const handleQuickMove = (dealId: string, targetStage: StageId) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const targetMeta = COLUMNS.find((c) => c.id === targetStage);
          const prob = targetMeta ? targetMeta.defaultProbability : deal.probability;
          
          let dateStr = deal.date;
          const today = new Date();
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
          if (targetStage === 'won') {
            dateStr = `Won ${monthNames[today.getMonth()]} ${today.getDate()}`;
          } else if (targetStage === 'lost') {
            dateStr = `Lost ${monthNames[today.getMonth()]} ${today.getDate()}`;
          }

          return {
            ...deal,
            stage: targetStage,
            probability: prob,
            date: dateStr,
            wonDate: targetStage === 'won' ? dateStr : undefined
          };
        }
        return deal;
      })
    );
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    setActiveDeal(null);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset pipeline back to the exact initial layout?')) {
      setDeals(INITIAL_DEALS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newTitle.trim()) return;

    const parsedAmount = parseFloat(newAmount) || 10.0;
    const stageMeta = COLUMNS.find((c) => c.id === newStage);

    const colors = [
      'bg-[#9a3412] text-[#ffedd5]',
      'bg-[#14532d] text-[#dcfce7]',
      'bg-[#155e75] text-[#cffafe]',
      'bg-[#1e40af] text-[#dbeafe]',
      'bg-[#6b21a8] text-[#f3e8ff]',
      'bg-[#881337] text-[#ffe4e6]'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newDealItem: CrmDeal = {
      id: `deal-${Date.now()}`,
      company: newCompany.trim(),
      title: newTitle.trim(),
      amount: parsedAmount,
      stage: newStage,
      probability: stageMeta ? stageMeta.defaultProbability : 10,
      date: newStage === 'won' ? 'Won Today' : newStage === 'lost' ? 'Lost Today' : 'Jan 15',
      assignee: newAssignee,
      avatarColor: randomColor,
      assigneeColor: 'bg-[#fed7aa]/15 text-[#fb923c] border-[#fb923c]/30',
      isHot: newIsHot
    };

    setDeals((prev) => [newDealItem, ...prev]);
    setCreateModalOpen(false);
    setNewCompany('');
    setNewTitle('');
    setNewAmount('15.0');
    setNewStage('lead');
    setNewIsHot(false);
  };

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch = 
      deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignee = selectedAssignee === 'all' || deal.assignee === selectedAssignee;
    return matchesSearch && matchesAssignee;
  });

  // Calculate totals
  const totalPipelineValue = deals.reduce((sum, d) => sum + d.amount, 0);
  const wonValue = deals.filter((d) => d.stage === 'won').reduce((sum, d) => sum + d.amount, 0);
  const lostValue = deals.filter((d) => d.stage === 'lost').reduce((sum, d) => sum + d.amount, 0);
  const activeDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const weightedValue = activeDeals.reduce((sum, d) => sum + (d.amount * d.probability) / 100, 0);

  return (
    <div className="space-y-6 select-none animate-fade-in font-sans">
      
      {/* Top Header & Telemetry Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-5 rounded-3xl bg-[#090f1a] border border-[#182334] shadow-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6] animate-pulse shadow-[0_0_8px_#14b8a6]" />
            <span className="font-mono text-[#14b8a6] font-bold uppercase tracking-wider text-[11px] bg-[#0c1f25] px-2.5 py-0.5 rounded-full border border-[#14b8a6]/30">
              Interactive 6-Stage Pipeline
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Smooth Drag & Drop • Animated Totals
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Client Deal Pipeline
          </h2>
        </div>

        {/* Financial Metrics Strip with Smooth Rolling Numbers */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-[#0e1724] border border-[#1c293d] space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Pipeline</span>
            <span className="text-base font-bold text-white font-mono block">
              <AnimatedAmount value={totalPipelineValue} />
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-[#0e1724] border border-[#1c293d] space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Active Weighted</span>
            <span className="text-base font-bold text-cyan-400 font-mono block">
              <AnimatedAmount value={weightedValue} />
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-[#0e1724] border border-[#1c293d] space-y-0.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Closed & Won</span>
            <span className="text-base font-bold text-emerald-400 font-mono block">
              <AnimatedAmount value={wonValue} />
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-[#0e1724] border border-[#1c293d] space-y-0.5">
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">Closed & Lost</span>
            <span className="text-base font-bold text-rose-400 font-mono block">
              <AnimatedAmount value={lostValue} />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#14b8a6]/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Deal</span>
            </button>

            <button
              onClick={handleResetToDefault}
              title="Reset to original design"
              className="p-2.5 rounded-xl bg-[#0e1724] hover:bg-[#152336] border border-[#1c293d] text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals or client..."
            className="w-full bg-[#090f1a] border border-[#182334] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#14b8a6] transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Assignee Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] font-mono text-slate-500 mr-1 uppercase">Owner:</span>
          {['all', 'SK', 'AO', 'DN', 'JL', 'MT'].map((person) => (
            <button
              key={person}
              onClick={() => setSelectedAssignee(person)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedAssignee === person
                  ? 'bg-[#14b8a6] text-slate-950 shadow-md shadow-[#14b8a6]/20'
                  : 'bg-[#0e1724] border border-[#1c293d] text-slate-400 hover:text-white'
              }`}
            >
              {person === 'all' ? 'All' : person}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6-COLUMN KANBAN BOARD (Includes Lead, Qualified, Proposal, Negotiation, Won, Lost) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colDeals = filteredDeals.filter((d) => d.stage === col.id);
          const colTotal = colDeals.reduce((sum, d) => sum + d.amount, 0);
          const isOver = dragOverColumn === col.id;
          const isLostCol = col.id === 'lost';
          const isWonCol = col.id === 'won';

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col rounded-2xl bg-[#090f1a] border transition-all duration-300 min-h-[620px] ${
                isOver
                  ? isLostCol
                    ? 'border-rose-500 bg-[#160c12] ring-2 ring-rose-500/40 shadow-xl shadow-rose-500/10 scale-[1.01]'
                    : 'border-[#14b8a6] bg-[#0c1624] ring-2 ring-[#14b8a6]/40 shadow-xl shadow-[#14b8a6]/10 scale-[1.01]'
                  : 'border-[#162030]'
              }`}
            >
              {/* Column Header with Smooth Counter */}
              <div className="p-3.5 border-b border-[#141e2e] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor} ${col.shadowColor}`} />
                    <span className="text-sm font-bold text-slate-200 tracking-tight">
                      {col.label}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border transition-colors ${
                    isLostCol
                      ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                      : isWonCol
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-[#141d2b] border-[#1f2d40] text-slate-300'
                  }`}>
                    {colDeals.length}
                  </span>
                </div>

                <div className="text-xs font-mono pl-4">
                  <AnimatedAmount
                    value={colTotal}
                    className={
                      isWonCol
                        ? 'text-[#2dd4bf] font-bold'
                        : isLostCol
                        ? 'text-rose-400 font-bold'
                        : 'text-slate-400'
                    }
                  />
                </div>
              </div>

              {/* Column Cards Drop Area with Smooth Transitions */}
              <div className="p-2.5 flex-1 space-y-2.5 overflow-y-auto max-h-[780px]">
                {colDeals.map((deal) => {
                  const isDragging = draggedDealId === deal.id;

                  return (
                    <div
                      key={deal.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setActiveDeal(deal)}
                      className={`group relative p-3.5 rounded-xl bg-[#111927] border border-[#1b283b] hover:border-slate-700 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 ease-out cursor-grab active:cursor-grabbing ${
                        isDragging ? 'opacity-30 scale-95 ring-2 ring-[#14b8a6]' : ''
                      } ${isLostCol ? 'hover:border-rose-500/40' : ''}`}
                    >
                      {/* Top Row: Avatar Initial + Company & Deal Title + Action Dots */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Company Letter Initial Circle */}
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${deal.avatarColor}`}>
                            {deal.company.charAt(0)}
                          </div>

                          <div className="min-w-0">
                            <span className="text-[11px] text-slate-400 truncate block leading-tight">
                              {deal.company}
                            </span>
                            <span className="text-xs font-bold text-white block truncate leading-tight mt-0.5 group-hover:text-[#2dd4bf] transition-colors">
                              {deal.title}
                            </span>
                          </div>
                        </div>

                        {/* Three Dots Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDeal(deal);
                          }}
                          className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0 -mr-1 -mt-1"
                          title="Options"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Middle Row: Amount & Probability */}
                      <div className="flex items-baseline justify-between mt-3 mb-1">
                        <span className={`text-base font-extrabold font-mono tracking-tight ${
                          isWonCol ? 'text-[#2dd4bf]' : isLostCol ? 'text-rose-400' : 'text-white'
                        }`}>
                          ${deal.amount.toFixed(1)}k
                        </span>

                        <span className={`text-[11px] font-mono ${isLostCol ? 'text-rose-400/80' : 'text-slate-400'}`}>
                          {deal.probability}% likely
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-[#1a2536] rounded-full overflow-hidden my-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            isLostCol ? 'bg-rose-500/60' : 'bg-[#2dd4bf]'
                          }`}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>

                      {/* Bottom Row: Date / Hot / Overdue Badge + Assignee Avatar */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-mono flex items-center gap-1 ${
                            isLostCol ? 'text-rose-400/80' : 'text-slate-400'
                          }`}>
                            <Clock className="w-3 h-3 text-slate-500" />
                            {deal.date}
                          </span>

                          {deal.isHot && !isLostCol && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-[#450a0a] text-[#f87171] border border-[#ef4444]/30 flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 fill-[#f87171]" />
                              <span>Hot</span>
                            </span>
                          )}

                          {deal.isOverdue && !isLostCol && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-[#450a0a] text-[#f87171] border border-[#ef4444]/30">
                              {deal.overdueText || 'Overdue'}
                            </span>
                          )}

                          {isLostCol && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-rose-950/40 text-rose-300 border border-rose-500/30">
                              Lost
                            </span>
                          )}
                        </div>

                        {/* Assignee Circle */}
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${deal.assigneeColor}`}>
                          {deal.assignee}
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Empty State / Drop Target Indicator */}
                {colDeals.length === 0 && (
                  <div className={`h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ${
                    isOver 
                      ? isLostCol
                        ? 'border-rose-500 bg-[#1a0e14] text-rose-400'
                        : 'border-[#14b8a6] bg-[#0c1624] text-[#14b8a6]' 
                      : 'border-[#182334] text-slate-600'
                  }`}>
                    <span className="text-xs font-mono font-medium">Drop deal here</span>
                    <span className="text-[10px] text-slate-500 mt-1">Updates stage to {col.label}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INSPECT / EDIT DEAL MODAL */}
      {/* ========================================================================= */}
      {activeDeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="p-6 rounded-3xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl max-w-md w-full space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-md ${activeDeal.avatarColor}`}>
                  {activeDeal.company.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{activeDeal.company}</h3>
                  <span className="text-xs text-slate-400 font-mono">{activeDeal.title}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveDeal(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Quick Switcher (All 6 Stages) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Move Stage:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-[#0e1724] p-1 rounded-xl border border-[#1c293d]">
                {COLUMNS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      handleQuickMove(activeDeal.id, c.id);
                      setActiveDeal((prev) => prev ? { ...prev, stage: c.id, probability: c.defaultProbability } : null);
                    }}
                    className={`py-1.5 text-[10px] font-mono rounded-lg transition-all font-bold ${
                      activeDeal.stage === c.id
                        ? c.id === 'lost'
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                          : 'bg-[#14b8a6] text-slate-950 shadow-md shadow-[#14b8a6]/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#0e1724] border border-[#1c293d] text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Deal Value</span>
                <span className="text-base font-bold text-white block mt-0.5">${activeDeal.amount.toFixed(1)}k</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Win Probability</span>
                <span className={`text-base font-bold block mt-0.5 ${
                  activeDeal.stage === 'lost' ? 'text-rose-400' : 'text-[#2dd4bf]'
                }`}>
                  {activeDeal.probability}%
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Assigned Owner</span>
                <span className="text-sm font-bold text-slate-200 block mt-0.5">{activeDeal.assignee}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Target Date</span>
                <span className="text-sm font-bold text-slate-200 block mt-0.5">{activeDeal.date}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => handleDeleteDeal(activeDeal.id)}
                className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Deal</span>
              </button>

              <button
                onClick={() => setActiveDeal(null)}
                className="px-5 py-2 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-slate-950 font-bold text-xs shadow-md shadow-[#14b8a6]/25 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE NEW DEAL MODAL */}
      {/* ========================================================================= */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <form
            onSubmit={handleCreateDeal}
            className="p-6 rounded-3xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl max-w-md w-full space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#141e2e]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                <h3 className="text-base font-bold text-white">Create New Deal</h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Client / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-[#0e1724] border border-[#1c293d] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#14b8a6] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Deal Scope / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Enterprise Cloud Migration"
                  className="w-full bg-[#0e1724] border border-[#1c293d] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#14b8a6] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                    Value ($k USD) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="15.0"
                    className="w-full bg-[#0e1724] border border-[#1c293d] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#14b8a6] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as StageId)}
                    className="w-full bg-[#0e1724] border border-[#1c293d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#14b8a6] font-mono"
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} ({c.defaultProbability}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                    Assignee
                  </label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-[#0e1724] border border-[#1c293d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#14b8a6] font-mono"
                  >
                    {['SK', 'AO', 'DN', 'JL', 'MT'].map((person) => (
                      <option key={person} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="hotDeal"
                    checked={newIsHot}
                    onChange={(e) => setNewIsHot(e.target.checked)}
                    className="rounded bg-[#0e1724] border-[#1c293d] text-[#14b8a6] focus:ring-0"
                  />
                  <label htmlFor="hotDeal" className="text-xs text-slate-300 font-mono cursor-pointer">
                    🔥 Mark as Hot Deal
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-slate-950 font-bold text-xs shadow-md shadow-[#14b8a6]/25 transition-all cursor-pointer"
              >
                Add Deal to Pipeline
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
