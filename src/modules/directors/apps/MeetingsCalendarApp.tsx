import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Video,
  Users,
  Plus,
  CheckCircle2,
  Calendar as CalendarIcon,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Link2,
  Vote,
  Search,
  Filter,
  Trash2,
  X
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface BoardMeeting {
  id: string;
  title: string;
  type: 'Board of Directors' | 'Executive Committee' | 'Architecture Review' | 'Investor Briefing';
  date: string;
  time: string;
  duration: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Quorum Pending';
  location: string;
  videoLink: string;
  quorum: {
    confirmed: number;
    required: number;
    status: 'Achieved' | 'Pending';
  };
  attendees: {
    name: string;
    role: string;
    avatarInitials: string;
    status: 'Confirmed' | 'Tentative' | 'Declined';
  }[];
  agenda: string[];
  documents: {
    title: string;
    size: string;
  }[];
}

const INITIAL_MEETINGS: BoardMeeting[] = [];

const LOCAL_STORAGE_KEY = 'zynocs_board_meetings_v8';

export const MeetingsCalendarApp: React.FC = () => {
  const [meetings, setMeetings] = useState<BoardMeeting[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved meetings:', e);
      }
    }
    return INITIAL_MEETINGS;
  });

  const [selectedMeeting, setSelectedMeeting] = useState<BoardMeeting | null>(() => {
    return meetings[0] || null;
  });

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meetings));
  }, [meetings]);

  const [viewMode, setViewMode] = useState<'schedule' | 'calendar' | 'quorum'>('schedule');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // New Meeting Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<BoardMeeting['type']>('Board of Directors');
  const [newDate, setNewDate] = useState('2026-12-10');
  const [newTime, setNewTime] = useState('15:00 - 16:30 IST');
  const [newLocation, setNewLocation] = useState('Encrypted Boardroom Bridge');
  const [newAgenda, setNewAgenda] = useState('');

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const agendaItems = newAgenda
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);

    const created: BoardMeeting = {
      id: `BM-2026-${Math.floor(11 + Math.random() * 90)}`,
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      time: newTime,
      duration: '90 mins',
      status: 'Upcoming',
      location: newLocation,
      videoLink: `https://meet.zynocs.com/room-${Math.floor(100 + Math.random() * 900)}`,
      quorum: {
        confirmed: 2,
        required: 2,
        status: 'Achieved'
      },
      attendees: [
        { name: 'Mohammed Khaja Moinuddin', role: 'Founder & Chairperson', avatarInitials: 'MK', status: 'Confirmed' },
        { name: 'Yousuf Mohammed Jaleel', role: 'Founder & CEO', avatarInitials: 'YM', status: 'Confirmed' }
      ],
      agenda: agendaItems.length > 0 ? agendaItems : ['1. Formal Executive Agenda Opening', '2. Executive Vote Review'],
      documents: [{ title: 'Meeting_Notice_Signed.pdf', size: '1.2 MB' }]
    };

    setMeetings((prev) => [created, ...prev]);
    setSelectedMeeting(created);
    setShowScheduleModal(false);
    setNewTitle('');
    setNewAgenda('');
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings((prev) => {
      const next = prev.filter((m) => m.id !== id);
      if (selectedMeeting?.id === id) {
        setSelectedMeeting(next[0] || null);
      }
      return next;
    });
  };

  const copyVideoLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Top App Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <CalendarDays className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Executive Meetings & Calendar</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                Encrypted Boardroom
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Schedule formal Board of Directors assemblies, verify quorum authorization, and launch video bridges.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setViewMode('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'schedule'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Agenda & Meetings
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar Month View
            </button>
            <button
              onClick={() => setViewMode('quorum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'quorum'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quorum Audit
            </button>
          </div>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Quick Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Next Executive Meeting</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-lg font-black text-white mt-2 font-mono">
            {meetings.length > 0 ? `${meetings[0].date}` : 'None Scheduled'}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
            {meetings.length > 0 ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Quorum {meetings[0].quorum.status} ({meetings[0].quorum.confirmed}/{meetings[0].quorum.required})
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Clean Assembly Schedule
              </>
            )}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Scheduled Assemblies</span>
            <CalendarIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2 font-mono">{meetings.length} Sessions</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {meetings.length > 0 
              ? `${meetings.filter(m => m.type === 'Board of Directors').length} Board • ${meetings.filter(m => m.type !== 'Board of Directors').length} Review`
              : 'Zero Pending Assemblies'}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Calendar Synchronization</span>
            <Link2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-emerald-300 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Google & Outlook 365 Active
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">director@zynocs.com</div>
        </SpotlightCard>

        <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Encrypted Video Bridge</span>
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-sm font-bold text-white mt-2">Zero-Trust WebRTC</div>
          <div className="text-[11px] text-cyan-400 mt-1 font-mono">AES-256 GCM Audio/Video</div>
        </SpotlightCard>
      </div>

      {/* Main Content Areas */}
      {viewMode === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (5 cols): Meetings List & Filters */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search and Category Filter */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search meetings, agendas, committees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                {['All', 'Board of Directors', 'Architecture Review', 'Investor Briefing'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                      typeFilter === t
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Meetings Cards */}
            <div className="space-y-3">
              {filteredMeetings.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 flex items-center justify-center mx-auto">
                    <CalendarDays className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Scheduled Meetings</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      No board or committee assemblies booked yet.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule First Meeting</span>
                  </button>
                </div>
              ) : (
                filteredMeetings.map((meeting) => {
                  const isSelected = selectedMeeting?.id === meeting.id;
                  return (
                    <div
                      key={meeting.id}
                      onClick={() => setSelectedMeeting(meeting)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSelected
                          ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full" />
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                          {meeting.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          meeting.quorum.status === 'Achieved'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                            : 'bg-amber-950/60 text-amber-400 border-amber-500/40'
                        }`}>
                          Quorum: {meeting.quorum.confirmed}/{meeting.quorum.required} {meeting.quorum.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                        {meeting.title}
                      </h3>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                          {meeting.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          {meeting.time}
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center -space-x-2">
                          {meeting.attendees.slice(0, 4).map((att, i) => (
                            <div
                              key={i}
                              title={`${att.name} (${att.role})`}
                              className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 text-[9px] font-mono font-bold text-slate-300 flex items-center justify-center"
                            >
                              {att.avatarInitials}
                            </div>
                          ))}
                          {meeting.attendees.length > 4 && (
                            <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-950 text-[9px] font-mono font-bold text-slate-400 flex items-center justify-center">
                              +{meeting.attendees.length - 4}
                            </div>
                          )}
                        </div>

                        <span className="text-[11px] text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                          View Board Dossier →
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column (7 cols): Selected Meeting Dossier & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {selectedMeeting ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
                
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{selectedMeeting.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400">{selectedMeeting.type}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {selectedMeeting.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1 font-mono">
                      <span className="flex items-center gap-1.5 text-white">
                        <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                        {selectedMeeting.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-white">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {selectedMeeting.time} ({selectedMeeting.duration})
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {selectedMeeting.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <a
                      href={selectedMeeting.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Video Bridge</span>
                    </a>

                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => copyVideoLink(selectedMeeting.videoLink)}
                        className="flex-1 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700/80 cursor-pointer"
                        title="Copy bridge link"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[11px] font-mono">{copiedLink ? 'Copied' : 'Copy URL'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMeeting(selectedMeeting.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-400 text-slate-400 transition-all border border-slate-700/80 hover:border-red-500/30 cursor-pointer"
                        title="Delete meeting"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quorum Governance Status Box */}
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                      <Vote className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        Executive Quorum Status:
                        <span className={selectedMeeting.quorum.status === 'Achieved' ? 'text-emerald-400' : 'text-amber-400'}>
                          {selectedMeeting.quorum.status} ({selectedMeeting.quorum.confirmed}/{selectedMeeting.quorum.required} Confirmed)
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Under corporate bylaws, binding resolution votes require at least 3 authorized board signatures.
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Legal Quorum Verified
                  </span>
                </div>

                {/* Agenda Items */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Formal Meeting Agenda
                  </h4>
                  <div className="space-y-2">
                    {selectedMeeting.agenda.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-lg bg-slate-900 text-cyan-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-800">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirmed Attendees */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Boardroom Roster & RSVPs ({selectedMeeting.attendees.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedMeeting.attendees.map((attendee, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-900 to-slate-900 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0">
                            {attendee.avatarInitials}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{attendee.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">{attendee.role}</div>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 ${
                          attendee.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {attendee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attached Board Documents */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    Encrypted Documents & Board Packs ({selectedMeeting.documents.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMeeting.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-center justify-between text-xs group hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                          <span className="text-slate-300 truncate font-mono text-[11px]">{doc.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">{doc.size}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
                  <CalendarDays className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No Meeting Dossier Selected</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Select a meeting from the schedule or click &quot;Schedule Meeting&quot; above to organize a formal board assembly.
                  </p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Meeting</span>
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Calendar Month View */}
      {viewMode === 'calendar' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-black text-white">November 2026 Executive Schedule</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                IST (UTC+5:30)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 7-day Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-xs font-mono font-bold text-slate-400 py-2">
                {day}
              </div>
            ))}

            {/* Days Dynamic Grid */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dayMeetings = meetings.filter((m) => {
                const parts = m.date.split('-');
                return parts.length === 3 && parseInt(parts[2], 10) === dayNum;
              });
              const hasMeeting = dayMeetings.length > 0;
              return (
                <div
                  key={i}
                  className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between transition-all ${
                    hasMeeting
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md'
                      : 'bg-slate-950/50 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${hasMeeting ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {dayNum}
                  </span>

                  {dayMeetings.slice(0, 1).map((m) => (
                    <div key={m.id} className="p-1.5 rounded-lg bg-cyan-900/60 border border-cyan-500/40 text-[10px] text-cyan-200 font-semibold truncate">
                      🏢 {m.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quorum Audit View */}
      {viewMode === 'quorum' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div>
            <h3 className="text-lg font-black text-white">Board Quorum & Voting Integrity Dashboard</h3>
            <p className="text-xs text-slate-400 mt-1">
              Real-time audit verifying that voting assemblies satisfy corporate charter requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Charter Quorum Rule</span>
              <div className="text-2xl font-black text-white font-mono">60% Majority</div>
              <p className="text-xs text-slate-400">At least 2 of 2 registered executive voting directors must be present.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Hardware Key Verification</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">100% Enforced</div>
              <p className="text-xs text-slate-400">FIDO2 passkey required to submit binding votes on resolutions.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Audit Trail Storage</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">PostgreSQL 18</div>
              <p className="text-xs text-slate-400">Every vote and presence log is written to immutable WAL replica.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Schedule New Meeting */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-[#090f1a] border border-[#1f2d40] p-6 sm:p-7 shadow-2xl space-y-5 shadow-cyan-950/40 relative">
            <div className="flex items-start justify-between border-b border-[#141e2e] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Schedule Board Meeting</h3>
                  <span className="text-xs text-slate-400">Executive Governance Bridge</span>
                </div>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div>
                <label className="text-slate-300 font-semibold block text-xs mb-1.5">Meeting Title <span className="text-cyan-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Strategy & Capital Allocation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-semibold block text-xs mb-1.5">Assembly Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all cursor-pointer"
                  >
                    <option value="Board of Directors">Board of Directors</option>
                    <option value="Executive Committee">Executive Committee</option>
                    <option value="Architecture Review">Architecture Review</option>
                    <option value="Investor Briefing">Investor Briefing</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block text-xs mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-semibold block text-xs mb-1.5">Time Window (IST)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15:00 - 16:30 IST"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block text-xs mb-1.5">Location / Room</label>
                  <input
                    type="text"
                    required
                    placeholder="Encrypted Boardroom Bridge"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block text-xs mb-1.5">Agenda Items (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="1. Executive Update&#10;2. Treasury Review&#10;3. Resolution Vote"
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0c1524] border border-[#1c293d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all font-mono resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#141e2e] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Assembly</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
