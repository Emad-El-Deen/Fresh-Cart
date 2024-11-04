import { createContext, useState } from "react";


export const TextContext=createContext(0)



export default function TextContextProvider({children}) {
    const [first, setfirst] = useState(0)
return <TextContext.Provider value={{first,setfirst}}>
    {children}
</TextContext.Provider>


}