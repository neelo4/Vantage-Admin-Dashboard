import { useEffect } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Compass, LayoutDashboard, ShieldCheck, Sparkles, Users } from 'lucide-react'
import clsx from 'clsx'

interface OnboardingGuideProps {
  open: boolean
  currentStep: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  steps: OnboardingStep[]
}

export interface OnboardingStep {
  title: string
  description: string
  highlight: string
  actionLabel: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const iconDefaults: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  overview: Sparkles,
  dashboard: LayoutDashboard,
  team: Users,
  governance: ShieldCheck,
  explore: Compass,
}

const OnboardingGuide = ({ open, currentStep, onClose, onNext, onPrev, onSelect, steps }: OnboardingGuideProps) => {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight') {
        onNext()
      }
      if (event.key === 'ArrowLeft') {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose, onNext, onPrev])

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  if (!open) {
    return null
  }

  const step = steps[currentStep]
  const Icon = step.icon ?? iconDefaults[step.title.toLowerCase()] ?? Sparkles
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Product tour</p>
                <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 transition hover:text-slate-600"
            >
              Skip tour
            </button>
          </div>

          <div className="space-y-6 px-6 py-6">
            <p className="text-sm text-slate-600">{step.description}</p>
            <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 px-4 py-3 text-sm text-brand-700">
              <span className="font-semibold">Focus:</span> {step.highlight}
            </div>

            <a
              href={step.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500"
              onClick={onClose}
            >
              {step.actionLabel} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelect(index)}
                  className={clsx(
                    'h-2.5 rounded-full transition-all',
                    index === currentStep ? 'w-6 bg-brand-500' : 'w-2 bg-slate-200 hover:bg-brand-300',
                  )}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentStep === 0}
                className={clsx(
                  'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition',
                  currentStep === 0
                    ? 'cursor-not-allowed border-slate-200 text-slate-300'
                    : 'border-slate-300 text-slate-500 hover:border-brand-300 hover:text-brand-600',
                )}
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={isLastStep ? onClose : onNext}
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-brand-600"
              >
                {isLastStep ? 'Finish' : 'Next'}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingGuide
