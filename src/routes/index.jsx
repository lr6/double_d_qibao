import { lazy } from 'react'

const ErrorPage = lazy(() => import('@/view/error-page.jsx'))
const Role = lazy(() => import('@/view/pages/role/role.jsx'))
const Dashboard = lazy(() => import('@/view/pages/dashboard/dashboard.jsx'))

import { createBrowserRouter, Outlet } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Outlet /></div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'list',
        element: <Role />
      }
    ]
  }
])