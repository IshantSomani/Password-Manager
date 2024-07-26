import React, { createContext, useState } from 'react'

export const Context = createContext();

const ContextProvider = ({children}) => {
    const [open, setOpen] = useState(false);
  return (
    <Context.Provider value={{open, setOpen}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider

