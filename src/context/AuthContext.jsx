import React, { createContext, useState, useEffect, useContext } from 'react'
import * as authService from '../services/auth'
import Swal from 'sweetalert2'
import { ThemeContext } from './ThemeContext'

const getAlertStyle = (isDarkTheme) => ({
  background: isDarkTheme ? '#1e293b' : '#ffffff',
  color: isDarkTheme ? '#ffffff' : '#000000'
})

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isDark } = useContext(ThemeContext)

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
    Swal.fire({
      title: 'Login successful!',
      text: 'Welcome to the game store',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      ...getAlertStyle(isDark)
    })
    return userData
  }

  const signup = async (email, password, username) => {
    const userData = await authService.signup(email, password, username)
    setUser(userData)
    Swal.fire({
      title: 'Registration successful!',
      text: 'Welcome to the game store',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      ...getAlertStyle(isDark)
    })
    return userData
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    Swal.fire({
      title: 'Logout successful!',
      text: 'See you later',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      ...getAlertStyle(isDark)
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
