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

  const [viewMode, setViewMode] = useState<'calendar' | 'schedule' | 'quorum'>('calendar');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Calendar Date Navigation (Default to Nov 2026 / current date)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 10, 26)); // Nov 26, 2026
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-11-28');

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
          {/* View Mode Switcher - Calendar Month View first */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar Month View
            </button>
            <button
              onClick={() => setViewMode('schedule')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'schedule'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Agenda & Meetings
            </button>
            <button
              onClick={() => setViewMode('quorum')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'quorum'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quorum Audit
            </button>
          </div>

          <button
            onClick={() => {
              setNewDate(selectedCalendarDate || '2026-11-28');
              setShowScheduleModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Quick Telemetry Cards: ONLY shown in Agenda & Meetings mode (hidden in Calendar view) */}
      {viewMode === 'schedule' && (
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
      )}

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

      {/* Calendar Month View - Full Calendar with Best View */}
      {viewMode === 'calendar' && (() => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0 - 11
        const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Monday-based index: 0 for Mon, 6 for Sun
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const startDayOffset = (firstDay + 6) % 7;
        const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();

        // 35 or 42 grid cells
        const totalCells = Math.ceil((startDayOffset + totalDaysInMonth) / 7) * 7;

        const handlePrevMonth = () => {
          setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
        };
        const handleNextMonth = () => {
          setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
        };
        const handleToday = () => {
          setCurrentDate(new Date(2026, 10, 26));
          setSelectedCalendarDate('2026-11-28');
        };

        const monthMeetings = meetings.filter((m) => {
          const parts = m.date.split('-');
          return (
            parts.length === 3 &&
            parseInt(parts[0], 10) === currentYear &&
            parseInt(parts[1], 10) === currentMonth + 1
          );
        });

        const selectedDateMeetings = meetings.filter((m) => m.date === selectedCalendarDate);

        const formatSelectedDateLabel = (dateStr: string) => {
          try {
            const [y, m, d] = dateStr.split('-').map(Number);
            const dt = new Date(y, m - 1, d);
            return dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
          } catch {
            return dateStr;
          }
        };

        return (
          <div className="space-y-6">
            
            {/* Calendar Main Board */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              
              {/* Calendar Controls & Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {monthName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                        {monthMeetings.length} Scheduled
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2 font-mono">
                      <span>Executive Governance Calendar</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-cyan-400">IST (UTC+5:30)</span>
                    </p>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handleToday}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all cursor-pointer"
                  >
                    Today
                  </button>
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setNewDate(selectedCalendarDate || '2026-11-28');
                      setShowScheduleModal(true);
                    }}
                    className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add Meeting</span>
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-2">
                {[
                  { label: 'Mon', full: 'Monday' },
                  { label: 'Tue', full: 'Tuesday' },
                  { label: 'Wed', full: 'Wednesday' },
                  { label: 'Thu', full: 'Thursday' },
                  { label: 'Fri', full: 'Friday' },
                  { label: 'Sat', full: 'Saturday' },
                  { label: 'Sun', full: 'Sunday' }
                ].map(d => (
                  <div
                    key={d.label}
                    className="py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-950/40 rounded-xl border border-slate-850/60"
                  >
                    <span className="hidden sm:inline">{d.full}</span>
                    <span className="sm:hidden">{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Full Month Calendar Grid (Spacious, Interactive Cells) */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: totalCells }).map((_, i) => {
                  const isPrevMonth = i < startDayOffset;
                  const isNextMonth = i >= startDayOffset + totalDaysInMonth;
                  const isCurrentMonth = !isPrevMonth && !isNextMonth;

                  let cellDayNum: number;
                  let cellDateKey: string = '';

                  if (isPrevMonth) {
                    cellDayNum = prevMonthTotalDays - (startDayOffset - 1 - i);
                    const prevMonthNum = currentMonth === 0 ? 12 : currentMonth;
                    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                    cellDateKey = `${prevYear}-${String(prevMonthNum).padStart(2, '0')}-${String(cellDayNum).padStart(2, '0')}`;
                  } else if (isNextMonth) {
                    cellDayNum = i - (startDayOffset + totalDaysInMonth) + 1;
                    const nextMonthNum = currentMonth === 11 ? 1 : currentMonth + 2;
                    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
                    cellDateKey = `${nextYear}-${String(nextMonthNum).padStart(2, '0')}-${String(cellDayNum).padStart(2, '0')}`;
                  } else {
                    cellDayNum = i - startDayOffset + 1;
                    cellDateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cellDayNum).padStart(2, '0')}`;
                  }

                  const dayMeetings = meetings.filter(m => m.date === cellDateKey);
                  const isSelected = selectedCalendarDate === cellDateKey;
                  const isToday = currentYear === 2026 && currentMonth === 10 && cellDayNum === 26 && isCurrentMonth;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedCalendarDate(cellDateKey);
                        if (dayMeetings.length > 0) {
                          setSelectedMeeting(dayMeetings[0]);
                        }
                      }}
                      className={`min-h-[110px] sm:min-h-[125px] p-2.5 rounded-2xl border flex flex-col justify-between transition-all group relative cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                          : isCurrentMonth
                          ? dayMeetings.length > 0
                            ? 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-slate-900/90'
                            : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                          : 'bg-slate-950/20 border-slate-850/40 opacity-40 hover:opacity-75'
                      }`}
                    >
                      {/* Top Header of Cell: Day Number + Today/Selected Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-mono font-bold ${
                              isSelected
                                ? 'text-cyan-300'
                                : isToday
                                ? 'text-white'
                                : isCurrentMonth
                                ? 'text-slate-300'
                                : 'text-slate-600'
                            }`}
                          >
                            {cellDayNum}
                          </span>
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" title="Today" />
                          )}
                        </div>

                        {/* Quick Add on cell hover */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCalendarDate(cellDateKey);
                            setNewDate(cellDateKey);
                            setShowScheduleModal(true);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-opacity"
                          title="Schedule meeting on this day"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Middle/Bottom: Meeting Pills */}
                      <div className="space-y-1.5 my-1">
                        {dayMeetings.slice(0, 2).map((m) => {
                          const isBoard = m.type === 'Board of Directors';
                          const isArch = m.type === 'Architecture Review';
                          const isInvest = m.type === 'Investor Briefing';

                          return (
                            <div
                              key={m.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMeeting(m);
                                setSelectedCalendarDate(cellDateKey);
                              }}
                              className={`p-1.5 rounded-lg border text-[10px] font-medium leading-tight truncate transition-transform hover:scale-[1.02] cursor-pointer shadow-sm ${
                                isBoard
                                  ? 'bg-cyan-950/90 text-cyan-200 border-cyan-500/40'
                                  : isArch
                                  ? 'bg-sky-950/90 text-sky-200 border-sky-500/40'
                                  : isInvest
                                  ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
                                  : 'bg-purple-950/90 text-purple-200 border-purple-500/40'
                              }`}
                              title={`${m.time} - ${m.title}`}
                            >
                              <div className="font-mono text-[9px] font-bold opacity-90 truncate">
                                {m.time.split(' ')[0]}
                              </div>
                              <div className="truncate font-semibold">{m.title}</div>
                            </div>
                          );
                        })}

                        {dayMeetings.length > 2 && (
                          <div className="text-[10px] font-mono text-cyan-400 font-bold px-1">
                            +{dayMeetings.length - 2} more
                          </div>
                        )}
                      </div>

                      {/* Bottom status line */}
                      <div className="text-[9px] font-mono text-slate-500 truncate">
                        {dayMeetings.length > 0 && (
                          <span className="text-cyan-400/80 font-bold">
                            {dayMeetings.length} {dayMeetings.length === 1 ? 'Assembly' : 'Assemblies'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Selected Date Dossier & Actions Panel */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Assemblies for {formatSelectedDateLabel(selectedCalendarDate)}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {selectedDateMeetings.length > 0 
                        ? `${selectedDateMeetings.length} board session(s) scheduled for this date.` 
                        : 'No board meetings or assemblies scheduled for this date.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNewDate(selectedCalendarDate);
                    setShowScheduleModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Schedule Assembly on this Date</span>
                </button>
              </div>

              {/* List of Meetings for Selected Date */}
              {selectedDateMeetings.length === 0 ? (
                <div className="py-8 px-4 text-center rounded-2xl bg-slate-950/40 border border-dashed border-slate-800/80">
                  <p className="text-xs text-slate-400">
                    The executive schedule is clear for this date. Click above to organize a formal board assembly.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDateMeetings.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-cyan-300">
                          {m.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                          Quorum {m.quorum.status} ({m.quorum.confirmed}/{m.quorum.required})
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white">{m.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {m.time}
                          </span>
                          <span>•</span>
                          <span className="truncate">{m.location}</span>
                        </div>
                      </div>

                      {/* Attendee Badges */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <div className="flex items-center -space-x-1.5">
                          {m.attendees.map((att, idx) => (
                            <div
                              key={idx}
                              title={`${att.name} (${att.role})`}
                              className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 text-[9px] font-mono font-bold text-slate-300 flex items-center justify-center"
                            >
                              {att.avatarInitials}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={m.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Bridge</span>
                          </a>
                          <button
                            onClick={() => {
                              setSelectedMeeting(m);
                              setViewMode('schedule');
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                          >
                            Dossier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        );
      })()}

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
              <span className="text-xs font-mono text-slate-400 uppercase">Director Clearance Verification</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">100% Enforced</div>
              <p className="text-xs text-slate-400">Authenticated executive session required to submit binding votes on resolutions.</p>
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
