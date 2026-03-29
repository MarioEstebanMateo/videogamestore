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
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const userData = await authService.login(username, password)
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

  const signup = async (username, password) => {
    const userData = await authService.signup(username, password)
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
