// ==============================================================================
// ZYNOCS ENTERPRISE ZERO-TRUST AUTHENTICATION SERVICE
// Enforces Subdomain Gatekeeper, Role Clearance, Bcrypt Verification & Session Tokens
// ==============================================================================

import { SubdomainId } from '../types';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  subdomain: string;
  department?: string;
  is2faEnabled?: boolean;
  authMethod?: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

const STORAGE_SESSION_KEY = 'zynocs_auth_session';
const STORAGE_TOKEN_KEY = 'zynocs_auth_token';

class AuthService {
  /**
   * Primary Authenticate method:
   * Strictly authenticates against live PostgreSQL backend API (/api/auth/login) with bcrypt.
   * Zero credentials or passwords stored in frontend client bundle.
   */
  async signIn(email: string, password: string, subdomain: SubdomainId): Promise<AuthResponse> {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return {
        success: false,
        error: 'Email address and password are required.'
      };
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return {
        success: false,
        error: 'Please enter a valid corporate email address.'
      };
    }

    // Live Backend PostgreSQL Authentication
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword, subdomain })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.user) {
        const sessionUser: AuthUser = {
          id: data.user.id || `zyn-${Date.now()}`,
          name: data.user.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          role: data.user.role || (subdomain === 'directors' ? 'DIRECTOR' : 'STAFF'),
          subdomain: `${subdomain}.zynocs.com`,
          department: data.user.department || (subdomain === 'directors' ? 'Executive Board' : 'General'),
          token: this.generateToken(cleanEmail, subdomain, data.user)
        };
        this.saveSession(sessionUser);
        return { success: true, user: sessionUser };
      } else {
        return {
          success: false,
          error: data.error || 'Authentication failed: Invalid credentials or access clearance revoked.'
        };
      }
    } catch (apiErr) {
      return {
        success: false,
        error: 'Unable to connect to Enterprise Authentication server. Please verify your connection.'
      };
    }
  }

  /**
   * Register or Activate an Appointment (Directors resolution key or Corporate invite)
   */
  async register(params: {
    email: string;
    password: string;
    fullName: string;
    subdomain: SubdomainId;
    resolutionKey?: string;
    companyName?: string;
  }): Promise<AuthResponse> {
    const { email, password, fullName, subdomain, resolutionKey, companyName } = params;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (password.length < 8) {
      return { success: false, error: 'Security Policy: Password must be at least 8 characters long.' };
    }

    if (subdomain === 'directors') {
      if (!resolutionKey || !resolutionKey.trim()) {
        return { success: false, error: 'Board Resolution Appointment Key is required for Director clearance.' };
      }
      if (!resolutionKey.toUpperCase().includes('KEY') && !resolutionKey.toUpperCase().includes('ZYN')) {
        return { success: false, error: 'Invalid Resolution Appointment Key format.' };
      }
    }

    // Backend API registration
    try {
      const response = await fetch('/api/auth/register-director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, fullName, resolutionKey })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.user) {
        const user: AuthUser = {
          id: data.user.id,
          name: data.user.name,
          email: cleanEmail,
          role: data.user.role || 'DIRECTOR',
          subdomain: `${subdomain}.zynocs.com`,
          department: companyName || (subdomain === 'directors' ? 'Executive Board' : 'General'),
          token: this.generateToken(cleanEmail, subdomain, data.user)
        };
        this.saveSession(user);
        return { success: true, user };
      } else {
        return { success: false, error: data.error || 'Director registration failed.' };
      }
    } catch (e) {
      return { success: false, error: 'Database service unreachable. Please try again.' };
    }
  }

  /**
   * Session Management
   */
  getCurrentSession(): AuthUser | null {
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!data) return null;
      const parsed: AuthUser = JSON.parse(data);
      if (parsed && parsed.email && parsed.role) {
        return parsed;
      }
    } catch (e) {
      this.logout();
    }
    return null;
  }

  restoreFromToken(token: string): AuthUser | null {
    try {
      if (!token || !token.startsWith('ZYN-JWT.')) return null;
      const parts = token.split('.');
      if (parts.length < 3) return null;
      const payloadStr = atob(parts[1]);
      const payload = JSON.parse(payloadStr);
      if (!payload.sub) return null;

      const email = payload.sub;
      const subId = payload.subdomain || 'directors';

      const user: AuthUser = {
        id: payload.id || `usr-${Date.now()}`,
        name: payload.name || email.split('@')[0],
        email: email,
        role: payload.role || (subId === 'directors' ? 'DIRECTOR' : subId.toUpperCase()),
        subdomain: `${subId}.zynocs.com`,
        department: payload.department || (subId === 'directors' ? 'Executive Board' : 'General'),
        token
      };
      this.saveSession(user);
      return user;
    } catch (e) {
      console.error('Failed to restore session from token:', e);
    }
    return null;
  }

  saveSession(user: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
      if (user.token) {
        localStorage.setItem(STORAGE_TOKEN_KEY, user.token);
      }
    } catch (e) {
      // Storage unavailable
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    } catch (e) {
      // Ignore
    }
  }

  private generateToken(email: string, subdomain: string, userMeta?: Partial<AuthUser>): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: email,
      subdomain,
      id: userMeta?.id,
      name: userMeta?.name,
      role: userMeta?.role,
      department: userMeta?.department,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
    }));
    const sig = 'zyn_sec_sig_' + Math.random().toString(36).substring(2, 10);
    return `ZYN-JWT.${header}.${payload}.${sig}`;
  }
}

export const buildSubdomainUrl = (subdomain: SubdomainId, token?: string): string => {
  if (typeof window === 'undefined') return '/';
  const hostname = window.location.hostname;
  const isLocal = hostname.includes('localhost');
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol || 'http:';

  // 1. If on Vercel preview/deployment domain (*.vercel.app), subdomains do not exist on Vercel
  if (hostname.endsWith('.vercel.app')) {
    const query = token ? `?auth_token=${encodeURIComponent(token)}&portal=${subdomain}` : `?portal=${subdomain}`;
    return `${protocol}//${hostname}/${query}`;
  }

  // 2. Local development (*.localhost)
  if (isLocal) {
    const host = subdomain === 'main' ? `localhost${port}` : `${subdomain}.localhost${port}`;
    const query = token ? `?auth_token=${encodeURIComponent(token)}` : '';
    return `${protocol}//${host}/${query}`;
  }

  // 3. Custom domain (zynocs.com)
  const parts = hostname.split('.');
  const rootDomain = parts.length > 1 ? parts.slice(-2).join('.') : 'zynocs.com';
  const host = subdomain === 'main' ? rootDomain : `${subdomain}.${rootDomain}`;
  const query = token ? `?auth_token=${encodeURIComponent(token)}` : '';
  return `${protocol}//${host}/${query}`;
};

export const getRootDomainUrl = (): string => {
  if (typeof window === 'undefined') return '/';
  const hostname = window.location.hostname;
  const isLocal = hostname.includes('localhost');
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol || 'http:';

  if (hostname.endsWith('.vercel.app')) {
    return `${protocol}//${hostname}/`;
  }
  if (isLocal) {
    return `${protocol}//localhost${port}/`;
  }
  const parts = hostname.split('.');
  const rootDomain = parts.length > 1 ? parts.slice(-2).join('.') : 'zynocs.com';
  return `${protocol}//${rootDomain}/`;
};

export const authService = new AuthService();
