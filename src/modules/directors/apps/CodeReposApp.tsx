import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Code2,
  FolderGit2,
  HelpCircle,
  Play,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  Shield,
  Workflow
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface Repository {
  id: string;
  name: string;
  visibility: 'Private Enterprise' | 'Internal Core';
  description: string;
  language: string;
  langColor: string;
  branch: string;
  latestCommit: {
    message: string;
    sha: string;
    author: string;
    time: string;
  };
  pipelineStatus: 'Passing (100%)' | 'Deploying' | 'Review Required';
  openPRs: number;
}

const DEFAULT_REPOS: Repository[] = [
  {
    id: 'repo-1',
    name: 'zynocs-core-api',
    visibility: 'Private Enterprise',
    description: 'High-throughput Node.js / TypeScript microservices with PostgreSQL 18 connection pool & PgBouncer.',
    language: 'TypeScript / Node',
    langColor: 'bg-blue-400',
    branch: 'main',
    latestCommit: {
      message: 'feat(db): optimize connection pool parameters for PostgreSQL 18',
      sha: 'a4f910b',
      author: 'Aarav Sharma',
      time: '2 hours ago'
    },
    pipelineStatus: 'Passing (100%)',
    openPRs: 2
  },
  {
    id: 'repo-2',
    name: 'zynocs-frontend-web',
    visibility: 'Private Enterprise',
    description: 'Multi-subdomain React 18, Vite, and Tailwind enterprise portal with RBAC dashboard suite.',
    language: 'TypeScript / React',
    langColor: 'bg-cyan-400',
    branch: 'production',
    latestCommit: {
      message: 'feat(directors): build enterprise sidebar and apps catalog suite',
      sha: '89ce41a',
      author: 'Mohammed Khaja Moinuddin',
      time: 'Just now'
    },
    pipelineStatus: 'Passing (100%)',
    openPRs: 1
  },
  {
    id: 'repo-3',
    name: 'zynocs-infra-terraform',
    visibility: 'Private Enterprise',
    description: 'Infrastructure as Code (IaC) provisioning AWS EKS Kubernetes clusters in Frankfurt and London.',
    language: 'HCL / Terraform',
    langColor: 'bg-purple-400',
    branch: 'main',
    latestCommit: {
      message: 'chore(k8s): define redundant ingress controllers for eu-central-1',
      sha: '52bf89c',
      author: 'Vikram Joshi',
      time: '5 hours ago'
    },
    pipelineStatus: 'Passing (100%)',
    openPRs: 0
  },
  {
    id: 'repo-4',
    name: 'zynocs-auth-vault',
    visibility: 'Internal Core',
    description: 'Zero-trust cryptographic authentication engine & session revocation middleware.',
    language: 'Go / Security',
    langColor: 'bg-emerald-400',
    branch: 'main',
    latestCommit: {
      message: 'security(rbac): strict bearer token invalidation upon user role revocation',
      sha: '71ac33d',
      author: 'SecOps Team',
      time: 'Yesterday'
    },
    pipelineStatus: 'Passing (100%)',
    openPRs: 1
  }
];

export const CodeReposApp: React.FC = () => {
  const [repos] = useState<Repository[]>(DEFAULT_REPOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'repos' | 'guide' | 'pr_review'>('repos');
  const [simulatedDeploy, setSimulatedDeploy] = useState<string | null>(null);

  const filtered = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulateDeploy = (repoName: string) => {
    setSimulatedDeploy(repoName);
    setTimeout(() => {
      setSimulatedDeploy(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* App Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-950/60 border border-sky-500/40 text-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/10">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Code Repositories & CI/CD</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-950/80 text-sky-300 border border-sky-500/30">
                GitHub Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enterprise Git monorepos, release branches, automated CI/CD pipeline telemetry, and pull request audits.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            onClick={() => setActiveTab('repos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'repos'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Repositories ({repos.length})
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>What is Git UI & How To Use</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: REPOSITORIES CATALOG */}
      {activeTab === 'repos' && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Monorepos</span>
                <FolderGit2 className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-white mt-2 font-mono">{repos.length} Repos</div>
              <div className="text-[11px] text-slate-400 mt-1">100% Private Enterprise</div>
            </SpotlightCard>

            <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>CI/CD Health Check</span>
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-2 font-mono">100% Passing</div>
              <div className="text-[11px] text-slate-400 mt-1">0 Failing Pipelines</div>
            </SpotlightCard>

            <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pending Pull Requests</span>
                <GitPullRequest className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white mt-2 font-mono">4 Awaiting Merge</div>
              <div className="text-[11px] text-purple-400 mt-1">2 Approvals Required</div>
            </SpotlightCard>

            <SpotlightCard className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>SecOps Code Scan</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-400 mt-2 font-mono">Zero CVEs</div>
              <div className="text-[11px] text-slate-400 mt-1">Automated SAST & DAST Clean</div>
            </SpotlightCard>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name, language, or stack..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Repository Cards */}
          <div className="space-y-4">
            {filtered.map((repo) => (
              <SpotlightCard
                key={repo.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors font-mono">
                          {repo.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {repo.visibility}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {repo.branch}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {repo.pipelineStatus}
                    </span>

                    <button
                      onClick={() => handleSimulateDeploy(repo.name)}
                      className="px-3 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-500/30 text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3" />
                      <span>{simulatedDeploy === repo.name ? 'Triggering...' : 'Deploy'}</span>
                    </button>
                  </div>
                </div>

                {/* Latest Commit Details */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <GitCommit className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-cyan-300">{repo.latestCommit.sha}</span>
                    <span className="text-slate-300 truncate">{repo.latestCommit.message}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-slate-500">
                    <span>{repo.latestCommit.author}</span>
                    <span>• {repo.latestCommit.time}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    <span className="text-slate-300">{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <GitPullRequest className="w-3.5 h-3.5 text-slate-500" />
                      {repo.openPRs} Pull Requests
                    </span>
                    <a
                      href={`https://github.com/zynocs/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: WHAT IS GIT UI & GITHUB INTEGRATION GUIDE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-500/40">
                Executive & Engineering Primer
              </span>
              <h3 className="text-xl font-black text-white">
                What is Git UI & GitHub Integration, and How Could We Use It?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                A complete breakdown designed for Directors, Technical Founders, and Engineering Leads to understand why visual Git and GitHub connectivity are essential to software governance.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-400 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">1. What is a Git UI?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instead of typing cryptic terminal commands like <code className="text-sky-300 font-mono">git cherry-pick</code> or <code className="text-sky-300 font-mono">git rebase -i</code>, a <strong>Git UI</strong> provides a clear visual interface to inspect commit histories, compare code branch diffs side-by-side, and resolve conflicts visually with zero command line complexity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">2. What is GitHub Integration?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  GitHub Integration connects your application directly to GitHub’s cloud APIs via Webhooks and OAuth. It enables automatic notifications whenever code changes, triggers automated testing pipelines (GitHub Actions), and enforces branch protection rules.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">3. Executive Governance & SOC2</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For Directors and Auditors, GitHub Integration guarantees that <strong>no single engineer can deploy unreviewed code to production</strong>. Every change requires an authorized Pull Request, automated security vulnerability scans (SAST), and verified digital signatures.
                </p>
              </div>
            </div>

            {/* Step-by-Step Flow: How We Use It */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Step-by-Step: How We Use Git UI & GitHub at Zynocs
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center text-xs">
                    01
                  </div>
                  <h5 className="font-bold text-white">Feature Branching</h5>
                  <p className="text-slate-400 leading-relaxed">
                    Engineers branch off <code className="text-sky-300">main</code> into feature branches (e.g. <code className="text-slate-300">feat/crm-drag-drop</code>).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-purple-400 font-mono font-bold flex items-center justify-center text-xs">
                    02
                  </div>
                  <h5 className="font-bold text-white">Pull Request & Review</h5>
                  <p className="text-slate-400 leading-relaxed">
                    A Pull Request is opened in the Git UI. Tech leads inspect line-by-line diffs and approve or request revisions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                    03
                  </div>
                  <h5 className="font-bold text-white">Automated CI/CD Checks</h5>
                  <p className="text-slate-400 leading-relaxed">
                    GitHub Actions automatically builds the Vite app, runs TypeScript checks (<code className="text-emerald-300">tsc</code>), and tests database connection.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">
                    04
                  </div>
                  <h5 className="font-bold text-white">Zero-Downtime Deploy</h5>
                  <p className="text-slate-400 leading-relaxed">
                    Once merged, a webhook triggers Kubernetes pods to roll out the new image without dropping any active user connections.
                  </p>
                </div>
              </div>
            </div>

            {/* How Directors Benefit */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Director Cockpit Advantage:</strong> You can see real-time commit activity, author attribution, and release tags right here inside the Zynocs Executive Console without needing a GitHub developer account.
                </div>
              </div>
              <button
                onClick={() => setActiveTab('repos')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all cursor-pointer"
              >
                Inspect Live Repositories →
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
