// import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom";
// import axios from "axios";
import React from "react";
import {motion} from 'framer-motion';

import InputForm from "../../components/InputForm";
import Reveal from "../../components/Reveal";


// Framer motion
const variantButton = {
      hidden :{
        opacity:0,
        scale:0.9,
        y:20
      },
      visible:{
        y:0,
        opacity:1,
        scale:1,
        transition:{
          delay:0.3,
          duration:0.5
        }
      }
}

const Login:React.FC = () => {

  const [email,setEmail] = useState(''); // The state will be updated and re-render component every words
  const [password,setPassword] = useState('');

  console.log(email, password);
  console.log('re-render') // component re-render every word while typing on keyboard

  const handleLoginSubmit = (e:React.FormEvent) =>{
    e.preventDefault(); // Avoid web refresh the page after submit
    
  }
  return (
    // <div className="grid grid-cols-1 md:grid md:grid-cols-2 min-h-screen">
    <div>
        <div className="bg-gradient-to-tr bg-cover from-blue-800 to-purple-700 md:bg-white md:from-white md:to-white h-screen md:h-full md:col-span-1 p-4 flex flex-row justify-center items-center "
        // style={{backgroundImage:'url(https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)'}}
        >
          <div className="bg-white rounded-2xl h-5/6 md:h-3/4 border-2 shadow-md p-6">
            {/* header */}
            <div className="mb-3">
              <Reveal width="fit-content"><h1 className="font-bold text-3xl text-center md:text-left">Hello, Welcome to Auth-app!</h1></Reveal>
              <p className="mt-1 text-sm text-gray-500">Try login for better experience</p>
            </div>

            <form className="" onSubmit={handleLoginSubmit}>
              <div className="flex flex-row items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:border-purple-400 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <InputForm type="email" name="email" placeholder="Email Address" value={email} onChange={(e)=>{ setEmail(e.target.value)}}  /> 
              </div>
              <div className="flex flex-row items-center border-2 py-2 px-3 rounded-2xl mb-1 hover:border-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <InputForm type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <div className="w-full flex flex-row justify-center">
                <Link to={'/login'} className="w-full flex justify-center">
                  <motion.button className="w-3/4 flex justify-center items-center font-semibold border-2 bg-gradient-to-tr from-blue-800 to-purple-600 text-white text-lg mt-4 px-3 py-2 rounded-2xl shadow-md hover:opacity-100 scale-95 hover:scale-100 "
                  variants={variantButton} initial={'hidden'} animate={'visible'} whileHover={{scale:1.1}}>
                  Login 
                  <span>
                    <svg className="h-6 w-6 mx-2" fill="none" strokeLinecap="round"strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  </motion.button>
                </Link>

              </div>
              <div className="flex justify-between mt-2">
                <Link to={"#"} className="text-sm  ms-2 opacity-65 hover:opacity-95">Forget password?</Link>
                <Link to={"/register"} className="text-sm opacity-65 hover:opacity-95">Don't have an account yet?</Link>
              </div>
              
              
            </form>
              
            </div>
          </div>

          
            

        </div>
  );
};

export default Login;