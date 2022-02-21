import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  if(Boolean(window.localStorage.user)===false){ window.localStorage.user={};}
  const [user, setUser] = useState(
    () => window.localStorage.user
  )
  const [menuState,setMenuState]=useState("closed");
  const toogleMenuState = ()=>{setMenuState((menuState==="closed")?"opened":"closed")};
  return <Context.Provider value={{
    user,
    setUser,
    menuState,
    setMenuState,
    toogleMenuState
  }}>
    {children}
  </Context.Provider>
}

export default Context
