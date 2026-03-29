import React, { createContext, useState, useEffect } from 'react'
import * as authService from '../services/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    let currentUser = authService.getCurrentUser()
    // Ensure admin user has is_admin flag
    if (currentUser && currentUser.email === "admin" && !currentUser.is_admin) {
      currentUser.is_admin = true
    }
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    setUser(userData)
    return userData
  }

  const signup = async (email, password, username) => {
    const userData = await authService.signup(email, password, username)
    setUser(userData)
    return userData
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
