import React, { useState } from 'react';
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
  Headphones
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

const DEFAULT_TICKETS: SupportTicket[] = [
  {
    id: 't-1',
    ticketId: 'HD-8910',
    subject: 'Kubernetes VPC Peering Latency Spike during Asia-Pacific Trading Hours',
    client: 'Apex Capital Partners',
    contactEmail: 'devops@apexcapital.io',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Vikram Joshi (SecOps)',
    createdAt: '2026-11-22 09:30 AM',
    lastReply: '15 mins ago',
    description: 'Observed p99 latency jump from 4ms to 48ms across the Tokyo to Frankfurt relay. Need urgent packet routing verification.'
  },
  {
    id: 't-2',
    ticketId: 'HD-8908',
    subject: 'Request for Signed SOC2 Type II Audit Compliance Package for Renewal',
    client: 'MediCorp Health Systems',
    contactEmail: 'compliance@medicorp-health.com',
    priority: 'Medium',
    status: 'Open',
    assignedTo: 'Legal & Compliance Desk',
    createdAt: '2026-11-21 04:15 PM',
    lastReply: '2 hours ago',
    description: 'Our annual vendor security review is due next week. Please provide the certified 2026 SOC2 Type II report and penetration test summary.'
  },
  {
    id: 't-3',
    ticketId: 'HD-8904',
    subject: 'Webhook Payload Cryptographic Signature Verification Failure',
    client: 'Nexus Media Networks',
    contactEmail: 'engineering@nexusmedia.org',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Aarav Sharma (API Lead)',
    createdAt: '2026-11-21 01:20 PM',
    lastReply: '4 hours ago',
    description: 'HMAC-SHA256 signature header does not match our secret key on the programmatic ad auction endpoint.'
  },
  {
    id: 't-4',
    ticketId: 'HD-8898',
    subject: 'IoT Fleet Telemetry Ingestion Rate Limit Increase to 25,000 Events/Sec',
    client: 'LogiGlobal Ltd',
    contactEmail: 'k.takahashi@logiglobal.jp',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Platform Infra Team',
    createdAt: '2026-11-20 11:00 AM',
    lastReply: 'Yesterday',
    description: 'Deploying 10,000 new smart shipping telemetry units. Quota successfully raised in Frankfurt cluster.'
  }
];

export const HelpDeskApp: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(DEFAULT_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const statuses = ['All', 'Open', 'In Progress', 'Awaiting Client', 'Resolved'];

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
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

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
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

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            SLA Compliance: <strong className="text-emerald-400">99.8%</strong>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Open Incident Queue</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">3 Active</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">1 Critical Escalation</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Avg First Response Time</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">14 Mins</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Target: &lt; 30 Mins</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">24h Resolution Rate</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">96.4%</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">+4% vs Previous Week</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Customer CSAT Score</span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">4.9 / 5.0</span>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-lg w-full p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block">{selectedTicket.ticketId} • Incident File</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedTicket.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-500 hover:text-white p-1 text-xs"
              >
                ✕
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
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
