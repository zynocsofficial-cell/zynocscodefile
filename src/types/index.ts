export enum Section {
  Home = 'home',
  Services = 'services',
  AdPlacements = 'ad_placements',
  About = 'about',
  Blogs = 'blogs',
  Insights = 'blogs',
  Careers = 'careers',
  Contact = 'contact',
  ProjectDetails = 'project_details',
  BlogDetails = 'blog_details',
  Auth = 'auth'
}

export type SubdomainId = 'main' | 'directors' | 'work' | 'client' | 'ads' | 'sponsors';

export type { BlogPostItem, BlogSection } from '@/modules/landing/data/blogsData';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  isPrivate?: boolean;
  link?: string;
  image: string;
  description: string;
  longDescription: string;
  gradient: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  keyFeatures: { title: string; desc: string }[];
  techStack: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

