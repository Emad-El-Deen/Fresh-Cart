import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(localStorage.getItem("Token"));



  useEffect(() => {
  if (localStorage.getItem('Token')) {
    setUserLogin(localStorage.getItem('Token'))
  }  
  
  }, [])
  
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
}
