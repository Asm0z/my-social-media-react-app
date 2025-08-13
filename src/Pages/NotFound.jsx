import React from 'react'
import notFound from '../assets/NotFound.png'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center w-1/2 mx-auto p-24'>
        <h3 className='text-red-600 text-3xl py-3'>Page Not Found</h3>
        <img src={notFound} alt="not-found-logo" className='w-full' />
      
    </div>
  )
}
