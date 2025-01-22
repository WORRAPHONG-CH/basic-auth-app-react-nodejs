import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { div, p } from 'framer-motion/client'

interface UserProps{
    id:string,
    name:string,
    email:string,
    password:string
}

function Users() {
    const [users,setUsers] = useState<UserProps[] | null>(null)

    console.log('users:',users)

    const fetchUsers = async () =>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/api/users`, 
                { withCredentials: true });

            if(!response){
                throw new Error('Fetch Fail')
            }

            setUsers(response.data.users);
        }catch(error){
            console.log((error as Error).message)
        }
        
    }

    useEffect(()=>{
        fetchUsers();
    },[])

  return (
    <div className="w-screen min-h-screen bg-purple-200 flex items-center">
        <div className="w-2/4 h-[70vh] mx-auto bg-slate-100 rounded-2xl shadow-lg gap-2 ">
                <h1 className="text-center text-4xl font-bold">Welcome Admin</h1>

                <div className='w-full h-full flex flex-row mt-5 gap-5'>
                { 
                    users?.map((user,index)=>{
                        return (
                            <div key={index} className='w-1/4 h-28 px-2 py-2 rounded-xl shadow-lg'>
                                <p>User ID: {user.id}</p>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                            
                        )
                    })
                }
                </div>
                
        </div>

    </div>
  )
}

export default Users