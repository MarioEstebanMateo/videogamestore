import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme_mode')
    if (saved) {
      setIsDark(saved === 'dark')
    }
  }, [])

  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light')
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
