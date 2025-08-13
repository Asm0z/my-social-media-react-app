import React from 'react'
import loadingImg from '../assets/load-screen.gif'

export default function LoadingScreen() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <img src={loadingImg} alt="loading" className='w-full'/>
    </div>
  )
}
