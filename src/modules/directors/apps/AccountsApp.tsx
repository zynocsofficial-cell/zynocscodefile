import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Download,
  Calendar,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface LedgerEntry {
  id: string;
  ref: string;
  entity: string;
  type: 'Inflow' | 'Outflow';
  category: string;
  amount: number;
  status: 'Settled' | 'Scheduled' | 'Pending Wire';
  date: string;
}

const DEFAULT_LEDGER: LedgerEntry[] = [
  {
    id: 'l-1',
    ref: 'PAY-2026-APEX',
    entity: 'Apex Capital Partners',
    type: 'Inflow',
    category: 'Enterprise Contract (Phase 1)',
    amount: 125000.00,
    status: 'Settled',
    date: 'Nov 20, 2026'
  },
  {
    id: 'l-2',
    ref: 'EXP-2026-AWS',
    entity: 'Amazon Web Services (AWS EMEA)',
    type: 'Outflow',
    category: 'Cloud Kubernetes Compute',
    amount: 14250.00,
    status: 'Settled',
    date: 'Nov 18, 2026'
  },
  {
    id: 'l-3',
    ref: 'PAY-2026-LOGI',
    entity: 'LogiGlobal Ltd',
    type: 'Inflow',
    category: 'IoT Fleet Telemetry Expansion',
    amount: 65000.00,
    status: 'Settled',
    date: 'Nov 15, 2026'
  },
  {
    id: 'l-4',
    ref: 'EXP-2026-EQUINIX',
    entity: 'Equinix Frankfurt (FR5 Hub)',
    type: 'Outflow',
    category: 'Colocation & Low-Latency Relay',
    amount: 8900.00,
    status: 'Scheduled',
    date: 'Nov 25, 2026'
  },
  {
    id: 'l-5',
    ref: 'PAY-2026-MEDI',
    entity: 'MediCorp Health Systems',
    type: 'Inflow',
    category: 'HIPAA Medical Vault Renewal',
    amount: 85000.00,
    status: 'Pending Wire',
    date: 'Nov 28, 2026'
  }
];

export const AccountsApp: React.FC = () => {
  const [ledger, setLedger] = useState<LedgerEntry[]>(DEFAULT_LEDGER);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Inflow' | 'Outflow'>('All');

  const filtered = ledger.filter(l => activeFilter === 'All' || l.type === activeFilter);

  const totalInflow = ledger.filter(l => l.type === 'Inflow').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutflow = ledger.filter(l => l.type === 'Outflow').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Receipt className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Corporate Accounts & Treasury Ledger
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cash flow telemetry, enterprise receivable collections, vendor payouts, and audit readiness.
          </p>
        </div>

        <button
          onClick={() => alert('Audited Financial Summary exported as encrypted Excel/CSV container.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-semibold text-xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Financial Health Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Treasury Cash Reserves</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">$8,420,000</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">28 Months Operating Runway</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Monthly Revenue Run Rate</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">$316,600 / mo</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">$3.8M Annualized ARR</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Operating Gross Margin</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">82.4%</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Zero Debt Load</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Audit Certification</span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">Deloitte Prep</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">100% Tax Compliant</span>
        </SpotlightCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {(['All', 'Inflow', 'Outflow'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === tab
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All Transactions' : tab === 'Inflow' ? 'Receivables (Inflow)' : 'Payables (Outflow)'}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
          <span>Inflow: <strong className="text-emerald-400">${totalInflow.toLocaleString()}</strong></span>
          <span>Outflow: <strong className="text-red-400">${totalOutflow.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* Ledger Transactions */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isInflow = item.type === 'Inflow';
          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  isInflow ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400' : 'bg-red-950/60 border-red-500/30 text-red-400'
                }`}>
                  {isInflow ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.entity}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.ref}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {item.category} • Date: {item.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-start md:self-auto shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                  item.status === 'Settled'
                    ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-950/50 text-amber-400 border-amber-500/30'
                }`}>
                  {item.status}
                </span>

                <span className={`text-base font-bold font-mono ${isInflow ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {isInflow ? '+' : '-'}${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
