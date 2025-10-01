import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import AnalyticsPage from '../pages/AnalyticsPage'
import DashboardPage from '../pages/DashboardPage'
import ReportsPage from '../pages/ReportsPage'
import SettingsPage from '../pages/SettingsPage'
import TeamPage from '../pages/TeamPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
