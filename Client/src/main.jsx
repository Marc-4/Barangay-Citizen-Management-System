import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import theme from './theme.js'
import PrivateRoute from './components/PrivateRoute.jsx'
import * as page from './pages/index.js'
import {
  UserLayout,
  AdminLayout,
  RootLayout,
  EmployeeLayout,
} from './layouts/index.js'
import GenTransaction from './components/generated/GenTransaction.jsx'
import GenRequest from './components/generated/GenRequest.jsx'
import GenUser from './components/generated/GenUser.jsx'
import GenEmployee from './components/generated/GenEmployee.jsx'
import GenUserTransaction from './components/generated/GenUserTransaction.jsx'

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
        element: (
          <PrivateRoute roles={['user']}>
            <UserLayout />
          </PrivateRoute>
        ),
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
            path: 'transactions/:id',
            element: <GenUserTransaction />,
          },
          {
            path: 'book',
            element: <page.UserBookTransaction />,
          },
          {
            path: 'book/barangay_certification',
            element: <page.UserBarangayCertification />,
          },
          {
            path: 'book/barangay_clearance',
            element: <page.UserBarangayClearance />,
          },
          {
            path: 'book/community_tax_certificate',
            element: <page.UserCommunityTaxCertificate />,
          },
          {
            path: 'book/barangay_records',
            element: <page.UserBarangayRecords />,
          },
          {
            path: 'book/certificate_of_residency',
            element: <page.UserCertificateOfResidency />,
          },
          {
            path: 'book/business_clearance',
            element: <page.UserBusinessClearance />,
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
        element: (
          <PrivateRoute roles={['employee']}>
            <EmployeeLayout />
          </PrivateRoute>
        ),
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
            path: 'users/:id',
            element: <GenUser />,
          },
          {
            path: 'transactions',
            element: <page.EmployeeTransactions />,
          },
          {
            path: 'transactions/:id',
            element: <GenTransaction />,
          },
          {
            path: 'requests',
            element: <page.EmployeeRequests />,
          },
          {
            path: 'requests/:id',
            element: <GenRequest />,
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
        element: (
          <PrivateRoute roles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        ),
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
            path: 'users/:id',
            element: <GenUser />,
          },
          {
            path: 'employees',
            element: <page.AdminEmployeeAccounts />,
          },
          {
            path: 'employees/:id',
            element: <GenEmployee />,
          },
          {
            path: 'transactions',
            element: <page.AdminTransactions />,
          },
          {
            path: 'transactions/:id',
            element: <GenTransaction />,
          },
          {
            path: 'requests',
            element: <page.AdminRequests />,
          },
          {
            path: 'requests/:id',
            element: <GenRequest />,
          },
          {
            path: 'notifications',
            element: <page.AdminNotifications />,
          },
          // {
          //   path: 'notifications/:id',
          //   element: <GenNotification />,
          // },
          {
            path: 'about',
            element: <page.AdminAbout />,
          },
        ],
      },
      {
        path: '/unauthorized',
        element: <page.unauthorized />,
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
