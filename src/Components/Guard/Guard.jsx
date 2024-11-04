import React, { useEffect, useState } from "react";
import Style from "./Guard.module.css";
import { Navigate } from "react-router-dom";
export default function Guard({ children }) {
  const [counter, setCounter] = useState();

  if (localStorage.getItem("Token") !== null) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <h1> Guard Component</h1>
    </>
  );
}
