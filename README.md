# Vantage Admin Dashboard

An enterprise-grade revenue intelligence dashboard built with **React 19**, **TypeScript**, and **Vite**, showcasing responsive UI patterns, stateful data exploration, and D3-powered visualizations. The project simulates a production-ready admin experience that highlights role-based access, real-time style feedback, and polished UX, ready to deploy on Vercel.

## Why It Matters
- Demonstrates mastery of a modern React stack with predictable state management (Redux Toolkit) and type-safe patterns.
- Communicates design skills through responsive layouts, accessible navigation, and branded component styling powered by TailwindCSS.
- Illustrates data-heavy decision-support flows, including analytics charts, portfolio tables, and automated exports, mirroring real enterprise requirements.

## Architecture at a Glance
- **React + Vite**: Enables fast iteration, module-scope CSS, and production bundling with minimal tooling overhead.
- **Redux Toolkit store** (`src/app/store.ts`): Centralizes authentication state (role switching) and dashboard filters. Selectors compute derived datasets to keep components lean.
- **Feature slices** (`src/features`): Encapsulate domain logic—`authSlice` seeds personas and roles, while `dashboardSlice` manages filters, memoized summaries, and chart series.
- **UI composition** (`src/components`):
  - `layout/` hosts `Sidebar` and `TopNav` with responsive breakpoints and protected navigation.
  - `dashboard/` contains reusable cards, D3 chart wrappers, and tabular data widgets.
  - `charts/` wraps D3 primitives (area, arc, bar) in idiomatic React components.
- **Routing & guards** (`src/router/AppRouter.tsx`): React Router v7 orchestrates pages with `ProtectedRoute` ensuring editors/viewers see only permitted surfaces.
- **Mock data** (`src/data/mockData.ts`): Provides realistic revenue trends, account pipelines, goals, and activity feeds to drive the UI.
- **Styling**: TailwindCSS with custom theme tokens (`tailwind.config.js`) plus global typography tweaks in `src/index.css` for consistent branding.

## Feature Highlights
- **Role-aware navigation**: Toggle between Admin, Editor, and Viewer to experience access gating, disabled links, and unauthorized redirects.
- **Responsive layout**: Sidebar collapses into a mobile drawer, while grid-based content adapts seamlessly from mobile to widescreen.
- **Analytics workspace**: D3 graphs for revenue vs costs, product performance, and channel split illustrate how to blend SVG and utility-first styling.
- **Operational toolkit**: Filterable account tables, activity timeline, goal tracking, and CSV export deliver tangible executive insights.
- **Production-ready touches**: Branded favicon, export button, and polished empty states convey attention to detail.

## What I Built & Learned
- **Architected a full-stack-quality frontend**: Organized slices, selectors, and components for maintainability and scalability.
- **Deepened D3 + React integration**: Crafted reusable chart components, handling scales, gradients, and responsive viewboxes without external chart libraries.
- **Implemented role-based UX patterns**: Leveraged Redux selectors and React Router to enforce permissions and personalize navigation.
- **Refined Tailwind and design systems**: Created cohesive card layouts, iconography, and spacing that deliver a premium feel across breakpoints.
- **Shipping mindset**: Added CSV export, Vercel-ready build scripts, and thorough lint-safe TypeScript configurations, mimicking real delivery constraints.

## Getting Started
```bash
npm install
npm run dev
```
Open `http://localhost:5173` to explore the dashboard. Use the role selector in the top nav and status filters to interact with the dataset.

For production builds or deployment to Vercel:
```bash
npm run build
npm run preview
```

## Deployment
- Push the project to GitHub.
- Import into Vercel, keeping the default build command (`npm run build`) and output directory (`dist`).
- Once deployed, monitor preview environments to validate responsive behaviour and access rules.

---
Crafted as a portfolio-ready demonstration of enterprise dashboard architecture, blending robust engineering patterns with modern product design.
