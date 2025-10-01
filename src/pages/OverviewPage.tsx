import { ArrowRight, BadgeCheck, Binary, CircuitBoard, Compass, Download, Goal, Layers, Map, PlayCircle, Sparkles, Users } from 'lucide-react'
import { useState } from 'react'
import Card from '../components/ui/Card'

const learningHighlights = [
  {
    title: 'Production architecture mindset',
    description:
      'Redux Toolkit slices, memoized selectors, and typed hooks keep data orchestration maintainable as the dashboard grows.',
    icon: Layers,
  },
  {
    title: 'D3 visualizations in React',
    description: 'Custom area, bar, and donut charts demonstrate how to mix low-level SVG control with utility-first styling.',
    icon: Binary,
  },
  {
    title: 'Role-based UX flows',
    description: 'Admins, editors, and viewers experience tailored navigation, route guards, and disabled states to mirror enterprise access policies.',
    icon: Users,
  },
]

const featureMoments = [
  {
    title: 'Explore KPIs',
    detail:
      'Use the revenue intelligence dashboard to filter strategic accounts, track KPIs, and export a CSV summary for stakeholders.',
    cta: 'Go to Dashboard',
    href: '/',
  },
  {
    title: 'Deep-dive analytics',
    detail:
      'The analytics workspace layers retention curves, funnel metrics, and segment spotlights to surface go-to-market insights.',
    cta: 'Open Analytics',
    href: '/analytics',
  },
  {
    title: 'Role-switching demo',
    detail:
      'Switch between Admin, Editor, and Viewer from the top nav to see navigation locks, unauthorized handling, and persona context.',
    cta: 'Try role selector',
    href: '#role-selector-demo',
  },
]

const demoSteps = [
  {
    title: 'Step 1 · Guided tour orientation',
    focus: '60-second overview',
    summary:
      'Start here to understand the problem space, tech stack, and navigation patterns before diving into data views.',
    instructions: [
      'Skim the hero banner to see the elevator pitch and quick entry points.',
      'Review the learning highlights to understand what was engineered.',
      'Note the demo checklist so you can revisit it later from any device.',
    ],
    ctaLabel: 'Stay on guided tour',
    ctaHref: '/overview',
  },
  {
    title: 'Step 2 · Dashboard deep dive',
    focus: 'KPIs & filters',
    summary:
      'Head to the dashboard to interact with headline metrics, D3 charting, and the account pipeline table.',
    instructions: [
      'Adjust the status filters and time range chips to reshape the data.',
      'Trigger the CSV export to simulate sharing insights with stakeholders.',
      'Observe how the KPI card deltas respond to your interactions.',
    ],
    ctaLabel: 'Open dashboard',
    ctaHref: '/',
  },
  {
    title: 'Step 3 · Persona switch and access controls',
    focus: 'Role-based UX',
    summary:
      'Use the role selector in the top navigation to toggle between Admin, Editor, and Viewer experiences.',
    instructions: [
      'Switch to Editor to confirm reports remain available while settings lock down.',
      'Switch to Viewer to see disabled links and the unauthorized guard in action.',
      'Return to Admin before proceeding so every workspace is available.',
    ],
    ctaLabel: 'Try the role selector',
    ctaHref: '#role-selector-demo',
  },
  {
    title: 'Step 4 · Analytics, team, and governance',
    focus: 'Cross-functional views',
    summary:
      'Tour the analytics, team, and settings pages to see how the design supports revenue, success, and ops teams.',
    instructions: [
      'Inspect the analytics retention chart and segment spotlights for go-to-market insights.',
      'Scan the team roster to see how persona context is communicated.',
      'Visit settings to review governance controls and integration placeholders.',
    ],
    ctaLabel: 'Continue the tour',
    ctaHref: '/analytics',
  },
]

const techStacks = [
  {
    heading: 'Core stack',
    bullets: ['React 19 + Vite 7', 'TypeScript strict mode', 'Redux Toolkit store'],
    icon: CircuitBoard,
  },
  {
    heading: 'Data & visuals',
    bullets: ['D3 for custom charts', 'Mock data seeds for ARR, accounts, goals', 'Memoized selectors for derived KPIs'],
    icon: Goal,
  },
  {
    heading: 'Styling & DX',
    bullets: ['TailwindCSS design tokens', 'Lucide icon system', 'Vercel-ready build pipeline'],
    icon: BadgeCheck,
  },
]

const OverviewPage = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeStep = demoSteps[activeStepIndex]

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-sky-400 px-8 py-12 text-white shadow-lg">
        <div className="max-w-4xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5" /> Guided tour
          </span>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Vantage Admin: Revenue Intelligence Experience</h1>
          <p className="text-sm sm:text-base text-white/80">
            A portfolio-ready admin dashboard that blends enterprise UX with modern frontend engineering. Use this page as a
            quick orientation before exploring the live data views.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700 transition hover:bg-white/90"
            >
              Enter dashboard <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/analytics"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Jump to analytics
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,260px),1fr]">
        <Card
          title="Demo walkthrough"
          description="Follow the guided flow to experience the product the same way a stakeholder would during a live review."
        >
          <div className="flex flex-col gap-3">
            {demoSteps.map((step, index) => {
              const isActive = index === activeStepIndex
              const baseClasses = 'flex w-full flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left transition'
              const activeClasses = 'border-brand-400 bg-brand-50 text-brand-700 shadow-sm'
              const inactiveClasses = 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50/40 hover:text-brand-600'

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                    <PlayCircle className={`h-3.5 w-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    {step.focus}
                  </span>
                  <span className="text-sm font-semibold">{step.title}</span>
                  <span className="text-xs text-slate-500">{step.summary}</span>
                </button>
              )
            })}
          </div>
        </Card>
        <Card
          title={activeStep.title}
          description={activeStep.summary}
          bodyClassName="space-y-4"
        >
          <div className="grid gap-2">
            {activeStep.instructions.map((instruction) => (
              <div
                key={instruction}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              >
                <Map className="mt-0.5 h-4 w-4 text-brand-500" />
                <span>{instruction}</span>
              </div>
            ))}
          </div>
          <a
            href={activeStep.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500"
          >
            {activeStep.ctaLabel} <ArrowRight className="h-4 w-4" />
          </a>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {learningHighlights.map((item) => (
          <Card
            key={item.title}
            className="h-full"
            title={item.title}
            description={item.description}
            headerClassName="flex items-center gap-3"
            action={<item.icon className="h-8 w-8 text-brand-500" />}
          >
            <p className="text-sm text-slate-500">
              Built with reusable slices, typed selectors, and UI primitives that can scale into production scenarios.
            </p>
          </Card>
        ))}
      </section>

      <Card
        title="How to experience the demo"
        description="Follow these guided steps to explore each surface with confidence."
      >
        <ol className="space-y-4 text-sm text-slate-600">
          <li className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-900">1. Start with the overview dashboard</p>
            <p className="mt-1 text-sm text-slate-500">
              Inspect the KPI cards, interact with filters and export the executive summary CSV to experience data orchestration.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-900">2. Switch personas using the role selector</p>
            <p className="mt-1 text-sm text-slate-500" id="role-selector-demo">
              In the top navigation choose Admin, Editor, or Viewer to watch navigation items enable/disable and route guards in action.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-900">3. Explore analytics, reports, and team workspaces</p>
            <p className="mt-1 text-sm text-slate-500">
              Review the retention curves, funnel metrics, and governance settings to see how the application supports cross-functional teams.
            </p>
          </li>
        </ol>
      </Card>

      <section className="grid gap-6 md:grid-cols-3">
        {featureMoments.map((feature) => (
          <Card key={feature.title} className="flex h-full flex-col justify-between" title={feature.title}>
            <p className="text-sm text-slate-500">{feature.detail}</p>
            <a
              href={feature.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500"
            >
              {feature.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
        ))}
      </section>

      <Card
        title="Architecture cheat sheet"
        description="A snapshot of the engineering decisions behind the experience."
        action={<Download className="h-4 w-4 text-brand-600" />}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {techStacks.map((stack) => (
            <div key={stack.heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <stack.icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold text-slate-900">{stack.heading}</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {stack.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Compass className="mt-1 h-3.5 w-3.5 text-brand-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default OverviewPage
