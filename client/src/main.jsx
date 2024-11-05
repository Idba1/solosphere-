import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'
import AuthProvider from './Provider/AuthProvider'
import Toaster from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
      <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>,
)
