
import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Clock, CheckCircle2, Circle, AlertCircle, FileCode, Users, Plus, FileText, Code2, Folder, Download, Mail, Shield, Receipt, DollarSign, Calendar } from 'lucide-react';
import { Section, ProjectTask, TeamMember, FileItem, Invoice } from '../types';

interface ProjectDetailsProps {
  onNavigate: (section: Section) => void;
}

type ColumnId = 'backlog' | 'inProgress' | 'review' | 'done';

interface ColumnsState {
  backlog: ProjectTask[];
  inProgress: ProjectTask[];
  review: ProjectTask[];
  done: ProjectTask[];
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'kanban' | 'files' | 'team' | 'invoices'>('kanban');

  // Kanban State
  const [columns, setColumns] = useState<ColumnsState>({
    backlog: [
      { id: 1, title: 'Implement Dark Mode', priority: 'Low', tag: 'UI' },
      { id: 2, title: 'Audit Logs Export', priority: 'Medium', tag: 'Backend' },
    ],
    inProgress: [
      { id: 3, title: 'Stripe Payment Gateway', priority: 'High', tag: 'Integration' },
      { id: 4, title: 'User Profile Settings', priority: 'Medium', tag: 'Frontend' },
    ],
    review: [
      { id: 5, title: 'GraphQL Schema Optimization', priority: 'High', tag: 'Database' },
    ],
    done: [
      { id: 6, title: 'Initial AWS Setup', priority: 'Critical', tag: 'DevOps' },
      { id: 7, title: 'Authentication Flow', priority: 'High', tag: 'Security' },
    ]
  });

  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

  const team: TeamMember[] = [
    { name: 'Alex M.', role: 'Lead Architect', online: true, email: 'alex@zynocs.com' },
    { name: 'Sarah J.', role: 'Frontend Dev', online: true, email: 'sarah@zynocs.com' },
    { name: 'Mike T.', role: 'DevOps', online: false, email: 'mike@zynocs.com' },
    { name: 'Emily R.', role: 'UI/UX Designer', online: true, email: 'emily@zynocs.com' },
  ];

  const files: FileItem[] = [
    { name: 'system_architecture.pdf', size: '2.4 MB', type: 'PDF', updated: '2 days ago' },
    { name: 'api_documentation.md', size: '142 KB', type: 'Markdown', updated: '4 hours ago' },
    { name: 'main.tsx', size: '12 KB', type: 'React', updated: 'Just now' },
    { name: 'global.css', size: '8 KB', type: 'CSS', updated: '1 day ago' },
    { name: 'schema.graphql', size: '24 KB', type: 'GraphQL', updated: '3 days ago' },
  ];

  const invoices: Invoice[] = [
    { id: 'INV-2024-001', date: 'Oct 01, 2024', amount: '$12,500.00', status: 'Paid', description: 'Phase 1: Discovery & Architecture' },
    { id: 'INV-2024-002', date: 'Oct 15, 2024', amount: '$15,000.00', status: 'Paid', description: 'Phase 2: Core Development Sprint 1' },
    { id: 'INV-2024-003', date: 'Nov 01, 2024', amount: '$15,000.00', status: 'Pending', description: 'Phase 2: Core Development Sprint 2' },
  ];

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, taskId: number, sourceCol: ColumnId) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.setData('sourceCol', sourceCol);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault(); // Necessary to allow dropping
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Optional: Logic to clear dragOverColumn if leaving the container
    // strictly, we handle visual reset on drop or drag end
  };

  const handleDrop = (e: React.DragEvent, destCol: ColumnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceCol = e.dataTransfer.getData('sourceCol') as ColumnId;

    if (sourceCol === destCol) return;

    const sourceList = [...columns[sourceCol]];
    const destList = [...columns[destCol]];
    
    const taskIndex = sourceList.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const [movedTask] = sourceList.splice(taskIndex, 1);
    destList.push(movedTask);

    setColumns({
      ...columns,
      [sourceCol]: sourceList,
      [destCol]: destList
    });
  };

  const TaskCard = ({ task, colId }: { task: ProjectTask, colId: ColumnId }) => (
    <div 
      draggable
      onDragStart={(e) => handleDragStart(e, task.id, colId)}
      className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-4 rounded-lg mb-3 cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 hover:shadow-lg group"
    >
      <div className="flex justify-between items-start mb-2 pointer-events-none">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
          task.priority === 'High' || task.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
          task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
          'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          {task.priority}
        </span>
        <MoreHorizontal className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h4 className="text-sm font-medium text-white mb-3 pointer-events-none">{task.title}</h4>
      <div className="flex justify-between items-center text-xs text-slate-500 pointer-events-none">
        <span className="flex items-center"><FileCode className="h-3 w-3 mr-1" /> {task.tag}</span>
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"></div>
      </div>
    </div>
  );

  const KanbanColumn = ({ id, title, icon: Icon, colorClass, count }: { id: ColumnId, title: string, icon: any, colorClass: string, count: number }) => (
    <div 
      onDragOver={(e) => handleDragOver(e, id)}
      onDrop={(e) => handleDrop(e, id)}
      className={`min-w-[280px] w-full max-w-xs flex flex-col bg-slate-900/30 rounded-xl border transition-colors duration-200 ${
        dragOverColumn === id ? 'border-brand-500 bg-slate-800/50' : 'border-slate-800/50'
      }`}
    >
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <Icon className={`h-4 w-4 ${colorClass}`} />
          <span className="font-bold text-slate-300 text-sm">{title}</span>
        </div>
        <span className="bg-slate-800 text-slate-400 px-2 rounded-full text-xs">{count}</span>
      </div>
      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar min-h-[100px]">
        {columns[id].map(t => <TaskCard key={t.id} task={t} colId={id} />)}
        {columns[id].length === 0 && (
          <div className="h-20 border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-slate-600 text-xs">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in-up">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate(Section.Dashboard)}
            className="flex items-center text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">FinTech Core Reconstruction</h1>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                  Active Sprint
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl">
                Phase 3: Integration of third-party payment providers and legacy data migration.
              </p>
            </div>
            
            <div className="flex space-x-4">
               <div className="text-right hidden md:block">
                  <div className="text-xs text-slate-500 uppercase font-bold">Timeline</div>
                  <div className="text-white font-mono text-sm">Oct 15 - Nov 01</div>
               </div>
               <div className="text-right hidden md:block">
                  <div className="text-xs text-slate-500 uppercase font-bold">Budget</div>
                  <div className="text-white font-mono text-sm">On Track</div>
               </div>
               <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> New Task
               </button>
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          
          {/* Sidebar / Tabs */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 rounded-xl border border-slate-800 space-y-1">
              {[
                { id: 'kanban', icon: Code2, label: 'Kanban Board' },
                { id: 'files', icon: Folder, label: 'Project Files' },
                { id: 'team', icon: Users, label: 'Team Members' },
                { id: 'invoices', icon: Receipt, label: 'Billing & Invoices' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                    ? 'bg-brand-600/20 text-white border border-brand-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <tab.icon className={`h-4 w-4 mr-3 ${activeTab === tab.id ? 'text-brand-400' : ''}`} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Project Quick Stats (Enhanced Velocity Chart) */}
            <div className="mt-6 glass-card p-5 rounded-xl border border-slate-800 relative group/stats overflow-hidden">
               {/* Background Glow */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl group-hover/stats:bg-brand-500/20 transition-colors"></div>
               
               <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sprint Velocity</h4>
                  <div className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">342 SP</div>
               </div>

               <div className="flex items-end justify-between space-x-2 h-32 mb-2 relative z-10">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                     <div className="border-t border-dashed border-slate-500 w-full h-px"></div>
                     <div className="border-t border-dashed border-slate-500 w-full h-px"></div>
                     <div className="border-t border-dashed border-slate-500 w-full h-px"></div>
                     <div className="border-t border-dashed border-slate-500 w-full h-px"></div>
                  </div>

                  {[45, 62, 55, 84, 68, 92, 78].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end group/bar h-full relative cursor-default">
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none z-20 shadow-lg font-mono">
                             {h} pts
                          </div>
                          
                          {/* Bar */}
                          <div 
                            style={{ height: `${h}%` }} 
                            className={`w-full rounded-t-sm relative transition-all duration-500 ease-out group-hover/bar:brightness-110 group-hover/bar:scale-y-105 origin-bottom ${
                                i === 6 
                                ? 'bg-gradient-to-t from-brand-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                                : 'bg-gradient-to-t from-slate-800 to-slate-600 hover:from-brand-900 hover:to-brand-600'
                            }`}
                          >
                            {/* Inner Shine */}
                             <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30"></div>
                          </div>
                      </div>
                  ))}
               </div>
               
               {/* X-Axis Labels */}
               <div className="flex justify-between text-[10px] text-slate-500 font-medium uppercase mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* KANBAN TAB */}
            {activeTab === 'kanban' && (
              <div className="flex overflow-x-auto pb-4 gap-4 h-[600px]">
                <KanbanColumn 
                  id="backlog" 
                  title="Backlog" 
                  icon={Circle} 
                  colorClass="text-slate-500" 
                  count={columns.backlog.length} 
                />
                <KanbanColumn 
                  id="inProgress" 
                  title="In Progress" 
                  icon={Clock} 
                  colorClass="text-brand-400" 
                  count={columns.inProgress.length} 
                />
                <KanbanColumn 
                  id="review" 
                  title="Review" 
                  icon={AlertCircle} 
                  colorClass="text-yellow-400" 
                  count={columns.review.length} 
                />
                <KanbanColumn 
                  id="done" 
                  title="Done" 
                  icon={CheckCircle2} 
                  colorClass="text-green-400" 
                  count={columns.done.length} 
                />
              </div>
            )}

            {/* FILES TAB */}
            {activeTab === 'files' && (
              <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                  <h3 className="font-bold text-white">Repository Assets</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-900/50 text-xs uppercase font-medium text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Last Modified</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {files.map((file, i) => (
                      <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 flex items-center text-white font-medium">
                          <FileText className="h-4 w-4 mr-3 text-brand-400" />
                          {file.name}
                        </td>
                        <td className="px-6 py-4">{file.size}</td>
                        <td className="px-6 py-4">{file.type}</td>
                        <td className="px-6 py-4">{file.updated}</td>
                        <td className="px-6 py-4">
                          <button className="text-brand-400 hover:text-white transition-colors"><Download className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TEAM TAB */}
            {activeTab === 'team' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {team.map((member, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl border border-slate-800 flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-lg font-bold text-white relative">
                            {member.name.charAt(0)}
                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 ${member.online ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold">{member.name}</h4>
                            <p className="text-sm text-brand-400">{member.role}</p>
                            <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                        <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-brand-600 transition-all">
                            <Mail className="h-4 w-4" />
                        </button>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:border-brand-500/50 hover:text-brand-400 transition-colors cursor-pointer group">
                      <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center mb-2 group-hover:bg-brand-500/10 transition-colors">
                        <Plus className="h-6 w-6" />
                      </div>
                      <span className="font-medium text-sm">Add Team Member</span>
                  </div>
               </div>
            )}

            {/* INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Billing & Invoices</h3>
                    <p className="text-sm text-slate-400">Manage your project payments and financial documents</p>
                  </div>
                  <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-500 uppercase font-bold block">Total Outstanding</span>
                    <span className="text-xl font-bold text-white">$15,000.00</span>
                  </div>
                </div>
                
                <div className="divide-y divide-slate-800">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-900/30 transition-colors group">
                       <div className="flex items-start space-x-4 mb-4 md:mb-0">
                          <div className={`p-3 rounded-lg ${inv.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                             <Receipt className="h-6 w-6" />
                          </div>
                          <div>
                             <div className="flex items-center mb-1">
                                <h4 className="text-white font-bold mr-3">{inv.description}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                   inv.status === 'Paid' 
                                   ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                   : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                }`}>
                                   {inv.status}
                                </span>
                             </div>
                             <div className="flex items-center text-xs text-slate-500 space-x-4">
                                <span className="flex items-center"><Receipt className="h-3 w-3 mr-1" /> {inv.id}</span>
                                <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {inv.date}</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between md:justify-end md:space-x-8 w-full md:w-auto">
                          <div className="text-right">
                             <div className="text-lg font-bold text-white">{inv.amount}</div>
                             <div className="text-xs text-slate-500">USD</div>
                          </div>
                          <div className="flex space-x-2">
                             <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="Download PDF">
                                <Download className="h-4 w-4" />
                             </button>
                             {inv.status === 'Pending' && (
                                <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-brand-500/20 transition-all flex items-center">
                                   Pay Now
                                </button>
                             )}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
