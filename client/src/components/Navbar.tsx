// import React from 'react'
import { Link } from "react-router-dom";


import { FaUserAstronaut } from "react-icons/fa";

export default function Navbar() {



    return (
        <nav className="w-full h-16 bg-slate-700 flex flex-col justify-center  px-5">
            <div className="w-full flex flex-row justify-between">
                <div>
                    <Link to={'/'} className="text-white font-bold text-2xl">Authentication</Link>
                </div>
                
                <div className="flex flex-row">
                    {/* Navigation menu */}
                    <div className=" flex me-10">
                        <Link className="nav-menu" to={`/`}>Home</Link>
                        <Link className="nav-menu" to={"/about"}>About</Link>
                        <Link className="nav-menu" to={"/contact"}>Contact</Link>
                        <Link className="nav-menu" to={"/service"}>Service</Link>
                    </div>

                    {/* Login Member */}
                    <div className="text-white flex flex-row me-4 justify-center items-center">
                        <FaUserAstronaut className="size-8 mx-2"/>
                        <h2 className="font-bold">Login</h2>
                    </div>
                
                </div>
                
            </div>
            {/* Brand */}
            
        </nav>
  )
}
