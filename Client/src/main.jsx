import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import theme from './theme.js'
import {
  Home,
  Register,
  Login,
  Profile,
  AdminDashboard,
  DefaultProfile,
  NotFound,
} from './pages/index.js'
import RootLayout from './layouts/RootLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '*',
        element: <NotFound />,
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
