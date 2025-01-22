import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import './index.css'
import App from './App.tsx'
import LoginPage from './pages/Login/LoginPage.tsx'


// Create routers
const router = createBrowserRouter([
  {
    path :'/', element : <App/>
  },
  {
    path: '/login', element: <LoginPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Use router */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
