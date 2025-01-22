import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import './index.css'
import App from './App.tsx'
import LoginPage from './pages/Login/LoginPage.tsx'
import Users from './pages/Users.tsx'

// Define Fallback component
const Fallback = () => <div>Loading...</div>;


// Create routers
const router = createBrowserRouter([
  {
    path :'/', element : <App/>,
    hydrateFallbackElement: <Fallback />,
  },
  {
    path: '/login', element: <LoginPage/>
  },
  {
    path: '/users', element: <Users/>
  }
],{
  future: {
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    
  },
}
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Use router */}
    <RouterProvider 
        future={{
        v7_startTransition: true,
      }} 
  router={router}/>
  </StrictMode>,
)
