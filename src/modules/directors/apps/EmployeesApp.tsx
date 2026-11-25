import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building2, 
  Tag, 
  UserCheck, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Edit3, 
  Trash2, 
  X, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ShieldCheck,
  User,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  department: 'Executive' | 'Engineering' | 'Product & Design' | 'Operations' | 'Marketing' | 'Finance';
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  type: 'Co-Founder' | 'Full-Time' | 'Contractor' | 'Part-Time' | 'Intern';
  salary: number; // Monthly compensation
  joinDate: string;
  location: string;
  avatarInitials: string;
  skills: string[];
  notes?: string;
}

const LOCAL_STORAGE_KEY = 'zynocs_employees_v1';

const DEFAULT_EMPLOYEES: EmployeeProfile[] = [
  {
    id: 'emp-1',
    name: 'Mohammed Khaja Moinuddin',
    role: 'Founder & Chairperson',
    department: 'Executive',
    email: 'mohammed@zynocs.com',
    phone: '+91 90000 00000',
    status: 'Active',
    type: 'Co-Founder',
    salary: 0,
    joinDate: 'Jan 2026',
    location: 'Hyderabad, India / Remote',
    avatarInitials: 'KM',
    skills: ['Enterprise Strategy', 'System Architecture', 'Governance', 'Board Leadership'],
    notes: 'Executive Chairperson & Co-Founder.'
  },
  {
    id: 'emp-2',
    name: 'Yousuf Mohammed Jaleel',
    role: 'Founder & Chief Executive Officer',
    department: 'Executive',
    email: 'yousuf@zynocs.com',
    phone: '+91 98765 43210',
    status: 'Active',
    type: 'Co-Founder',
    salary: 0,
    joinDate: 'Jan 2026',
    location: 'Hyderabad, India / Remote',
    avatarInitials: 'YJ',
    skills: ['Executive Operations', 'Client Acquisition', 'P&L Management', 'Growth Engineering'],
    notes: 'Chief Executive Officer & Co-Founder.'
  }
];

export const EmployeesApp: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load employees:', e);
    }
    return DEFAULT_EMPLOYEES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeProfile | null>(null);
  const [inspectingEmployee, setInspectingEmployee] = useState<EmployeeProfile | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState<EmployeeProfile['department']>('Engineering');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<EmployeeProfile['status']>('Active');
  const [type, setType] = useState<EmployeeProfile['type']>('Full-Time');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('Remote');
  const [skillsStr, setSkillsStr] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to save employees:', e);
    }
  }, [employees]);

  const departments: ('All' | EmployeeProfile['department'])[] = [
    'All',
    'Executive',
    'Engineering',
    'Product & Design',
    'Operations',
    'Marketing',
    'Finance'
  ];

  const resetForm = () => {
    setName('');
    setRole('');
    setDepartment('Engineering');
    setEmail('');
    setPhone('');
    setStatus('Active');
    setType('Full-Time');
    setSalary('');
    setLocation('Remote');
    setSkillsStr('');
    setNotes('');
    setEditingEmployee(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (emp: EmployeeProfile) => {
    setEditingEmployee(emp);
    setName(emp.name);
    setRole(emp.role);
    setDepartment(emp.department);
    setEmail(emp.email);
    setPhone(emp.phone);
    setStatus(emp.status);
    setType(emp.type);
    setSalary(emp.salary ? String(emp.salary) : '');
    setLocation(emp.location);
    setSkillsStr(emp.skills.join(', '));
    setNotes(emp.notes || '');
    setIsAddModalOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'EM';

    const parsedSkills = skillsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingEmployee) {
      // Update existing
      setEmployees(prev => prev.map(emp => {
        if (emp.id === editingEmployee.id) {
          return {
            ...emp,
            name: name.trim(),
            role: role.trim(),
            department,
            email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@zynocs.com`,
            phone: phone.trim() || 'Unlisted',
            status,
            type,
            salary: parseFloat(salary) || 0,
            location: location.trim() || 'Remote',
            avatarInitials: initials,
            skills: parsedSkills.length > 0 ? parsedSkills : emp.skills,
            notes: notes.trim()
          };
        }
        return emp;
      }));
    } else {
      // Add new
      const newEmp: EmployeeProfile = {
        id: `emp-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        department,
        email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@zynocs.com`,
        phone: phone.trim() || 'Unlisted',
        status,
        type,
        salary: parseFloat(salary) || 0,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        location: location.trim() || 'Remote',
        avatarInitials: initials,
        skills: parsedSkills.length > 0 ? parsedSkills : ['Core Delivery'],
        notes: notes.trim()
      };
      setEmployees(prev => [newEmp, ...prev]);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleDeleteEmployee = (id: string, empName: string) => {
    if (window.confirm(`Are you sure you want to remove ${empName} from the employees directory?`)) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      if (inspectingEmployee?.id === id) {
        setInspectingEmployee(null);
      }
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const activeCount = employees.filter(e => e.status === 'Active').length;
  const deptCount = new Set(employees.map(e => e.department)).size;
  const totalPayroll = employees.reduce((acc, curr) => acc + (curr.salary || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Employees & Workforce Management
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage company personnel, staff clearance, department assignments, compensation tiers, and workforce status.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Workforce Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Total Headcount</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">{employees.length} Personnel</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">100% Verified Roster</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Active Staff</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">{activeCount} Active</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">{employees.length - activeCount} Inactive/Leave</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Active Departments</span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">{deptCount} Divisions</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Cross-Functional Team</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Monthly Payroll Run</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
            ${totalPayroll.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Calculated Monthly</span>
        </SpotlightCard>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, email, or skills..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Cards Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">No Employees Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No employees match your search query or filter. Click &quot;Add Employee&quot; to register team members.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee Profile</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                {/* Card Header: Avatar & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-mono font-bold text-base flex items-center justify-center shadow-md">
                      {emp.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {emp.name}
                      </h4>
                      <p className="text-xs text-cyan-400 font-medium">
                        {emp.role}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border flex items-center gap-1 ${
                    emp.status === 'Active'
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    {emp.status}
                  </span>
                </div>

                {/* Badges: Department & Employment Type */}
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                    {emp.department}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono">
                    {emp.type}
                  </span>
                  {emp.salary > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono">
                      ${emp.salary.toLocaleString()}/mo
                    </span>
                  )}
                </div>

                {/* Details list */}
                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <a href={`mailto:${emp.email}`} className="hover:text-cyan-400 truncate">
                      {emp.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{emp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Joined: {emp.joinDate}</span>
                  </div>
                </div>

                {/* Skills tags */}
                {emp.skills.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-2">
                    {emp.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80">
                        {skill}
                      </span>
                    ))}
                    {emp.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-500">
                        +{emp.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                <button
                  onClick={() => setInspectingEmployee(emp)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  View File
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(emp)}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-all cursor-pointer"
                    title="Edit Employee"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {emp.type !== 'Co-Founder' && (
                    <button
                      onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/30 transition-all cursor-pointer"
                      title="Remove Employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-[#090f1a] border border-[#1f2d40] p-6 sm:p-7 space-y-4 shadow-2xl shadow-cyan-950/40 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                {editingEmployee ? 'Edit Employee Profile' : 'Register New Employee'}
              </h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Full-Stack Architect"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Intern">Intern</option>
                    <option value="Co-Founder">Co-Founder</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@zynocs.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 / +1 ..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Salary ($ USD)</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote / City"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  placeholder="e.g. React, TypeScript, Docker, Go"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Responsibilities, project assignments, or clearance notes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingEmployee ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Employee Details Modal */}
      {inspectingEmployee && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="max-w-lg w-full p-6 sm:p-7 rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  {inspectingEmployee.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{inspectingEmployee.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      {inspectingEmployee.status}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">{inspectingEmployee.role}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectingEmployee(null)}
                className="text-slate-500 hover:text-white p-1 text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-500 block">Department:</span>
                <span className="text-white font-semibold">{inspectingEmployee.department}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Employment Type:</span>
                <span className="text-cyan-400 font-semibold">{inspectingEmployee.type}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Corporate Email:</span>
                <a href={`mailto:${inspectingEmployee.email}`} className="text-white hover:text-cyan-300 underline">
                  {inspectingEmployee.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Phone:</span>
                <span className="text-slate-300">{inspectingEmployee.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location:</span>
                <span className="text-slate-300">{inspectingEmployee.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Monthly Compensation:</span>
                <span className="text-emerald-400 font-bold">
                  {inspectingEmployee.salary > 0 ? `$${inspectingEmployee.salary.toLocaleString()}/mo` : 'Executive Equity'}
                </span>
              </div>
            </div>

            {inspectingEmployee.skills.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 block">Skills & Expertise:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {inspectingEmployee.skills.map((s, idx) => (
                    <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {inspectingEmployee.notes && (
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 block">Internal Clearance & Notes:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{inspectingEmployee.notes}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => {
                  const emp = inspectingEmployee;
                  setInspectingEmployee(null);
                  handleOpenEditModal(emp);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setInspectingEmployee(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
