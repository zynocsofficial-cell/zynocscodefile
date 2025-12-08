
export enum Section {
  Home = 'home',
  Services = 'services',
  About = 'about',
  Contact = 'contact',
  Login = 'login',
  Dashboard = 'dashboard',
  AdminDashboard = 'admin_dashboard',
  ProjectDetails = 'project_details',
  Careers = 'careers',
  Insights = 'insights'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ProjectTask {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  tag: string;
}

export interface TeamMember {
  name: string;
  role: string;
  online: boolean;
  avatar?: string;
  email?: string;
}

export interface FileItem {
  name: string;
  size: string;
  type: string;
  updated: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
}