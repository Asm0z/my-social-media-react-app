import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Login from './Pages/Login'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Registration from './Pages/Register'
import { Toaster } from 'react-hot-toast'
import PostsDetails from './Pages/PostsDetails'
import { UserContextProvider } from './Context/UserContext'
import { ProtectedRouting } from './ProtectedRouting/ProtectedRouting'
import EditProfile from './Pages/EditProfile'

export default function App() {
  let Router = createBrowserRouter([
    {path: '/', element: <Layout />, children:[
      {index:true, element: <ProtectedRouting> <Home /> </ProtectedRouting>},
      {path:'register', element: <Registration />},
      {path:'login', element: <Login />},
      {path:'postsDetails/:id', element: <ProtectedRouting> <PostsDetails /> </ProtectedRouting>},
      {path:'editProfile', element: <ProtectedRouting> <EditProfile /> </ProtectedRouting>},
      {path:'*', element: <NotFound />},
    ]},
  ])
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={Router} />
      <Toaster />
    </UserContextProvider>
    </>
  )
}
