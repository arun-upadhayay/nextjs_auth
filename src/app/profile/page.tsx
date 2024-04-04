
'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")


    const getUserDetails = async () => {
        try {
            const response = await axios.post("/api/users/me")
            console.log(response.data.data._id);
            setData(response.data.data._id)
            
        } catch (error:any) {
            console.log(error.message ," data ins not comming");
            toast.error("error in getting  user details!")
            
        }
    }


    const logout = async () => {
        try {
             const  res = await axios.get('/api/users/logout')
             toast.success('Logged out successfully!', { duration: 2000 })
             router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error('Error logging out')
            
        }
    }
    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>About Page</h1>
        <hr />
        <h2>{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>text{data}</Link>}</h2>
        <hr />
       
        <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>logout</button>
        <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get User Details</button>
    
    
    </div>
  )
}
