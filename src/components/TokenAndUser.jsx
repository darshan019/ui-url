import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext(null)
const TokenUpdateContext = createContext(null)
const UserUpdateContext = createContext(null)
const UserContext = createContext(null)

export function useUser() { return useContext(UserContext) }
export function useToken() { return useContext(TokenContext) }
export function useTokenUpdate() { return useContext(TokenUpdateContext) }
export function useUserUpdate() { return useContext(UserUpdateContext) }


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      if(token) {
        const response = await fetch("http://localhost:8080/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        if(!response.ok) throw new Error("Failed to fetch user")
        const info = await response.json()
        setUser(info)
      }
    }
    fetchUser()
    console.log(token)
  }, [token])

  return (
    <TokenContext.Provider value={token}>
        <TokenUpdateContext.Provider value={setToken}>
          <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
              {children}
            </UserUpdateContext.Provider>
          </UserContext.Provider>
        </TokenUpdateContext.Provider>
    </TokenContext.Provider>
  )
}

export default AuthProvider;