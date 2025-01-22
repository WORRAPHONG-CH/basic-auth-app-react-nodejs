// import { useState } from 'react'
import { Link } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
// import Login from './components/Login'

function App() {
  
  
  return (
    <div className='w-full'> 
      <Navbar/>
      <div className='min-h-screen w-5/6 flex flex-col items-center justify-center mx-auto '>
        <h1 className=' w-full flex justify-center text-3xl font-bold  my-5'>!! Welcome to Auth-app !!</h1>
        <Link to={'/login'} className='bg-yellow-400 w-1/4 h-10 p-2 text-center font-semibold rounded-md shadow-md '>
          <button>Go to Login Page </button>
        </Link>
        
      </div>
      
    </div>
  )
}

export default App
