// import React from 'react'

import LoginForm from './LoginForm';
// import Navbar from '../components/Navbar';
import Reveal from '../../components/Reveal';

function LoginPage() {
  return (
    <div className='grid grid-cols-1 md:grid md:grid-cols-2 min-h-screen'>
        {/* <Navbar/> */}
        <div className="hidden bg-gradient-to-tr from-blue-800 to-purple-700 w-full md:px-5 col-span-1 md:flex md:flex-row justify-around items-center bg-cover" 
            
            style ={{backgroundImage: `url(https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)`}}>
            {/* <img src="https://picsum.photos/seed/picsum/200/300" alt="seed" className="w-full "/> */}
            <div className="text-white">
              <Reveal><h1 className="font-bold text-4xl">Authentication</h1></Reveal>
              <Reveal><p className="mt-2 md:text-lg">The most popular to encrypt data is Bcrypt and JWT Token</p></Reveal>
              <Reveal><button type="submit" className="bg-white md:text-lg block w-28 text-purple-800 mt-4 
              rounded-xl font-bold p-2 shadow-md scale-95 hover:scale-100 -translate-y-1 duration-500 transition-all">
                Read More</button></Reveal>
            </div>
            
        </div>

        <LoginForm/>
    </div>
  )
}

export default LoginPage