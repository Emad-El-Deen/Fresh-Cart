import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from './../Footer/Footer';
export default function Layout() {
    const [counter, setCounter] = useState() 


    return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />    </>
  )
}
