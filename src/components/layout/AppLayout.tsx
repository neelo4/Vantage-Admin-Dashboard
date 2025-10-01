import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Compass, LayoutDashboard, Sparkles, Users } from 'lucide-react'
import OnboardingGuide, { type OnboardingStep } from './OnboardingGuide'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

const LOCAL_STORAGE_KEY = 'vantage:onboarding-dismissed'

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Welcome to Vantage Admin',
    description:
      'Get oriented with the guided tour page for a concise overview of the problem space, architecture decisions, and demo flow.',
    highlight: 'Start at the Guided Tour tab to read the story behind the dashboard.',
    actionLabel: 'Open guided tour',
    href: '/overview',
    icon: Sparkles,
  },
  {
    title: 'Interact with the dashboard KPIs',
    description:
      'Head to the dashboard to explore revenue trends, strategic accounts, and the CSV export that stakeholders expect.',
    highlight: 'Adjust filters, switch time ranges, and trigger the export to see live state updates.',
    actionLabel: 'Go to dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Try persona switching',
    description:
      'Use the top-nav selector to toggle Admin, Editor, and Viewer roles and watch navigation states adjust automatically.',
    highlight: 'Route guards and disabled links illustrate enterprise access controls.',
    actionLabel: 'Use role selector',
    href: '#role-selector-demo',
    icon: Users,
  },
  {
    title: 'Review analytics & governance',
    description:
      'Tour the analytics, team, and settings surfaces to understand how each department collaborates in this workspace.',
    highlight: 'Retention curves, team assignments, and governance controls round out the demo.',
    actionLabel: 'Continue tour',
    href: '/analytics',
    icon: Compass,
  },
]

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStepIndex, setOnboardingStepIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const hasDismissed = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!hasDismissed) {
      setShowOnboarding(true)
    }
  }, [])

  const handleDismissOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
    }
    setShowOnboarding(false)
  }

  const handleNextStep = () => {
    setOnboardingStepIndex((prev) => Math.min(prev + 1, onboardingSteps.length - 1))
  }

  const handlePrevStep = () => {
    setOnboardingStepIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleSelectStep = (index: number) => {
    setOnboardingStepIndex(Math.max(0, Math.min(index, onboardingSteps.length - 1)))
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <OnboardingGuide
        open={showOnboarding}
        currentStep={onboardingStepIndex}
        onClose={handleDismissOnboarding}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        onSelect={handleSelectStep}
        steps={onboardingSteps}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-col lg:pl-72">
        <TopNav onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
