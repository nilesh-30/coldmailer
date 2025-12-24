import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Static login for demo - replace with API call later
    setIsAuthenticated(true)
    setUser({ email, name: "John Doe" })
    return { success: true }
  }

  const signup = (email, password) => {
    // Static signup for demo - replace with API call later
    setIsAuthenticated(true)
    setUser({ email, name: "John Doe" })
    return { success: true }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
