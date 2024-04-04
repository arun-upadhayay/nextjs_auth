'use client '

import React from 'react'

export default function page({params} : any) {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile page </h1>
        <h1 className='p-3 bg-green-500 rounded-lg text-black placeholder:'>{params.id}</h1>
    </div>
  )
}
