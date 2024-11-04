import React, { useEffect, useState } from 'react'
import Style from './GuardAuth.module.css'
import { Navigate } from 'react-router-dom';
export default function GuardAuth({children}) {
    const [counter, setCounter] = useState() 

    if (localStorage.getItem("Token") == null) {
      return children;
    } else {
      return <Navigate to={"/"} />;
    }

    return (
    <>
      <h1> GuardAuth Component</h1>
    </>
  )
}
