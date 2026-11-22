# Zynocs Enterprise Platform Frontend

Welcome to the **Zynocs Frontend Monorepo / Multi-Subdomain Architecture**. This repository houses the frontend applications powering the Zynocs digital ecosystem.

---

## 🌐 Subdomain Architecture Overview

| Subdomain | Target Audience | Primary Functionality | Privacy Level |
| :--- | :--- | :--- | :--- |
| **`zynocs.com`** | Public, Prospects, Search Engines | Company portfolio, services, AdTech showcases, contact form, lead generation | **Public** |
| **`directors.zynocs.com`** | Founders, Board of Directors, Executive Officers | Financial P&L, corporate governance, cap table, strategic KPI approvals, board resolutions | **Confidential / Executive Only (MFA + FIDO2)** |
| **`work.zynocs.com`** | Engineers, PMs, Supervisors, CEO, Admins | Dual-track project management (in-house + client software), tasks, sprints, code reviews | **Internal Staff Only (SAML SSO)** |
| **`ads.zynocs.com`** | AdOps team, Monetization Managers, Leadership | Ad unit inventory, floor prices, ad creative approvals, fraud filtering, fill rate monitoring | **Internal Staff Only** |
| **`sponsors.zynocs.com`** | Advertisers, Brands, Media Agencies | Live campaign results (impressions, clicks, CTR, conversions), creative uploads, ad spend receipts | **External (Advertisers)** |
| **`client.zynocs.com`** | Custom Software Clients | Project delivery roadmap, milestones, staging preview links, contract/invoice downloads, bug reporting | **External (Dev Clients)** |

---

## 📁 Modular Directory Structure

```text
├── public/
│   └── images/
│       └── leadership/         # Executive headshots & leadership media
│           ├── photo1.jpeg     # Yousuf Mohammed Jaleel (Founder & CEO)
│           └── photo2.jpeg     # Mohammed Khaja Moinuddin (Founder & Chairperson)
├── src/
│   ├── modules/                # Subdomain-aligned feature modules
│   │   ├── landing/            # zynocs.com (Public marketing & company pages)
│   │   │   └── components/     # Hero, Services, Portfolio, Leadership, etc.
│   │   ├── work/               # work.zynocs.com (Internal employee workspace)
│   │   ├── ads/                # ads.zynocs.com (Internal AdTech ops platform)
│   │   ├── sponsors/           # sponsors.zynocs.com (Client advertiser reporting)
│   │   └── client/             # client.zynocs.com (Client software project tracking)
│   ├── components/             # Reusable UI & Layout components
│   │   ├── common/             # Navbar, Footer, Logo, ScrollToTop, CustomCursor
│   │   └── ui/                 # SpotlightCard, ParticleBackground
│   ├── types/                  # Shared TypeScript interfaces & models
│   └── styles/                 # Global styles & Tailwind configuration
├── App.tsx                     # Main application entry
├── index.html                  # HTML template
├── index.tsx                   # React root mount
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration with @/ path alias
└── vite.config.ts              # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 💡 Guidelines for Developers
- **Path Aliases:** Always use `@/` to import files from `src/` (e.g., `import { SpotlightCard } from '@/components/ui/SpotlightCard'`).
- **Assets:** Never place raw images in the project root. Put all static assets in `public/images/<category>/` or `src/assets/`.
- **Modularity:** Keep subdomain-specific features inside their respective `src/modules/<subdomain>/` directory. Shared UI elements belong in `src/components/`.
