import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FileBarChart2,
  LayoutDashboard,
  LineChart,
  Lock,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'
import clsx from 'clsx'
import { useAppSelector } from '../../app/hooks'
import { selectCurrentUser, type UserRole } from '../../features/auth/authSlice'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  to: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  roles: UserRole[]
  description: string
}

const navItems: NavItem[] = [
  {
    label: 'Guided tour',
    to: '/overview',
    icon: Sparkles,
    roles: ['admin', 'editor', 'viewer'],
    description: 'Orientation, stack notes, and demo steps',
  },
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'editor', 'viewer'],
    description: 'Executive overview and KPIs',
  },
  {
    label: 'Analytics',
    to: '/analytics',
    icon: LineChart,
    roles: ['admin', 'editor', 'viewer'],
    description: 'Cohorts, funnels, and forecasts',
  },
  {
    label: 'Team',
    to: '/team',
    icon: Users,
    roles: ['admin', 'editor', 'viewer'],
    description: 'Collaborators and assignments',
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: FileBarChart2,
    roles: ['admin', 'editor'],
    description: 'Operational and investor-ready reports',
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: Settings,
    roles: ['admin'],
    description: 'Access policies and platform controls',
  },
]

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <Fragment>
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-xl transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 font-semibold text-brand-700">
              VA
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Vantage Admin</p>
              <p className="text-xs text-slate-500">Enterprise intelligence</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const allowed = item.roles.includes(currentUser.role)

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={(event) => {
                    if (!allowed) {
                      event.preventDefault()
                      return
                    }
                    onClose()
                  }}
                  className={({ isActive }) =>
                    clsx(
                      'group relative block rounded-xl px-4 py-3 text-sm transition',
                      allowed
                        ? 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                        : 'cursor-not-allowed text-slate-400',
                      isActive && allowed && 'bg-brand-600 text-white shadow-inner',
                    )
                  }
                  aria-disabled={!allowed}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={clsx(
                        'flex h-10 w-10 items-center justify-center rounded-lg border transition',
                        allowed
                          ? 'border-brand-100 bg-brand-50 group-[.bg-brand-600]:border-transparent group-[.bg-brand-600]:bg-brand-500/20'
                          : 'border-slate-200 bg-slate-100',
                      )}
                    >
                      {allowed ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-slate-200 px-5 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                {currentUser.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.title}</p>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {currentUser.role.toUpperCase()} ROLE
            </span>
          </div>
        </div>
      </aside>
    </Fragment>
  )
}

export default Sidebar
