import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser, useIsAuthenticated } from '@/store/authStore'

export default function AdminRoute() {
  const isAuthenticated = useIsAuthenticated()
  const user = useCurrentUser()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user?.roles?.includes('ADMIN')) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
