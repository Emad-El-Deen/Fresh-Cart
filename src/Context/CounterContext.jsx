import { createContext, useState } from "react";

export const counterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);

  return (
    <counterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}
