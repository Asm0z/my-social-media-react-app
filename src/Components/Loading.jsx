import React from 'react'
import loadingImg from '../assets/load-screen.gif'

export default function LoadingScreen() {
  return (
    <div className='mx-auto'>
        <img src={loadingImg} alt="loading" className='w-full rounded-3xl'/>
    </div>
  )
}
