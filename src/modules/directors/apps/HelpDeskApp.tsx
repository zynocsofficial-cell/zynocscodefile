import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, 
  Search, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  Filter, 
  Plus, 
  ArrowUpRight,
  ShieldAlert,
  Headphones,
  Trash2,
  X
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface SupportTicket {
  id: string;
  ticketId: string;
  subject: string;
  client: string;
  contactEmail: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Awaiting Client' | 'Resolved';
  assignedTo: string;
  createdAt: string;
  lastReply: string;
  description: string;
}

const LOCAL_STORAGE_KEY = 'zynocs_tickets_v6';

export const HelpDeskApp: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tickets:', e);
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State
  const [subject, setSubject] = useState('');
  const [client, setClient] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [priority, setPriority] = useState<SupportTicket['priority']>('High');
  const [assignedTo, setAssignedTo] = useState('Mohammed Khaja Moinuddin');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const statuses = ['All', 'Open', 'In Progress', 'Awaiting Client', 'Resolved'];

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !client.trim()) return;

    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      ticketId: `HD-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: subject.trim(),
      client: client.trim(),
      contactEmail: contactEmail.trim() || 'support@zynocs.com',
      priority,
      status: 'Open',
      assignedTo,
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      lastReply: 'Just now',
      description: description.trim() || 'Client reported issue logged by Director.'
    };

    setTickets(prev => [newTicket, ...prev]);
    setSubject('');
    setClient('');
    setContactEmail('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  const handleClearTickets = () => {
    if (window.confirm('Are you sure you want to clear all support tickets?')) {
      setTickets([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const getPriorityBadge = (p: SupportTicket['priority']) => {
    switch (p) {
      case 'Critical':
        return 'bg-red-950/60 text-red-400 border-red-500/40 font-bold';
      case 'High':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/40';
      case 'Medium':
        return 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusBadge = (s: SupportTicket['status']) => {
    switch (s) {
      case 'Resolved':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-blue-950/50 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleUpdateStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const openTicketsCount = tickets.filter(t => t.status !== 'Resolved').length;
  const criticalCount = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Resolved').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* App Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <LifeBuoy className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Enterprise Help Desk & Support Escalations
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time client incident dispatch, SLA adherence metrics, and technical resolution triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {tickets.length > 0 && (
            <button
              onClick={handleClearTickets}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/30 text-xs transition-all cursor-pointer"
              title="Clear all tickets"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Open Incident Queue</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">{openTicketsCount} Active</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">
            {criticalCount} Critical Escalation
          </span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Avg First Response Time</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">&lt; 15 Mins</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Target: &lt; 30 Mins</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Resolved Rate</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
            {tickets.length > 0 ? `${Math.round((tickets.filter(t => t.status === 'Resolved').length / tickets.length) * 100)}%` : '100%'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">SLA Guaranteed</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Customer CSAT Score</span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">5.0 / 5.0</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Enterprise SLA Tier</span>
        </SpotlightCard>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID, subject, client..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {statuses.map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStatus(stg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === stg
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white bg-slate-950/60 border border-transparent'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
          <LifeBuoy className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">Help Desk Queue is 100% Clean</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No dummy client tickets remain. When clients submit inquiries or incidents, they will appear here. Click &quot;+ Create Ticket&quot; to log a client request manually.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Ticket</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-cyan-400">{t.ticketId}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getPriorityBadge(t.priority)}`}>
                    {t.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(t.status)}`}>
                    {t.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">• {t.client}</span>
                </div>
                <h4 className="text-sm font-semibold text-white">{t.subject}</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Assigned: <span className="text-slate-300">{t.assignedTo}</span> • Last reply: {t.lastReply}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                <select
                  value={t.status}
                  onChange={(e) => handleUpdateStatus(t.id, e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Awaiting Client">Awaiting Client</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={() => setSelectedTicket(t)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="max-w-lg w-full p-6 sm:p-7 rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl space-y-5 shadow-cyan-950/40 relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block">{selectedTicket.ticketId} • Incident File</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedTicket.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-500 hover:text-white p-1 text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">Enterprise Client:</span>
                  <span className="text-white font-semibold">{selectedTicket.client}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Email:</span>
                  <span className="text-cyan-400">{selectedTicket.contactEmail}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Assigned Engineer:</span>
                  <span className="text-white">{selectedTicket.assignedTo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Created At:</span>
                  <span className="text-slate-400">{selectedTicket.createdAt}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">Incident Description:</span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px]">{selectedTicket.description}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close Ticket View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="max-w-md w-full p-6 sm:p-7 rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl space-y-4 shadow-cyan-950/40 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Create Support Ticket
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Infrastructure API Quota Increase"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Client Enterprise Ltd"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@client.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mohammed Khaja Moinuddin">Mohammed Khaja Moinuddin</option>
                    <option value="Yousuf Mohammed Jaleel">Yousuf Mohammed Jaleel</option>
                    <option value="Technical Support Desk">Technical Support Desk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of the incident or support request..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
