import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-500"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
