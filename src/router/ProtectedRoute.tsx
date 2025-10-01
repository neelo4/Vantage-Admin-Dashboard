import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentRole, type UserRole } from '../features/auth/authSlice'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
  children: ReactElement
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const role = useAppSelector(selectCurrentRole)
  const location = useLocation()

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
