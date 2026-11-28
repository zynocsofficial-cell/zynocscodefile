import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Upload, 
  Plus, 
  Phone, 
  PhoneOff, 
  Play, 
  Pause, 
  Circle, 
  TrendingUp, 
  Video, 
  PhoneCall,
  Check, 
  X, 
  ChevronRight,
  ExternalLink,
  Target,
  Edit2,
  DollarSign,
  Trophy,
  Sliders,
  CheckCircle2,
  ArrowRightCircle,
  Building2,
  UserCheck,
  Calendar,
  Sparkles,
  Flame,
  Briefcase,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { auditLogService } from '@/services/auditLogService';

export type StageId = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface CrmDeal {
  id: string;
  company: string;
  title: string;
  amount: number; // in thousands (e.g. 52.6 = $52.6k)
  stage: StageId;
  probability: number;
  date: string;
  assignee: string;
  avatarColor?: string;
  assigneeColor?: string;
  isHot?: boolean;
  isOverdue?: boolean;
  overdueText?: string;
  wonDate?: string;
  closeInDays?: number;
}

export interface BoardMeeting {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration?: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Quorum Pending';
  location?: string;
  videoLink?: string;
  attendees?: {
    name: string;
    role: string;
    avatarInitials: string;
    status: string;
  }[];
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  department?: string;
  status?: string;
  avatarInitials?: string;
}

interface ExecutiveRevenueCockpitProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    subdomain: string;
    department?: string;
  };
  onNavigateApp: (appId: string) => void;
  onBackToApps: () => void;
}

const STORAGE_CRM_KEY = 'zynocs_crm_pipeline_v6';
const STORAGE_MEETINGS_KEY = 'zynocs_board_meetings_v8';
const STORAGE_EMPLOYEES_KEY = 'zynocs_employees_v1';
const STORAGE_GOALS_KEY = 'zynocs_cockpit_goals_v3';

// Default corporate officers if employees registry is not yet loaded
const DEFAULT_OFFICERS: EmployeeProfile[] = [
  { id: 'emp-1', name: 'Mohammed Khaja Moinuddin', role: 'Founder & Chairperson', avatarInitials: 'KM' },
  { id: 'emp-2', name: 'Yousuf Mohammed Jaleel', role: 'Founder & Chief Executive Officer', avatarInitials: 'YJ' }
];

export const ExecutiveRevenueCockpit: React.FC<ExecutiveRevenueCockpitProps> = ({
  user,
  onNavigateApp,
  onBackToApps
}) => {
  // Purge legacy mock keys once on initial mount
  useEffect(() => {
    try {
      localStorage.removeItem('zynocs_cockpit_state_v2_won_contracts');
      localStorage.removeItem('zynocs_cockpit_state_v2_pipeline_deals');
      localStorage.removeItem('zynocs_cockpit_state_v2_assist');
      localStorage.removeItem('zynocs_cockpit_state_v2');
    } catch (_) {}
  }, []);

  // 1. Goal Setting State (Quarterly / Monthly)
  const [goalMode, setGoalMode] = useState<'quarterly' | 'monthly'>('quarterly');
  const [goals, setGoals] = useState<{ quarterlyGoal: number; monthlyGoal: number }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GOALS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return { quarterlyGoal: 200.0, monthlyGoal: 70.0 };
  });

  // 2. Real CRM Deals State (Synchronized with CrmApp)
  const [deals, setDeals] = useState<CrmDeal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CRM_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load CRM deals:', e);
    }
    return [];
  });

  // Sync with localStorage & custom events from CrmApp / Directors
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem(STORAGE_CRM_KEY);
        if (saved) {
          setDeals(JSON.parse(saved));
        } else {
          setDeals([]);
        }
      } catch (e) {
        console.error('Sync CRM error:', e);
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('zynocs-crm-updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('zynocs-crm-updated', handleSync);
    };
  }, []);

  // Persist helper that also broadcasts to other tabs/modules
  const persistDeals = (updated: CrmDeal[]) => {
    setDeals(updated);
    try {
      localStorage.setItem(STORAGE_CRM_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('zynocs-crm-updated'));
    } catch (e) {
      console.error('Failed to save CRM deals:', e);
    }
  };

  // 3. Real Board Meetings State (Synchronized with MeetingsCalendarApp)
  const [meetings, setMeetings] = useState<BoardMeeting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MEETINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  useEffect(() => {
    const handleSyncMeetings = () => {
      try {
        const saved = localStorage.getItem(STORAGE_MEETINGS_KEY);
        if (saved) setMeetings(JSON.parse(saved));
      } catch (_) {}
    };
    window.addEventListener('storage', handleSyncMeetings);
    return () => window.removeEventListener('storage', handleSyncMeetings);
  }, []);

  // 4. Real Employees / Team Quota
  const [employees, setEmployees] = useState<EmployeeProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EMPLOYEES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return DEFAULT_OFFICERS;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EMPLOYEES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setEmployees(parsed);
      }
    } catch (_) {}
  }, []);

  // 5. Dynamic Computed Stats from Real CRM Data
  const wonDeals = useMemo(() => deals.filter(d => d.stage === 'won'), [deals]);
  const openDeals = useMemo(() => deals.filter(d => d.stage !== 'won' && d.stage !== 'lost'), [deals]);
  const lostDeals = useMemo(() => deals.filter(d => d.stage === 'lost'), [deals]);

  const activeWonTotal = useMemo(() => {
    return wonDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [wonDeals]);

  // For monthly won: deals won within current 30 days or marked this month
  const activeWonMonthly = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return wonDeals.filter(d => {
      if (!d.wonDate && !d.date) return true;
      const dealDate = new Date(d.wonDate || d.date);
      if (isNaN(dealDate.getTime())) return true;
      return dealDate.getMonth() === currentMonth && dealDate.getFullYear() === currentYear;
    }).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [wonDeals]);

  const currentGoalTarget = goalMode === 'quarterly' ? goals.quarterlyGoal : goals.monthlyGoal;
  const currentWonAmount = goalMode === 'quarterly' ? activeWonTotal : activeWonMonthly;
  const currentRemaining = Math.max(0, currentGoalTarget - currentWonAmount).toFixed(1);
  const currentGoalPercent = currentGoalTarget > 0 ? Math.min(100, Math.round((currentWonAmount / currentGoalTarget) * 100)) : 0;

  // Pipeline calculations
  const pipelineTotal = useMemo(() => {
    return openDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [openDeals]);

  const pipelineWeighted = useMemo(() => {
    return openDeals.reduce((sum, d) => {
      const amt = Number(d.amount) || 0;
      const prob = Number(d.probability) || 0;
      return sum + (amt * (prob / 100));
    }, 0);
  }, [openDeals]);

  // Group deals by stage
  const leadDeals = useMemo(() => openDeals.filter(d => d.stage === 'lead'), [openDeals]);
  const qualifiedDeals = useMemo(() => openDeals.filter(d => d.stage === 'qualified'), [openDeals]);
  const proposalDeals = useMemo(() => openDeals.filter(d => d.stage === 'proposal'), [openDeals]);
  const negotiationDeals = useMemo(() => openDeals.filter(d => d.stage === 'negotiation'), [openDeals]);

  const leadSum = useMemo(() => leadDeals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0), [leadDeals]);
  const qualifiedSum = useMemo(() => qualifiedDeals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0), [qualifiedDeals]);
  const proposalSum = useMemo(() => proposalDeals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0), [proposalDeals]);
  const negotiationSum = useMemo(() => negotiationDeals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0), [negotiationDeals]);

  const leadPct = pipelineTotal > 0 ? Math.round((leadSum / pipelineTotal) * 100) : 0;
  const qualifiedPct = pipelineTotal > 0 ? Math.round((qualifiedSum / pipelineTotal) * 100) : 0;
  const proposalPct = pipelineTotal > 0 ? Math.round((proposalSum / pipelineTotal) * 100) : 0;
  const negotiationPct = pipelineTotal > 0 ? Math.round((negotiationSum / pipelineTotal) * 100) : 0;

  // Win rate: deals won / (deals won + deals lost)
  const dealsWonCount = wonDeals.length;
  const totalDecided = dealsWonCount + lostDeals.length;
  const winRate = totalDecided > 0 ? Math.round((dealsWonCount / totalDecided) * 100) : (dealsWonCount > 0 ? 100 : 0);
  const avgDealSize = dealsWonCount > 0 ? (activeWonTotal / dealsWonCount).toFixed(1) : '0.0';

  // 6. Modals State
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [isWonLedgerOpen, setIsWonLedgerOpen] = useState(false);
  const [isPipelineInspectorOpen, setIsPipelineInspectorOpen] = useState(false);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<'all' | 'lead' | 'qualified' | 'proposal' | 'negotiation'>('all');

  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [isImportLeadsOpen, setIsImportLeadsOpen] = useState(false);
  const [isJoinCallOpen, setIsJoinCallOpen] = useState(false);

  // Goal Edit Inputs
  const [editQuarterlyGoal, setEditQuarterlyGoal] = useState(goals.quarterlyGoal.toString());
  const [editMonthlyGoal, setEditMonthlyGoal] = useState(goals.monthlyGoal.toString());

  // New Deal Form State
  const [dealCompany, setDealCompany] = useState('');
  const [dealTitle, setDealTitle] = useState('');
  const [dealAmount, setDealAmount] = useState('25.0');
  const [dealStage, setDealStage] = useState<StageId>('lead');
  const [dealCloseDays, setDealCloseDays] = useState('14');
  const [dealAssignee, setDealAssignee] = useState(user.name);
  const [dealIsHot, setDealIsHot] = useState(false);

  // Call session state (Real live stopwatch: idle by default)
  const [callSeconds, setCallSeconds] = useState(0);
  const [isCallTimerRunning, setIsCallTimerRunning] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callsCompletedToday, setCallsCompletedToday] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isCallTimerRunning && isCallActive) {
      interval = setInterval(() => {
        setCallSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallTimerRunning, isCallActive]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setIsCallTimerRunning(true);
    setCallSeconds(0);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsCallTimerRunning(false);
    setIsRecording(false);
    setCallsCompletedToday(prev => prev + 1);
    setCallSeconds(0);
  };

  // Weekly Revenue: Real Calculation from Won Deals for current week
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const { weeklyDaysData, closedThisWeekTotal, forecastThisWeekTotal } = useMemo(() => {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    // Monday of current week
    const currentDayOfWeek = (now.getDay() + 6) % 7; // Mon = 0, Sun = 6
    const monday = new Date(now);
    monday.setDate(now.getDate() - currentDayOfWeek);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const dayTotals: { [key: string]: number } = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
    };

    let closedWeek = 0;
    wonDeals.forEach(deal => {
      const dDate = new Date(deal.wonDate || deal.date);
      if (!isNaN(dDate.getTime()) && dDate >= monday && dDate <= sunday) {
        const dIndex = (dDate.getDay() + 6) % 7;
        const dName = dayNames[dIndex];
        const val = Number(deal.amount) || 0;
        dayTotals[dName] += val;
        closedWeek += val;
      }
    });

    // Real forecast: open deals closing within 7 days
    const forecastWeek = openDeals
      .filter(d => (d.closeInDays ?? 14) <= 7)
      .reduce((sum, d) => sum + ((Number(d.amount) || 0) * ((Number(d.probability) || 0) / 100)), 0);

    const maxVal = Math.max(...Object.values(dayTotals), forecastWeek, 1.0);

    const weeklyBars = dayNames.map((dName, idx) => {
      const val = dayTotals[dName];
      const isToday = idx === currentDayOfWeek;
      const isSundayForecast = idx === 6 && val === 0 && forecastWeek > 0;
      const displayVal = isSundayForecast ? forecastWeek : val;
      const heightPercent = displayVal > 0 
        ? Math.max(16, Math.min(100, Math.round((displayVal / maxVal) * 90)))
        : 8; // Sleek baseline pill

      return {
        day: dName,
        value: displayVal,
        isForecast: isSundayForecast,
        isToday,
        heightPercent
      };
    });

    return {
      weeklyDaysData: weeklyBars,
      closedThisWeekTotal: closedWeek,
      forecastThisWeekTotal: forecastWeek
    };
  }, [wonDeals, openDeals]);

  // Real Hot Deals: sorted by isHot, then amount desc
  const hotDealsList = useMemo(() => {
    return [...openDeals]
      .sort((a, b) => {
        if (a.isHot && !b.isHot) return -1;
        if (!a.isHot && b.isHot) return 1;
        return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      })
      .slice(0, 4);
  }, [openDeals]);

  // Real Next Upcoming Meeting from MeetingsCalendarApp storage
  const nextMeeting = useMemo(() => {
    if (!meetings || meetings.length === 0) return null;
    const upcoming = meetings.filter(m => m.status === 'Upcoming' || m.status === 'In Progress');
    if (upcoming.length > 0) return upcoming[0];
    return meetings[0];
  }, [meetings]);

  // Real Team Quota: Officers & Employees performance from real deals
  const quotaTeamList = useMemo(() => {
    const targetPerMember = goals.quarterlyGoal > 0 
      ? Math.round((goals.quarterlyGoal / Math.max(1, employees.length)) * 10) / 10
      : 50.0;

    const colors = [
      'bg-teal-900/60 text-teal-300 border border-teal-600/40',
      'bg-cyan-900/60 text-cyan-300 border border-cyan-600/40',
      'bg-indigo-900/60 text-indigo-300 border border-indigo-600/40',
      'bg-emerald-900/60 text-emerald-300 border border-emerald-600/40',
      'bg-amber-900/60 text-amber-300 border border-amber-600/40'
    ];

    return employees.map((emp, idx) => {
      const isYou = emp.name.toLowerCase().includes(user.name.toLowerCase()) || 
                    user.name.toLowerCase().includes(emp.name.toLowerCase());

      const initials = emp.avatarInitials || emp.name.split(' ').map(n => n[0]).slice(0, 2).join('');
      
      // Calculate real won volume by this assignee
      const memberWon = wonDeals.filter(d => {
        const a = (d.assignee || '').toLowerCase();
        return a.includes(emp.name.toLowerCase()) || 
               a.includes(initials.toLowerCase()) ||
               (isYou && (a.includes('you') || a.includes('mk') || a.includes('km')));
      }).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

      const color = colors[idx % colors.length];

      return {
        id: emp.id,
        name: emp.name,
        initials,
        role: emp.role,
        color,
        current: memberWon,
        target: targetPerMember,
        isYou
      };
    });
  }, [employees, wonDeals, goals.quarterlyGoal, user.name]);

  // Real Assist / At-Risk Deals from openDeals
  const atRiskDeals = useMemo(() => {
    return openDeals.filter(d => {
      if (d.isOverdue) return true;
      if (d.closeInDays !== undefined && d.closeInDays <= 5 && (d.stage === 'lead' || d.stage === 'qualified')) return true;
      return false;
    });
  }, [openDeals]);

  const atRiskTotal = useMemo(() => {
    return atRiskDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [atRiskDeals]);

  // Handler: Save Director Goal Configuration
  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    const q = parseFloat(editQuarterlyGoal) || 200.0;
    const m = parseFloat(editMonthlyGoal) || 70.0;
    const updatedGoals = { quarterlyGoal: q, monthlyGoal: m };
    setGoals(updatedGoals);
    try {
      localStorage.setItem(STORAGE_GOALS_KEY, JSON.stringify(updatedGoals));
    } catch (_) {}

    auditLogService.logAction({
      actor: {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || 'Executive Board',
        avatarInitials: user.name.split(' ').map(n => n[0]).slice(0, 2).join('')
      },
      category: 'BOARD_GOVERNANCE',
      action: 'REVENUE_GOAL_CONFIGURED',
      entity: 'Enterprise Boardroom Telemetry',
      summary: `Updated corporate revenue goals: Quarterly $${q}k, Monthly $${m}k.`,
      details: updatedGoals,
      severity: 'SUCCESS'
    });

    setIsEditGoalOpen(false);
  };

  // Handler: Move Deal to WON
  const handleMoveDealToWon = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const updated = deals.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          stage: 'won' as StageId,
          probability: 100,
          wonDate: formattedDate
        };
      }
      return d;
    });

    persistDeals(updated);

    auditLogService.logAction({
      actor: {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || 'Executive Board',
        avatarInitials: user.name.split(' ').map(n => n[0]).slice(0, 2).join('')
      },
      category: 'CRM_PIPELINE',
      action: 'DEAL_CLOSED_WON',
      entity: `Deal #${deal.id}`,
      summary: `Closed & Won: ${deal.company} ($${(Number(deal.amount) || 0).toFixed(1)}k). Added directly to corporate revenue!`,
      details: {
        company: deal.company,
        amount: deal.amount,
        stage: 'won'
      },
      severity: 'SUCCESS'
    });
  };

  // Handler: Advance Deal to Next Stage
  const handleAdvanceStage = (dealId: string) => {
    const stagesOrder: StageId[] = ['lead', 'qualified', 'proposal', 'negotiation', 'won'];
    const updated = deals.map(d => {
      if (d.id === dealId) {
        const curIdx = stagesOrder.indexOf(d.stage);
        if (curIdx < stagesOrder.length - 1) {
          const nextStage = stagesOrder[curIdx + 1];
          const nextProb = nextStage === 'won' ? 100 : nextStage === 'negotiation' ? 75 : nextStage === 'proposal' ? 55 : 30;
          return { 
            ...d, 
            stage: nextStage, 
            probability: nextProb,
            wonDate: nextStage === 'won' ? new Date().toISOString() : d.wonDate 
          };
        }
      }
      return d;
    });

    persistDeals(updated);
  };

  // Handler: Create New Deal
  const handleCreateDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealCompany.trim()) return;

    const amountNum = parseFloat(dealAmount) || 25.0;
    const daysNum = parseInt(dealCloseDays) || 14;

    const colorPicks = [
      'bg-cyan-700/80 text-cyan-100 border border-cyan-500/40',
      'bg-amber-600/80 text-amber-100 border border-amber-500/40',
      'bg-purple-700/80 text-purple-100 border border-purple-500/40',
      'bg-teal-700/80 text-teal-100 border border-teal-500/40'
    ];
    const pickedBg = colorPicks[Math.floor(Math.random() * colorPicks.length)];

    const newDealItem: CrmDeal = {
      id: `dl-${Date.now()}`,
      company: dealCompany.trim(),
      title: dealTitle.trim() || 'Enterprise Cloud Contract',
      amount: amountNum,
      stage: dealStage,
      probability: dealStage === 'negotiation' ? 75 : dealStage === 'proposal' ? 55 : dealStage === 'qualified' ? 30 : 10,
      closeInDays: daysNum,
      assignee: dealAssignee || user.name,
      avatarColor: pickedBg,
      assigneeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isHot: dealIsHot
    };

    const updated = [newDealItem, ...deals];
    persistDeals(updated);

    auditLogService.logAction({
      actor: {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || 'Executive Board',
        avatarInitials: user.name.split(' ').map(n => n[0]).slice(0, 2).join('')
      },
      category: 'CRM_PIPELINE',
      action: 'DEAL_CREATED',
      entity: `Deal #${newDealItem.id}`,
      summary: `Created new deal: ${newDealItem.company} ($${amountNum.toFixed(1)}k) at ${dealStage.toUpperCase()} stage.`,
      details: newDealItem,
      severity: 'INFO'
    });

    setDealCompany('');
    setDealTitle('');
    setDealAmount('25.0');
    setIsNewDealOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & TELEMETRY CONTROLS */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider mb-1">
            <span>Q4</span>
            <span>·</span>
            <span>Week {Math.ceil((new Date().getDate() + 6) / 7)}</span>
            <span>·</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time telemetry and executive revenue command.
          </p>
        </div>

        {/* Global Executive Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportLeadsOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Import leads</span>
          </button>

          <button
            onClick={() => setIsNewDealOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>New deal</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP HERO ROW (Revenue Won + Open Pipeline) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Card 1: Revenue won this quarter (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/40 relative overflow-hidden group">
          <div className="space-y-4">
            
            {/* Header with Quarterly / Monthly Mode Toggle & Edit Goal */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-300 font-bold">
                  {goalMode === 'quarterly' ? 'Revenue won this quarter' : 'Revenue won this month'}
                </span>

                {/* Pill Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
                  <button
                    onClick={() => setGoalMode('quarterly')}
                    className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                      goalMode === 'quarterly'
                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Quarterly
                  </button>
                  <button
                    onClick={() => setGoalMode('monthly')}
                    className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                      goalMode === 'monthly'
                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Edit Goal Director Button */}
                <button
                  onClick={() => {
                    setEditQuarterlyGoal(goals.quarterlyGoal.toString());
                    setEditMonthlyGoal(goals.monthlyGoal.toString());
                    setIsEditGoalOpen(true);
                  }}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Configure Director Revenue Targets"
                >
                  <Edit2 className="w-2.5 h-2.5 text-teal-400" />
                  <span>Edit Goal</span>
                </button>
              </div>

              {/* View Ledger Icon Link */}
              <button
                onClick={() => setIsWonLedgerOpen(true)}
                className="w-7 h-7 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-teal-400 hover:border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="View Closed Contracts Ledger"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Giant Big Number + KPI Badges */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight">
                  ${currentWonAmount.toFixed(1)}k
                </span>
                
                {dealsWonCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-950/90 text-teal-300 border border-teal-500/30">
                    <TrendingUp className="w-3 h-3 text-teal-400" />
                    <span>Live Telemetry</span>
                  </span>
                )}
              </div>

              {/* Summary KPIs: Win Rate, Avg Deal, Deals Won */}
              <div className="flex items-center gap-6 sm:gap-8 text-right font-mono">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Win rate</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">{winRate}%</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Avg deal</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">${avgDealSize}k</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Deals won</div>
                  <div className="text-sm font-bold text-teal-400 mt-0.5">{dealsWonCount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Progress Bar & Metrics */}
          <div className="pt-8 space-y-2">
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(45,212,191,0.5)]" 
                style={{ width: `${currentGoalPercent}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-0.5">
              <span>
                {currentGoalPercent}% of the ${currentGoalTarget.toFixed(0)}k goal{' '}
                <button 
                  onClick={() => setIsEditGoalOpen(true)}
                  className="text-slate-500 hover:text-teal-400 underline decoration-dotted ml-1 cursor-pointer transition-colors"
                >
                  (change)
                </button>
              </span>
              <span>${currentRemaining}k to go</span>
            </div>
          </div>
        </div>

        {/* Card 2: Open pipeline (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-bold">Open pipeline</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-950/80 text-teal-300 border border-teal-500/30">
                  Live
                </span>
              </div>

              <button
                onClick={() => onNavigateApp('crm')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer group"
              >
                <span>Open board</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Total pipeline amount */}
            <div className="pt-1">
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight">
                ${pipelineTotal.toFixed(1)}k
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {openDeals.length} deals · ${pipelineWeighted.toFixed(0)}k weighted
              </p>
            </div>
          </div>

          {/* Segmented Pipeline Progress Bar */}
          <div className="pt-6 space-y-4">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
              <div className="h-full bg-teal-700 transition-all duration-500" style={{ width: `${leadPct}%` }} title={`Lead: ${leadPct}%`} />
              <div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${qualifiedPct}%` }} title={`Qualified: ${qualifiedPct}%`} />
              <div className="h-full bg-teal-400 transition-all duration-500" style={{ width: `${proposalPct}%` }} title={`Proposal: ${proposalPct}%`} />
              <div className="h-full bg-emerald-300 transition-all duration-500" style={{ width: `${negotiationPct}%` }} title={`Negotiation: ${negotiationPct}%`} />
            </div>

            {/* Stages Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
              <div 
                onClick={() => { setSelectedPipelineStage('lead'); setIsPipelineInspectorOpen(true); }}
                className="cursor-pointer hover:bg-slate-900/60 p-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                  <span className="text-slate-300 font-semibold">Lead</span>
                </div>
                <div className="text-slate-400 mt-0.5 pl-3">{leadDeals.length} deals · {leadPct}%</div>
                <div className="text-white font-bold pl-3 mt-0.5">${leadSum.toFixed(1)}k</div>
              </div>

              <div 
                onClick={() => { setSelectedPipelineStage('qualified'); setIsPipelineInspectorOpen(true); }}
                className="cursor-pointer hover:bg-slate-900/60 p-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span className="text-slate-300 font-semibold">Qualified</span>
                </div>
                <div className="text-slate-400 mt-0.5 pl-3">{qualifiedDeals.length} deals · {qualifiedPct}%</div>
                <div className="text-white font-bold pl-3 mt-0.5">${qualifiedSum.toFixed(1)}k</div>
              </div>

              <div 
                onClick={() => { setSelectedPipelineStage('proposal'); setIsPipelineInspectorOpen(true); }}
                className="cursor-pointer hover:bg-slate-900/60 p-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="text-slate-300 font-semibold">Proposal</span>
                </div>
                <div className="text-slate-400 mt-0.5 pl-3">{proposalDeals.length} deals · {proposalPct}%</div>
                <div className="text-white font-bold pl-3 mt-0.5">${proposalSum.toFixed(1)}k</div>
              </div>

              <div 
                onClick={() => { setSelectedPipelineStage('negotiation'); setIsPipelineInspectorOpen(true); }}
                className="cursor-pointer hover:bg-slate-900/60 p-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span className="text-slate-300 font-semibold">Negotiation</span>
                </div>
                <div className="text-slate-400 mt-0.5 pl-3">{negotiationDeals.length} deals · {negotiationPct}%</div>
                <div className="text-white font-bold pl-3 mt-0.5">${negotiationSum.toFixed(1)}k</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE ROW (Revenue this week, Hot deals, Next up) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Card 3: Revenue this week (5 cols) */}
        <div className="md:col-span-5 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-300 font-bold">Revenue this week</span>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-teal-400" />
                  <span>Closed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-sm border border-slate-600"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #334155, #334155 1px, transparent 1px, transparent 3px)'
                    }}
                  />
                  <span>Forecast</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-6">
              ${(closedThisWeekTotal * 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} closed so far · ${(forecastThisWeekTotal * 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} forecast
            </p>
          </div>

          {/* Bar Chart Columns */}
          <div 
            onMouseLeave={() => setHoveredDay(null)}
            className="flex items-end justify-between gap-2 h-36 pt-6 pb-2 px-1 relative"
          >
            {weeklyDaysData.map((col) => {
              const isHovered = hoveredDay === col.day;
              return (
                <div 
                  key={col.day} 
                  onMouseEnter={() => setHoveredDay(col.day)}
                  onClick={() => setHoveredDay(col.day)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Floating Price Tooltip above hovered bar */}
                  {isHovered && (
                    <div className="absolute -top-7 px-2 py-0.5 rounded-md bg-white text-slate-950 font-extrabold font-mono text-[11px] shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap">
                      ${col.value.toFixed(1)}k
                      {col.isForecast ? ' (Fcst)' : ''}
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 bg-white rotate-45" />
                    </div>
                  )}

                  {/* Vertical Bar */}
                  <div 
                    className={`w-full max-w-[28px] rounded-lg transition-all duration-200 ${
                      col.isForecast 
                        ? isHovered 
                          ? 'border-2 border-teal-400 bg-teal-500/30 shadow-[0_0_12px_rgba(20,184,166,0.6)]' 
                          : 'border border-dashed border-teal-600/70' 
                        : isHovered 
                          ? 'bg-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.9)] scale-[1.04]' 
                          : col.value > 0
                            ? 'bg-teal-500/80 group-hover:bg-teal-400'
                            : 'bg-slate-800/70 group-hover:bg-slate-700'
                    }`}
                    style={{
                      height: `${col.heightPercent}%`,
                      backgroundImage: col.isForecast 
                        ? 'repeating-linear-gradient(45deg, rgba(20, 184, 166, 0.4), rgba(20, 184, 166, 0.4) 2px, transparent 2px, transparent 6px)' 
                        : undefined
                    }}
                  />

                  {/* Day label */}
                  <span className={`text-[11px] font-mono mt-3 transition-colors ${
                    isHovered 
                      ? 'text-teal-300 font-bold' 
                      : col.isToday 
                        ? 'text-teal-400 font-bold' 
                        : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {col.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 4: Hot deals (4 cols) */}
        <div className="md:col-span-4 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-300 font-bold">Hot deals</span>
              <button
                onClick={() => onNavigateApp('crm')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
              >
                View all
              </button>
            </div>

            {/* Deals List */}
            {hotDealsList.length > 0 ? (
              <div className="space-y-3">
                {hotDealsList.map((deal) => (
                  <div 
                    key={deal.id}
                    onClick={() => { 
                      const stageKey = ['lead', 'qualified', 'proposal', 'negotiation'].includes(deal.stage) ? (deal.stage as any) : 'all';
                      setSelectedPipelineStage(stageKey); 
                      setIsPipelineInspectorOpen(true); 
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-teal-900/60 border border-teal-600/40 text-teal-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {deal.company[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-teal-300 truncate transition-colors flex items-center gap-1.5">
                          <span>{deal.company}</span>
                          {deal.isHot && <Flame className="w-3 h-3 text-amber-400 inline" />}
                        </h4>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="capitalize">{deal.stage}</span>
                          <span>·</span>
                          <span>closes in {deal.closeInDays ?? 14}d</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-white font-mono block">
                        ${(Number(deal.amount) || 0).toFixed(1)}k
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {deal.probability}% likely
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <Briefcase className="w-8 h-8 text-slate-600 mx-auto stroke-1" />
                <p className="text-xs text-slate-400 font-medium">No active deals in pipeline</p>
                <button
                  onClick={() => setIsNewDealOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30 transition-colors cursor-pointer mt-1"
                >
                  + Create deal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Card 5: Next up (3 cols) */}
        <div className="md:col-span-3 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-300 font-bold">Next up</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {nextMeeting ? (nextMeeting.status || 'Upcoming') : 'Calendar'}
              </span>
            </div>

            {nextMeeting ? (
              <div className="space-y-1.5 mt-2">
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                  {nextMeeting.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {nextMeeting.date} · {nextMeeting.time}
                </p>
                {nextMeeting.attendees && nextMeeting.attendees.length > 0 && (
                  <p className="text-[11px] text-slate-500 truncate pt-1">
                    With {nextMeeting.attendees.map(a => a.name).join(', ')}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1.5 mt-2">
                <h3 className="text-base font-bold text-white leading-snug">
                  No upcoming meetings
                </h3>
                <p className="text-xs text-slate-400">
                  Boardroom calendar is clear for today.
                </p>
              </div>
            )}
          </div>

          {nextMeeting ? (
            <button
              onClick={() => setIsJoinCallOpen(true)}
              className="w-full mt-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4 text-slate-950" />
              <span>Join call</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigateApp('meetings')}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Schedule meeting</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ROW (Quota this quarter, Assist, Call session) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Card 6: Quota this quarter (5 cols) */}
        <div className="md:col-span-5 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-300 font-bold">Quota this quarter</span>
              <button
                onClick={() => onNavigateApp('employees')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
              >
                Leaderboard
              </button>
            </div>

            {/* Reps Progress Bars */}
            <div className="space-y-4">
              {quotaTeamList.map((rep) => {
                const percent = rep.target > 0 ? Math.min(100, Math.round((rep.current / rep.target) * 100)) : 0;
                return (
                  <div key={rep.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${rep.color} font-mono font-bold text-[9px] flex items-center justify-center shrink-0`}>
                          {rep.initials}
                        </div>
                        <span className="text-xs font-medium text-slate-200">
                          {rep.name}
                        </span>
                        {rep.isYou && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300 font-mono border border-slate-700">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        ${rep.current.toFixed(1)}k / ${rep.target.toFixed(1)}k
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-400 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 7: Assist (4 cols) */}
        <div className="md:col-span-4 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-400 flex items-center justify-center text-xs">
                  ✨
                </span>
                <span className="text-xs text-slate-300 font-bold">Assist</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                atRiskDeals.length > 0 
                  ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                  : 'bg-teal-950/80 text-teal-300 border border-teal-500/30'
              }`}>
                {atRiskDeals.length} at risk
              </span>
            </div>
            
            <p className="text-xs text-slate-400 font-mono mb-4">
              {atRiskDeals.length > 0 
                ? `$${atRiskTotal.toFixed(1)}k could slip this month`
                : 'Pipeline healthy · No overdue opportunities'
              }
            </p>

            {/* Risk Items */}
            {atRiskDeals.length > 0 ? (
              <div className="space-y-3">
                {atRiskDeals.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onNavigateApp('crm')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/40 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {item.company[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-teal-300 truncate transition-colors">
                          {item.company}
                        </h4>
                        <p className="text-[10px] text-amber-400/90 flex items-center gap-1 mt-0.5">
                          <span>{item.overdueText || `Closes in ${item.closeInDays ?? 3}d (${item.stage})`}</span>
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-white font-mono shrink-0 ml-2">
                      ${(Number(item.amount) || 0).toFixed(1)}k
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 px-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <p className="text-xs text-slate-300">
                  All active deals are tracking on schedule with no overdue items.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateApp('crm')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium transition-colors cursor-pointer mt-4 group"
          >
            <span>Review in pipeline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Card 8: Call session (3 cols) */}
        <div className="md:col-span-3 rounded-2xl bg-[#0c111a] border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-300 font-bold">Call session</span>
              <span className="text-xs text-slate-400 font-mono">{callsCompletedToday} calls</span>
            </div>

            <div className="my-6 text-center">
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-wider">
                {formatTimer(callSeconds)}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-[11px] font-mono text-slate-400">
                  {isCallActive ? (isCallTimerRunning ? 'Active Call In Progress' : 'Call Paused') : 'Ready to Start Call'}
                </span>
                {isRecording && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-600/40 animate-pulse">
                    REC
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {isCallActive ? (
              <>
                <button
                  onClick={() => setIsCallTimerRunning(!isCallTimerRunning)}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  title={isCallTimerRunning ? 'Pause timer' : 'Resume timer'}
                >
                  {isCallTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={handleEndCall}
                  className="w-11 h-11 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-rose-600/30"
                  title="End Call Session"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                    isRecording 
                      ? 'bg-rose-950 border border-rose-500/60 text-rose-400 animate-pulse' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Record Call Session'}
                >
                  <Circle className={`w-3.5 h-3.5 ${isRecording ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                </button>
              </>
            ) : (
              <button
                onClick={handleStartCall}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Start Call Session</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODALS & SUB-PANELS */}
      {/* ========================================================================= */}

      {/* MODAL 1: CONFIGURE DIRECTOR REVENUE GOALS */}
      {isEditGoalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsEditGoalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Corporate Governance
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Director Revenue Goals</h3>
              <p className="text-xs text-slate-400">
                Define quarterly and monthly board revenue targets for executive telemetry.
              </p>
            </div>

            <form onSubmit={handleSaveGoals} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                  Quarterly Target ($k USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={editQuarterlyGoal}
                    onChange={(e) => setEditQuarterlyGoal(e.target.value)}
                    required
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white font-mono text-sm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">k</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                  Monthly Target ($k USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={editMonthlyGoal}
                    onChange={(e) => setEditMonthlyGoal(e.target.value)}
                    required
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white font-mono text-sm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">k</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditGoalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  Save Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CLOSED CONTRACTS LEDGER */}
      {isWonLedgerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up max-h-[90vh] flex flex-col">
            <button
              onClick={() => setIsWonLedgerOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Closed Revenue Ledger
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Won Contracts ({wonDeals.length})</h3>
              <p className="text-xs text-slate-400">
                Verified won corporate agreements contributing to the ${activeWonTotal.toFixed(1)}k quarterly revenue.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {wonDeals.length > 0 ? (
                wonDeals.map((contract) => (
                  <div 
                    key={contract.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-teal-800/80 text-teal-100 border border-teal-500/40 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {contract.company[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{contract.company}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{contract.title} · <span className="font-mono text-slate-500">{contract.wonDate || contract.date}</span></p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-xs font-bold text-teal-300 font-mono block">${(Number(contract.amount) || 0).toFixed(1)}k</span>
                      <span className="text-[10px] text-slate-500 font-mono">By {contract.assignee || user.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center space-y-2">
                  <Inbox className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
                  <p className="text-xs text-slate-400">No contracts marked as won yet.</p>
                  <p className="text-[11px] text-slate-500">Close deals in CRM to record live revenue.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400">
                Total Won: <strong className="text-white">${activeWonTotal.toFixed(1)}k USD</strong>
              </div>
              <button
                onClick={() => setIsWonLedgerOpen(false)}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PIPELINE STAGE MANAGER & DEAL ACTIONS */}
      {isPipelineInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up max-h-[90vh] flex flex-col">
            <button
              onClick={() => setIsPipelineInspectorOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Pipeline Stage Inspector
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Active Open Opportunities</h3>
              <p className="text-xs text-slate-400">
                Inspect deals in stage, advance stages, or close &amp; win deals to add directly to revenue.
              </p>
            </div>

            {/* Filter Tabs by Stage */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 flex-wrap">
              <button
                onClick={() => setSelectedPipelineStage('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedPipelineStage === 'all'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                All Stages ({openDeals.length})
              </button>

              <button
                onClick={() => setSelectedPipelineStage('lead')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedPipelineStage === 'lead'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Lead ({leadDeals.length} · ${leadSum.toFixed(1)}k)
              </button>

              <button
                onClick={() => setSelectedPipelineStage('qualified')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedPipelineStage === 'qualified'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Qualified ({qualifiedDeals.length} · ${qualifiedSum.toFixed(1)}k)
              </button>

              <button
                onClick={() => setSelectedPipelineStage('proposal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedPipelineStage === 'proposal'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Proposal ({proposalDeals.length} · ${proposalSum.toFixed(1)}k)
              </button>

              <button
                onClick={() => setSelectedPipelineStage('negotiation')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedPipelineStage === 'negotiation'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Negotiation ({negotiationDeals.length} · ${negotiationSum.toFixed(1)}k)
              </button>
            </div>

            {/* Opportunities List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {openDeals
                .filter(d => selectedPipelineStage === 'all' ? true : d.stage === selectedPipelineStage)
                .map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-teal-900/60 border border-teal-600/40 text-teal-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                        {deal.company[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{deal.company}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-teal-300 border border-slate-700">
                            {deal.stage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{deal.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Assigned: {deal.assignee || user.name} · Closes in {deal.closeInDays ?? 14} days · {deal.probability}% win probability
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="text-right mr-2">
                        <div className="text-sm font-bold text-white font-mono">${(Number(deal.amount) || 0).toFixed(1)}k</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ${((Number(deal.amount) || 0) * ((Number(deal.probability) || 0) / 100)).toFixed(1)}k wt.
                        </div>
                      </div>

                      {/* Advance Stage Button */}
                      {deal.stage !== 'negotiation' ? (
                        <button
                          onClick={() => handleAdvanceStage(deal.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                          title="Advance deal to next sales stage"
                        >
                          <span>Advance</span>
                          <ArrowRightCircle className="w-3.5 h-3.5" />
                        </button>
                      ) : null}

                      {/* Close & Won Button */}
                      <button
                        onClick={() => handleMoveDealToWon(deal.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
                        title="Mark contract as CLOSED WON and add to company revenue"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Won</span>
                      </button>
                    </div>
                  </div>
                ))}
              {openDeals.filter(d => selectedPipelineStage === 'all' ? true : d.stage === selectedPipelineStage).length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No active opportunities in this stage.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                Total in view: <strong className="text-white">${pipelineTotal.toFixed(1)}k</strong>
              </span>
              <button
                onClick={() => setIsPipelineInspectorOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE NEW ENTERPRISE DEAL */}
      {isNewDealOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsNewDealOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Pipeline Intake
              </span>
              <h3 className="text-xl font-black text-white">Create Enterprise Deal</h3>
              <p className="text-xs text-slate-400">
                Add an opportunity directly into corporate CRM telemetry and boardroom forecasts.
              </p>
            </div>

            <form onSubmit={handleCreateDealSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                  Client / Account Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Technologies"
                  value={dealCompany}
                  onChange={(e) => setDealCompany(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                  Scope / Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. SOC 2 Zero-Trust Architecture"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                    Deal Value ($k USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$</span>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      placeholder="25.0"
                      value={dealAmount}
                      onChange={(e) => setDealAmount(e.target.value)}
                      required
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white font-mono text-sm"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">k</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                    Pipeline Stage
                  </label>
                  <select
                    value={dealStage}
                    onChange={(e) => setDealStage(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white text-sm"
                  >
                    <option value="lead">Lead (10%)</option>
                    <option value="qualified">Qualified (30%)</option>
                    <option value="proposal">Proposal (55%)</option>
                    <option value="negotiation">Negotiation (75%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                    Close in (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={dealCloseDays}
                    onChange={(e) => setDealCloseDays(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                    Assignee
                  </label>
                  <input
                    type="text"
                    value={dealAssignee}
                    onChange={(e) => setDealAssignee(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dealIsHot"
                  checked={dealIsHot}
                  onChange={(e) => setDealIsHot(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400"
                />
                <label htmlFor="dealIsHot" className="text-xs text-slate-300 cursor-pointer flex items-center gap-1">
                  <span>Mark as Hot Deal</span>
                  <Flame className="w-3 h-3 text-amber-400" />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewDealOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: IMPORT INBOUND LEADS */}
      {isImportLeadsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsImportLeadsOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Data Integration
              </span>
              <h3 className="text-xl font-black text-white">Import Inbound Sales Leads</h3>
              <p className="text-xs text-slate-400">
                Sync enterprise inbound prospects from website intake or external CRM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Enterprise Ingest</h4>
                  <p className="text-[11px] text-slate-400">Synchronize contacts and intake submissions into live pipeline.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsImportLeadsOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onNavigateApp('crm');
                  setIsImportLeadsOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>Go to CRM Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: JOIN CALL (VIDEO BRIDGE) */}
      {isJoinCallOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0c111a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsJoinCallOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Zero-Trust WebRTC Video Bridge
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                {nextMeeting ? nextMeeting.title : 'Executive Boardroom Assembly'}
              </h3>
              <p className="text-xs text-slate-400">
                Encrypted Boardroom Assembly • AES-256-GCM Audio/Video Link
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-48 rounded-2xl bg-slate-900 border border-slate-800 relative flex flex-col items-center justify-center overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-teal-700/80 border border-teal-500/40 text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  {nextMeeting?.attendees?.[0]?.avatarInitials || 'BR'}
                </div>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                  {nextMeeting?.attendees?.[0]?.name || 'Boardroom Bridge'}
                </span>
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="h-48 rounded-2xl bg-slate-900 border border-slate-800 relative flex flex-col items-center justify-center overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-teal-500 text-slate-950 font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                  {user.name} (You)
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[9px] font-mono text-emerald-400">
                  HD Audio Active
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">Audio: AES-256 encrypted</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    onNavigateApp('meetings');
                    setIsJoinCallOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Boardroom Meeting</span>
                </button>
                <button
                  onClick={() => setIsJoinCallOpen(false)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
