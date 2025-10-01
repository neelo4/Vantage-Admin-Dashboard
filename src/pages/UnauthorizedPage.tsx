import { Link, useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'

const UnauthorizedPage = () => {
  const location = useLocation() as { state?: { from?: Location } }
  const attemptedPath = (location.state?.from as Location | undefined)?.pathname

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Access Restricted</h1>
        <p className="mt-3 text-sm text-slate-600">
          You do not have permission to view <span className="font-medium text-slate-900">{attemptedPath ?? 'this page'}</span>.
          Switch to an account with the appropriate role or contact an administrator.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-500"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage
