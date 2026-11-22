import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeft, 
  Database, 
  Shield, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  Users, 
  DollarSign, 
  Briefcase, 
  Server, 
  KeyRound, 
  Table, 
  Network, 
  Globe, 
  ExternalLink,
  ChevronRight,
  GitBranch,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

export type CanvasViewMode = 
  | 'main' 
  | 'postgres' 
  | 'dns' 
  | 'directors' 
  | 'work' 
  | 'client' 
  | 'bcrypt' 
  | 'gatekeeper';

export const InteractiveArchitectureCanvas: React.FC = () => {
  const [viewMode, setViewMode] = useState<CanvasViewMode>('main');
  const [zoom, setZoom] = useState<number>(0.95);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [inspectedNode, setInspectedNode] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.canvas-interactive-node')) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleResetZoom = () => {
    setZoom(0.95);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col rounded-3xl bg-[#050811] border border-[#141e2e] shadow-2xl overflow-hidden select-none animate-fade-in font-sans">
      
      {/* ========================================================================= */}
      {/* 1. TOP UNIFIED TOOLBAR: Breadcrumbs, Direct Architecture Switchers & Zoom */}
      {/* ========================================================================= */}
      <div className="px-5 py-3.5 bg-[#090f1a] border-b border-[#141e2e] flex flex-wrap items-center justify-between gap-3 relative z-20">
        
        {/* Left: Breadcrumbs / Back button */}
        <div className="flex items-center gap-3">
          {viewMode !== 'main' ? (
            <button
              onClick={() => {
                setViewMode('main');
                handleResetZoom();
                setInspectedNode(null);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Master Flow</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase tracking-wider">
                Unified Architecture Canvas
              </span>
            </div>
          )}

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Quick Direct Jump Pills across the whole architecture */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'main', label: 'Master Flowchart', icon: Layers },
              { id: 'postgres', label: 'PostgreSQL 18 Schema', icon: Database },
              { id: 'dns', label: 'DNS & Subdomains', icon: Network },
              { id: 'directors', label: 'Directors Boardroom', icon: Shield },
              { id: 'work', label: 'Workplace Mesh', icon: Users },
              { id: 'client', label: 'Client Engagement', icon: Briefcase }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setViewMode(tab.id as CanvasViewMode);
                  handleResetZoom();
                  setInspectedNode(null);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  viewMode === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <tab.icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#0d1524] p-1 rounded-xl border border-[#1a2638]">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-2 min-w-[44px] text-center font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
              title="Zoom In"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom & Pan"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. THE INFINITE INTERACTIVE CANVAS VIEWPORT */}
      {/* ========================================================================= */}
      <div 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative w-full h-[80vh] min-h-[680px] overflow-auto cursor-${isPanning ? 'grabbing' : 'grab'} bg-[#050811] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]`}
      >
        {/* Transform Stage */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'top center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out'
          }}
          className="w-full min-w-[1200px] flex flex-col items-center pt-10 pb-36 px-12"
        >

          {/* ========================================================================= */}
          {/* VIEW A: MASTER FLOWCHART (Pixel-Perfect from Picture 2, Zero Overlap) */}
          {/* ========================================================================= */}
          {viewMode === 'main' && (
            <div className="w-full flex flex-col items-center relative">
              
              {/* Node 1: User Logs In with Email & Password */}
              <div 
                onClick={() => setInspectedNode('login_root')}
                className="canvas-interactive-node px-7 py-3 rounded-xl bg-[#0f172a] border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-bold shadow-xl text-center transition-all cursor-pointer hover:shadow-cyan-500/10 hover:scale-[1.02]"
              >
                User Logs In with Email & Password
              </div>

              {/* Arrow 1 */}
              <div className="w-0.5 h-8 bg-slate-600 relative">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Node 2: 1. Check Password Hash (bcrypt) */}
              <div 
                onClick={() => setViewMode('bcrypt')}
                className="canvas-interactive-node group px-7 py-3 rounded-xl bg-[#0f172a] border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-bold shadow-xl text-center transition-all cursor-pointer hover:shadow-cyan-500/10 hover:scale-[1.02] flex items-center gap-2"
              >
                <span>1. Check Password Hash (bcrypt)</span>
                <span className="text-[10px] text-cyan-400 font-normal bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  Inspect Crypto 🔍
                </span>
              </div>

              {/* Arrow 2 */}
              <div className="w-0.5 h-8 bg-slate-600 relative">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Node 3: 2. Check user_roles table in PostgreSQL 18 */}
              <div 
                onClick={() => setViewMode('postgres')}
                className="canvas-interactive-node group px-8 py-3.5 rounded-xl bg-[#0f172a] border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-bold shadow-xl text-center transition-all cursor-pointer hover:shadow-cyan-500/10 hover:scale-[1.02] flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. Check user_roles table in PostgreSQL 18</span>
                <span className="text-[10px] text-cyan-400 font-normal bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Schema 🔍
                </span>
              </div>

              {/* Arrow 3 */}
              <div className="w-0.5 h-10 bg-slate-600 relative">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Node 4: Decision Diamond: Is status == 'ACTIVE'? (With NON-OVERLAPPING LEFT BRANCH) */}
              <div className="relative w-full flex items-center justify-center my-4">
                
                {/* LEFT BRANCH CONTAINER: Positioned far to the left to guarantee ZERO overlap */}
                <div className="absolute right-[50%] mr-24 flex items-center">
                  {/* The Red Terminated Box */}
                  <div 
                    onClick={() => setViewMode('gatekeeper')}
                    className="canvas-interactive-node px-4 py-2.5 rounded-xl bg-[#1c0b11] border border-red-500/60 hover:border-red-400 text-red-300 font-mono text-xs font-bold shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-all whitespace-nowrap"
                  >
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>❌ Access Denied: Account Terminated</span>
                  </div>

                  {/* Connecting Line from Diamond to Left Box */}
                  <div className="w-20 h-0.5 bg-slate-600 relative flex items-center justify-center">
                    <span className="absolute -top-4 text-[10px] font-mono text-slate-400 whitespace-nowrap font-bold">
                      No (REVOKED)
                    </span>
                    {/* Arrow pointing left into the box */}
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-slate-400 absolute left-0" />
                  </div>
                </div>

                {/* The Diamond Node */}
                <div 
                  onClick={() => setViewMode('gatekeeper')}
                  className="canvas-interactive-node group w-36 h-36 border border-slate-700 hover:border-cyan-400 bg-[#0f172a] rotate-45 flex items-center justify-center transition-all cursor-pointer hover:shadow-cyan-500/10 hover:scale-105 shadow-2xl shrink-0"
                >
                  <div className="-rotate-45 text-center px-2">
                    <span className="text-[11px] font-mono font-bold text-white block">
                      Is status == 'ACTIVE'?
                    </span>
                    <span className="text-[9px] text-cyan-400 font-mono block opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect Gate 🔍
                    </span>
                  </div>
                </div>

              </div>

              {/* Arrow Down: Yes */}
              <div className="w-0.5 h-16 bg-slate-600 relative">
                <span className="absolute left-2.5 top-3 text-[10px] font-mono text-emerald-400 font-bold">
                  Yes
                </span>
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Node 5: Decision Diamond: Which Subdomain? */}
              <div className="relative flex flex-col items-center my-2">
                <div 
                  onClick={() => setViewMode('dns')}
                  className="canvas-interactive-node group w-36 h-36 border border-slate-700 hover:border-cyan-400 bg-[#0f172a] rotate-45 flex items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-2xl"
                >
                  <div className="-rotate-45 text-center px-2">
                    <span className="text-xs font-mono font-bold text-white block">
                      Which Subdomain?
                    </span>
                    <span className="text-[9px] text-cyan-400 font-mono block opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect DNS 🔍
                    </span>
                  </div>
                </div>

                {/* 3-Branch Split (directors.zynocs.com | work.zynocs.com | client.zynocs.com) */}
                <div className="w-[1050px] flex justify-between relative mt-8">
                  
                  {/* Orthogonal SVG Lines */}
                  <svg className="absolute -top-8 left-0 w-full h-8 pointer-events-none" style={{ overflow: 'visible' }}>
                    <path d="M 525 -10 L 525 15 L 140 15 L 140 40" fill="none" stroke="#64748b" strokeWidth="1.5" />
                    <path d="M 525 -10 L 525 40" fill="none" stroke="#64748b" strokeWidth="1.5" />
                    <path d="M 525 -10 L 525 15 L 920 15 L 920 40" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  </svg>

                  {/* BRANCH A: directors.zynocs.com */}
                  <div className="w-72 flex flex-col items-center">
                    <span 
                      onClick={() => setViewMode('directors')}
                      className="canvas-interactive-node text-xs font-mono text-cyan-400 font-bold mb-3 hover:underline cursor-pointer"
                    >
                      directors.zynocs.com
                    </span>

                    {/* Diamond: Is Role == DIRECTOR? */}
                    <div 
                      onClick={() => setViewMode('directors')}
                      className="canvas-interactive-node group w-32 h-32 border border-slate-700 hover:border-cyan-400 bg-[#0f172a] rotate-45 flex items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-xl my-4"
                    >
                      <div className="-rotate-45 text-center px-2">
                        <span className="text-[11px] font-mono font-bold text-white block">
                          Is Role == DIRECTOR?
                        </span>
                        <span className="text-[9px] text-cyan-400 font-mono block opacity-0 group-hover:opacity-100 transition-opacity">
                          Inspect 🔍
                        </span>
                      </div>
                    </div>

                    {/* Split Yes / No */}
                    <div className="w-full flex justify-between gap-2 mt-4 text-[10px] font-mono">
                      <div 
                        onClick={() => setViewMode('directors')}
                        className="canvas-interactive-node flex-1 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold text-center cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="block text-emerald-400 font-bold">Yes</span>
                        <span>✅ Opens Executive Boardroom</span>
                      </div>

                      <div 
                        onClick={() => setInspectedNode('forbidden')}
                        className="canvas-interactive-node flex-1 p-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-bold text-center cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="block text-red-400 font-bold">No</span>
                        <span>❌ 403 Forbidden</span>
                      </div>
                    </div>
                  </div>

                  {/* BRANCH B: work.zynocs.com */}
                  <div className="w-96 flex flex-col items-center">
                    <span 
                      onClick={() => setViewMode('work')}
                      className="canvas-interactive-node text-xs font-mono text-emerald-400 font-bold mb-3 hover:underline cursor-pointer"
                    >
                      work.zynocs.com
                    </span>

                    {/* Diamond: What is Department? */}
                    <div 
                      onClick={() => setViewMode('work')}
                      className="canvas-interactive-node group w-32 h-32 border border-slate-700 hover:border-emerald-400 bg-[#0f172a] rotate-45 flex items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-xl my-4"
                    >
                      <div className="-rotate-45 text-center px-2">
                        <span className="text-[11px] font-mono font-bold text-white block">
                          What is Department?
                        </span>
                        <span className="text-[9px] text-emerald-400 font-mono block opacity-0 group-hover:opacity-100 transition-opacity">
                          Inspect 🔍
                        </span>
                      </div>
                    </div>

                    {/* 4 Departments Row */}
                    <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                      <div 
                        onClick={() => setViewMode('work')}
                        className="canvas-interactive-node p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-emerald-500/50 text-[10px] font-mono text-slate-300 cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="text-slate-500 block">Engineering</span>
                        <span className="text-emerald-300 font-bold block mt-0.5">💻 Git PRs, CI/CD, Latency</span>
                      </div>

                      <div 
                        onClick={() => setViewMode('work')}
                        className="canvas-interactive-node p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-purple-500/50 text-[10px] font-mono text-slate-300 cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="text-slate-500 block">HR & Personnel</span>
                        <span className="text-purple-300 font-bold block mt-0.5">👥 Headcount & Revocation</span>
                      </div>

                      <div 
                        onClick={() => setViewMode('work')}
                        className="canvas-interactive-node p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-amber-500/50 text-[10px] font-mono text-slate-300 cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="text-slate-500 block">Finance</span>
                        <span className="text-amber-300 font-bold block mt-0.5">💵 Payroll & Vendor Invoices</span>
                      </div>

                      <div 
                        onClick={() => setViewMode('work')}
                        className="canvas-interactive-node p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-cyan-500/50 text-[10px] font-mono text-slate-300 cursor-pointer hover:scale-105 transition-all shadow-md"
                      >
                        <span className="text-slate-500 block">Project Mgmt</span>
                        <span className="text-cyan-300 font-bold block mt-0.5">📊 Sprints & Milestones</span>
                      </div>
                    </div>
                  </div>

                  {/* BRANCH C: client.zynocs.com */}
                  <div className="w-64 flex flex-col items-center">
                    <span 
                      onClick={() => setViewMode('client')}
                      className="canvas-interactive-node text-xs font-mono text-blue-400 font-bold mb-3 hover:underline cursor-pointer"
                    >
                      client.zynocs.com
                    </span>

                    <div className="w-0.5 h-16 bg-slate-600 relative my-4">
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
                    </div>

                    <div 
                      onClick={() => setViewMode('client')}
                      className="canvas-interactive-node p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 text-blue-300 font-mono text-xs font-bold shadow-xl text-center cursor-pointer hover:scale-105 transition-all w-full"
                    >
                      <Briefcase className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <span>💼 Client Deliverables & Contracts</span>
                      <span className="text-[9px] text-blue-400 block mt-1 font-normal">
                        Click to Inspect 🔍
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW B: POSTGRESQL 18 RELATIONAL SCHEMA & DATA ARCHITECTURE ON CANVAS */}
          {/* ========================================================================= */}
          {viewMode === 'postgres' && (
            <div className="w-full max-w-5xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  PostgreSQL 18 Cluster Architecture (Port 8800)
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Database Relational Schema & Identity Persistence
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Database: <span className="text-cyan-300">zynocs_enterprise</span> • Connection: <span className="text-emerald-400">pg://localhost:8800</span>
                </p>
              </div>

              {/* 5 Schema Tables Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                
                {/* Table 1: users */}
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-cyan-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-cyan-400" />
                      users (Master ID)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Master</span>
                  </div>
                  <div className="text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between"><span className="text-cyan-400 font-bold">id</span><span className="text-slate-500">UUID (PK)</span></div>
                    <div className="flex justify-between"><span>email</span><span className="text-slate-500">VARCHAR(255) UQ</span></div>
                    <div className="flex justify-between"><span>password_hash</span><span className="text-slate-500">VARCHAR(255)</span></div>
                    <div className="flex justify-between"><span>full_name</span><span className="text-slate-500">VARCHAR(150)</span></div>
                    <div className="flex justify-between"><span>is_2fa_enabled</span><span className="text-slate-500">BOOLEAN</span></div>
                  </div>
                </div>

                {/* Table 2: user_roles */}
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-emerald-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-emerald-400" />
                      user_roles (Clearance)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">FK Cascade</span>
                  </div>
                  <div className="text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between"><span className="text-emerald-400 font-bold">id</span><span className="text-slate-500">UUID (PK)</span></div>
                    <div className="flex justify-between"><span className="text-cyan-400">user_id</span><span className="text-slate-500">UUID (FK -&gt; users)</span></div>
                    <div className="flex justify-between"><span>role</span><span className="text-slate-500">VARCHAR(50)</span></div>
                    <div className="flex justify-between"><span>subdomain</span><span className="text-slate-500">VARCHAR(50)</span></div>
                    <div className="flex justify-between"><span className="text-amber-400">status</span><span className="text-slate-500">VARCHAR(20) [ACTIVE/REVOKED]</span></div>
                  </div>
                </div>

                {/* Table 3: role_permissions */}
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-purple-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-purple-400" />
                      role_permissions
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">RBAC</span>
                  </div>
                  <div className="text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between"><span className="text-purple-400 font-bold">id</span><span className="text-slate-500">UUID (PK)</span></div>
                    <div className="flex justify-between"><span>role_key</span><span className="text-slate-500">VARCHAR(50)</span></div>
                    <div className="flex justify-between"><span>permission</span><span className="text-slate-500">VARCHAR(100)</span></div>
                    <div className="flex justify-between"><span>created_at</span><span className="text-slate-500">TIMESTAMPTZ</span></div>
                  </div>
                </div>

                {/* Table 4: audit_logs */}
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-amber-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-amber-400" />
                      audit_logs
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">Zero-Trust</span>
                  </div>
                  <div className="text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between"><span className="text-amber-400 font-bold">id</span><span className="text-slate-500">UUID (PK)</span></div>
                    <div className="flex justify-between"><span>actor_email</span><span className="text-slate-500">VARCHAR(255)</span></div>
                    <div className="flex justify-between"><span>action</span><span className="text-slate-500">VARCHAR(100)</span></div>
                    <div className="flex justify-between"><span>ip_address</span><span className="text-slate-500">INET</span></div>
                    <div className="flex justify-between"><span>timestamp</span><span className="text-slate-500">TIMESTAMPTZ</span></div>
                  </div>
                </div>

                {/* Table 5: client_projects */}
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-blue-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-blue-400" />
                      client_projects
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">Multi-Tenant</span>
                  </div>
                  <div className="text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between"><span className="text-blue-400 font-bold">id</span><span className="text-slate-500">UUID (PK)</span></div>
                    <div className="flex justify-between"><span>client_name</span><span className="text-slate-500">VARCHAR(100)</span></div>
                    <div className="flex justify-between"><span>contract_value</span><span className="text-slate-500">NUMERIC(12,2)</span></div>
                    <div className="flex justify-between"><span>sla_tier</span><span className="text-slate-500">VARCHAR(50)</span></div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW C: DNS TOPOLOGY & SUBDOMAINS ARCHITECTURE ON CANVAS */}
          {/* ========================================================================= */}
          {viewMode === 'dns' && (
            <div className="w-full max-w-5xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  DNS Routing & Reverse Proxy Topology
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Multi-Subdomain Edge Routing & Tenant Firewall
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {[
                  { sub: 'directors.zynocs.com', label: 'Executive Boardroom & Governance', audience: 'Chairperson, CEO, Appointed Directors', port: 'Zero-HR Gate', status: 'Restricted (Tier 1)', color: 'border-cyan-500/40 text-cyan-300' },
                  { sub: 'work.zynocs.com', label: 'Internal Workplace Operations', audience: 'Engineering, HR, Finance, Project Managers', port: 'SSO Token Mesh', status: 'Internal (Tier 2)', color: 'border-emerald-500/40 text-emerald-300' },
                  { sub: 'client.zynocs.com', label: 'Client Engagement Portal', audience: 'Enterprise Client Executives & CTOs', port: 'Tenant Firewall', status: 'Client Isolated (Tier 3)', color: 'border-blue-500/40 text-blue-300' },
                  { sub: 'ads.zynocs.com', label: 'Ad Operations & Yield Telemetry', audience: 'AdOps Operators & Yield Engineers', port: 'Header Bidding Gate', status: 'Operations (Tier 4)', color: 'border-pink-500/40 text-pink-300' },
                  { sub: 'sponsors.zynocs.com', label: 'Strategic Sponsor Brand Hub', audience: 'Corporate Brand Partners & Sponsors', port: 'Partner Hub', status: 'Partner Verified (Tier 5)', color: 'border-amber-500/40 text-amber-300' },
                  { sub: 'zynocs.com', label: 'Central Identity & Public Portal', audience: 'Public, Prospective Clients & Applicants', port: 'Port 5173 / 443', status: 'Global Edge', color: 'border-slate-700 text-slate-300' }
                ].map((s, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl bg-[#0a101d] border ${s.color} space-y-2 font-mono text-xs shadow-xl`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{s.sub}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{s.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{s.label}</p>
                    <div className="pt-1 text-[10px] text-slate-500 flex justify-between">
                      <span>Audience: {s.audience.split(',')[0]}</span>
                      <span className="text-cyan-400 font-bold">{s.port}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW D: DIRECTORS BOARDROOM SUB-ARCHITECTURE ON CANVAS */}
          {viewMode === 'directors' && (
            <div className="w-full max-w-4xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  directors.zynocs.com Governance Node
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Board of Directors Governance & Fiduciary Router
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-cyan-500/40 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">1. FIDO2 / Passkeys</span>
                  <p className="text-slate-300 text-[11px]">Hardware biometric cryptographic token authentication without passwords.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-cyan-500/40 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">2. 24h Invite Keys</span>
                  <p className="text-slate-300 text-[11px]">Peer-to-peer appointment tokens (Zero HR involvement or tampering).</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-cyan-500/40 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">3. Voting Consensus</span>
                  <p className="text-slate-300 text-[11px]">Cryptographically signed board resolutions with audit-immutable hashes.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW E: WORKPLACE OPERATIONS SUB-ARCHITECTURE ON CANVAS */}
          {viewMode === 'work' && (
            <div className="w-full max-w-4xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  work.zynocs.com Department Mesh
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Departmental RBAC Isolation & Operational Telemetry
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-emerald-500/40 space-y-2 font-mono text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Engineering Pod
                  </span>
                  <p className="text-slate-300 text-[11px]">GitHub monorepo pipelines, Docker containers, API latency metrics (42ms).</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-purple-500/40 space-y-2 font-mono text-xs">
                  <span className="text-purple-400 font-bold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    HR & Revocation Console
                  </span>
                  <p className="text-slate-300 text-[11px]">1-click token invalidation terminating resigned staff sessions in 50ms.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW F: CLIENT ENGAGEMENT SUB-ARCHITECTURE ON CANVAS */}
          {viewMode === 'client' && (
            <div className="w-full max-w-4xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  client.zynocs.com Portal
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Enterprise Client Engagement & Dedicated Squad Pod
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-blue-500/40 space-y-2 text-xs font-mono">
                  <span className="text-blue-400 font-bold block">1. Tenant Scoping</span>
                  <p className="text-slate-300 text-[11px]">Clients only access their scoped projects and deliverables.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-blue-500/40 space-y-2 text-xs font-mono">
                  <span className="text-blue-400 font-bold block">2. Dedicated 6-Eng Pod</span>
                  <p className="text-slate-300 text-[11px]">Exclusive allocation of Senior Lead Architect, SecOps, DevOps, QA.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-blue-500/40 space-y-2 text-xs font-mono">
                  <span className="text-blue-400 font-bold block">3. SOC2 Compliance</span>
                  <p className="text-slate-300 text-[11px]">Real-time audit evidence generation, ISO 27001 key rotation reports.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW G: BCRYPT & CRYPTO SUB-ARCHITECTURE */}
          {viewMode === 'bcrypt' && (
            <div className="w-full max-w-4xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Cryptographic Verification Engine
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Bcrypt 10-Round Salt & Rate-Limiting Barrier
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-slate-700 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">1. Token Bucket Rate Limiter</span>
                  <p className="text-slate-300 text-[11px]">Max 5 attempts per IP per minute to eliminate brute-force attack vectors.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-cyan-500/40 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">2. Bcrypt Salting Worker</span>
                  <p className="text-slate-300 text-[11px]">10 salt rounds with adaptive cost factor. Computation takes ~120ms.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-slate-700 space-y-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">3. JWT Token Issuer</span>
                  <p className="text-slate-300 text-[11px]">Signs HMAC-SHA256 session token stored in HttpOnly, Secure, SameSite=Strict cookies.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW H: ZERO-TRUST GATEKEEPER SUB-ARCHITECTURE */}
          {viewMode === 'gatekeeper' && (
            <div className="w-full max-w-4xl flex flex-col items-center space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Zero-Trust Gatekeeper Layer
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Real-Time Status Evaluation & Instant Token Invalidation
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-amber-500/40 space-y-2 text-xs font-mono">
                  <span className="text-amber-400 font-bold block">1. Active Status Gate</span>
                  <p className="text-slate-300 text-[11px]">Checks user_roles.status on every API invocation. Never relies solely on static client tokens.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-red-500/40 space-y-2 text-xs font-mono">
                  <span className="text-red-400 font-bold block">2. 403 Forbidden Blocker</span>
                  <p className="text-slate-300 text-[11px]">If status === 'REVOKED', request is immediately halted with HTTP 403 and logged to audit table.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a101d] border border-emerald-500/40 space-y-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold block">3. Authorized Forwarding</span>
                  <p className="text-slate-300 text-[11px]">If status === 'ACTIVE', passes control to Subdomain Router for role-tailored dashboard rendering.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
