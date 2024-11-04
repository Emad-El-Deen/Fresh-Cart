import React, { useEffect, useState } from 'react'
import Style from './LoadingScreen.module.css'
export default function LoadingScreen() {
    const [counter, setCounter] = useState() 


    return (
    <>
      <div className=' d-flex align-items-center justify-content-center my-5 py-5'> 
        
        
        <i className=' fas fa-spinner fa-spin fa-5x text-success'></i>
         </div>
    </>
  )
}
