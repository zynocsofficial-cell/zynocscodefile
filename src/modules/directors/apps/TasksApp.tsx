import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  ArrowRight, 
  Tag, 
  FolderKanban,
  Flame,
  ListTodo
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  column: 'Backlog' | 'In Progress' | 'Review & QA' | 'Completed';
  priority: 'P0 Blocker' | 'P1 High' | 'P2 Normal';
  points: number;
  dueDate: string;
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'PostgreSQL 18 Connection Pool Tuning & PgBouncer Benchmarking',
    description: 'Optimize max client connections and reduce memory overhead under 100k req/sec load.',
    assignee: 'Aarav Sharma',
    column: 'In Progress',
    priority: 'P1 High',
    points: 8,
    dueDate: 'Nov 24, 2026'
  },
  {
    id: 'task-2',
    title: 'Deploy Frankfurt (eu-central-1) Redundant Kubernetes Cluster',
    description: 'Execute CapEx procurement per Resolution #2026-04 and establish low-latency peering.',
    assignee: 'Vikram Joshi',
    column: 'In Progress',
    priority: 'P0 Blocker',
    points: 13,
    dueDate: 'Nov 28, 2026'
  },
  {
    id: 'task-3',
    title: 'Finalize Deloitte Q3 Audit Preparation Financial Package',
    description: 'Complete accounts receivable reconciliation and balance sheet verification.',
    assignee: 'Ananya Roy',
    column: 'Review & QA',
    priority: 'P1 High',
    points: 5,
    dueDate: 'Nov 25, 2026'
  },
  {
    id: 'task-4',
    title: 'Bilateral NDA Execution with Nexus Media Networks',
    description: 'Review redlines on intellectual property protection clause with legal counsel.',
    assignee: 'Sara Khan',
    column: 'Completed',
    priority: 'P2 Normal',
    points: 3,
    dueDate: 'Completed Nov 21'
  },
  {
    id: 'task-5',
    title: 'Implement FIDO2 WebAuthn Passkey Registration Flow in Director Panel',
    description: 'Hardware security token authentication via browser biometric APIs.',
    assignee: 'Mohammed Khaja',
    column: 'Backlog',
    priority: 'P1 High',
    points: 8,
    dueDate: 'Dec 02, 2026'
  }
];

export const TasksApp: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(DEFAULT_TASKS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssignee, setNewAssignee] = useState('Aarav Sharma');
  const [newPriority, setNewPriority] = useState<TaskItem['priority']>('P1 High');
  const [newPoints, setNewPoints] = useState(5);

  const columns: TaskItem['column'][] = ['Backlog', 'In Progress', 'Review & QA', 'Completed'];

  const handleMoveTask = (taskId: string, targetCol: TaskItem['column']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: targetCol } : t));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Internal engineering task sprint deliverable.',
      assignee: newAssignee,
      column: 'Backlog',
      priority: newPriority,
      points: Number(newPoints) || 3,
      dueDate: 'Dec 10, 2026'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setIsAddModalOpen(false);
  };

  const getPriorityStyle = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'P0 Blocker':
        return 'bg-red-950/60 text-red-400 border-red-500/40 font-bold';
      case 'P1 High':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <FolderKanban className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Tasks & Sprint Delivery Kanban
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time agile sprint tracking, engineering blockers, story point velocity, and executive milestones.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.column === col);
          const totalPoints = colTasks.reduce((acc, curr) => acc + curr.points, 0);

          return (
            <div key={col} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    col === 'Completed' ? 'bg-emerald-400' : col === 'In Progress' ? 'bg-cyan-400' : 'bg-slate-500'
                  }`} />
                  {col}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {colTasks.length} ({totalPoints} Pts)
                </span>
              </div>

              <div className="space-y-3 min-h-[300px]">
                {colTasks.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-600 font-mono">
                    No tasks in this lane
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getPriorityStyle(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded">
                          {task.points} Pts
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                        {task.description}
                      </p>

                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>{task.assignee}</span>
                        <span>{task.dueDate}</span>
                      </div>

                      {/* Move Quick Actions */}
                      <div className="pt-2 flex items-center justify-end gap-1">
                        {columns.map((nextCol) => nextCol !== task.column && (
                          <button
                            key={nextCol}
                            onClick={() => handleMoveTask(task.id, nextCol)}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white transition-all font-mono"
                          >
                            &rarr; {nextCol.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Create New Sprint Task
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement Redis Cache Cluster"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Technical acceptance criteria..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="P0 Blocker">P0 Blocker</option>
                    <option value="P1 High">P1 High</option>
                    <option value="P2 Normal">P2 Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Story Points</label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Aarav Sharma">Aarav Sharma (API Lead)</option>
                  <option value="Vikram Joshi">Vikram Joshi (SecOps)</option>
                  <option value="Sara Khan">Sara Khan (Growth/HR)</option>
                  <option value="Ananya Roy">Ananya Roy (Finance)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
