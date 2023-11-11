import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import theme from './theme.js'
import * as page from './pages/index.js'
import {
  UserLayout,
  AdminLayout,
  RootLayout,
  EmployeeLayout,
} from './layouts/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <page.Home />,
      },
      {
        path: '/user',
        element: <UserLayout />,
        children: [
          {
            path: 'profile',
            element: <page.UserProfile />,
          },
          {
            path: 'transactions',
            element: <page.UserTransactions />,
          },
          {
            path: 'notifications',
            element: <page.UserNotifications />,
          },
          {
            path: 'about',
            element: <page.UserAbout />,
          },
        ],
      },
      {
        path: '/employee',
        element: <EmployeeLayout />,
        children: [
          {
            path: 'dashboard',
            element: <page.EmployeeDashboard />,
          },
          {
            path: 'profile',
            element: <page.EmployeeProfile />,
          },
          {
            path: 'users',
            element: <page.EmployeeUserAccounts />,
          },
          {
            path: 'transactions',
            element: <page.EmployeeTransactions />,
          },
          {
            path: 'notifications',
            element: <page.EmployeeNotifications />,
          },
          {
            path: 'about',
            element: <page.EmployeeAbout />,
          },
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <page.AdminDashboard />,
          },
          {
            path: 'profile',
            element: <page.AdminProfile />,
          },
          {
            path: 'users',
            element: <page.AdminUserAccounts />,
          },
          {
            path: 'employees',
            element: <page.AdminEmployeeAccounts />,
          },
          {
            path: 'transactions',
            element: <page.AdminTransactions />,
          },
          {
            path: 'notifications',
            element: <page.AdminNotifications />,
          },
          {
            path: 'about',
            element: <page.AdminAbout />,
          },
        ],
      },
      {
        path: '*',
        element: <page.NotFound />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
