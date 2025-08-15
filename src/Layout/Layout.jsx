import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Components/Navbar/Navbar'

export default function Layout() {
  return (
    <div className='dark:bg-gray-800 dark:text-white'>
      <NavbarComponent />
      <div className='min-h-screen px-3 md:px-36 py-24'>
        <Outlet /> 
      </div>
    </div>
  )
}
