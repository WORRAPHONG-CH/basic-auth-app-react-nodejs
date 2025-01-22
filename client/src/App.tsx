// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login/LoginPage'
import UsersPage from './pages/Users'

function App() {
  
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <div className='w-full'> 
        <div className='min-h-screen w-5/6 flex flex-col items-center justify-center mx-auto '>
          <h1 className=' w-full flex justify-center text-3xl font-bold  my-5'>!! Welcome to Auth-app !!</h1>
          <Link to={'/login'} className='bg-yellow-400 w-1/4 h-10 p-2 text-center font-semibold rounded-md shadow-md '>
            <button>Go to Login Page </button>
          </Link>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
