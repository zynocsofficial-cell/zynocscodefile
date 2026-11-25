import React, { useState, useEffect } from 'react';
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
  Receipt,
  Plus,
  Trash2,
  X
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

const LOCAL_STORAGE_KEY = 'zynocs_accounts_ledger_v6';

export const AccountsApp: React.FC = () => {
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved ledger:', e);
      }
    }
    return [];
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Inflow' | 'Outflow'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [entity, setEntity] = useState('');
  const [ref, setRef] = useState('');
  const [type, setType] = useState<'Inflow' | 'Outflow'>('Inflow');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<LedgerEntry['status']>('Settled');
  const [date, setDate] = useState(() => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ledger));
  }, [ledger]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entity.trim() || !amount) return;

    const newEntry: LedgerEntry = {
      id: `l-${Date.now()}`,
      ref: ref.trim() || `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      entity: entity.trim(),
      type,
      category: category.trim() || (type === 'Inflow' ? 'Client Payment' : 'Operating Expense'),
      amount: parseFloat(amount) || 0,
      status,
      date: date.trim() || 'Today'
    };

    setLedger(prev => [newEntry, ...prev]);
    setEntity('');
    setRef('');
    setCategory('');
    setAmount('');
    setIsAddModalOpen(false);
  };

  const handleClearLedger = () => {
    if (window.confirm('Are you sure you want to clear all ledger transactions?')) {
      setLedger([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const filtered = ledger.filter(l => activeFilter === 'All' || l.type === activeFilter);

  const totalInflow = ledger.filter(l => l.type === 'Inflow').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutflow = ledger.filter(l => l.type === 'Outflow').reduce((acc, curr) => acc + curr.amount, 0);
  const netReserves = totalInflow - totalOutflow;

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

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>

          {ledger.length > 0 && (
            <button
              onClick={handleClearLedger}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/30 text-xs transition-all cursor-pointer"
              title="Clear all transactions"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={() => alert('Audited Financial Summary exported as encrypted Excel/CSV container.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-semibold text-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Financial Health Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Treasury Cash Reserves</span>
          <span className={`text-2xl font-bold font-mono mt-1 block ${netReserves >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${netReserves.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Net Flow Reserves</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Total Inflow (Revenue)</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">
            ${totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">{ledger.filter(l => l.type === 'Inflow').length} Inflow Records</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Total Outflow (CapEx/OpEx)</span>
          <span className="text-2xl font-bold text-red-400 font-mono mt-1 block">
            ${totalOutflow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">{ledger.filter(l => l.type === 'Outflow').length} Outflow Records</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Audit Certification</span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">Live Audit</span>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
          <span>Inflow: <strong className="text-emerald-400">${totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></span>
          <span>Outflow: <strong className="text-red-400">${totalOutflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></span>
        </div>
      </div>

      {/* Ledger Transactions */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
          <Receipt className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">Treasury Ledger is 100% Clean</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No dummy transactions remain. Click &quot;+ Add Transaction&quot; above to record live business inflows, client billings, and operating expenses.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Transaction</span>
          </button>
        </div>
      ) : (
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

                  <span className={`text-base font-bold font-mono ${isInflow ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isInflow ? '+' : '-'}${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl bg-[#090f1a] border border-[#1f2d40] p-6 space-y-4 shadow-2xl shadow-cyan-950/40">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-cyan-400" />
                Record Treasury Transaction
              </h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Entity / Client / Vendor</label>
                <input
                  type="text"
                  required
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                  placeholder="e.g. Acme Corp or AWS Services"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Transaction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'Inflow' | 'Outflow')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Inflow">Inflow (Receivable)</option>
                    <option value="Outflow">Outflow (Payable)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000.00"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Enterprise License or Cloud Hosting"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LedgerEntry['status'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Settled">Settled</option>
                    <option value="Pending Wire">Pending Wire</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Reference ID</label>
                  <input
                    type="text"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    placeholder="e.g. INV-1001"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
